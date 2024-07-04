import {TagController} from "../controllers/index.js";
import {Hono} from "hono";


const tagRoutes = new Hono().basePath('/tags');

tagRoutes.get('', (c) => TagController.getAllTags(c));
tagRoutes.post('', (c) => TagController.createTag(c));
tagRoutes.put('/:id', (c) => TagController.updateTag(c));
tagRoutes.delete('/:id', (c) => TagController.deleteTag(c));

export {tagRoutes}
