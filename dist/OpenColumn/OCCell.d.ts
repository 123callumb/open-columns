import OCRow from "./OCRow";
import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";
export default class OCCell<T> {
    private readonly _api;
    private readonly _header;
    private readonly _row;
    private _element;
    private _cellData?;
    private _rawCellData?;
    constructor(api: OpenColumn<T>, header: OCDataHeaderOptions<T>, row: OCRow<T>);
    Draw(): void;
    GetData(): unknown;
    GetElement(): HTMLElement;
}
