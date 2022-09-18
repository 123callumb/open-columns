import OCDataHeader from "./OCDataHeader";
import OCScrollBar from "./OCScrollBar";
import OCScrollBody from "./OCScrollBody";
import OpenColumn from "./OpenColumn";

export default class OCHorizontalScrollBar<T> extends OCScrollBar<T> {
    private readonly _header: OCDataHeader<T>;
    
    constructor(api: OpenColumn<T>, scrollBody: OCScrollBody<T>, container: HTMLElement, header: OCDataHeader<T>){
        super(api, scrollBody, container);
        
        this._header = header;
    }

    protected PreBarMove(newPos: number, delta: number): boolean {
        const scrollStatus = this._scrollBody.Scroll(-delta, 0);
        return scrollStatus;
    }
}