// --- locals imports ---
import { HttpMethod } from "./types.js";
// ---

export const isHttpMethod = (method: any): method is HttpMethod => {
    return ['get', 'post', 'put', 'delete'].includes(method);
}
