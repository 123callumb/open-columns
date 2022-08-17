import { OpenColumnOptions } from './OCTypes';
import OCDom from './OCDom';
import OCScrollBody from './OCScrollBody';
import { Throw, OnDomReady } from '../util/HelperFunctions';

export default class OpenColumn<T = unknown> {
    private readonly _options: OpenColumnOptions<T>;
    private _dom: OCDom;
    private _scrollBody: OCScrollBody;

    constructor(options: OpenColumnOptions<T>) {
        this._options = options;

        this.Init = this.Init.bind(this);

        OnDomReady(this.Init);
    }

    private Init() {
        if (!this._options)
            Throw("Cannot initialise without a configured set of options.");

        this._dom = new OCDom(this._options.selector);
        this._scrollBody = new OCScrollBody(this._dom);
    }
}