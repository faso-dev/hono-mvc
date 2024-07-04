import {serve} from '@hono/node-server'
import {Hono} from "hono";
import {logger} from 'hono/logger'
import {prettyJSON} from 'hono/pretty-json'

import {database} from "./config/database.js";
import {errorHandler, notFound} from "./middlewares/index.js";
import {api} from "./routes/index.js";


// Rest of your server code

const app = new Hono()


app.use('*', logger(), prettyJSON())

app.route('', api)

app.onError((err, c) => {
    return errorHandler(c, (err as any).status || 500)
})

app.notFound((c) => {
    return notFound(c)
})


const port = 8004
console.log(`Server is running on port ${port}`)

serve({
    fetch: app.fetch,
    port
})
