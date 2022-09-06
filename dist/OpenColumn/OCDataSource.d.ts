import { OCDataSourceOptions } from './OCTypes';
import OpenColumn from './OpenColumn';
export default class OCDataSource<T> {
    private readonly _options;
    private readonly _api;
    private _blockSize;
    constructor(api: OpenColumn<T>, options: OCDataSourceOptions<T>, blockSize: number);
    private ValidateDataSource;
    GetData(drawIndex: number): Promise<T[]>;
    private LoadServerSideData;
    private GetClientSideData;
    private GetServerSideBody;
}
