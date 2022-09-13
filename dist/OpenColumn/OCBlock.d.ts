import OCDataHeader from "./OCDataHeader";
import OCDataSource from "./OCDataSource";
import OCDom from "./OCDom";
import OCRow from "./OCRow";
import OpenColumn from "./OpenColumn";
export default class OCBlock<T> {
    private readonly _api;
    private readonly _header;
    private readonly _dom;
    private readonly _drawIndex;
    private readonly _dataSource;
    private _rows;
    private _element;
    private _nextBlock?;
    private _prevBlock?;
    constructor(api: OpenColumn<T>, header: OCDataHeader<T>, dom: OCDom, dataSource: OCDataSource<T>, drawIndex: number, rowCount: number);
    private Draw;
    UpdateData(data: T[]): void;
    Translate(dX: number, dY: number): void;
    private SetPosition;
    GetTranslatedCoords(): {
        x: number;
        y: number;
    };
    SetNextBlock(block: OCBlock<T>): void;
    SetPrevBlock(block: OCBlock<T>): void;
    GetElement(): HTMLElement;
    Attatch(scrollBody: HTMLElement, postLoadCallback: (totalRowCount?: number) => void): void;
    Append(prevBlock: OCBlock<T>): void;
    Prepend(nextBlock: OCBlock<T>): void;
    Detatch(): void;
    GetRow(index: number): OCRow<T>;
    private GetSimulatedRect;
    GetDrawIndex(): number;
    ShuffleUp(): void;
}
