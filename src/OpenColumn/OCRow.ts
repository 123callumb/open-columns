import OCAttribute from "./OCAttribute";
import OCCell from "./OCCell";
import { OCDataHeaderOptions, OCRowOptions, OCRowPositionState } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCRow<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _headers: OCDataHeaderOptions<T>[];
    private _element: HTMLElement;
    private _prevRow?: OCRow<T>;
    private _nextRow?: OCRow<T>;
    private _cells: OCCell<T>[];
    private _data?: T;

    constructor(options: OCRowOptions<T>) {
        this._api = options.api;
        this._data = options.data;
        this._headers = options.headers;
        this._cells = [];
        
        this._nextRow = options.nextRow;
        this._prevRow = options.prevRow;

        this.Draw = this.Draw.bind(this);
        this.Update = this.Update.bind(this);
        this.GetData = this.GetData.bind(this);
        this.GetElement = this.GetElement.bind(this);
        this.SetNextRow = this.SetNextRow.bind(this);
        this.SetPrevRow = this.SetPrevRow.bind(this);

        this.Draw(true);
    }

    public GetElement(): HTMLElement {
        return this._element;
    }

    private Draw(refresh: boolean = false) {
        if (!this._element) {
            this._element = document.createElement('div');
            this._element.classList.add(OCAttribute.CLASS.ScrollBody_Row);

            const rowOffset = this._prevRow ? this._prevRow.GetElement().getBoundingClientRect().bottom : 0;

            // ugh for drawing above the dom we need to know the height the row is going to be before it is even rendered, this is going to be annoying.
            // may have to create an invisuble dom somewhere or even inside the scroll body for getting the height 
            // most likely needs to stay inside the dom incase someone alters the height of the rows through css
            //const scrollBodyOffset = this._element.parentElement.getBoundingClientRect().top;
            this._element.style.transform = `translate(0px, ${rowOffset - 58.5}px)`; // Try not to  add any other transform properties or will have to use WebkitCssMatrix class
            this._element.style.transition = 'all linear 0.1';
        }

        if (refresh) {
            this._cells = [];
            this._element.innerHTML = "";

            this._headers.filter(f => f.propertyName !== null || f.preCellRender).forEach(header => {
                const cell = new OCCell<T>(this._api, header, this._data);
                const cellElement = cell.GetElement();
                this._element.append(cellElement);

                if (header.postCellRender)
                    header.postCellRender(cellElement, cell.GetData(), this._data, this._api);

                this._cells.push(cell);
            });
        } else {
            if (this._cells.length === 0)
                return;

            this._cells.forEach(f => {
                f.Update(this._data);
            });
        }
    }

    public Update(data: T) {
        this._data = data;

        this.Draw();
    }

    public GetData() {
        return this._data;
    }

    public GetTranslatedCoords(): { x: number, y: number } {
        // using replace to see if it is faster than new WebKitCSSMatrix(style.transform);
        const brokenTranslate = this._element.style.transform
            .replace("translate(", "")
            .replace("px", "")
            .replace(")", "")
            .split(',');
        return { x: parseFloat(brokenTranslate[0]), y: parseFloat(brokenTranslate[1]) }
    }

    public Translate(dX: number, dY: number) : void {
        const currentPos = this.GetTranslatedCoords();
        const newX = currentPos.x + dX;
        const newY = currentPos.y + dY;
        this._element.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    public GetPositionState(offset: number = 0): OCRowPositionState {
        if(!this._element)
            return OCRowPositionState.Removed;

        const boundingRect = this._element.getBoundingClientRect();
        const parentRect = this._element.parentElement.getBoundingClientRect();

        if((boundingRect.bottom + offset) < parentRect.top)
            return OCRowPositionState.Above;

        if((boundingRect.top + offset) > parentRect.bottom)
            return OCRowPositionState.Below;
            
        return OCRowPositionState.Visible;
    }

    public SetNextRow(row: OCRow<T>) : void {
        this._nextRow = row;
    }

    public SetPrevRow(row: OCRow<T>) : void {
        this._prevRow = row;
    }
}