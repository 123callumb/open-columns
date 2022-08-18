import OCAttribute from "./OCAttribute";
import OCCell from "./OCCell";
import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCRow<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _headers: OCDataHeaderOptions<T>[];
    private _element: HTMLElement;
    private _cells: OCCell<T>[];
    private _data?: T;

    public readonly RowIndex: number;

    constructor(api: OpenColumn<T>, rowIndex: number, headers: OCDataHeaderOptions<T>[], data?: T) {
        this._api = api;
        this._data = data;
        this._headers = headers;
        this.RowIndex = rowIndex;
        this._cells = [];

        this.GetElement = this.GetElement.bind(this);
        this.Draw = this.Draw.bind(this);
        this.Update = this.Update.bind(this);
        this.GetData = this.GetData.bind(this);

        this.Draw(true);
    }

    public GetElement(): HTMLElement {
        return this._element;
    }

    private Draw(refresh: boolean = false) {
        if (!this._element){
            this._element = document.createElement('div');
            this._element.classList.add(OCAttribute.CLASS.ScrollBody_Row);
        }

        if (refresh) {
            this._cells = [];
            this._element.innerHTML = "";

            this._headers.filter(f => f.propertyName !== null || f.preCellRender).forEach(header => {
                const cell = new OCCell<T>(this._api, header, this._data);
                const cellElement = cell.GetElement();
                this._element.append(cellElement);

                if (header.postCellRender)
                    header.postCellRender(cellElement, cell.GetData(), this._data, this._api);

                this._cells.push(cell);
            });
        } else {
            if (this._cells.length === 0)
                return;

            this._cells.forEach(f => {
                f.Update(this._data);
            });
        }
    }

    public Update(data: T) {
        this._data = data;

        this.Draw();
    }

    public GetData() {
        return this._data;
    }
}