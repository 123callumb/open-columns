import OCDataHeaderCell from "./OCDataHeaderCell";
import { OCDataHeaderOptions, OCHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCDataHeader<T> {
    private readonly _api: OpenColumn;
    private readonly _headerOptions: OCDataHeaderOptions<T>[];
    private _headerCells: OCDataHeaderCell<T>[];
    private _element: HTMLElement;

    constructor(api: OpenColumn, options: OCDataHeaderOptions<T>[]){

        this.GetElement
    }

    public GetElement(): HTMLElement {
        return this._element;
    }

    private Draw(){
        this._element.innerHTML = "";
        this._headerCells.forEach(f => {
            const headerCell = document.createElement('div');

        })
    }
}