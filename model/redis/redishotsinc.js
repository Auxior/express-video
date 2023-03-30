const { redis } = require("./index");

exports.hotInc = async (videoId, incNum) => {
  var data = await redis.zscore("videohots", videoId);
  if (data) {
    var inc = await redis.zincrby("videohots", incNum, videoId);
  } else {
    var inc = await redis.zadd("videohots", incNum, videoId);
  }
  return inc;
};
