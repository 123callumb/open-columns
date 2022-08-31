import { OpenColumnOptions } from './OCTypes';
import OCRow from './OCRow';
export default class OpenColumn<T = unknown> {
    private readonly _options;
    private _dom;
    private _scrollBody;
    private _header;
    private _horizontalScrollBar;
    private _verticalScrollBar;
    constructor(options: OpenColumnOptions<T>);
    private Init;
    GetRow(blockIndex: number, index: number): OCRow<T>;
}
