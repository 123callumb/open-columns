import OCDom from "./OCDom";
import OCScrollBar from "./OCScrollBar";
import OpenColumn from "./OpenColumn";
export default class OCVerticalScrollBar<T> extends OCScrollBar<T> {
    private _avgRowHeight;
    private _totalRowCount;
    constructor(api: OpenColumn<T>, dom: OCDom, totalRowCount: number, avgRowHeight: number);
    SetAverageRowHeight(average: number): void;
}
