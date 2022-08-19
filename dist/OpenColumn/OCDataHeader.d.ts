import OCDataHeaderCell from "./OCDataHeaderCell";
import OCDom from "./OCDom";
import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";
export default class OCDataHeader<T> {
    private readonly _api;
    private readonly _headerOptions;
    private readonly _dom;
    private _headerCells;
    constructor(api: OpenColumn<T>, dom: OCDom, options: string[] | OCDataHeaderOptions<T>[]);
    private CreateHeaders;
    GetHeaders(): OCDataHeaderCell<T>[];
    GetHeaderOptions(): OCDataHeaderOptions<T>[];
    private Draw;
    GetTranslatedX(): number;
    Translate(dX: number): void;
}
