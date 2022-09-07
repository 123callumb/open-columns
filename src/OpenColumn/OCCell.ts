import OCAttribute from "./OCAttribute";
import OCDataHeaderCell from "./OCDataHeaderCell";
import OCRow from "./OCRow";
import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCCell<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _headerCell: OCDataHeaderCell<T>;
    private readonly _row: OCRow<T>;
    private _element: HTMLElement;
    private _cellData?: unknown;
    private _rawCellData?: unknown;
    private _defaultWidth: number;

    constructor(api: OpenColumn<T>, header: OCDataHeaderCell<T>, row: OCRow<T>) {
        this._headerCell = header;
        this._row = row;
        this._api = api;

        this.Draw = this.Draw.bind(this);
        this.GetData = this.GetData.bind(this);
        this.GetElement = this.GetElement.bind(this);

        this.Draw();
    }

    public Draw() {
        if (!this._element){
            this._element = document.createElement('div');
            this._element.classList.add(OCAttribute.CLASS.ScrollBody_Cell);
        }
        
        const rowData = this._row.GetData();
        const headerOptions = this._headerCell.GetHeaderOptions()
        this._rawCellData = (rowData && headerOptions.propertyName) ? (rowData as any)[headerOptions.propertyName] : null;
        this._cellData = this._rawCellData;

        if (headerOptions.preCellRender)
            this._cellData = headerOptions.preCellRender(this._rawCellData, this._row, this._api);

        this._element.style.width = `${this._headerCell.GetDefaultWidth()}px`;
        this._element.innerHTML = "";
        this._element.textContent = `${this._cellData}`;
    }

    public GetData(){
        return this._cellData;
    }

    public GetElement() {
        return this._element;
    }

    public GetHeader(){
        return this._headerCell;
    }

    public SetWidth(px: number){
        this._element.style.width = `${px}px`;
    }

    public Detatch(){
        this._element.remove();
    }
}