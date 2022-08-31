import OCDom from "./OCDom";
import OCScrollBar from "./OCScrollBar";
import OpenColumn from "./OpenColumn";
export default class OCHorizontalScrollBar<T> extends OCScrollBar<T> {
    constructor(api: OpenColumn<T>, dom: OCDom);
}
