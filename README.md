# ParkourFinder — REST API

![PKF Rest Logo](public/logo-alt.png)


## Install

Install dependencies with npm or yarn:

```bash
$ sudo npm i
```

Then, just add a `db.yaml` config file in the root folder, on this model:

```yaml
default:
  host: 'localhost'
  port: '27027'
  base: 'mybase'
  user: 'myuser'
  pass: 'mypass'
```

## Launch

```bash
$ node index.js
```

## Refs

[Reference](https://getstream.io/blog/building-rest-api-node-js-restify-mongodb/)
