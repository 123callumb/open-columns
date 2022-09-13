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

    constructor(api: OpenColumn<T>, dom: OCDom, domContainer: HTMLElement) {
        this._api = api;
        this._dom = dom;
        this._container = domContainer;

        this.Init();
    }

    private Init() {
        if(!this._container)
            Throw("Cannot create scrollbar as the container is not initialised.");

        this._barContainer = document.createElement('div');
        this._barElement = document.createElement('div');
        this._buttonStart = document.createElement('div');
        this._buttonEnd = document.createElement('div');

        this._container.classList.add(OCAttribute.CLASS.ScrollBar);
        this._barContainer.classList.add(OCAttribute.CLASS.ScrollBar_Container);
        this._barElement.classList.add(OCAttribute.CLASS.ScrollBar_Bar);
        this._buttonStart.classList.add(OCAttribute.CLASS.ScrollBar_ButtonStart);
        this._buttonEnd.classList.add(OCAttribute.CLASS.ScrollBar_ButtonEnd);

        this._barContainer.append(this._barElement);
        this._container.append(this._buttonStart, this._barContainer, this._buttonEnd);
    }

    protected Translate(dX: number, dY: number) {
        const pos = this.GetTranslatedBarCoords();
        this._barElement.style.transform = `translate(${pos.x + dX}px, ${pos.y + dY})`;
    }

    protected GetTranslatedBarCoords(): { x: number, y: number } {
        // TODO: maybe move to a shared method...used elsewhere :)
        // Using replace to see if it is faster than new WebKitCSSMatrix(style.transform);
        const brokenTranslate = this._container.style.transform
            .replace("translate(", "")
            .replace("px", "")
            .replace(")", "")
            .split(',');

        return {
            x: parseFloat(brokenTranslate[0]),
            y: parseFloat(brokenTranslate[1])
        }
    }
}