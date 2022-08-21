import { Throw } from "../util/HelperFunctions";
import OCAttribute from "./OCAttribute";
import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OCRow from "./OCRow";
import OpenColumn from "./OpenColumn";

export default class OCRowBlock<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeader<T>;
    private readonly _dom: OCDom;
    private readonly _drawIndex: number;
    private readonly _rows: OCRow<T>[];

    private _element: HTMLElement;
    private _nextBlock?: OCRowBlock<T>;
    private _prevBlock?: OCRowBlock<T>;
    private _startIndex?: number;

    constructor(api: OpenColumn<T>, header: OCDataHeader<T>, dom: OCDom, drawIndex: number, rowCount: number) {
        this._api = api;
        this._header = header;
        this._dom = dom;
        this._drawIndex = drawIndex;
        this._rows = Array(rowCount).fill(null).map((m, i) => new OCRow<T>({
            index: i,
            blockIndex: drawIndex,
            api: this._api,
            dom: this._dom,
            header: this._header
        }));

        this.Draw = this.Draw.bind(this);
        this.Translate = this.Translate.bind(this);
        this.GetElement = this.GetElement.bind(this);
        this.UpdateData = this.UpdateData.bind(this);
        this.SetNextBlock = this.SetNextBlock.bind(this);
        this.SetPrevBlock = this.SetPrevBlock.bind(this);
        this.GetTranslatedCoords = this.GetTranslatedCoords.bind(this);

        this.Draw();
    }

    private Draw() {
        if (!this._element) {
            this._element = document.createElement('table');
            const tbody = document.createElement('tbody');
            // TODO: At some point, to improve the api, add prev and next rows here
            tbody.append(...this._rows.map(m => m.GetElement()));
            this._element.append(tbody);
            this._element.classList.add(OCAttribute.CLASS.ScrollBody_Block)
            this._element.style.transform = `translate(${0}px, ${0}px)`;
        }
    }

    public UpdateData(data: T[], startIndex: number) {
        // Catch this in the response classes validation - not here
        if (data.length !== this._rows.length)
            Throw("The data returned from the server was not the same length as the rows in the table, data loss or incorrect rendering will occur - operation cancelled.")

        this._startIndex = startIndex;
        this._rows.forEach((f, i) => f.Update(data[i]));
    }

    public Translate(dX: number, dY: number) {
        console.log("yeah we hit translate method")
        const currentPos = this.GetTranslatedCoords();
        const newX = currentPos.x + dX;
        const newY = currentPos.y + dY;
        this._element.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    public GetTranslatedCoords(): { x: number, y: number } {
        // Using replace to see if it is faster than new WebKitCSSMatrix(style.transform);
        const brokenTranslate = this._element.style.transform
            .replace("translate(", "")
            .replace("px", "")
            .replace(")", "")
            .split(',');

        return {
            x: parseFloat(brokenTranslate[0]),
            y: parseFloat(brokenTranslate[1])
        }
    }

    public SetNextBlock(block: OCRowBlock<T>) {
        this._nextBlock = block;
    }

    public SetPrevBlock(block: OCRowBlock<T>) {
        this._prevBlock = block;
    }

    public GetElement(){
        return this._element;
    }

    public GetRow(index: number): OCRow<T> {
        return this._rows[index];
    }
}