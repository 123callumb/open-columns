import OCAttribute from "./OCAttribute";
import { OCDataHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCDataHeaderCell<T> {
    private readonly _api: OpenColumn<T>;
    private _options: OCDataHeaderOptions<T>;
    private _element: HTMLElement;
    private _defaultWidth: number;

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

    public GetHeaderOptions(): OCDataHeaderOptions<T> {
        return this._options;
    }

    public CanRender(){
        return this._options.propertyName !== null || this._options.preCellRender;
    }

    private Draw() {
        if (!this._element) {
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

    public SetWidth(px: number){
        this._element.style.width = `${px}px`;
    }

    public Append(row: HTMLElement){
        row.append(this._element);
        this.PostAttatch();
    }

    private PostAttatch(){
        this._defaultWidth = this._element.getBoundingClientRect().width;
        this._element.style.width = `${this._defaultWidth}px`;
    }

    public GetDefaultWidth(){
        return this._defaultWidth;
    }
}