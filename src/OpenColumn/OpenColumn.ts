import { OpenColumnOptions } from './OCTypes';
import OCDom from './OCDom';
import OCScrollBody from './OCScrollBody';
import OCDataHeader from './OCDataHeader';
import { Throw, OnDomReady } from '../util/HelperFunctions';

export default class OpenColumn<T = unknown> {
    private readonly _options: OpenColumnOptions<T>;
    private _dom: OCDom;
    private _scrollBody: OCScrollBody<T>;
    private _header: OCDataHeader<T>;

    constructor(options: OpenColumnOptions<T>) {
        this._options = options;

        this.Init = this.Init.bind(this);

        OnDomReady(this.Init);
    }

    private Init() {
        if (!this._options)
            Throw("Cannot initialise without a configured set of options.");

        this._dom = new OCDom(this._options.selector);
        this._header = new OCDataHeader<T>(this, this._dom, this._options.headers);
        this._scrollBody = new OCScrollBody(this, this._dom, this._header);
    }
}