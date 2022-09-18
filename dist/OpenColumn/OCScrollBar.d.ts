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
    private _isVertical;
    private _isDragging;
    protected abstract PreBarMove(newPos: number, delta: number): boolean;
    constructor(api: OpenColumn<T>, scrollBody: OCScrollBody<T>, domContainer: HTMLElement);
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
