const {
  regionId,
  accessKeyId,
  accessKeySecret,
} = require("../config/config.default");

var RPCClient = require("@alicloud/pop-core").RPCClient;

function initVodClient() {
  var client = new RPCClient({
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    endpoint: "http://vod." + regionId + ".aliyuncs.com",
    apiVersion: "2017-03-21",
  });

  return client;
}

exports.getvod = async (req, res) => {
  var client = initVodClient();

  const vodback = await client.request(
    "CreateUploadVideo",
    {
      Title: "this is a sample",
      FileName: "filename.mp4",
    },
    {}
  );
  res.status(200).json({ vod: vodback });
};
