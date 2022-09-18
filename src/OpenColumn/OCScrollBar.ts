import { Throw } from '../util/HelperFunctions';
import OCAttribute from './OCAttribute';
import OCDom from './OCDom';
import OpenColumn from './OpenColumn';

export default class OCScrollBar<T> {
    protected readonly _api: OpenColumn<T>;
    protected readonly _dom: OCDom;
    protected _container: HTMLElement;
    protected _barContainer: HTMLElement;
    protected _barElement: HTMLElement;
    protected _buttonStart: HTMLElement;
    protected _buttonEnd: HTMLElement;
    protected _cellHeight: number;
    private _isVertical: boolean;

    constructor(api: OpenColumn<T>, dom: OCDom, domContainer: HTMLElement) {
        this._api = api;
        this._dom = dom;
        this._container = domContainer;

        this.Init = this.Init.bind(this);
        this.TranslateBar = this.TranslateBar.bind(this);
        this.GetTranslatedBarCoords = this.GetTranslatedBarCoords.bind(this);

        this.Init();
    }

    private Init() {
        if (!this._container)
            Throw("Cannot create scrollbar as the container is not initialised.");

        this._barContainer = document.createElement('div');
        this._barElement = document.createElement('div');
        this._buttonStart = document.createElement('div');
        this._buttonEnd = document.createElement('div');

        this._barElement.style.transform = `translate(${0}px, ${0}px)`;

        this._container.classList.add(OCAttribute.CLASS.ScrollBar);
        this._barContainer.classList.add(OCAttribute.CLASS.ScrollBar_Container);
        this._barElement.classList.add(OCAttribute.CLASS.ScrollBar_Bar);
        this._buttonStart.classList.add(OCAttribute.CLASS.ScrollBar_ButtonStart);
        this._buttonEnd.classList.add(OCAttribute.CLASS.ScrollBar_ButtonEnd);

        this._barContainer.append(this._barElement);
        this._container.append(this._buttonStart, this._barContainer, this._buttonEnd);

        const barStyle = window.getComputedStyle(this._container);
        this._isVertical = barStyle.flexDirection.includes("column") || barStyle.direction.includes("column");
    }

    protected TranslateBar(delta: number) {
        const pos = this.GetTranslatedBarCoords();
        let newPos = this._isVertical ? pos.x + delta : pos.y + delta;
        const contRect = this._barContainer.getBoundingClientRect();
        const maxBound = this._isVertical ? contRect.height : contRect.width;
        
        // if(newPos <= 0)
        //     newPos = 0;
        
        // if(newPos >= maxBound)
        //     newPos = maxBound;

        this._barElement.style.transform = this._isVertical ? `translate(0px, ${newPos}px)` : `translate(${newPos}px, 0px)`;
    }

    protected GetTranslatedBarCoords(): { x: number, y: number } {
        // TODO: maybe move to a shared method...used elsewhere :)
        // Using replace to see if it is faster than new WebKitCSSMatrix(style.transform);
        const brokenTranslate = this._barElement.style.transform
            .replace("translate(", "")
            .replaceAll("px", "")
            .replace(")", "")
            .split(',');

        return {
            x: parseFloat(brokenTranslate[0]),
            y: parseFloat(brokenTranslate[1])
        }
    }
}