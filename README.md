# M.E.E.N
M.E.E.N = MongoDB + ExpressJS + EdgeJS + NodeJS


## Methods
### `composeApp`
```javascript
/**
 * Compose an app. You can compose website or api app with built-in modules via `options` or your own fully-customised app by passing modules via `modules`
 * @param {String} appName Your app name
 * @param {Object} config App configuration, includes built-in modules' and custom configurations
 * @param {Array<Function>} modules Module must be function with first param is `app` as Express App Instance and second param is `config`
 */
composeApp(appName, config, modules);
```

**Note**: You can see default config at [here](./src/core/defaultConfig.js) 


## Built-in modules
Each module has its own config same as its name. Example: `publicFolder` module will use `publicFolder` in config

Modules list:
 * [bodyParser](./src/modules/bodyParser.js)
 * [compression](./src/modules/compression.js)
 * [cors](./src/modules/cors.js)
 * [locals](./src/modules/locals.js)
 * [minify](./src/modules/minify.js)
 * [mongoose](./src/modules/mongoose.js)
 * [morgan](./src/modules/morgan.js)
 * [publicFolder](./src/modules/publicFolder.js)
 * [session](./src/modules/session.js)
 * [view](./src/modules/view.js)
 
 
## Presets
MEEN provides presets for app types via `config.app.preset`. Order of modules will be loaded as specified in below

### `website`:  
 1. [compression](./src/modules/compression.js)
 1. [minify](./src/modules/minify.js)
 1. [publicFolder](./src/modules/publicFolder.js)
 1. [view](./src/modules/view.js)
 1. [session](./src/modules/session.js)
 1. [bodyParser](./src/modules/bodyParser.js)
 1. [mongoose](./src/modules/mongoose.js)
 1. [morgan](./src/modules/morgan.js)
   
### `api`: 
 1. [cors](./src/modules/cors.js)
 1. [bodyParser](./src/modules/bodyParser.js)
 1. [mongoose](./src/modules/mongoose.js)
 1. [morgan](./src/modules/morgan.js)


## Utils
### `resolvePath`
```javascript
/**
 * Resolve path from root folder of project
 * @param {String} path
 */
resolvePath(...path);
```

Example:
```javascript
resolvePath('public', 'image');
```


## License
Please read at [here](./LICENSE.md)
