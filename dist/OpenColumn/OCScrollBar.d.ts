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
    private _isVertical;
    private _isDragging;
    constructor(api: OpenColumn<T>, dom: OCDom, domContainer: HTMLElement);
    private Init;
    private RegisterEvents;
    private OnMouseDown;
    private OnMouseUp;
    private OnMouseMove;
    protected TranslateBar(delta: number): void;
    protected GetTranslatedBarCoords(): {
        x: number;
        y: number;
    };
}
