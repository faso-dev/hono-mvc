import {CategoryController} from "../controllers/index.js";
import {Hono} from "hono";


const categoryRoutes = new Hono().basePath('/categories');

categoryRoutes.get('', (c) => CategoryController.getAllCategorys(c));
categoryRoutes.post('', (c) => CategoryController.createCategory(c));
categoryRoutes.put('/:id', (c) => CategoryController.updateCategory(c));
categoryRoutes.delete('/:id', (c) => CategoryController.deleteCategory(c));

export {categoryRoutes}
