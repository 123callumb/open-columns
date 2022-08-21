import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OCRow from "./OCRow";
import OpenColumn from "./OpenColumn";
export default class OCRowBlock<T> {
    private readonly _api;
    private readonly _header;
    private readonly _dom;
    private readonly _drawIndex;
    private readonly _rows;
    private _element;
    private _nextBlock?;
    private _prevBlock?;
    private _startIndex?;
    constructor(api: OpenColumn<T>, header: OCDataHeader<T>, dom: OCDom, drawIndex: number, rowCount: number);
    private Draw;
    UpdateData(data: T[], startIndex: number): void;
    Translate(dX: number, dY: number): void;
    GetTranslatedCoords(): {
        x: number;
        y: number;
    };
    SetNextBlock(block: OCRowBlock<T>): void;
    SetPrevBlock(block: OCRowBlock<T>): void;
    GetElement(): HTMLElement;
    GetRow(index: number): OCRow<T>;
}
