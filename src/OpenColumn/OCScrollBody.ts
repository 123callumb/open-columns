import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OpenColumn from "./OpenColumn";
import OCRow from "./OCRow";
import OCBlock from './OCBlock';
import { OCScrollerOptions } from "./OCTypes";
import OCDataSource from "./OCDataSource";

export default class OCScrollBody<T>{
    private readonly _dom: OCDom;
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeader<T>;
    private readonly _options: OCScrollerOptions;
    private readonly _dataSource: OCDataSource<T>;
    private _bound?: number;
    private _dyLimit: number;
    private _blocks: OCBlock<T>[] = [];
    private _blockSize: number = 100;
    private _scrollLocked: boolean = true;
    private _blockLimit?: number;

    constructor(api: OpenColumn<T>, options: OCScrollerOptions, dom: OCDom, header: OCDataHeader<T>, dataSource: OCDataSource<T>) {
        this._api = api;
        this._options = options;
        this._dom = dom;
        this._header = header;
        this._dataSource = dataSource;

        this.Init = this.Init.bind(this);
        this.Scroll = this.Scroll.bind(this);
        this.GetRow = this.GetRow.bind(this);
        this.OnScroll = this.OnScroll.bind(this);
        this.LockScroll = this.LockScroll.bind(this);
        this.UnlockScroll = this.UnlockScroll.bind(this);
        this.RegisterEvents = this.RegisterEvents.bind(this);

        this.Init();
        this.RegisterEvents();
    }

    private RegisterEvents(): void {
        this._dom.ScrollBody.addEventListener('wheel', this.OnScroll, { passive: false });
    }

    private OnScroll(e: WheelEvent) {
        e.preventDefault();

        this.Scroll(e.deltaX, e.deltaY * -1); // invert scroll here if user wants that
    }

    public LockScroll() {
        this._scrollLocked = true;
    }

    public UnlockScroll() {
        this._scrollLocked = false;
    }

    public IsLocked() {
        return this._scrollLocked;
    }

    public Scroll(dX: number, dY: number) {
        if (this._scrollLocked)
            return;

        const absDX = Math.abs(dX);
        const absDY = Math.abs(dY);

        if (absDX <= (this._options?.sensX ?? 0))
            dX = 0;

        if (absDY <= (this._options?.sensY ?? 0))
            dY = 0;

        // Sorta scroll lock to make it feel more blocky
        // should allow disabling of this 
        if (absDX > absDY)
            dY = 0;
        else
            dX = 0;

        // Hard limits here for scrollbody - TODO: should change to a nice smooth bounce animation
        // if you try to scrol out of bounds to make it feel more responsive, obviously can disable
        // in options.
        const currentX = this._header.GetX();
        const diff = currentX + dX;
        if (diff < 0)
            dX -= diff;

        // might be faster to store this top one as a reference even if it is removed from the array 
        const topBlock = this._blocks.find(f => f.GetDrawIndex() === 0);
        if (topBlock) {
            const coords = topBlock.GetTranslatedCoords();
            const diff = coords.y + dY;

            if (diff > 0)
                dY -= diff;
        }

        const bottomBlock = this._blocks.find(f => f.GetDrawIndex() === this._blockLimit)
        if(bottomBlock){
            const blockHeight = bottomBlock.GetHeight();
            const bottomY = bottomBlock.GetTranslatedCoords().y + blockHeight;
            const scrollBodyHeight = this._dom.ScrollBody.getBoundingClientRect().height;
            const diff = (bottomY + dY);

            if(diff < scrollBodyHeight){
                dY += scrollBodyHeight - diff;
            }
        }

        // may as well return early if both have been adjusted to a 0 delta
        if (dX === 0 && dY === 0)
            return;

        this._header.Translate(dX);
        this._blocks.forEach(block => {
            // Move row based on scroll
            block.Translate(dX, dY);
        });

        if (dY === 0)
            return;

        if (Math.abs(dY) > this._dyLimit)
            dY = dY < 0 ? -this._dyLimit : this._dyLimit;

        this.UpdateBody(dY);
    }

    private Init() {
        // Set bounds
        // TODO: Set these bounds based on the average row/block height
        // so that users can base it around blocks
        const scrollBodyRect = this._dom.ScrollBody.getBoundingClientRect();
        const scrollHeight = scrollBodyRect.height;

        // Draw initial block
        const block = new OCBlock<T>(this._api, this._header, this._dom, this._dataSource, 0, this._blockSize);
        block.Attatch(this._dom.ScrollBody, (totalRowCount: number) => {
            this.UnlockScroll();
            this._blockLimit = (totalRowCount - (totalRowCount % this._blockSize)) / this._blockSize;
        });
        this._blocks.push(block);

        // at setting bounds to 2 x scrollbody height above and below
        // TODO: in future take which ever number is greater, scrollbody height or 
        // block height
        this._bound = block.GetElement().clientHeight + scrollHeight;
        this._dyLimit = Math.ceil(scrollBodyRect.height);
    }

    public GetRow(blockIndex: number, index: number): OCRow<T> {
        return this._blocks[blockIndex].GetRow(index);
    }

    // Append/prepend and remove blocks based on scroll direction
    // Get current block position that is in the middle of the exisitng blocks
    // Just thinking, can possibly speed this up if you take into account the scroll amount and the size of each block 
    // and check to calculate if we should do an out of pos check 
    // not sure tho
    private UpdateBody(dY: number) {
        const isScrollingDown = dY < 0;
        const upperBlockIndex = 0;
        const lowerBlockIndex = this._blocks.length - 1;
        const upperBlock = this._blocks[upperBlockIndex];
        const lowerBlock = this._blocks[lowerBlockIndex];
        const upperBlockPos = upperBlock.GetTranslatedCoords();
        const lowerBlockPos = lowerBlock.GetTranslatedCoords();
        let modified = false;

        // TODO: Add render limits, no need to render before draw index 0 etc
        if (isScrollingDown) // scroll down
        {
            if (upperBlockPos.y < (-this._bound)) {
                this._blocks.splice(upperBlockIndex, 1);
                upperBlock.Detatch();
                modified = true;
            }

            const newBlockIndex = lowerBlock.GetDrawIndex() + 1;
            if (newBlockIndex <= this._blockLimit && lowerBlockPos.y < this._bound) {
                const newBlock = new OCBlock<T>(this._api, this._header, this._dom, this._dataSource, newBlockIndex, this._blockSize);
                lowerBlock.SetNextBlock(newBlock);
                newBlock.Append(lowerBlock);
                this._blocks.push(newBlock);
                modified = true;
            }
        }
        else // scroll up
        {
            if (lowerBlockPos.y > this._bound) {
                this._blocks.splice(lowerBlockIndex, 1);
                lowerBlock.Detatch();
                modified = true;
            }

            const newBlockIndex = upperBlock.GetDrawIndex() - 1;
            if (newBlockIndex >= 0 && upperBlockPos.y > (-this._bound)) {
                const newBlock = new OCBlock<T>(this._api, this._header, this._dom, this._dataSource, newBlockIndex, this._blockSize);
                newBlock.Prepend(upperBlock);
                upperBlock.SetPrevBlock(newBlock);
                this._blocks.unshift(newBlock);
                modified = true;
            }
        }

        // If the body is modified then check again for further changes
        if (modified)
            this.UpdateBody(dY);
    }
}