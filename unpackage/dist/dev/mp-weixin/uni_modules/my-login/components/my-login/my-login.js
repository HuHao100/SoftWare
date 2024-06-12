"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: null
    };
  },
  methods: {
    wxLogin() {
      common_vendor.index.login({
        provider: "weixin",
        success: (res) => {
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: (userInfo) => {
              this.userInfo = userInfo.userInfo;
              this.sendUserInfoToBackend(this.userInfo);
            },
            fail: (err) => {
              console.log("获取用户信息失败", err);
            }
          });
        },
        fail: (err) => {
          console.log("微信登录失败", err);
        }
      });
    },
    sendUserInfoToBackend(userInfo) {
      common_vendor.index.request({
        url: "http://localhost:9090/login",
        method: "POST",
        data: userInfo,
        success: (res) => {
          this.token = res.data.token;
          console.log("登录成功");
        },
        fail: (err) => {
          console.log("登录失败", err);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "contact-filled",
      size: "100",
      color: "#AFAFAF"
    }),
    b: common_vendor.o((...args) => $options.wxLogin && $options.wxLogin(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/BrowserDownload/Software-Engineering-Group-main/Software-Engineering-Group-main/uni-app/uni_modules/my-login/components/my-login/my-login.vue"]]);
wx.createComponent(Component);
