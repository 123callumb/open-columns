import OCDom from "./OCDom";
import OCScrollBar from "./OCScrollBar";
import OpenColumn from "./OpenColumn";

export default class OCVerticalScrollBar<T> extends OCScrollBar<T> {
    private _avgRowHeight: number;
    private _totalRowCount: number;

    constructor(api: OpenColumn<T>, dom: OCDom, totalRowCount: number, avgRowHeight: number){
        super(api, dom, dom.VerticalScrollBar);

        this._totalRowCount = totalRowCount;
        this._avgRowHeight = avgRowHeight;
    }

    public SetAverageRowHeight(average: number){
        this._avgRowHeight = average
    }
}