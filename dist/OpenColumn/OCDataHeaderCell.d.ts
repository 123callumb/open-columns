import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";
export default class OCDataHeaderCell<T> {
    private readonly _api;
    private _options;
    private _element;
    private _defaultWidth;
    constructor(api: OpenColumn<T>, options: OCDataHeaderOptions<T>);
    GetElement(): HTMLElement;
    GetHeaderOptions(): OCDataHeaderOptions<T>;
    CanRender(): true | ((data?: unknown, row?: import("./OCRow").default<T>, api?: OpenColumn<T>) => unknown);
    private Draw;
    SetWidth(px: number): void;
    Append(row: HTMLElement): void;
    private PostAttatch;
    GetDefaultWidth(): number;
}
