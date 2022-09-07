import { OpenColumnOptions } from './OCTypes';
import OCDom from './OCDom';
import OCScrollBody from './OCScrollBody';
import OCDataHeader from './OCDataHeader';
import OCHorizontalScrollBar from './OCHorizontalScrollBar';
import OCVerticalScrollBar from './OCVerticalScrollBar';
import { Throw, OnDomReady } from '../util/HelperFunctions';
import OCRow from './OCRow';
import OCDataSource from './OCDataSource';

export default class OpenColumn<T = unknown> {
    private readonly _options: OpenColumnOptions<T>;
    private _dom: OCDom;
    private _scrollBody: OCScrollBody<T>;
    private _header: OCDataHeader<T>;
    private _horizontalScrollBar: OCHorizontalScrollBar<T>;
    private _verticalScrollBar: OCVerticalScrollBar<T>;
    private _dataSource: OCDataSource<T>;

    constructor(options: OpenColumnOptions<T>) {
        this._options = options;

        this.Init = this.Init.bind(this);

        OnDomReady(this.Init);
    }

    private Init() {
        if (!this._options)
            Throw("Cannot initialise without a configured set of options.");

        this._dom = new OCDom(this._options.selector);
        this._header = new OCDataHeader(this, this._dom, this._options.headers);
        this._dataSource = new OCDataSource<T>(this, this._options.dataSource, 100, this._scrollBody);
        this._scrollBody = new OCScrollBody(this, this._options.scroller, this._dom, this._header, this._dataSource);
        this._horizontalScrollBar = new OCHorizontalScrollBar(this, this._dom);
        this._verticalScrollBar = new OCVerticalScrollBar(this, this._dom);
    }

    public GetRow(blockIndex: number, index: number): OCRow<T> {
        if (!this._scrollBody)
            Throw("Scrollbody is not initialised. Cannot access rows.");

        return this._scrollBody.GetRow(blockIndex, index);
    }
}