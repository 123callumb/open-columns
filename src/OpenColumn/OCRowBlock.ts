import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OCRow from "./OCRow";
import OpenColumn from "./OpenColumn";

export default class OCRowBlock<T> {
    private readonly _api: OpenColumn<T>;
    private readonly _header: OCDataHeader<T>;
    private readonly _dom: OCDom;
    private _element: HTMLElement;
    private _rows: OCRow<T>[] = [];
    private _nextBlock?: OCRowBlock<T>;
    private _prevBlock?: OCRowBlock<T>;

    constructor(){

    }

    private Draw(){
        if(!this._element){
            this._element = document.createElement('table');
            const tbody = document.createElement('tbody');
            
        }
    }

    public SetData(){

    }

    public 

}