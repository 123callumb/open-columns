import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";
export default class OCRow<T> {
    private readonly _api;
    private readonly _headers;
    private _element;
    private _cells;
    private _data?;
    readonly RowIndex: number;
    constructor(api: OpenColumn<T>, rowIndex: number, headers: OCDataHeaderOptions<T>[], data?: T);
    GetElement(): HTMLElement;
    private Draw;
    Update(data: T): void;
    GetData(): T;
}
