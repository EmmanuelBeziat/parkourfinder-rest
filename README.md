# ParkourFinder — REST API

![PKF Rest Logo](public/logo-alt.png)


## Install

Install dependencies with npm or yarn:

```bash
$ sudo npm i
```

Then, just add a `config.yaml` config file in the root folder, on this model:

```yaml
default:
  app:
    name: 'My app'
    url: 'http://localhost:3030/'
    port: 3000
  db:
    host: '127.0.0.1'
    port: '27017'
    base: 'myBase'
    user: 'user'
    pass: 'pass'
  medias:
    path: 'medias'
    url: 'http://localhost:3000/medias'

```

## Launch

```bash
$ node index.js
```

## Refs

[Reference](https://getstream.io/blog/building-rest-api-node-js-restify-mongodb/)
