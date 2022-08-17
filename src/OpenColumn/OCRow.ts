import OCCell from "./OCCell";
import { OCDataHeader } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCRow<T> {
    private readonly _api: OpenColumn;
    private readonly _headers: OCDataHeader<T>[];
    private _element: HTMLElement;
    private _cells: OCCell<T>[];
    private _data?: T;

    constructor(api: OpenColumn, headers: OCDataHeader<T>[], data?: T) {
        this._api = api;
        this._data = data;
        this._headers = headers;
        this._cells = [];
    }

    public GetElement(): HTMLElement {
        return this._element;
    }

    public Draw() {
        if (!this._element)
            this._element = document.createElement('div');

        this._element.innerHTML = "";

        this._headers.filter(f => f.propertyName !== null || f.preCellRender).forEach(header => {
            const cell = new OCCell<T>(this._api, header, this._data);

            if (header.postCellRender)
                header.postCellRender(cell.GetElement(), cell.GetData(), this._data, this._api);

            this._cells.push(cell);
        });
    }

    public UpdateData(data: T) {
        this._data = data;

        this.Draw();
    }

    public GetData() {
        return this._data;
    }
}