import OCDom from "./OCDom";

export default class OCScrollBody {
    private readonly _dom: OCDom;
    private _testElement: HTMLElement;

    constructor(dom: OCDom){
        this._dom = dom;

        this.Scroll = this.Scroll.bind(this);
        this.OnScroll = this.OnScroll.bind(this);
        this.RegisterEvents = this.RegisterEvents.bind(this);

        this.RegisterEvents();
    }

    private RegisterEvents() : void {
        this._dom.ScrollBody.addEventListener('wheel', this.OnScroll, {  passive: false });

        this._testElement = document.createElement('div');
        this._testElement.style.height = '50px';
        this._testElement.style.width = '200px';
        this._testElement.style.backgroundColor = 'rgb(40, 40, 40)';
        this._testElement.style.transition = 'all linear 0.1';
    
        this._dom.ScrollBody.append(this._testElement);
    }

    private OnScroll(e: WheelEvent){
        e.preventDefault();

        // console.log(`X: ${e.deltaX} Y: ${e.deltaY} Z: ${e.deltaZ}`);
        this.Scroll(e.deltaX, e.deltaY);
    }

    public Scroll(x: number, y: number){
        const scrollRect = this._dom.ScrollBody.getBoundingClientRect();
        const elRect = this._testElement.getBoundingClientRect();
        const newX = (elRect.x - scrollRect.x) + x;
        const newY = (elRect.y - scrollRect.y) + y;
        // console.log(`new X ${newX} new Y: ${newY} - debug => scrolly:${scrollRect.y} ely:${elRect.y}`);
        this._testElement.style.transform = `translate(${newX}px, ${newY}px)`;

        if(newX < 0){
            this._testElement.style.transform = `translate(0px, ${newY}px)`;
        }
    }
}