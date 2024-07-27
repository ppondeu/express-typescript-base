import { HttpMethod } from "./types.js";

export function isHttpMethod(method: any): method is HttpMethod {
    return ['get', 'post', 'put', 'delete'].includes(method);
}