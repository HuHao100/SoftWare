"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_url = "http://localhost:9090";
const myRequest = (options) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: BASE_url + options.url,
      method: options.method || "GET",
      data: options.data || {},
      success: (res) => {
        if (res.statusCode !== 200) {
          common_vendor.index.showToast({
            title: "获取数据失败",
            icon: "error"
          });
        }
        resolve(res);
      },
      fail: (err) => {
        common_vendor.index.showToast({
          title: "请求接口失败",
          icon: "error"
        });
        reject(err);
      }
    });
  });
};
exports.myRequest = myRequest;
