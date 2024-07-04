import {serve} from '@hono/node-server'
import {Hono} from "hono";
import {logger} from 'hono/logger'
import {prettyJSON} from 'hono/pretty-json'

import {database} from "./config/database.js";
import {errorHandler, notFound} from "./middlewares/index.js";
import {categoryRoutes, postRoutes, tagRoutes} from "./routes/index.js";


async function bootDatabase() {
  try {
    await database.authenticate();
    console.log('Connection has been established successfully.');
    
    // Synchronize models with database
    await database.sync({ force: false });
    
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
// Rest of your server code

const app = new Hono().basePath('/api/v1')



void bootDatabase();

app.use('*', logger(), prettyJSON())

app.route('', categoryRoutes);
app.route('', postRoutes);
app.route('', tagRoutes);

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
