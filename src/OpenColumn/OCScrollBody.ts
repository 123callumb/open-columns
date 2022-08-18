import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OpenColumn from "./OpenColumn";
import OCRow from "./OCRow";

export default class OCScrollBody<T>{
    private readonly _dom: OCDom;
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeader<T>;
    private _rows: OCRow<T>[] = [];

    constructor(api: OpenColumn<T>, dom: OCDom, header: OCDataHeader<T>) {
        this._api = api;
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
        //this._testElement.style.transition = 'all linear 0.1';
    }

    private OnScroll(e: WheelEvent) {
        e.preventDefault();

        this.Scroll(e.deltaX, e.deltaY);
    }

    public Scroll(x: number, y: number) {
        if (!this._rows[0])
            return;

        const firstRowTest = this._rows[0].GetElement();
        const scrollRect = this._dom.ScrollBody.getBoundingClientRect();
        const elRect = firstRowTest.getBoundingClientRect();
        const newX = (elRect.x - scrollRect.x) + x;
        const newY = (elRect.y - scrollRect.y) + y;
        // console.log(`new X ${newX} new Y: ${newY} - debug => scrolly:${scrollRect.y} ely:${elRect.y}`);
        firstRowTest.style.transform = `translate(${newX}px, ${newY}px)`;

        if (newX < 0) {
            firstRowTest.style.transform = `translate(0px, ${newY}px)`;
        }
    }

    private InitRows() { // for testing purposes 
        const headerOptions = this._header.GetHeaderOptions();
        const firstRow = new OCRow<T>(this._api, 0, headerOptions);

        this._dom.ScrollBody.append(firstRow.GetElement());
        this._rows.push(firstRow);
    }

    public RowIsDrawn(row: number | OCRow<T>): boolean {
        const rowElement = typeof row === "object" ? row.GetElement() : this._rows.find(f => f.RowIndex === row).GetElement();
        return this._dom.ScrollBody.contains(rowElement);
    }
}