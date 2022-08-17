import OpenColumn from "./OpenColumn";
export interface OpenColumnOptions<T> {
    selector: string | HTMLElement;
    headers?: string[] | OCHeaderConfig<T>;
    data?: OCDataConfig<T>;
}
export interface OCHeaderConfig<T> {
    headers: OCDataHeader<T>[];
    parentHeaders?: OCHeader[][];
}
export interface OCHeader {
    name: string;
    sticky?: boolean;
    canOrderBy?: boolean;
    canReorder?: boolean;
    render?: (header: HTMLElement, api?: OpenColumn) => string | HTMLElement;
    header?: HTMLElement;
}
export interface OCDataHeader<T> extends OCHeader {
    preCellRender?: (data?: unknown, rowData?: T, api?: OpenColumn) => unknown;
    postCellRender?: (cell: HTMLElement, data?: unknown, rowData?: T, api?: OpenColumn) => void;
}
export interface OCDataConfig<T, Request = OCDataRequest, Response = OCDataResponse<T>> {
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
