import autoBind from "auto-bind";

export class BaseController {
    constructor() {
        autoBind(this);
    }
}