import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";
export default class OCCell<T> {
    private readonly _api;
    private readonly _header;
    private _element;
    private _rowData?;
    constructor(api: OpenColumn<T>, header: OCDataHeaderOptions<T>, rowData?: T);
    private Draw;
    Update(newRowData?: T): void;
    GetData(): unknown;
    GetElement(): HTMLElement;
}
