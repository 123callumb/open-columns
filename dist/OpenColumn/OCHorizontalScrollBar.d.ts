import OCDataHeader from "./OCDataHeader";
import OCScrollBar from "./OCScrollBar";
import OCScrollBody from "./OCScrollBody";
import OpenColumn from "./OpenColumn";
export default class OCHorizontalScrollBar<T> extends OCScrollBar<T> {
    private readonly _header;
    constructor(api: OpenColumn<T>, scrollBody: OCScrollBody<T>, container: HTMLElement, header: OCDataHeader<T>);
    protected PreBarMove(newPos: number, delta: number): boolean;
}
