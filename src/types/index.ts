import {Category, Post, PostTag, Tag} from "../models/index.js";


export interface IPost extends Pick<Post, 'title' | 'content' | 'slug' | 'category_id'> {}
export interface ICategory extends Pick<Category, 'name' | 'slug' > {}
export interface ITag extends Pick<Tag, 'name' | 'slug' > {}
export interface IPostTag extends Pick<PostTag, 'post_id' | 'tag_id' > {}
