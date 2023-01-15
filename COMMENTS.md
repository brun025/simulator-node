# API Simulation with PrismaIO

## Running

```bash
    $ cp .env.example .env
    $ docker-compose up -d
    $ yarn && yarn prisma migrate dev && yarn seed
    $ yarn dev
```

## API

```bash
    Access http://localhost:3000/jogo/simular via POST
    to run the simulation and see the logs of the rounds
    in the terminal.

    Endpoints in file api.http
```

## Running tests

```bash
    $ yarn test
```

## Running prisma studio to access database

```bash
    $ yarn prisma studio
```