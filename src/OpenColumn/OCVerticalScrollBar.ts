import OCScrollBar from "./OCScrollBar";
import OCScrollBody from "./OCScrollBody";
import OpenColumn from "./OpenColumn";

export default class OCVerticalScrollBar<T> extends OCScrollBar<T> {
    private _avgRowHeight: number;
    private _totalRowCount: number;
    
    constructor(api: OpenColumn<T>, scrollBody: OCScrollBody<T>, container: HTMLElement, totalRowCount: number, avgRowHeight: number) {
        super(api, scrollBody, container);
        
        this._totalRowCount = totalRowCount;
        this._avgRowHeight = avgRowHeight;
    }
    
    public SetAverageRowHeight(average: number) {
        this._avgRowHeight = average
    }
    
    protected override PreBarMove(newPos: number, delta: number){
        const scrollStatus = this._scrollBody.Scroll(0, -delta);
        return scrollStatus;
    };
}