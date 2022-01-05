# Team Sheets Web

This repository produces a Docker Image containing an [ExpressJS](https://expressjs.com) server that provides the Web 
UI for the Team Sheets module of Sports CRM.

Currently, this is at the prototype stage, comprised of some static HTML styled with [Bulma](https://bulma.io/)

## Building and running the Docker Image

### Install Prerequisites

1. [**Docker Engine**](https://docs.docker.com/engine/install/). This project is developed and tested on the latest
   desktop version of [Ubuntu Linux](https://ubuntu.com). Docker Engine is installed from Docker's own package 
   repository, as described [here](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository). 

### Build the Image

```shell
dcoker build -t team-sheets-web .
```

### Run a container

```shell
docker run -it -p 8080:8080 team-sheets-web
```

All being well, you should be able to point your browser at http://localhost:8080, and see something like:

![Team Sheets List](.//docs/images/team-sheets-list.png)

## Local development

### Prerequisites

1. [**NodeJS - LTS**](https://nodejs.org/en/) For development and testing on Ubuntu, the NodeSource Binary distribution 
   repository is used to install and update the nodejs package, as described 
   [here](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions).

### Install npm dependencies

```shell
npm install
```

### Start the development server

```shell
./run serve
```