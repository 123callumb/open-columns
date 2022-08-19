import { OCRowOptions } from "./OCTypes";
export default class OCRow<T> {
    private readonly _api;
    private readonly _headers;
    private _element;
    private _prevRow?;
    private _nextRow?;
    private _cells;
    private _data?;
    readonly RowIndex: number;
    constructor(options: OCRowOptions<T>);
    GetElement(): HTMLElement;
    private Draw;
    Update(data: T): void;
    GetData(): T;
    GetTranslatedCoords(): {
        x: number;
        y: number;
    };
    Translate(dX: number, dY: number): void;
    OutOfView(withinOffset?: boolean): boolean;
    SetNextRow(row: OCRow<T>): void;
    SetPrevRow(row: OCRow<T>): void;
}
