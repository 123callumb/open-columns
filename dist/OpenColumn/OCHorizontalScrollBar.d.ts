import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OCScrollBar from "./OCScrollBar";
import OpenColumn from "./OpenColumn";
export default class OCHorizontalScrollBar<T> extends OCScrollBar<T> {
    private readonly _header;
    constructor(api: OpenColumn<T>, dom: OCDom, header: OCDataHeader<T>);
}
