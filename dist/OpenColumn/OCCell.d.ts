import OCDataHeaderCell from "./OCDataHeaderCell";
import OCRow from "./OCRow";
import OpenColumn from "./OpenColumn";
export default class OCCell<T> {
    private readonly _api;
    private readonly _headerCell;
    private readonly _row;
    private _element;
    private _cellData?;
    private _rawCellData?;
    private _defaultWidth;
    constructor(api: OpenColumn<T>, header: OCDataHeaderCell<T>, row: OCRow<T>);
    Draw(): void;
    GetData(): unknown;
    GetElement(): HTMLElement;
    GetHeader(): OCDataHeaderCell<T>;
    SetWidth(px: number): void;
    Detatch(): void;
}
