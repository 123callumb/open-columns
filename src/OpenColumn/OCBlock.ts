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
        this.PostDraw = this.PostDraw.bind(this);
        this.Translate = this.Translate.bind(this);
        this.GetElement = this.GetElement.bind(this);
        this.UpdateData = this.UpdateData.bind(this);
        this.SetPosition = this.SetPosition.bind(this);
        this.SetNextBlock = this.SetNextBlock.bind(this);
        this.SetPrevBlock = this.SetPrevBlock.bind(this);
        this.GetSimulatedRect = this.GetSimulatedRect.bind(this);
        this.RippleColumnWidths = this.RippleColumnWidths.bind(this);
        this.GetTranslatedCoords = this.GetTranslatedCoords.bind(this);

        this.Draw();
    }

    private Draw() {
        if (!this._element) {
            this._element = document.createElement('table');
            const tbody = document.createElement('tbody');
            // const thead = document.createElement('thead');
            // const theadRow = document.createElement('tr');

            // thead.classList.add(OCAttribute.CLASS.ScrollBody_Block_Head);
            tbody.classList.add(OCAttribute.CLASS.ScrollBody_Block_Body);
            // theadRow.append(...this._header.GetHeaders().filter(f => f.CanRender()).map(m => document.createElement('th')));
            // thead.append(theadRow)
            tbody.append(...this._rows.map(m => m.GetElement()));

            this._element.append(tbody);
            this._element.classList.add(OCAttribute.CLASS.ScrollBody_Block);
            this.SetPosition(0, 0);
        }
    }

    public UpdateData(data: T[]) {
        // Catch this in the response classes validation - not here
        if (data.length !== this._rows.length)
            Warn("The data returned from the server was not the same length as the rows in the table, data loss or incorrect rendering will occur - operation cancelled.")

        this._rows.forEach((f, i) => f.Update(data[i]));
        this.RippleColumnWidths();
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
            .replace("px", "")
            .replace(")", "")
            .split(',');

        return {
            x: parseFloat(brokenTranslate[0]),
            y: parseFloat(brokenTranslate[1])
        }
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

    public Append(prevBlock: OCBlock<T>) {
        // Create link refs
        prevBlock.SetNextBlock(this);
        this._prevBlock = prevBlock;

        // Set pos
        const prevRect = prevBlock.GetElement().getBoundingClientRect();
        const scrollBody = this._dom.ScrollBody;
        const scrollBodyY = scrollBody.getBoundingClientRect().y;
        const currentX = this._header.GetX();
        this.SetPosition(currentX, prevRect.bottom - scrollBodyY);

        // Add to dom
        scrollBody.append(this._element);

        this.PostDraw();
    }

    public Prepend(nextBlock: OCBlock<T>) {
        // Create link
        nextBlock.SetPrevBlock(this);
        this._nextBlock = nextBlock;

        // Set position in scrollbody
        const nextRect = this._nextBlock.GetElement().getBoundingClientRect();
        const currentX = this._header.GetX();
        const scrollBody = this._dom.ScrollBody;
        const scrollBodyY = scrollBody.getBoundingClientRect().y;
        const simRect = this.GetSimulatedRect();
        this.SetPosition(currentX, nextRect.top - simRect.height - scrollBodyY);

        // Add to dom
        scrollBody.prepend(this._element);

        this.PostDraw();

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

    public PostDraw() {
        if (!this._dom.ScrollBody.contains(this._element))
            Throw("Element was not rendered, cannot call post draw function.");

        // need to resize cols before data gets there or it'll look bad
        this.RippleColumnWidths();

        // Fetch data - update data will call ripple col widths
        this._dataSource.GetData(this._drawIndex).then(this.UpdateData);
    }

    // TODO: Look at a better way of doing this in the future performance wise
    // maybe having the actual functionality in the header.
    // Hmm this wont work as intended because if a new header w is set that's bigger
    // than before then it wont push to all the other blocks.
    private RippleColumnWidths() {
        this.GetRow(0).GetCells().forEach(cell => {
            const header = cell.GetHeader();
            const headerW = header.GetDefaultWidth();
            const cellW = cell.GetElement().clientWidth;
            const newW = Math.max(cellW, headerW);

            if (newW > headerW)
                header.SetWidth(newW);

            cell.SetWidth(newW);
        });
    }
}