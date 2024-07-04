# Hono mvc

In this project, I will create a simple MVC blog rest api from scratch using the Hono micro framework. This project is inspired by the Laravel framework.

## Installation

```bash
git clone git@github.com:faso-dev/hono-mvc.git
cd hono-mvc
yarn
```

## Setup the database

Create a sqlite database file in the root directory of the project named `database.sqlite`.

## Run server

```bash
yarn dev
```

## Run seeders

```bash
yarn database:seed
```

## Available routes

Here is a list of available Models :

- Post
  - id
  - title
  - content
  - slug
  - category_id
  - createdAt
  - updatedAt

- Category
  - id
  - name
  - slug
  - createdAt
  - updatedAt

- Tag
  - id
  - name
  - slug
  - createdAt
  - updatedAt

- PostTag
  - post_id
  - tag_id

Here is a list of available routes :

- Posts
  - GET /posts
  - GET /posts/:id
  - POST /posts
  - PUT /posts/:id
  - DELETE /posts/:id

- Categories
  - GET /categories
  - GET /categories/:id
  - POST /categories
  - PUT /categories/:id
  - DELETE /categories/:id

- Tags
  - GET /tags
  - GET /tags/:id
  - POST /tags
  - PUT /tags/:id
  - DELETE /tags/:id

## File structure

```
src
├── config
│   └── database.ts

├── commands
│   └── SeedCommand.ts
│   └── index.ts

├── core
│   └── DatabaseSeeder.ts
│   └── AbstractSeeder.ts

├── controllers
│   └── CategoryController.ts
│   └── PostController.ts
│   └── TagController.ts
│   └── index.ts

├── middlewares
│   └── index.ts

├── models
│   └── Category.ts
│   └── Post.ts
│   └── Tag.ts
│   └── index.ts

├── repositories
│   └── CategoryRepository.ts
│   └── PostRepository.ts
│   └── TagRepository.ts
│   └── PostTagRepository.ts
│   └── index.ts

├── routes
│   └── categoryRoutes.ts
│   └── postRoutes.ts
│   └── tagRoutes.ts
│   └── index.ts

├── seeders
│   └── CategorySeeder.ts
│   └── PostSeeder.ts
│   └── TagSeeder.ts
│   └── PostTagSeeder.ts
│   └── index.ts

├── types
│   └── index.ts

├── utils
│   └── index.ts

├── console.ts
├── server.ts
```

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Author
[faso-dev](https://linkedin.com/in/faso-dev)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Remarks

This project is a work in progress. I will add more features in the future. Feel free to contribute to this project.

I'll improve file structure and add more feature to be closest as possible to Laravel framework.


