import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OCRow from "./OCRow";
import OpenColumn from "./OpenColumn";
export interface OpenColumnOptions<T> {
    selector: string | HTMLElement;
    headers?: string[] | OCDataHeaderOptions<T>[];
    parentHeaders?: string[] | OCHeaderOptions<T>[];
    data?: OCDataOptions<T>;
    deferInitialRequest?: boolean;
    scroller?: OCScrollerOptions;
}
export interface OCHeaderOptions<T> {
    displayName: string;
    sticky?: boolean;
    canOrderBy?: boolean;
    canReorder?: boolean;
    render?: (api?: OpenColumn<T>) => HTMLElement | string;
}
export interface OCDataHeaderOptions<T> extends OCHeaderOptions<T> {
    propertyName?: keyof T;
    preCellRender?: (data?: unknown, row?: OCRow<T>, api?: OpenColumn<T>) => unknown;
    postCellRender?: (cell: HTMLElement, data?: unknown, rowData?: T, api?: OpenColumn<T>) => void;
}
export interface OCDataOptions<T, Request = OCDataRequest, Response = OCDataResponse<T>> {
    url?: string;
    method?: 'GET' | 'POST';
    headers?: string[];
    overrideRequest?: (api?: OpenColumn) => Response | Promise<Response>;
    preRequest?: (request: Request, api?: OpenColumn) => Request;
    postRequest?: (data: Response, api?: OpenColumn) => Response;
}
export interface OCDataRequest {
    skip: number;
    take: number;
    refreshFilters: boolean;
}
export interface OCDataResponse<T> {
    data: T[];
    skip: number;
    totalRowCount?: number;
    filtersRefreshed: boolean;
}
export interface OCRowOptions<T> {
    blockIndex: number;
    index: number;
    api: OpenColumn<T>;
    dom: OCDom;
    header: OCDataHeader<T>;
    data?: T;
    prevRow?: OCRow<T>;
    nextRow?: OCRow<T>;
}
export interface OCScrollerOptions {
    sensX?: number;
    sensY?: number;
}
export declare enum OCPositionState {
    Above = 1,
    Below = 2,
    Visible = 3,
    Removed = 4
}
