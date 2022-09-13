import { NameOf, Throw, Warn } from '../util/HelperFunctions';
import OCScrollBody from './OCScrollBody';
import { OCDataRequest, OCDataResponse, OCDataSourceOptions, OCServerSideOptions } from './OCTypes';
import OpenColumn from './OpenColumn';

export default class OCDataSource<T> {
    private readonly _options: OCDataSourceOptions<T>;
    private readonly _api: OpenColumn<T>;
    private readonly _scrollBody: OCScrollBody<T>;
    private _blockSize: number;

    constructor(api: OpenColumn<T>, options: OCDataSourceOptions<T>, blockSize: number, scrollBody: OCScrollBody<T>) {
        this._api = api;
        this._options = options;
        this._blockSize = blockSize;
        this._scrollBody = scrollBody;

        this.ValidateDataSource = this.ValidateDataSource.bind(this);

        this.ValidateDataSource();
    }

    private ValidateDataSource() {
        if (this._options.serverSide && !this._options.serverOptions)
            Throw("Could not find server side configuration.");

        if (!this._options.serverSide && !this._options.clientData)
            Throw("Could not find client data for client side configuration.");

        if (this._options.clientData && this._options.serverOptions)
            Warn(`Both client side and server side data configurations were found - using ${this._options.serverSide ? "server" : "client"} side data.`);
    }

    public async GetData(drawIndex: number): Promise<OCDataResponse<T>> {
        if (this._options.serverSide)
            return await this.LoadServerSideData(drawIndex);
        else
            return this.GetClientSideData(drawIndex);
    }

    private async LoadServerSideData(drawIndex: number): Promise<OCDataResponse<T>> {
        const requestOpts = this._options.serverOptions as OCServerSideOptions<T>;
        let request: OCDataRequest = {
            refreshFilters: false,
            skip: drawIndex,
            take: this._blockSize,
        };

        if(requestOpts.preRequest)
            request = requestOpts.preRequest(request, this._api);

        let data: OCDataResponse<T>;

        if(requestOpts.overrideRequest)
            data = await requestOpts.overrideRequest();
        else
        {
            const requestBody = this.GetServerSideBody(drawIndex);
            const request = new Request(requestOpts?.url as string, {
                method: requestOpts?.method,
                headers: requestOpts?.headers,
                body: requestBody
            });
            const result = await fetch(request);
            data = await result.json();
        }
        
        // TODO: Maybe add a warning here if they mess with the skip/take pos
        if(requestOpts.postRequest)
            data = requestOpts.postRequest(data, this._api);
        
        return data;
    }
    
    private GetClientSideData(drawIndex: number): OCDataResponse<T> {
        const skip = drawIndex * this._blockSize;
        const data = this._options.clientData?.slice(skip, skip + this._blockSize) ?? [];

        return {
            data,
            totalRowCount: this._options.clientData?.length ?? 0,
            skip
        };
    }
    
    private GetServerSideBody(drawIndex: number) : FormData {
        const body = new FormData();
        body.append(NameOf<OCDataRequest>("skip"), drawIndex.toString());
        body.append(NameOf<OCDataRequest>("take"), this._blockSize.toString());
        // TODO: Fitler stuff - ages away yet
        // body.append(NameOf<OCDataRequest>("refreshFilters"), )
        return body;
    }
}