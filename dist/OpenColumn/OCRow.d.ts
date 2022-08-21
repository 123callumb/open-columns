import { OCRowOptions, OCRowPositionState } from "./OCTypes";
export default class OCRow<T> {
    private readonly _api;
    private readonly _header;
    private _element;
    private _prevRow?;
    private _nextRow?;
    private _cells;
    private _data?;
    constructor(options: OCRowOptions<T>);
    GetElement(): HTMLElement;
    private Draw;
    Update(data: T): void;
    GetData(): T;
    GetPositionState(offset?: number): OCRowPositionState;
    SetNextRow(row: OCRow<T>): void;
    SetPrevRow(row: OCRow<T>): void;
}
