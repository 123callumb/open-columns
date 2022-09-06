import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OpenColumn from "./OpenColumn";
import OCRow from "./OCRow";
import { OCScrollerOptions } from "./OCTypes";
import OCDataSource from "./OCDataSource";
export default class OCScrollBody<T> {
    private readonly _dom;
    private readonly _api;
    private readonly _header;
    private readonly _options;
    private readonly _dataSource;
    private _bound?;
    private _dyLimit;
    private _blocks;
    private _blockSize;
    constructor(api: OpenColumn<T>, options: OCScrollerOptions, dom: OCDom, header: OCDataHeader<T>, dataSource: OCDataSource<T>);
    private RegisterEvents;
    private OnScroll;
    Scroll(dX: number, dY: number): void;
    private Init;
    GetRow(blockIndex: number, index: number): OCRow<T>;
    private UpdateBody;
}
