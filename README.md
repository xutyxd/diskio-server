<p align="center">
  <a href="https://github.com/xutyxd/diskio-server">
    <picture>
      <source srcset="./diskio-logo.png" width="150">
      <img alt="diskio logo" src="./diskio-logo.png" width="150">
    </picture>
  </a>
</p>

# DiskIO Server
A server for [diskio-core](https://github.com/xutyxd/diskio-core) exposed with OpenAPI.
Allows to upload and download files using the diskio-core API.


## 📦 Packages
Get the package from [npm](https://www.npmjs.com/package/diskio-api)
```bash
npm install diskio-api
```
### 📝 Documentation
Read the documentation [here](https://github.com/xutyxd/diskio-server/tree/main/package)

## 🐳 Docker
Get the image from [Docker Hub](https://hub.docker.com/r/xutyxd/diskio)
```bash
docker pull xutyxd/diskio
```

### Example to run the server
Environment variables:
- `DISKIO_PATH`: DiskIO path
    - Default: `./diskio`
- `DISKIO_SIZE`: DiskIO size
    - Default: `1024 * 1024 * 1024 * 10` (10GB)
- `PORT`: Port to run the server
    - Default: `8080`

```bash
docker run -v ./diskio:/user/src/app/diskio -p 8080:8080 xutyxd/diskio:latest
```

**Note**: The diskio folder must be created before running the server or error will be thrown.


## 📝 License
This project is licensed under the AGPL-3.0 license - see the [LICENSE](LICENSE) file for details

<p align="left">
  Made with ☕ by
  <a href="https://github.com/xutyxd">
    XutyXD
  </a>
</p>