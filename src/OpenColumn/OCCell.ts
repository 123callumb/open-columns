import OCAttribute from "./OCAttribute";
import OCRow from "./OCRow";
import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCCell<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeaderOptions<T>;
    private readonly _row: OCRow<T>;
    private _element: HTMLElement;
    private _cellData?: unknown;
    private _rawCellData?: unknown;

    constructor(api: OpenColumn<T>, header: OCDataHeaderOptions<T>, row: OCRow<T>) {
        this._header = header;
        this._row = row;
        this._api = api;

        this.Draw = this.Draw.bind(this);
        this.GetData = this.GetData.bind(this);
        this.GetElement = this.GetElement.bind(this);

        this.Draw();
    }

    public Draw() {
        if (!this._element){
            this._element = document.createElement('td');
            this._element.classList.add(OCAttribute.CLASS.ScrollBody_Cell);
        }
        
        const rowData = this._row.GetData();
        this._rawCellData = (rowData && this._header.propertyName) ? (rowData as any)[this._header.propertyName] : null;
        this._cellData = this._rawCellData;

        if (this._header.preCellRender)
            this._cellData = this._header.preCellRender(this._rawCellData, this._row, this._api);

        this._element.innerHTML = "";
        this._element.textContent = `${this._cellData}`;
    }

    public GetData(){
        return this._cellData;
    }

    public GetElement() {
        return this._element;
    }
}