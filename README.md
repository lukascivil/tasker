<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="220" alt="Nest Logo" /></a>
</p>

<p align="center">Tasker-<strong>Server</strong>, a task registration application</p>

![badge](https://action-badges.now.sh/lukascivil/tasker)
[![codecov](https://codecov.io/gh/lukascivil/tasker/branch/master/graph/badge.svg)](https://codecov.io/gh/lukascivil/tasker)

## Description

Tasker is an application for registering tasks. The server was created using Nestjs following the REST pattern. The front application that will use this app server will use the [react-admin](https://marmelab.com/react-admin/Readme.html) framework.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start:debug

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e
```

## Documentation

```bash
# Swagger Docs
open http://localhost:3000/api
```

## Running the client

Read the docs of Tasker client here: https://github.com/lukascivil/our-admin
