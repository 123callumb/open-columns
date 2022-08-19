import OCDataHeaderCell from "./OCDataHeaderCell";
import OCDom from "./OCDom";
import { OCDataHeaderOptions, OCHeaderOptions } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCDataHeader<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _headerOptions: OCDataHeaderOptions<T>[];
    private readonly _dom: OCDom;
    private _headerCells: OCDataHeaderCell<T>[];

    constructor(api: OpenColumn<T>, dom: OCDom, options: string[] | OCDataHeaderOptions<T>[]){
        this._dom = dom;
        this._api = api;
        this._headerOptions = this.CreateHeaders(options);

        this.Draw = this.Draw.bind(this);
        this.GetHeaders = this.GetHeaders.bind(this);

        this.Draw();
    }

    private CreateHeaders(headerOptions: string[] | OCDataHeaderOptions<T>[]) : OCDataHeaderOptions<T>[] {
        if(typeof headerOptions[0] === "object") 
            return <OCDataHeaderOptions<T>[]>headerOptions;

        return headerOptions.map(m => ({
            propertyName: m,
            displayName: m
        }));
    }

    public GetHeaders() : OCDataHeaderCell<T>[] {
        return this._headerCells;
    }

    public GetHeaderOptions(){
        return this._headerOptions;
    }

    private Draw(){
        // Create cells
        this._headerCells = this._headerOptions.map(m => new OCDataHeaderCell<T>(this._api, m));

        // Append
        this._dom.Headers.append(...this._headerCells.map(m => m.GetElement()));

        // Style
        this._dom.Headers.style.transform = `translate(${0}px)`;
    }

    public GetTranslatedX(): number {
        // using replace to see if it is faster than new WebKitCSSMatrix(style.transform).m41;
        const brokenTranslate = this._dom.Headers.style.transform
            .replace("translate(", "")
            .replace("px", "")
            .replace(")", "");

        return  parseFloat(brokenTranslate);
    }

    public Translate(dX: number) : void {
        const newX = this.GetTranslatedX() + dX;
        this._dom.Headers.style.transform = `translate(${newX}px)`;
    }
}