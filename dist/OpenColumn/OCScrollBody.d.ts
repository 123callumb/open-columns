import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OpenColumn from "./OpenColumn";
import OCRow from "./OCRow";
export default class OCScrollBody<T> {
    private readonly _dom;
    private readonly _api;
    private readonly _header;
    private _rows;
    constructor(api: OpenColumn<T>, dom: OCDom, header: OCDataHeader<T>);
    private RegisterEvents;
    private OnScroll;
    Scroll(x: number, y: number): void;
    private InitRows;
    RowIsDrawn(row: number | OCRow<T>): boolean;
}
