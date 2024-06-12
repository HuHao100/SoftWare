"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      swiper: []
    };
  },
  methods: {
    search() {
      console.log("search");
    },
    input() {
      console.log("input");
    },
    //调用util/api.js中封装的链接方法，请求轮播图数据
    async getSwiper() {
      const res = await this.$myRequest({
        url: "/music/select"
      });
      console.log(res);
      this.swiper = res;
    }
  },
  onLoad() {
    this.getSwiper();
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.search),
    b: common_vendor.o($options.input),
    c: common_vendor.p({
      bgColor: "rgba(255,255,255,1)",
      placeholder: "搜索",
      radius: "50"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/BrowserDownload/Software-Engineering-Group-main/Software-Engineering-Group-main/uni-app/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
