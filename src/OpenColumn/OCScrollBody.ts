import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OpenColumn from "./OpenColumn";
import OCRow from "./OCRow";
import OCRowBlock from './OCRowBlock';
import { OCPositionState, OCScrollerOptions } from "./OCTypes";

export default class OCScrollBody<T>{
    private readonly _dom: OCDom;
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeader<T>;
    private readonly _options: OCScrollerOptions;
    private _blocks: OCRowBlock<T>[] = [];

    constructor(api: OpenColumn<T>, options: OCScrollerOptions, dom: OCDom, header: OCDataHeader<T>) {
        this._api = api;
        this._options = options;
        this._dom = dom;
        this._header = header;

        this.Init = this.Init.bind(this);
        this.Scroll = this.Scroll.bind(this);
        this.GetRow = this.GetRow.bind(this);
        this.OnScroll = this.OnScroll.bind(this);
        this.RegisterEvents = this.RegisterEvents.bind(this);

        this.Init();
        this.RegisterEvents();
    }

    private RegisterEvents(): void {
        this._dom.ScrollBody.addEventListener('wheel', this.OnScroll, { passive: false });
    }

    private OnScroll(e: WheelEvent) {
        e.preventDefault();

        this.Scroll(e.deltaX, e.deltaY);
    }

    public Scroll(dX: number, dY: number) {
        // TODO: ATM scroling is inverted, didn't realise because empty data and mac trackpad is inverted by default lol
        // - should be easy fix just need to make sure that the maths further below plays along fine with it.
        // okay no its harder to invert the scrollY, maybe not, im just not thinking about the maths rn 
        if (Math.abs(dX) <= (this._options?.sensX ?? 0))
            dX = 0;

        if (Math.abs(dY) <= (this._options?.sensY ?? 0))
            dY = 0;

        // Hard limits here for scrollbody - TODO: should change to a nice smooth bounce animation
        // if you try to scrol out of bounds to make it feel more responsive, obviously can disable
        // in options.
        const currentX = this._header.GetX();
        const diff = currentX + dX;
        if (diff < 0)
            dX -= diff;

        // might be faster to store this top one as a reference even if it is removed from the array 
        const topBlock = this._blocks.find(s => s.GetDrawIndex() === 0);
        if (topBlock && this._dom.ScrollBody.contains(topBlock.GetElement())){
            const coords = topBlock.GetTranslatedCoords();
            const diff = coords.y + dY;
            if(diff > 0)
                dY -= diff;
        }

        // may as well return early if both have been adjusted to a 0 delta
        if(dX === 0 && dY === 0)
            return;

        this._header.Translate(dX);
        this._blocks.forEach(f => {
            // Move row based on scroll
            f.Translate(dX, dY)

            // Get current block position
            // Just thinkking, can possibly speed this up if you take into account the scroll amount and the size of each block 
            // and check to calculate if we should do an out of pos check 
            // not sure tho
            const blockPos = f.GetPositionState();
            if(blockPos === OCPositionState.Above){

            }else if(blockPos === OCPositionState.Below){

            }
        });
    }

    private Init() {
        // just prefilling with a random number of blocks for testing
        Array(6).fill(null).forEach((f, i) => {
            const block = new OCRowBlock<T>(this._api, this._header, this._dom, i, 10);

            if (i === 0)
                this._dom.ScrollBody.append(block.GetElement());
            else
                block.Append(this._blocks[i - 1]);

            this._blocks.push(block);
        })
    }

    public GetRow(blockIndex: number, index: number): OCRow<T> {
        return this._blocks[blockIndex].GetRow(index);
    }
}