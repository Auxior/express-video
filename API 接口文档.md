# express-video 接口文档

## 接口说明

- 基于 RESTful API 接口规范
- 基于 JWT 身份认证
- 使用 CORS 跨域
- 接口基础请求地址： `http://127.0.0.1:3000/api/v1`
- 使用 JSON 格式进行数据通信
- 认证方式： `Request Headers`
```json
"authorization": "Bearer " + token
```

## ---用户注册---

### 请求 URL

/user/register

### 请求方式

POST

### 是否需要认证：

否

### 请求参数示例：json

```json
{
  "username": "xiaoming",
  "email": "xiaoming@qq.com",
  "phone": "10112341234",
  "password": "123456"
}
```

### 请求参数含义

| 参数     | 类型   | 必填 | 说明   |
| -------- | ------ | ---- | ------ |
| username | string | 是   | 用户名 |
| email    | string | 是   | 邮箱   |
| phone    | string | 是   | 手机号 |
| password | string | 是   | 密码   |

### 正确返回示例

```json
{
  "message": "注册成功"
}
```

## ---用户登录---

### 请求 URL

/user/login

### 请求方式

POST

### 是否需要认证：

否

### 请求参数示例：json

```json
{
  "email": "xiaoming@qq.com",
  "password": "123456"
}
```

### 请求参数含义

| 参数     | 类型   | 必填 | 说明 |
| -------- | ------ | ---- | ---- |
| email    | string | 是   | 邮箱 |
| password | string | 是   | 密码 |

### 正确返回示例

```json
{
  "user": {
    "_id": "642e6729c305564307872daf",
    "username": "xiaoming",
    "email": "xiaoming@qq.com",
    "phone": "10112341234",
    "avatar": null,
    "cover": null,
    "channelDes": null,
    "subscribeCount": 0,
    "createAt": "2023-04-06T06:30:42.998Z",
    "updateAt": "2023-04-06T06:30:42.998Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaW5mbyI6eyJfaWQiOiI2NDJlNjcyOWMzMDU1NjQzMDc4NzJkYWYiLCJ1c2VybmFtZSI6InhpYW9taW5nIiwiZW1haWwiOiJ4aWFvbWluZ0BxcS5jb20iLCJwaG9uZSI6IjEwMTEyMzQxMjM0IiwiYXZhdGFyIjpudWxsLCJjb3ZlciI6bnVsbCwiY2hhbm5lbERlcyI6bnVsbCwic3Vic2NyaWJlQ291bnQiOjAsImNyZWF0ZUF0IjoiMjAyMy0wNC0wNlQwNjozMDo0Mi45OThaIiwidXBkYXRlQXQiOiIyMDIzLTA0LTA2VDA2OjMwOjQyLjk5OFoiLCJfX3YiOjB9LCJpYXQiOjE2ODA3NjM0NzgsImV4cCI6MTY4MDg0OTg3OH0.wj32PV6XWFy8yUPJueccpE2hUaotJ60Q9FAmvYMUfow"
  }
}
```

## ---修改用户信息---

### 请求 URL

/user/update

### 请求方式

PUT

### 是否需要认证：

是

### 请求参数示例：json

```json
{
  "username": "xiaohong",
  "email": "xiaohong@qq.com",
  "phone": "11112341234",
  "password": "654321"
}
```

### 请求参数含义

| 参数     | 类型   | 必填 | 说明   |
| -------- | ------ | ---- | ------ |
| username | string | 否   | 用户名 |
| email    | string | 否   | 邮箱   |
| phone    | string | 否   | 手机号 |
| password | string | 否   | 密码   |

### 正确返回示例

```json
{
  "user": {
    "_id": "642e6729c305564307872daf",
    "username": "xiaohong",
    "email": "xiaohong@qq.com",
    "phone": "11112341234",
    "avatar": null,
    "cover": null,
    "channelDes": null,
    "subscribeCount": 0,
    "createAt": "2023-04-06T06:30:42.998Z",
    "updateAt": "2023-04-06T06:30:42.998Z",
    "__v": 0
  }
}
```

## ---用户头像上传---

### 请求 URL

/user/avatar

### 请求方式

POST

### 是否需要认证：

是

### 请求参数示例：file

| 参数   | 类型 | 必填 | 说明         |
| ------ | ---- | ---- | ------------ |
| avatar | file | 是   | 用户头像文件 |

### 正确返回示例

```json
{
  "avatar": "5141cb82cd955d70014d488b7e67dc8b.jpg"
}
```

## ---关注频道---

### 请求 URL

/user/subscribe/:userId

### 请求方式

GET

### 是否需要认证：

是

### 请求参数示例：params

```json
{
  "userId": "642e773ef9210bb5fd3465e0"
}
```

### 请求参数含义

| 参数   | 类型   | 必填 | 说明      |
| ------ | ------ | ---- | --------- |
| userId | string | 是   | 用户 \_id |

### 正确返回示例

```json
{
  "message": "关注成功"
}
```

## ---取消关注频道---

### 请求 URL

/user/unsubscribe/:userId

### 请求方式

GET

### 是否需要认证：

是

### 请求参数示例：params

```json
{
  "userId": "642e773ef9210bb5fd3465e0"
}
```

### 请求参数含义

| 参数   | 类型   | 必填 | 说明      |
| ------ | ------ | ---- | --------- |
| userId | string | 是   | 用户 \_id |

### 正确返回示例

```json
{
  "message": "取消关注成功"
}
```

## ---获取粉丝列表---

### 请求 URL

/user/getchannel

### 请求方式

GET

### 是否需要认证：

是

### 正确返回示例

```json
{
  "channelList": [
    {
      "_id": "642e6729c305564307872daf",
      "username": "xiaoming",
      "avatar": null,
      "subscribeCount": 0,
      "cover": null,
      "channelDes": null
    }
  ]
}
```

## ---获取关注列表---

### 请求 URL

/user/getsubscribe/:userId

### 请求方式

GET

### 是否需要认证：

否

### 请求参数示例：params

```json
{
  "userId": "642e6729c305564307872daf"
}
```

### 请求参数含义

| 参数   | 类型   | 必填 | 说明      |
| ------ | ------ | ---- | --------- |
| userId | string | 是   | 用户 \_id |

### 正确返回示例

```json
{
  "subscribeList": [
    {
      "_id": "642e773ef9210bb5fd3465e0",
      "username": "xiaohong",
      "avatar": null,
      "subscribeCount": 2,
      "cover": null,
      "channelDes": null
    }
  ]
}
```

## ---获取用户信息---

### 请求 URL

/user/getuser/:userId

### 请求方式

GET

### 是否需要认证：

可选

### 请求参数示例：params

```json
{
  "userId": "642e6729c305564307872daf"
}
```

### 请求参数含义

| 参数   | 类型   | 必填 | 说明      |
| ------ | ------ | ---- | --------- |
| userId | string | 是   | 用户 \_id |

### 正确返回示例

```json
{
  "_id": "642e6729c305564307872daf",
  "username": "xiaoming",
  "avatar": null,
  "subscribeCount": 0,
  "cover": null,
  "channelDes": null,
  "isSubscribe": false
}
```

## ---视频入库---

### 请求 URL

/video/createvideo

### 请求方式

POST

### 是否需要认证：

是

### 请求参数示例：json

```json
{
  "title": "标题1",
  "vodvideoId": "vod1"
}
```

### 请求参数含义

| 参数       | 类型   | 必填 | 说明     |
| ---------- | ------ | ---- | -------- |
| title      | string | 是   | 视频标题 |
| vodvideoId | string | 是   | 视频 vod |

### 正确返回示例

```json
{
  "dbBack": {
    "title": "标题1",
    "description": null,
    "vodvideoId": "vod1",
    "user": "642e773ef9210bb5fd3465e0",
    "cover": null,
    "commentCount": 0,
    "likeCount": 0,
    "dislikeCount": 0,
    "createAt": "2023-04-06T11:13:04.805Z",
    "updateAt": "2023-04-06T11:13:04.805Z",
    "_id": "642ea98f11e9ceb8f4ee2df6",
    "__v": 0
  }
}
```

## ---视频详情---

### 请求 URL

/video/video/:videoId

### 请求方式

GET

### 是否需要认证：

是

### 请求参数示例：params

```json
{
  "videoId": "642e6729c305564307872daf"
}
```

### 请求参数含义

| 参数    | 类型   | 必填 | 说明      |
| ------- | ------ | ---- | --------- |
| videoId | string | 是   | 视频 \_id |

### 正确返回示例

```json
{
  "videoInfo": {
    "_id": "642ea94a11e9ceb8f4ee2dee",
    "title": "标题1",
    "description": null,
    "vodvideoId": "vod1",
    "user": {
      "_id": "642e773ef9210bb5fd3465e0",
      "username": "xiaohong",
      "cover": null
    },
    "cover": null,
    "commentCount": 0,
    "likeCount": 0,
    "dislikeCount": 0,
    "createAt": "2023-04-06T11:13:04.805Z",
    "updateAt": "2023-04-06T11:13:04.805Z",
    "__v": 0,
    "islike": false,
    "isDislike": false,
    "isSubscribe": false
  }
}
```

## ---视频列表---

### 请求 URL

/video/videolist

### 请求方式

GET

### 是否需要认证：

否

### 请求参数示例：json

```json
{
  "pageNum": 1,
  "pageSize": 2
}
```

### 请求参数含义

| 参数     | 类型   | 必填 | 说明         |
| -------- | ------ | ---- | ------------ |
| pageNum  | string | 否   | 页码         |
| pageSize | string | 否   | 每页显示条数 |

### 正确返回示例

```json
{
  "videolist": [
    {
      "_id": "642ea94a11e9ceb8f4ee2dee",
      "title": "标题1",
      "description": null,
      "vodvideoId": "vod1",
      "user": {
        "_id": "642e773ef9210bb5fd3465e0",
        "username": "xiaohong",
        "cover": null
      },
      "cover": null,
      "commentCount": 0,
      "likeCount": 0,
      "dislikeCount": 0,
      "createAt": "2023-04-06T11:13:04.805Z",
      "updateAt": "2023-04-06T11:13:04.805Z",
      "__v": 0
    },
    {
      "_id": "642ea97511e9ceb8f4ee2df0",
      "title": "标题2",
      "description": null,
      "vodvideoId": "vod2",
      "user": {
        "_id": "642e773ef9210bb5fd3465e0",
        "username": "xiaohong",
        "cover": null
      },
      "cover": null,
      "commentCount": 0,
      "likeCount": 0,
      "dislikeCount": 0,
      "createAt": "2023-04-06T11:13:04.805Z",
      "updateAt": "2023-04-06T11:13:04.805Z",
      "__v": 0
    }
  ],
  "getvideoCount": 4
}
```

## ---视频评论---

### 请求 URL

/video/comment/:videoId

### 请求方式

POST

### 是否需要认证：

是

### 请求参数示例：params

```json
{
  "videoId": "642e6729c305564307872daf"
}
```

### 请求参数示例：json

```json
{
  "content": "评论666"
}
```

### 请求参数含义

| 参数    | 类型   | 必填 | 说明      |
| ------- | ------ | ---- | --------- |
| videoId | string | 是   | 视频 \_id |
| content | string | 是   | 评论内容  |

### 正确返回示例

```json
{
  "content": "评论666",
  "video": "642ea94a11e9ceb8f4ee2dee",
  "user": "642e6729c305564307872daf",
  "createAt": "2023-04-06T11:32:55.508Z",
  "updateAt": "2023-04-06T11:32:55.508Z",
  "_id": "642eaed938c3ed01b3d19fbd",
  "__v": 0
}
```

## ---视频评论列表---

### 请求 URL

/video/commentlist/:videoId

### 请求方式

GET

### 是否需要认证：

否

### 请求参数示例：params

```json
{
  "videoId": "642e6729c305564307872daf"
}
```

### 请求参数示例：json

```json
{
  "pageNum": 1,
  "pageSize": 1
}
```

### 请求参数含义

| 参数     | 类型   | 必填 | 说明         |
| -------- | ------ | ---- | ------------ |
| videoId  | string | 是   | 视频 \_id    |
| pageNum  | string | 否   | 页码         |
| pageSize | string | 否   | 每页显示条数 |

### 正确返回示例

```json
{
  "comments": [
    {
      "_id": "642eaed938c3ed01b3d19fbd",
      "content": "评论666",
      "video": "642ea94a11e9ceb8f4ee2dee",
      "user": {
        "_id": "642e6729c305564307872daf",
        "username": "xiaoming",
        "avatar": null
      },
      "createAt": "2023-04-06T11:32:55.508Z",
      "updateAt": "2023-04-06T11:32:55.508Z",
      "__v": 0
    }
  ],
  "commentCount": 2
}
```

## ---删除评论---

### 请求 URL

/video/comment/:videoId/:commentId

### 请求方式

DELETE

### 是否需要认证：

是

### 请求参数示例：params

```json
{
  "videoId": "642ea94a11e9ceb8f4ee2dee",
  "commentId": "642eaf06b9fb363b71a8c883"
}
```

### 请求参数含义

| 参数      | 类型   | 必填 | 说明      |
| --------- | ------ | ---- | --------- |
| videoId   | string | 是   | 视频 \_id |
| commentId | string | 是   | 评论 \_id |

### 正确返回示例

```json
{
  "error": "删除成功"
}
```

## ---喜欢视频---

### 请求 URL

/video/like/:videoId

### 请求方式

GET

### 是否需要认证：

是

### 请求参数示例：params

```json
{
  "videoId": "642ea94a11e9ceb8f4ee2dee"
}
```

### 请求参数含义

| 参数    | 类型   | 必填 | 说明      |
| ------- | ------ | ---- | --------- |
| videoId | string | 是   | 视频 \_id |

### 正确返回示例

```json
{
  "_id": "642ea94a11e9ceb8f4ee2dee",
  "title": "标题1",
  "description": null,
  "vodvideoId": "vod1",
  "user": "642e773ef9210bb5fd3465e0",
  "cover": null,
  "commentCount": 0,
  "likeCount": 1,
  "dislikeCount": 0,
  "createAt": "2023-04-06T11:13:04.805Z",
  "updateAt": "2023-04-06T11:13:04.805Z",
  "__v": 0,
  "islike": true
}
```

## ---不喜欢视频---

### 请求 URL

/video/dislike/:videoId

### 请求方式

GET

### 是否需要认证：

是

### 请求参数示例：params

```json
{
  "videoId": "642ea94a11e9ceb8f4ee2dee"
}
```

### 请求参数含义

| 参数    | 类型   | 必填 | 说明      |
| ------- | ------ | ---- | --------- |
| videoId | string | 是   | 视频 \_id |

### 正确返回示例

```json
{
  "_id": "642ea94a11e9ceb8f4ee2dee",
  "title": "标题1",
  "description": null,
  "vodvideoId": "vod1",
  "user": "642e773ef9210bb5fd3465e0",
  "cover": null,
  "commentCount": 0,
  "likeCount": 0,
  "dislikeCount": 1,
  "createAt": "2023-04-06T11:13:04.805Z",
  "updateAt": "2023-04-06T11:13:04.805Z",
  "__v": 0,
  "isdislike": false
}
```

## ---喜欢视频列表---

### 请求 URL

/video/likelist

### 请求方式

GET

### 是否需要认证：

是

### 请求参数示例：json

```json
{
  "pageNum": 1,
  "pageSize": 1
}
```

### 请求参数含义

| 参数     | 类型   | 必填 | 说明         |
| -------- | ------ | ---- | ------------ |
| pageNum  | string | 否   | 页码         |
| pageSize | string | 否   | 每页显示条数 |

### 正确返回示例

```json
{
  "likes": [
    {
      "_id": "642eb59ee919c4465012f7da",
      "user": "642e6729c305564307872daf",
      "video": {
        "_id": "642ea94a11e9ceb8f4ee2dee",
        "title": "标题1",
        "vodvideoId": "vod1",
        "user": "642e773ef9210bb5fd3465e0"
      },
      "like": 1,
      "createAt": "2023-04-06T12:05:43.719Z",
      "updateAt": "2023-04-06T12:05:43.719Z",
      "__v": 0
    }
  ],
  "likeCount": 1
}
```

## ---收藏视频---

### 请求 URL

/video/collect/:videoId

### 请求方式

GET

### 是否需要认证：

是

### 请求参数示例：params

```json
{
  "videoId": "642ea94a11e9ceb8f4ee2dee"
}
```

### 请求参数含义

| 参数    | 类型   | 必填 | 说明      |
| ------- | ------ | ---- | --------- |
| videoId | string | 是   | 视频 \_id |

### 正确返回示例

```json
{
  "mycollect": {
    "user": "642e6729c305564307872daf",
    "video": "642ea94a11e9ceb8f4ee2dee",
    "createAt": "2023-04-06T12:14:57.902Z",
    "updateAt": "2023-04-06T12:14:57.902Z",
    "_id": "642eb81471eb1b90377bf0a6",
    "__v": 0
  }
}
```

## ---视频热度排行---

### 请求 URL

/video/gethots/:topnum

### 请求方式

GET

### 是否需要认证：

否

### 请求参数示例：params

```json
{
  "topnum": "3"
}
```

### 请求参数含义

| 参数   | 类型   | 必填 | 说明         |
| ------ | ------ | ---- | ------------ |
| topnum | string | 是   | 获取数据数量 |

### 正确返回示例

```json
{
  "tops": {
    "642ea94a11e9ceb8f4ee2dee": "29",
    "64242d59ed6f305262d347ac": "7",
    "642ea97511e9ceb8f4ee2df0": "3"
  }
}
```

## ---获取视频 vod---

### 请求 URL

/vod/getvod

### 请求方式

GET

### 是否需要认证：

是
