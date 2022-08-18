import OCAttribute from "./OCAttribute";
import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCCell<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeaderOptions<T>;
    private _element: HTMLElement;
    private _rowData?: T;

    constructor(api: OpenColumn<T>, header: OCDataHeaderOptions<T>, rowData?: T) {
        this._header = header;
        this._rowData = rowData;
        this._api = api;

        this.Draw = this.Draw.bind(this);
        this.Update = this.Update.bind(this);
        this.GetData = this.GetData.bind(this);
        this.GetElement = this.GetElement.bind(this);

        this.Draw();
    }

    private Draw() {
        if (!this._element){
            this._element = document.createElement('div');
            this._element.classList.add(OCAttribute.CLASS.ScrollBody_Cell);
        }

        this._element.innerHTML = "";
        this._element.textContent = `${this.GetData()}`;
    }

    public Update(newRowData?: T) {
        if (newRowData)
            this._rowData = newRowData;

        this.Draw();
    }

    public GetData(){
        // TODO: fix this dumb linitng error that wont let me null coalesce
        let cellDataToRender: unknown = this._rowData != null ? (this._rowData as any)[this._header.propertyName] : null;
        if (this._header.preCellRender)
            cellDataToRender = this._header.preCellRender(cellDataToRender, this._rowData, this._api);

        return cellDataToRender;
    }

    public GetElement() {
        return this._element;
    }
}