import { Throw, Warn } from "../util/HelperFunctions";
import OCAttribute from "./OCAttribute";
import OCDataHeader from "./OCDataHeader";
import OCDataSource from "./OCDataSource";
import OCDom from "./OCDom";
import OCRow from "./OCRow";
import OpenColumn from "./OpenColumn";

export default class OCBlock<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeader<T>;
    private readonly _dom: OCDom;
    private readonly _drawIndex: number;
    private readonly _dataSource: OCDataSource<T>;
    private _rows: OCRow<T>[];

    private _element: HTMLElement;
    private _nextBlock?: OCBlock<T>;
    private _prevBlock?: OCBlock<T>;
    private _width?: number;
    private _height?: number;

    constructor(api: OpenColumn<T>, header: OCDataHeader<T>, dom: OCDom, dataSource: OCDataSource<T>, drawIndex: number, rowCount: number) {
        this._api = api;
        this._header = header;
        this._dom = dom;
        this._drawIndex = drawIndex;
        this._dataSource = dataSource;
        this._rows = Array(rowCount).fill(null).map((m, i) => new OCRow<T>({
            index: i,
            blockIndex: drawIndex,
            api: this._api,
            dom: this._dom,
            header: this._header
        }));

        this.Draw = this.Draw.bind(this);
        this.Append = this.Append.bind(this);
        this.Prepend = this.Prepend.bind(this);
        this.GetWidth = this.GetWidth.bind(this);
        this.GetHeight = this.GetHeight.bind(this);
        this.UpdateRect = this.UpdateRect.bind(this);
        this.Translate = this.Translate.bind(this);
        this.GetElement = this.GetElement.bind(this);
        this.UpdateData = this.UpdateData.bind(this);
        this.SetPosition = this.SetPosition.bind(this);
        this.SetNextBlock = this.SetNextBlock.bind(this);
        this.SetPrevBlock = this.SetPrevBlock.bind(this);
        this.GetSimulatedRect = this.GetSimulatedRect.bind(this);
        this.GetTranslatedCoords = this.GetTranslatedCoords.bind(this);

        this.Draw();
    }

    private Draw() {
        if (!this._element) {
            this._element = document.createElement('div');
            this._element.append(...this._rows.map(m => m.GetElement()));
            this._element.classList.add(OCAttribute.CLASS.ScrollBody_Block);
            this.SetPosition(0, 0);
        }
    }

    public UpdateData(data: T[]) {
        // Catch this in the response classes validation - not here
        if (data.length > this._rows.length)
            Throw(`Too many rows of data puhed into the block, there are ${this._rows.length} rows. ${data.length} is too many.`)

        this._rows.splice(data.length - 1, this._rows.length - data.length).forEach(row => row.Detatch());
        this._rows.forEach((f, i) => f.Update(data[i], i));

        // Update dom vals
        this.UpdateRect();
    }

    public Translate(dX: number, dY: number) {
        const currentPos = this.GetTranslatedCoords();
        const newX = currentPos.x + dX;
        const newY = currentPos.y + dY;
        this.SetPosition(newX, newY);
    }

    private SetPosition(x: number, y: number) {
        this._element.style.transform = `translate(${x}px, ${y}px)`;
    }

    public GetTranslatedCoords(): { x: number, y: number } {
        // Using replace to see if it is faster than new WebKitCSSMatrix(style.transform);
        const brokenTranslate = this._element.style.transform
            .replace("translate(", "")
            .replaceAll("px", "")
            .replace(")", "")
            .split(',');

        return {
            x: parseFloat(brokenTranslate[0]),
            y: parseFloat(brokenTranslate[1])
        }
    }

    public GetHeight() : number {
        return this._height;
    }

    public GetWidth() : number {
        return this._width;
    }

    public SetNextBlock(block: OCBlock<T>) {
        this._nextBlock = block;
    }

    public SetPrevBlock(block: OCBlock<T>) {
        this._prevBlock = block;
    }

    public GetElement() {
        return this._element;
    }

    public Attatch(scrollBody: HTMLElement, postLoadCallback: (totalRowCount?: number) => void){
        if(scrollBody.childElementCount)
            Throw("Can only use Attatch() to add a block to an empty scroll body.");
        
        scrollBody.append(this._element);

        this._dataSource.GetData(this._drawIndex).then((res) => {
            this.UpdateData(res.data);
            postLoadCallback(res.totalRowCount);
        });
    }

    public Append(prevBlock: OCBlock<T>) {
        // Create link refs
        prevBlock.SetNextBlock(this);
        this._prevBlock = prevBlock;

        // Set pos
        const prevBlockHeight = prevBlock.GetElement().getBoundingClientRect().height;
        const prevBlockPos = prevBlock.GetTranslatedCoords();
        const currentX = this._header.GetX();
        this.SetPosition(currentX, prevBlockHeight + prevBlockPos.y);

        // Add to dom
        this._dom.ScrollBody.append(this._element);
        this.UpdateRect();

        // Fetch data - i think we can get away without shuffling
        this._dataSource.GetData(this._drawIndex).then((res) => this.UpdateData(res.data));
    }

    public Prepend(nextBlock: OCBlock<T>) {
        // Create link
        nextBlock.SetPrevBlock(this);
        this._nextBlock = nextBlock;

        // Set position in scrollbody
        const nextBlockPos = this._nextBlock.GetTranslatedCoords();
        const currentX = this._header.GetX();
        const simRect = this.GetSimulatedRect();
        this.SetPosition(currentX, nextBlockPos.y - simRect.height);

        // Add to dom
        this._dom.ScrollBody.prepend(this._element);
        this.UpdateRect();

        // Fetch data - shuffle upwards 
        this._dataSource.GetData(this._drawIndex).then((res) => {
            this.UpdateData(res.data);
            this.ShuffleUp();
        });
    }

    public Detatch() {
        this._rows.forEach(f => f.Detatch());
        delete this._rows;
        this._element.remove();
    }

    public GetRow(index: number): OCRow<T> {
        return this._rows[index];
    }

    private GetSimulatedRect(): DOMRect {
        const simBlock = this._element.cloneNode(true) as HTMLTableElement;
        simBlock.style.opacity = "0 !important"; // hopefully no crazy person overrides the class on the block
        this._dom.ScrollBody.append(simBlock);
        const rect = simBlock.getBoundingClientRect();
        this._dom.ScrollBody.removeChild(simBlock);
        return rect;
    }

    public GetDrawIndex(): number {
        return this._drawIndex;
    }

    // This gets the blocks position in the table and makes sure it is not overlapping
    // Call a shuffle when you know block size has been modified
    public ShuffleUp() {
        if (!this._nextBlock)
            Throw("Cannot shuffle up as there is no block below the current block.");

        const nextBlockPos = this._nextBlock.GetTranslatedCoords();
        const blockHeight = this._element.getBoundingClientRect().height;
        this.SetPosition(nextBlockPos.x, nextBlockPos.y - blockHeight);

        if (this._prevBlock)
            this._prevBlock.ShuffleUp();
    }

    private UpdateRect(){
        const currentRect = this._element.getBoundingClientRect();
        this._width = currentRect.width;
        this._height = currentRect.height;
    }
}