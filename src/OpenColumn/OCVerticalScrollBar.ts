import OCDom from "./OCDom";
import OCScrollBar from "./OCScrollBar";
import OpenColumn from "./OpenColumn";

export default class OCVerticalScrollBar<T> extends OCScrollBar<T> {
    private _avgRowHeight: number;
    private _totalRowCount: number;
    private _isDragging: boolean;

    constructor(api: OpenColumn<T>, dom: OCDom, totalRowCount: number, avgRowHeight: number) {
        super(api, dom, dom.VerticalScrollBar);

        this._totalRowCount = totalRowCount;
        this._avgRowHeight = avgRowHeight;

        this.OnMouseUp = this.OnMouseUp.bind(this);
        this.OnMouseMove = this.OnMouseMove.bind(this);
        this.OnMouseDown = this.OnMouseDown.bind(this);
        this.RegisterEvents = this.RegisterEvents.bind(this);

        this.RegisterEvents();
    }

    private RegisterEvents() {
        this._barElement.addEventListener('mousedown', this.OnMouseDown);
        window.addEventListener('mouseup', this.OnMouseUp);
        window.addEventListener('mousemove', this.OnMouseMove);
    }

    private OnMouseDown(e: MouseEvent) {
        this._isDragging = true;
    }

    private OnMouseUp(e: MouseEvent) {
        if (!this._isDragging)
            return;

        this._isDragging = false;
    }

    private OnMouseMove(e: MouseEvent) {
        if (!this._isDragging)
            return;

        this.TranslateBar(0, e.movementY);
    }

    public SetAverageRowHeight(average: number) {
        this._avgRowHeight = average
    }
}