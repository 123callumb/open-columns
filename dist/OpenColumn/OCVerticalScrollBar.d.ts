import OCDom from "./OCDom";
import OCScrollBar from "./OCScrollBar";
import OpenColumn from "./OpenColumn";
export default class OCVerticalScrollBar<T> extends OCScrollBar<T> {
    private _avgRowHeight;
    private _totalRowCount;
    private _isDragging;
    constructor(api: OpenColumn<T>, dom: OCDom, totalRowCount: number, avgRowHeight: number);
    private RegisterEvents;
    private OnMouseDown;
    private OnMouseUp;
    private OnMouseMove;
    SetAverageRowHeight(average: number): void;
}
