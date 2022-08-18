import { OCDataHeaderOptions } from "./OCTypes";
export default class OCHelper {
    static CreateHeaders<T>(headerOptions: string[] | OCDataHeaderOptions<T>[]): OCDataHeaderOptions<T>[];
}
