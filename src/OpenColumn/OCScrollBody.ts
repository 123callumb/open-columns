import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OpenColumn from "./OpenColumn";
import OCRow from "./OCRow";
import { OCScrollerOptions } from "./OCTypes";

export default class OCScrollBody<T>{
    private readonly _dom: OCDom;
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeader<T>;
    private readonly _options: OCScrollerOptions;
    private _rows: OCRow<T>[] = [];

    constructor(api: OpenColumn<T>, options: OCScrollerOptions, dom: OCDom, header: OCDataHeader<T>) {
        this._api = api;
        this._options = options;
        this._dom = dom;
        this._header = header;

        this.Scroll = this.Scroll.bind(this);
        this.InitRows = this.InitRows.bind(this);
        this.OnScroll = this.OnScroll.bind(this);
        this.RowIsDrawn = this.RowIsDrawn.bind(this);
        this.RegisterEvents = this.RegisterEvents.bind(this);

        this.InitRows();
        this.RegisterEvents();
    }

    private RegisterEvents(): void {
        this._dom.ScrollBody.addEventListener('wheel', this.OnScroll, { passive: false });
    }

    private OnScroll(e: WheelEvent) {
        e.preventDefault();

        this.Scroll(e.deltaX, e.deltaY);
    }

    public Scroll(dX: number, dY: number) {
        if(Math.abs(dX) <= (this._options?.sensX ?? 0))
            dX = 0;
        
        if(Math.abs(dY) <= (this._options?.sensY ?? 0))
            dY = 0;

        this._rows.forEach(f => {
            f.Translate(dX, dY)

            // check out of bounds
            if (f.OutOfView(true)) {
                f.GetElement().remove();
                // some browsers don't support index of apparently - screw  em for now :P
                const index = this._rows.indexOf(f);
                this._rows.splice(index, 1);
            }
        });
        this._header.Translate(dX);
    }

    private InitRows() { // for testing purposes 
        const testHeight = 100;
        const headerOptions = this._header.GetHeaderOptions();
        const firstRow = new OCRow<T>({ api: this._api, dom: this._dom, rowIndex: 0, headers: headerOptions });
        const firstRowElemet = firstRow.GetElement();
        this._dom.ScrollBody.append(firstRowElemet);
        this._rows.push(firstRow);

        const rowToFill = Math.floor(testHeight / firstRowElemet.clientHeight);
        for (let index = 1; index <= rowToFill; index++) {
            const prevRow = this._rows[index-1];
            const newRow = new OCRow<T>({ 
                api: this._api, 
                dom: this._dom,
                rowIndex: index, 
                headers: headerOptions, 
                prevRow: prevRow,
            });
            const newRowEl = newRow.GetElement();
            this._dom.ScrollBody.append(newRowEl);
            prevRow.SetNextRow(newRow);
            this._rows.push(newRow);
        }
    }

    public RowIsDrawn(row: number | OCRow<T>): boolean {
        const rowElement = typeof row === "object" ? row.GetElement() : this._rows.find(f => f.RowIndex === row).GetElement();
        return this._dom.ScrollBody.contains(rowElement);
    }

    public GetRow(index: number): OCRow<T> {
        return this._rows.find(f => f.RowIndex === index);
    }
}