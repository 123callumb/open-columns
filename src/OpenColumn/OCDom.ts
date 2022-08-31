import { Throw } from "../util/HelperFunctions";
import OCAttribute from './OCAttribute';

export default class OCDom {
    public Wrapper: HTMLElement;
    public Headers: HTMLElement;
    public Body: HTMLElement;
    public ScrollBody: HTMLElement;
    public VerticalScrollBar: HTMLElement;
    public HorizontalScrollBar: HTMLElement;
    private _scrollBodyOffset: number;

    constructor(selector: HTMLElement | string) {
        this.Wrapper = typeof (selector) === "object" ? selector : document.querySelector(selector);

        if (!this.Wrapper)
            Throw("Could not initialise dom as the selector was not found.");

        this.Body = document.createElement('div');
        this.Headers = document.createElement('div');
        this.ScrollBody = document.createElement('div');
        this.VerticalScrollBar = document.createElement('div');
        this.HorizontalScrollBar = document.createElement('div');

        this.Wrapper.classList.add(OCAttribute.CLASS.Wrapper_Container);
        this.Body.classList.add(OCAttribute.CLASS.Body);
        this.Headers.classList.add(OCAttribute.CLASS.Headers_Contaier);
        this.ScrollBody.classList.add(OCAttribute.CLASS.ScrollBody_Container);
        this.VerticalScrollBar.classList.add(OCAttribute.CLASS.ScrollBar_Vertical_Container);
        this.HorizontalScrollBar.classList.add(OCAttribute.CLASS.ScrollBar_Horizontal_Container);

        this.Body.append(this.ScrollBody, this.VerticalScrollBar);
        this.Wrapper.append(this.Headers, this.Body, this.HorizontalScrollBar);

        this._scrollBodyOffset = this.ScrollBody.getBoundingClientRect().y;
    }

    public IsInitialised() {
        return this.Wrapper && this.Headers && this.ScrollBody;
    }

    public GetScrollDOMTop() {
        return this._scrollBodyOffset;
    }
}