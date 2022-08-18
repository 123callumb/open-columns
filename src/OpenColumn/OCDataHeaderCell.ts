import OCAttribute from "./OCAttribute";
import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCDataHeaderCell<T> {
    private readonly _api: OpenColumn<T>;
    private _options: OCDataHeaderOptions<T>;
    private _element: HTMLElement;

    constructor(api: OpenColumn<T>, options: OCDataHeaderOptions<T>) {
        this._api = api;
        this._options = options;

        this.Draw = this.Draw.bind(this);
        this.GetElement = this.GetElement.bind(this);

        this.Draw();
    }

    public GetElement(): HTMLElement {
        return this._element;
    }

    private Draw() {
        if (!this._element){
            this._element = document.createElement('div');
            this._element.classList.add(OCAttribute.CLASS.Header_Cell);
        }

        this._element.innerHTML = "";

        if (this._options.render) {
            const customRender = this._options.render(this._api);

            if (typeof customRender === "string")
                this._element.innerHTML = customRender;
            else
                this._element.append(customRender);

            return;
        }

        this._element.textContent = this._options.displayName;
    }
}