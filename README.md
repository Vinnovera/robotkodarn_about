# Robotkodarn – The Website

[![Build Status](https://travis-ci.org/Vinnovera/robotkodarn_about.svg?branch=master)](https://travis-ci.org/Vinnovera/robotkodarn_about) [![style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/Vinnovera/robotkodarn_about)

![The website on different devices](https://github.com/Vinnovera/robotkodarn_about/blob/master/README-cover.png "Screenshots of the website")

## Description
A site about Vinnovera's project [Robotkodarn](https://github.com/Vinnovera/robotkodarn), built with [Choo](https://github.com/choojs/) and [Koa](https://github.com/koajs/koa). The content is fetched from [Prismic.io](https://prismic.io), an API based headless CMS. The site can be found live at [https://robotkodarn-info-test.now.sh/](https://robotkodarn-info-test.now.sh/).

## Setup

### Environment variables

Add a `.env` file with all needed environment variables.
You can copy `.env.example` as a start.


### Start project during development

```bash
# Install dependencies
$ npm install

# Start project under development
$ npm run start:dev

```

### Testing with Travis CI

This project uses [Travis CI](https://travis-ci.org/) for code testing. When code is pushed to Github, Travis CI automatically runs `npm test`. If passed, build is marked as passed.

## Build
```bash
# Run build script to make project ready for production
$ npm run build

```

## Deploy
In this project, Robotkodarn is deployed using [Now](https://zeit.co/now). When deploying, it's important to include the file  `.env.production`. This will make sure that the environment variables are available in the production environment. To include the file, first make sure it exists in the root level of your project. Then run:

```bash
# Include the .env.production file when deploying
$ now -E .env.production
```

That's it. The project is now deployed! 🎉

## License
MIT
