# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npx create-docusaurus@latest website classic
$ cd website
$ git clone https://ghproxy.com/https://github.com/inpry/website.git -b main
$ \cp -rf website/* ./ && rm -rf website
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```
