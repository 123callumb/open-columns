export default class OCDom {
    Wrapper: HTMLElement;
    Headers: HTMLElement;
    Body: HTMLElement;
    ScrollBody: HTMLElement;
    VerticalScrollBar: HTMLElement;
    HorizontalScrollBar: HTMLElement;
    private _scrollBodyOffset;
    constructor(selector: HTMLElement | string);
    IsInitialised(): HTMLElement;
    GetScrollDOMTop(): number;
}
