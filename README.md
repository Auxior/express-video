## 项目技术栈

Node.js + Express + MongoDB + Redis + 阿里云视频点播

## 项目逻辑架构

![](https://cdn.staticaly.com/gh/Auxior/AssetsRepo@master/20230406/api.20fu32gniqsg.webp)

## API 接口文档

[点击跳转](https://github.com/Auxior/express-video/blob/main/API%20%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md)

## 使用教程

1. 安装依赖

```bash
npm install
```

2. 修改配置

打开 `config/config.default.js`

| 参数                         | 说明                        |
| ---------------------------- | --------------------------- |
| uuid                         | jwt 加密密钥                |
| time                         | token 过期时间（单位：秒） |
| mongopath                    | MongoDB 相关                |
| redisClient                  | Redis 相关                  |
| accessKeyId、accessKeySecret | 阿里云 AccessKey 相关     |
| regionId                     | 视频点播服务接入地域      |

3. 启动服务

```bash
npm run dev
```