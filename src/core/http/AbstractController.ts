import {Context} from "hono";
import {StatusCode} from "hono/utils/http-status";


class AbstractController {
    protected json(context: Context, data: any, status: StatusCode = 200) {
        return context.json(data, status)
    }
    
    protected error(context: Context, message: string, status: StatusCode = 500) {
        return context.json({message}, status)
    }
    
    protected notFound(context: Context) {
        return context.json({message: 'Not found'}, 404)
    }
    
    protected param(context: Context, name: string) {
        return context.req.param(name)
    }
    
    protected data(context: Context) {
        return context.req.json()
    }
}

export {AbstractController}
