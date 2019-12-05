# Installation
## Local Installation

To install the latest release or a specific version, run one of the following commands:

```js
npm install --save-dev webpack
# or specific version
npm install --save-dev webpack@<version>
```

If you're using webpack v4 or later, you'll also need to install the CLI.

```js
npm install --save-dev webpack-cli
```

Installing locally is what we recommend for most projects. This makes it easier to upgrade projects individually when breaking changes are introduced. Typically webpack is run via one or more npm scripts which will look for a webpack installation in your local node_modules directory:

```js
"scripts": {
	"build": "webpack --config webpack.config.js"
}
```

## Global Installation

```js
npm install --global webpack
```

::: warning
Note that this is not a recommended practice. Installing globally locks you down to a specific version of webpack and could fail in projects that use a different version.
:::

```js
npm uninstall webpack webpack-cli -g
```