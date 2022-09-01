import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";
export default class OCDataHeaderCell<T> {
    private readonly _api;
    private _options;
    private _element;
    constructor(api: OpenColumn<T>, options: OCDataHeaderOptions<T>);
    GetElement(): HTMLElement;
    GetHeaderOptions(): OCDataHeaderOptions<T>;
    CanRender(): true | ((data?: unknown, row?: import("./OCRow").default<T>, api?: OpenColumn<T>) => unknown);
    private Draw;
}
