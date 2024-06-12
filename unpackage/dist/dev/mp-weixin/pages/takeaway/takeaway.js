"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      business: [{
        id: 1,
        image: "",
        name: "商家名",
        score: 4.9,
        saleVolume: 3005,
        beginExpense: 20,
        deliverExpense: 8
      }],
      sortID: 0
    };
  },
  watch: {},
  methods: {
    async search(e) {
      const res = await this.$myRequest({
        url: "/business/search",
        data: {
          key: e.value
        }
      });
      this.business = res.data;
      console.log(res);
    },
    input() {
      console.log("input");
    },
    //点击商家，接收商家id跳转到商家菜单页面
    turnToBus(busId) {
      common_vendor.index.navigateTo({
        url: "/pages/business/business?busId=" + busId
      });
    },
    //综合排序商家
    async getbusinessCombined() {
      this.sortID = 0;
      const res = await this.$myRequest({
        url: "/business/all"
      });
      this.business = res.data;
      console.log(res);
    },
    //分数排序商家
    async getbusinessScore() {
      this.sortID = 1;
      const res = await this.$myRequest({
        url: "/business/score"
      });
      this.business = res.data;
      console.log(res);
    },
    //销量排序商家
    async getbusinessSale() {
      this.sortID = 2;
      const res = await this.$myRequest({
        url: "/business/sale"
      });
      console.log(res);
      this.business = res.data;
    }
  },
  onLoad() {
    this.getbusinessCombined();
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
      bgColor: "#ddd",
      placeholder: "搜索商家",
      radius: "50"
    }),
    d: common_vendor.n($data.sortID == 0 ? "sort-selected" : "sort"),
    e: common_vendor.o(($event) => $options.getbusinessCombined()),
    f: common_vendor.n($data.sortID == 1 ? "sort-selected" : "sort"),
    g: common_vendor.o(($event) => $options.getbusinessScore()),
    h: common_vendor.n($data.sortID == 2 ? "sort-selected" : "sort"),
    i: common_vendor.o(($event) => $options.getbusinessSale()),
    j: common_vendor.f($data.business, (item, k0, i0) => {
      return {
        a: _ctx.$hostURL + item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.score),
        d: common_vendor.t(item.saleVolume),
        e: common_vendor.t(item.beginExpense),
        f: common_vendor.t(item.deliverExpense),
        g: item.id,
        h: common_vendor.o(($event) => $options.turnToBus(item.id), item.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-24088b51"], ["__file", "D:/BrowserDownload/Software-Engineering-Group-main/Software-Engineering-Group-main/uni-app/pages/takeaway/takeaway.vue"]]);
wx.createPage(MiniProgramPage);
