import { Throw } from "../util/HelperFunctions";
import OCAttribute from "./OCAttribute";
import OCCell from "./OCCell";
import OCDataHeader from "./OCDataHeader";
import { OCRowOptions, OCRowPositionState } from "./OCTypes";
import OpenColumn from "./OpenColumn";

export default class OCRow<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeader<T>;
    private _element: HTMLElement;
    private _prevRow?: OCRow<T>;
    private _nextRow?: OCRow<T>;
    private _cells: OCCell<T>[];
    private _data?: T;

    constructor(options: OCRowOptions<T>) {
        this._api = options.api;
        this._data = options.data;
        this._header = options.header;
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
            this._element = document.createElement('tr');
            this._element.classList.add(OCAttribute.CLASS.ScrollBody_Row);
        }

        if (refresh) {
            this._cells = [];
            this._element.innerHTML = "";

            // Maybe do this filtering as an option on for the GetHeaderOptions method
            this._header.GetHeaderOptions().filter(f => f.propertyName !== null || f.preCellRender).forEach(header => {
                const cell = new OCCell<T>(this._api, header, this._data);
                const cellElement = cell.GetElement();
                this._element.append(cellElement);

                if (header.postCellRender) // hmmm maybe this should be moved to the end idk what people would use this for 
                    header.postCellRender(cellElement, cell.GetData(), this._data, this._api);

                this._cells.push(cell);
            });
        } else {
            if (this._cells.length === 0)
                return;

            this._cells.forEach(f => f.Update(this._data));
        }
    }

    public Update(data: T) {
        this._data = data;

        this.Draw();
    }

    public GetData() {
        return this._data;
    }

    public GetPositionState(offset: number = 0): OCRowPositionState {
        if (!this._element)
            return OCRowPositionState.Removed;

        const boundingRect = this._element.getBoundingClientRect();
        const parentRect = this._element.parentElement.getBoundingClientRect();

        if ((boundingRect.bottom + offset) < parentRect.top)
            return OCRowPositionState.Above;

        if ((boundingRect.top - offset) > parentRect.bottom)
            return OCRowPositionState.Below;

        return OCRowPositionState.Visible;
    }

    public SetNextRow(row: OCRow<T>): void {
        this._nextRow = row;
    }

    public SetPrevRow(row: OCRow<T>): void {
        this._prevRow = row;
    }

    // private SetDrawPosition(): void {
    //     if (this._prevRow && this._nextRow)
    //         Throw("Cannot draw row between previous and next row just yet! Will require a dom reshuffle!");

    //     let rowTop = 0;

    //     // If exisitng row above or below then get position of row and see where it needs to be inserted
    //     if (this._prevRow) {
    //         rowTop = this._prevRow.GetElement().getBoundingClientRect().bottom;
    //     } else if (this._nextRow) {
    //         // get row height by appending a hidden duplicate to scrollbody
    //         const scrollbody = this._nextRow.GetElement().parentElement;
    //         const simulatedRow = this.GetElement().cloneNode(true) as HTMLElement;
    //         simulatedRow.style.opacity = '0';
    //         scrollbody.append(simulatedRow);
    //         const simulatedRect = simulatedRow.getBoundingClientRect();
    //         rowTop = this._nextRow.GetElement().getBoundingClientRect().top - simulatedRect.height;
    //         simulatedRow.remove();
    //     }
    //     const headerX = this._header.GetTranslatedX();
    //     this._element.style.transform = `translate(${headerX}px, ${rowTop - 58.5}px)`; // Try not to  add any other transform properties or will have to use WebkitCssMatrix class
    //     this._element.style.transition = 'all linear 0.1';
    // }
}