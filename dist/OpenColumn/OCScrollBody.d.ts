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
    private _blocks;
    constructor(api: OpenColumn<T>, options: OCScrollerOptions, dom: OCDom, header: OCDataHeader<T>);
    private RegisterEvents;
    private OnScroll;
    Scroll(dX: number, dY: number): void;
    private Init;
    GetRow(blockIndex: number, index: number): OCRow<T>;
}
