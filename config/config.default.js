/**
 * 默认配置
 */

// JWT 加密值
module.exports.uuid = "94199183-8561-4e47-a161-8a4f0244b9ec";

// MongoDB
module.exports.mongopath = "mongodb://127.0.0.1:27017/express-video";

// Redis
module.exports.redisClient = {
  path: "127.0.0.1",
  port: 6379,
  options: { password: "root" },
};

// 填入阿里云 AccessKey 等信息
module.exports.accessKeyId = "<Your AccessKeyId>";
module.exports.accessKeySecret = "<Your AccessKeySecret>";

// 点播服务接入地域
module.exports.regionId = "cn-shanghai";
