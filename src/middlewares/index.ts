import {Context} from "hono";
import {StatusCode} from "hono/utils/http-status";


export const errorHandler = (c: Context, status: number = 401) => {
    return c.json({
        success: false,
        message: c.error?.message,
        stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
    }, status as StatusCode)
}

export const notFound = (c: Context) => {
    return c.json({
        success: false,
        message: `Not Found - [${c.req.method}] ${c.req.url}`,
    }, 404)
}
