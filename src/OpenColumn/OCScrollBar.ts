import { Throw } from '../util/HelperFunctions';
import OCAttribute from './OCAttribute';
import OCDom from './OCDom';
import OCScrollBody from './OCScrollBody';
import OpenColumn from './OpenColumn';

export default abstract class OCScrollBar<T> {
    protected readonly _api: OpenColumn<T>;
    protected readonly _scrollBody: OCScrollBody<T>;
    protected _container: HTMLElement;
    protected _barContainer: HTMLElement;
    protected _barElement: HTMLElement;
    protected _buttonStart: HTMLElement;
    protected _buttonEnd: HTMLElement;
    protected _cellHeight: number;
    private _isVertical: boolean;
    private _isDragging: boolean = false;
    protected abstract PreBarMove(newPos: number, delta: number): boolean;

    constructor(api: OpenColumn<T>, scrollBody: OCScrollBody<T>, domContainer: HTMLElement) {
        this._api = api;
        this._scrollBody = scrollBody;
        this._container = domContainer;

        this.Init = this.Init.bind(this);
        this.OnMouseUp = this.OnMouseUp.bind(this);
        this.OnMouseMove = this.OnMouseMove.bind(this);
        this.OnMouseDown = this.OnMouseDown.bind(this);
        this.TranslateBar = this.TranslateBar.bind(this);
        this.RegisterEvents = this.RegisterEvents.bind(this);
        this.GetTranslatedBarCoords = this.GetTranslatedBarCoords.bind(this);
        
        this.Init();
        this.RegisterEvents();
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

    private RegisterEvents() {
        this._barElement.addEventListener('mousedown', this.OnMouseDown);
        window.addEventListener('mouseup', this.OnMouseUp);
        window.addEventListener('mousemove', this.OnMouseMove);
    }

    private OnMouseDown(e: MouseEvent) {
        this._isDragging = true;
    }

    private OnMouseUp(e: MouseEvent) {
        if (!this._isDragging)
            return;

        this._isDragging = false;
    }

    private OnMouseMove(e: MouseEvent) {
        if (!this._isDragging)
            return;

        const mouseDelta = this._isVertical ? e.movementY : e.movementX;
        this.TranslateBar(mouseDelta);
    }

    protected TranslateBar(delta: number) {
        const pos = this.GetTranslatedBarCoords();
        let newPos = this._isVertical ? pos.y + delta : pos.x + delta;
        const contRect = this._barContainer.getBoundingClientRect();
        const barRect = this._barElement.getBoundingClientRect();
        const maxBound = this._isVertical ? contRect.height - barRect.height : contRect.width - barRect.width;

        if(newPos <= 0)
            newPos = 0;

        if(newPos >= maxBound)
            newPos = maxBound;

        if(this.PreBarMove && !this.PreBarMove(newPos, delta))
            return;

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