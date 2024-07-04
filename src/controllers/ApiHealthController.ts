import {Context} from "hono";
import {AbstractController} from "../core/http/index.js";


class ApiHealthControllerImpl extends AbstractController {
    async check(context: Context) {
        return this.json(context, {status: 'ok'});
    }
}

const ApiHealthController = new ApiHealthControllerImpl();

export {ApiHealthController}

