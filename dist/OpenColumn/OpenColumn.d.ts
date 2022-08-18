import { OpenColumnOptions } from './OCTypes';
export default class OpenColumn<T = unknown> {
    private readonly _options;
    private _dom;
    private _scrollBody;
    private _header;
    constructor(options: OpenColumnOptions<T>);
    private Init;
}
