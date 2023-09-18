# Movies Backend

## Used technologies and libraries

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sqlite](https://www.sqlite.org/index.html)
- [Sequelize](https://sequelize.org/)
- [Sequelize-typescript](https://www.npmjs.com/package/sequelize-typescript)
- others

## How to start project

1. Install dependencies
   `npm i`
2. Install pre-commit linter
   `npm run prepare`
3. Create .env based on .env.example
4. Sync database
   `npm run sync`
5. Run project
   `npm run dev`

## Run in Docker

Link to image in DockerHub: [movies-backend image](https://hub.docker.com/repository/docker/skystarpeach/movies/general)

1. Build image

`docker build -t \<your_super_account>/movies .`

2. Run container

`docker run --name movies -p 8000:8050 -e APP_PORT=8050
<your_super_account>/movies`

## What can be improved

- Update body structure of returned errors
- Add validation for request body and query params
- Replace `sequelize.sync()` with migrations

## Known issues

Invalid data limit and offset when { include: Model } in GET /movies route

It is a [bug of sequelize](https://github.com/sequelize/sequelize/issues/14463)

## Other

As boilerplate used [this starter](https://github.com/mykhailo-vavr/express-starter)

#### Developed by mykhailo-vavr (GitHub)
