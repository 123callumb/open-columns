import OpenColumn from "./OpenColumn";

export interface OpenColumnOptions<T> {
    selector: string | HTMLElement;
    headers?: string[] | OCHeaderConfig<T>;
    data?: OCDataOptions<T>;
}

export interface OCHeaderConfig<T> {
    headers: OCDataHeaderOptions<T>[];
    parentHeaders?: OCHeaderOptions[][];
}

export interface OCHeaderOptions {
    displayName: string;
    sticky?: boolean;
    canOrderBy?: boolean;
    canReorder?: boolean;
    postColRender?: (header: HTMLElement, api?: OpenColumn) => string | HTMLElement;
    header?: HTMLElement;
}

export interface OCDataHeaderOptions<T> extends OCHeaderOptions {
    propertyName: keyof T;
    preCellRender?: (data?: unknown, rowData?: T, api?: OpenColumn) => unknown;
    postCellRender?: (cell: HTMLElement, data?: unknown, rowData?: T, api?: OpenColumn) => void;
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