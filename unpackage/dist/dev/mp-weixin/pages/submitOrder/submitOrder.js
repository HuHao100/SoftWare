"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      packExpense: 1,
      expense: 11,
      business: {
        id: 1,
        name: "香茵波克现烤汉堡（武大校内店）",
        saleVolume: 321,
        score: 4.9,
        image: "/images/bus-img/bus-2.png",
        address: "武汉市武昌区武汉大学东中区九栋一楼",
        tel: "18164297568",
        beginExpense: 0,
        deliverExpense: 0
      },
      foods: [{
        name: "吮指原味鸡",
        price: 11,
        image: "/images/good-img/good-1-1.png",
        saleVolume: 300,
        num: 0
      }]
    };
  },
  methods: {},
  //接收商家页传过来的商家信息和商品信息，计算金额
  onLoad: function(option) {
    common_vendor.index.showLoading({
      title: "加载中",
      mask: true
    });
    this.business = JSON.parse(decodeURIComponent(option.business));
    this.foods = JSON.parse(decodeURIComponent(option.foods));
    this.expense = parseFloat(option.expense) + this.business.deliverExpense + this.packExpense;
    common_vendor.index.hideLoading();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => _ctx.toMyAddress()),
    b: _ctx.$hostURL + this.business.image,
    c: common_vendor.t($data.business.name),
    d: common_vendor.o(($event) => _ctx.calling()),
    e: common_vendor.f($data.foods, (item, k0, i0) => {
      return {
        a: _ctx.$hostURL + item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.t(item.num)
      };
    }),
    f: common_vendor.t($data.packExpense),
    g: common_vendor.t($data.business.deliverExpense),
    h: common_vendor.t($data.expense),
    i: common_vendor.t(this.expense),
    j: common_vendor.o(($event) => _ctx.submitOrder())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0d2051e8"], ["__file", "D:/BrowserDownload/Software-Engineering-Group-main/Software-Engineering-Group-main/uni-app/pages/submitOrder/submitOrder.vue"]]);
wx.createPage(MiniProgramPage);
