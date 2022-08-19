import { Throw } from "../util/HelperFunctions";
import OCAttribute from './OCAttribute';

export default class OCDom {
    public Wrapper: HTMLElement;
    public Headers: HTMLElement;
    public ScrollBody: HTMLElement;

    private _scrollBodyOffset: number;

    constructor(selector: HTMLElement | string){
        this.Wrapper = typeof(selector) === "object" ? selector : document.querySelector(selector);

        if(!this.Wrapper)
            Throw("Could not initialise dom as the selector was not found.");

        this.Headers = document.createElement('div');
        this.ScrollBody = document.createElement('div');

        this.Wrapper.classList.add(OCAttribute.CLASS.Wrapper_Container)
        this.Headers.classList.add(OCAttribute.CLASS.Headers_Contaier);
        this.ScrollBody.classList.add(OCAttribute.CLASS.ScrollBody_Container);

        this.Wrapper.append(this.Headers, this.ScrollBody);

        this._scrollBodyOffset = this.ScrollBody.getBoundingClientRect().y;
    }

    public IsInitialised(){
        return this.Wrapper && this.Headers && this.ScrollBody;
    }

    public GetScrollDOMTop(){
        return this._scrollBodyOffset;
    
    }
}