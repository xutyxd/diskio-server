<p align="center">
  <a href="https://github.com/xutyxd/diskio-server">
    <picture>
      <source srcset="../diskio-logo.png" width="150">
      <img alt="diskio logo" src="./diskio-logo.png" width="150">
    </picture>
  </a>
</p>

<h1 align="center">
  Client to interact with the Diskio Server API
</h1>

<p align="left">
    <img src="https://img.shields.io/npm/dw/diskio-api"/>
    <img alt="NPM Unpacked Size" src="https://img.shields.io/npm/unpacked-size/diskio-api">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/diskio-api">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/diskio-api">
</p>

# Diskio Client
An API client for [diskio-server](https://github.com/xutyxd/diskio-server) exposed with OpenAPI.



## 📦 Packages

### 📦 CommonJS

```js
const { DiskioAPIClient } = require('diskio-api');
```

### 📦 ESM

```js
import { DiskioAPIClient } from 'diskio-api';
```

### 📦 TypeScript

```ts
import { DiskioAPIClient } from 'diskio-api';
```

## Instance
```js
const client = new DiskioAPIClient('http://localhost:8080');
```

## Health Check
Get information about the server
```js
const response = await client.healthCheck();
console.log(response.data.response.diskio.size); // 10737418240
```

## Upload
```ts
const file: File = new File(['Hello world!'], 'hello.txt');
const { response } = await client.upload([ file ]);
const path = response[0];
```

## Download
```js
const file = await client.download(path, type: 'arrayBuffer' | 'stream') // default download is 'arrayBuffer'
// Work with the file
console.log(typeof file) // 'arraybuffer' | 'stream'
```

## Delete
```js
await client.delete('/path/to/file');
```

## 📝 License

This project is licensed under the `GNU AFFERO GENERAL PUBLIC LICENSE` - see the [LICENSE](LICENSE) file for details