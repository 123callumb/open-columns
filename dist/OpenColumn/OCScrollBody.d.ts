import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OpenColumn from "./OpenColumn";
import OCRow from "./OCRow";
import { OCScrollerOptions } from "./OCTypes";
export default class OCScrollBody<T> {
    private readonly _dom;
    private readonly _api;
    private readonly _header;
    private readonly _options;
    private _rows;
    constructor(api: OpenColumn<T>, options: OCScrollerOptions, dom: OCDom, header: OCDataHeader<T>);
    private RegisterEvents;
    private OnScroll;
    Scroll(dX: number, dY: number): void;
    private InitRows;
    RowIsDrawn(row: number | OCRow<T>): boolean;
    GetRow(index: number): OCRow<T>;
}
