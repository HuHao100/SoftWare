"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      tab: "order",
      menuID: 0,
      curExpense: 0,
      expenseEnough: false,
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
      menu: [],
      foods: [{
        name: "吮指原味鸡",
        price: 11,
        image: "/images/good-img/good-1-1.png",
        saleVolume: 300,
        num: 0
      }]
    };
  },
  methods: {
    //点击板块改变样式
    tabChange(data) {
      this.tab = data;
    },
    menuChange(data) {
      this.menuID = data;
    },
    //点击菜品的加减号时，使对应菜品对象的num变化，并遍历菜品数组计算当前价格
    add(index) {
      this.foods[index].num++;
      this.countCurExpense();
    },
    reduce(index) {
      if (this.foods[index].num > 0) {
        this.foods[index].num--;
        this.countCurExpense();
      }
    },
    countCurExpense() {
      var sum = 0;
      for (var i = 0; i < this.foods.length; i++) {
        sum += this.foods[i].num * this.foods[i].price;
      }
      this.curExpense = sum;
      if (this.curExpense >= this.business.beginExpense) {
        this.expenseEnough = true;
      } else {
        this.expenseEnough = false;
      }
    },
    //跳转提交订单页面，把商家信息，选择的菜品信息，和总价格传过去。
    toSubmitOrder() {
      var chosenFoods = [];
      for (var i = 0; i < this.foods.length; i++) {
        if (this.foods[i].num != 0) {
          chosenFoods.push(this.foods[i]);
        }
      }
      var business = encodeURIComponent(JSON.stringify(this.business));
      var foods = encodeURIComponent(JSON.stringify(chosenFoods));
      common_vendor.index.navigateTo({
        url: "/pages/submitOrder/submitOrder?business=" + business + "&foods=" + foods + "&expense=" + this.curExpense
      });
    },
    //网络请求，获得相关信息
    async getBusInfo(busId) {
      const res = await this.$myRequest({
        url: "/business/selectById",
        data: {
          id: busId
        }
      });
      this.business = res.data;
      console.log(res);
    },
    async getMenu(busId) {
      const res = await this.$myRequest({
        url: "/menu/select",
        data: {
          id: busId
        }
      });
      this.menu = res.data;
    },
    async getfood(busId) {
      const res = await this.$myRequest({
        url: "/food/select",
        data: {
          id: busId
        }
      });
      this.foods = res.data;
      for (var i = 0; i < this.foods.length; i++) {
        this.foods[i].num = 0;
      }
      console.log(res);
    }
  },
  //接收外卖页传来的商家id，获取商家信息和菜单，渲染页面
  onLoad: function(option) {
    common_vendor.index.showLoading({
      title: "加载中",
      mask: true
    });
    this.getBusInfo(option.busId);
    this.getMenu(option.busId);
    this.getfood(option.busId);
    common_vendor.index.hideLoading();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.business.name),
    b: common_vendor.t($data.business.score),
    c: common_vendor.t($data.business.saleVolume),
    d: _ctx.$hostURL + $data.business.image,
    e: common_vendor.n($data.tab == "order" ? "tab tab-active" : "tab"),
    f: common_vendor.o(($event) => $options.tabChange("order")),
    g: common_vendor.n($data.tab == "info" ? "tab tab-active" : "tab"),
    h: common_vendor.o(($event) => $options.tabChange("info")),
    i: $data.tab == "order"
  }, $data.tab == "order" ? common_vendor.e({
    j: common_vendor.f($data.menu, (item, index, i0) => {
      return {
        a: common_vendor.t(item.type),
        b: item.id,
        c: common_vendor.n(index == $data.menuID ? "menu menu-selected" : "menu"),
        d: common_vendor.o(($event) => $options.menuChange(index), item.id)
      };
    }),
    k: common_vendor.f($data.foods, (item, index, i0) => {
      return {
        a: _ctx.$hostURL + item.image,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.price),
        d: common_vendor.o(($event) => $options.reduce(index), item.id),
        e: common_vendor.t(item.num),
        f: common_vendor.o(($event) => $options.add(index), item.id),
        g: item.id
      };
    }),
    l: common_vendor.t($data.curExpense),
    m: common_vendor.t($data.business.deliverExpense),
    n: this.expenseEnough
  }, this.expenseEnough ? {
    o: common_vendor.o(($event) => $options.toSubmitOrder())
  } : {
    p: common_vendor.t($data.business.beginExpense)
  }) : {}, {
    q: $data.tab == "info"
  }, $data.tab == "info" ? {
    r: common_vendor.t($data.business.address),
    s: common_vendor.t($data.business.beginExpense),
    t: common_vendor.t($data.business.deliverExpense),
    v: common_vendor.t($data.business.tel)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ec9204da"], ["__file", "D:/BrowserDownload/Software-Engineering-Group-main/Software-Engineering-Group-main/uni-app/pages/business/business.vue"]]);
wx.createPage(MiniProgramPage);
