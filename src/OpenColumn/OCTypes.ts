import OCDataHeader from "./OCDataHeader";
import OCDom from "./OCDom";
import OCRow from "./OCRow";
import OpenColumn from "./OpenColumn";

export interface OpenColumnOptions<T> {
    selector: string | HTMLElement;
    dataSource: OCDataSourceOptions<T>;
    headers?: string[] | OCDataHeaderOptions<T>[];
    parentHeaders?: string[] | OCHeaderOptions<T>[];
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

export interface OCDataSourceOptions<T> {
    serverSide: boolean;
    serverOptions?: OCServerSideOptions<T>;
    clientData?: T[];
}

export interface OCServerSideOptions<T, Request = OCDataRequest, Response = OCDataResponse<T>> {
    url?: string;
    method?: 'GET' | 'POST';
    headers?: HeadersInit;
    overrideRequest?: (api?: OpenColumn<T>) => Response | Promise<Response>;
    preRequest?: (request: Request, api?: OpenColumn<T>) => Request;
    postRequest?: (data: Response, api?: OpenColumn<T>) => Response;
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
    filtersRefreshed?: boolean;
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
    sensX?: number,
    sensY?: number
}

export enum OCPositionState {
    Above = 1,
    Below = 2,
    Visible = 3,
    Removed = 4
}