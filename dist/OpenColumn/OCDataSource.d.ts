import OCScrollBody from './OCScrollBody';
import { OCDataResponse, OCDataSourceOptions } from './OCTypes';
import OpenColumn from './OpenColumn';
export default class OCDataSource<T> {
    private readonly _options;
    private readonly _api;
    private readonly _scrollBody;
    private _blockSize;
    constructor(api: OpenColumn<T>, options: OCDataSourceOptions<T>, blockSize: number, scrollBody: OCScrollBody<T>);
    private ValidateDataSource;
    GetData(drawIndex: number): Promise<OCDataResponse<T>>;
    private LoadServerSideData;
    private GetClientSideData;
    private GetServerSideBody;
}
