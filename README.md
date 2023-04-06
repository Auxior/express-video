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
| accessKeyId、accessKeySecret | 阿里云 AccessKey 相关（可选） |
| regionId                     | 视频点播服务接入地域（可选）  |

3. 启动服务

```bash
npm run dev
```

## 用户接口列表

| URL                   | METHOD             | 说明                        |
| ---------------------------- | --------------------------- | ---------------------------- |
| /user/register           | POST       | 用户注册           |
| /user/login               | POST           | 用户登录 |
| /user/update         | PUT      | 用户信息修改        |
| /user/avatar       | POST   | 用户头像上传   |
| /user/subscribe/:userId | GET | 关注用户（频道） |
| /user/unsubscribe/:userId | GET | 取消关注用户（频道） |
| /user/getchannel | GET | 用户粉丝列表 |
| /user/getsubscribe/:userId | GET | 用户关注列表 |
| /user/getuser/:userId | GET | 用户信息详情 |

## 视频接口列表

| URL                          | METHOD | 说明               |
| ---------------------------- | ------ | ------------------ |
| /createvideo                 | POST   | 视频入库           |
| /video/:videoId              | GET    | 视频详情           |
| /videolist                   | GET    | 视频列表           |
| /comment/:videoId            | POST   | 评论视频           |
| /commentlist/:videoId        | GET    | 视频评论列表       |
| /comment/:videoId/:commentId | DELETE | 删除视频评论       |
| /like/:videoId               | GET    | 评价视频（喜欢）   |
| /dislike/:videoId            | GET    | 评价视频（不喜欢） |
| /likelist                    | GET    | 喜欢视频列表       |
| /collect/:videoId            | GET    | 收藏视频           |
| /gethots/:topnum             | GET    | 视频热度排行       |

## vod 接口列表

`开发ing...`