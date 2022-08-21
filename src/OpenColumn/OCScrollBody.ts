import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OpenColumn from "./OpenColumn";
import OCRow from "./OCRow";
import { OCRowOptions, OCRowPositionState, OCScrollerOptions } from "./OCTypes";

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
        if (Math.abs(dX) <= (this._options?.sensX ?? 0))
            dX = 0;

        if (Math.abs(dY) <= (this._options?.sensY ?? 0))
            dY = 0;

        // Hard limits here for scrollbody - TODO: should change to a nice smooth bounce animation
        // if you try to scrol out of bounds to make it feel more responsive, obviously can disable
        // in options.
        const currentX = this._header.GetTranslatedX();
        if((currentX + dX) < 0)
            dX = 0;
        
        this._header.Translate(dX);
        this._rows.forEach(f => {
            // Move row based on scroll
            f.Translate(dX, dY)

            // Validate each rows position
            const rowPosState = f.GetPositionState();
            if (rowPosState === OCRowPositionState.Visible || rowPosState === OCRowPositionState.Removed)
                return;

            // If code reaches here row must be above or below scroller body
            // so it needs to be removed
            f.GetElement().remove();
            const index = this._rows.indexOf(f);
            this._rows.splice(index, 1);

            const newRowOpts: OCRowOptions<T> = {
                api: this._api,
                dom: this._dom,
                header: this._header
            };

            // Append next row below
            if (rowPosState === OCRowPositionState.Above) {
                const prevRow = this._rows[this._rows.length - 1];
                const newRow = new OCRow<T>({ ...newRowOpts, prevRow });

                this._dom.ScrollBody.append(newRow.GetElement());
                prevRow.SetNextRow(newRow);
                this._rows.push(newRow);
            }

            // Append next row above
            if (rowPosState === OCRowPositionState.Below) {
                const nextRow = this._rows[0];
                const newRow = new OCRow({ ...newRowOpts, nextRow });

                this._dom.ScrollBody.prepend(newRow.GetElement());
                nextRow.SetPrevRow(newRow);
                this._rows.unshift(newRow);
            }

        });
    }

    private InitRows() { // for testing purposes 
        const firstRow = new OCRow<T>({ api: this._api, dom: this._dom, header: this._header });
        const firstRowElemet = firstRow.GetElement();
        this._dom.ScrollBody.append(firstRowElemet);
        this._rows.push(firstRow);

        const rowToFill = Math.floor((this._dom.ScrollBody.getBoundingClientRect().height + 200) / firstRowElemet.clientHeight);
        for (let index = 1; index <= rowToFill; index++) {
            const prevRow = this._rows[index - 1];
            const newRow = new OCRow<T>({
                api: this._api,
                dom: this._dom,
                header: this._header,
                prevRow: prevRow,
            });
            const newRowEl = newRow.GetElement();
            this._dom.ScrollBody.append(newRowEl);
            prevRow.SetNextRow(newRow);
            this._rows.push(newRow);
        }
    }

    public RowIsDrawn(row: number | OCRow<T>): boolean {
        const rowElement = typeof row === "object" ? row.GetElement() : this._rows[row].GetElement();
        return this._dom.ScrollBody.contains(rowElement);
    }

    public GetRow(index: number): OCRow<T> {
        return this._rows[index];
    }
}