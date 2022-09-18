import OCScrollBar from "./OCScrollBar";
import OCScrollBody from "./OCScrollBody";
import OpenColumn from "./OpenColumn";
export default class OCVerticalScrollBar<T> extends OCScrollBar<T> {
    private _avgRowHeight;
    private _totalRowCount;
    constructor(api: OpenColumn<T>, scrollBody: OCScrollBody<T>, container: HTMLElement, totalRowCount: number, avgRowHeight: number);
    SetAverageRowHeight(average: number): void;
    protected PreBarMove(newPos: number, delta: number): boolean;
}
