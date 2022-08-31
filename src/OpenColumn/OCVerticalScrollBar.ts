import OCDom from "./OCDom";
import OCScrollBar from "./OCScrollBar";
import OpenColumn from "./OpenColumn";

export default class OCVerticalScrollBar<T> extends OCScrollBar<T> {
    constructor(api: OpenColumn<T>, dom: OCDom){
        super(api, dom, dom.VerticalScrollBar);
    }
}