import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCDataHeaderCell<T> {
    private readonly _api: OpenColumn;
    private _options: OCDataHeaderOptions<T>;
    private _element: HTMLElement;

    constructor(api: OpenColumn, options: OCDataHeaderOptions<T>) {
        this._api = api;
        this._options = options;

        this.Draw = this.Draw.bind(this);
        this.GetElement = this.GetElement.bind(this);
    }

    public GetElement(): HTMLElement {
        return this._element;
    }

    private Draw() {
        if (!this._element)
            this._element = document.createElement('div');
        
        //if(this._options.render)
    }
}