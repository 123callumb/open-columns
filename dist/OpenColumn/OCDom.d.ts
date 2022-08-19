export default class OCDom {
    Wrapper: HTMLElement;
    Headers: HTMLElement;
    ScrollBody: HTMLElement;
    private _scrollBodyOffset;
    constructor(selector: HTMLElement | string);
    IsInitialised(): HTMLElement;
    GetScrollDOMTop(): number;
}
