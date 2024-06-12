<template>
	<view>
		<view class="orderBlock">
		  <view class="head">
		    <view class="address" @click="toMyAddress()">
		      <view class="map">
		        <view class="iconfont icon-map2">启梦创业广场 1A158-159</view>
		        <view class="name">
		          <text>李四先生</text>
		          <text class="phone">18316588222</text>
		        </view>
		      </view>
		      <view class="iconfont icon-more"></view>
		    </view>
			
		    <view class="time">
		      <view class="iconfont icon-time">
		        <text>立即送出</text>
		        <text>（约16:10送达）</text>
		      </view>
		    </view>
		  </view>
		</view>
		
		<view class="orderDetail">
		  <view class="bus-name-block">
		    <view class="bus-name">
		      <image :src="$hostURL+this.business.image"></image>
		      {{business.name}}
		    </view>
		    <view class="iconfont icon-phone" @click="calling()">联系商家</view>
		  </view>
		  
		  <view class="list" v-for="item in foods">
		    <view class="listLeft">
		      <view class="foodPic">
		        <image :src="$hostURL+item.image"></image>
		      </view>
		      <view class="message">
		        <text>{{item.name}}</text>
		        <text class="price">¥{{item.price}}<text class="oldPrice">￥30</text></text>
		      </view>
		    </view>
		    <view class="listRight">
		      X{{item.num}}
		    </view>
		  </view>
		  
		  
		  <view class="smallBorder">
			  <view class="orderPrice">
			    <text>餐盒费</text>
			    <text>¥{{packExpense}}</text>
			  </view>
			  
		    <view class="orderPrice">
		      <text>配送</text>
		      <text>¥{{business.deliverExpense}}</text>
		    </view>
			
		    <view class="orderPrice">
		      <text class="iconfont icon-pag">红包</text>
		      <text class="iconfont icon-more">无可用红包</text>
		    </view>
		  </view>
		  
		  <view class="totalPrice">
		    <text>总计</text>
		    <text>￥{{expense}}</text>
		  </view>
		</view>
		
		<view class="orderType">
		  <text>支付方式</text>
		  <text>在线支付</text>
		</view>
		
		<view class="other">
		  <view>
		    <text>订单备注</text>
		    <textarea placeholder="请输入您的要求" />
		  </view>
		</view>
		
		<view class="submitOrder">
		  <text class="discount">已优惠¥32</text>
		  <text>实付 <text class="price">¥{{this.expense}}</text></text>
		  <text class="submit" @click="submitOrder()">提交订单</text>
		</view>
		<view class="padding">
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				packExpense:1,
				expense:11,
				business:{
					id:1,
					name:'香茵波克现烤汉堡（武大校内店）',
					saleVolume:321,
					score:4.9,
					image:'/images/bus-img/bus-2.png',
					address:'武汉市武昌区武汉大学东中区九栋一楼',
					tel:'18164297568',
					beginExpense:0,
					deliverExpense:0
				},
				foods:[{
					name:'吮指原味鸡',
					price:11,
					image:'/images/good-img/good-1-1.png',
					saleVolume:300,
					num:0
				}],
			}
		},
		methods: {
			
		},
		
		//接收商家页传过来的商家信息和商品信息，计算金额
		onLoad: function(option){
			uni.showLoading({
				title: '加载中',
				mask:true
			});
			this.business=JSON.parse(decodeURIComponent(option.business));
			this.foods=JSON.parse(decodeURIComponent(option.foods));
			this.expense=parseFloat(option.expense)+this.business.deliverExpense+this.packExpense;
			uni.hideLoading()
		}
	}
</script>

<style scoped>
.head {
  background: white;
  padding: 0 40rpx;
  margin-top: 12rpx;
  line-height: 50rpx;
}
.address,.time{
  padding: 20rpx 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.icon-map2:before {
  font-size: 40rpx;
  margin-right: 40rpx;
}
.name {
  padding-left: 80rpx;
  color: #999;
  font-size: 28rpx;
}
.phone {
  margin-left: 80rpx;
}
.time {
  border-top: 2rpx #ddd solid;
}
.time .icon-time:before {
  font-size: 40rpx;
  margin-right: 40rpx;
}

.orderDetail {
  background: white;
  margin-top: 40rpx;
}
.bus-name-block image {
  width: 70rpx;
  height: 70rpx;
  margin-right: 20rpx;
  border-radius: 5rpx;	
}

.bus-name-block {
  padding: 20rpx 40rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bus-name{
	display: flex;
	justify-content: space-around;
	align-items: center;
	font-weight: bold;
	font-size: 36rpx;
}
.icon-phone {
  font-size: 28rpx;
  color: #999;
}
.icon-phone:before {
  color: #333;
  font-size: 36rpx;
  margin-right: 10rpx;
}
.list {
  border-top: 2rpx #ddd solid;
  display: flex;
  justify-content: space-between;
  padding: 30rpx 40rpx;
}
.list image{
  width: 140rpx;
  height: 140rpx;
  margin-right: 20rpx;
}
.listLeft {
  display: flex;
  align-items: center;
}

.listRight {
  color: #999;
}
.message>text {
  display: block;
  line-height: 80rpx;
}
.oldPrice {
  text-decoration: line-through;
  color: #999;
  font-size: 28rpx;
}
.smallBorder{
	margin-bottom: 40rpx;
}
.orderPrice {
  display: flex;
  padding: 20rpx 40rpx;
  justify-content: space-between;
  align-items: center;
}

.orderPrice .icon-more:after {
  margin-left: 20rpx;
  color: #666;
}
.totalPrice{
	display: flex;
	padding: 30rpx 60rpx;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	font-size: 40rpx;
	border-top: 2rpx solid #ddd;
}
.other {
  margin-top: 20rpx;
  width: 100%;
  overflow: hidden;
  background: white;
}
.other>view {  
  padding: 40rpx;
}
.other textarea {
  border: 2rpx #f2f2f2 solid;
  border-radius: 12rpx;
  resize: none;  
  width: 100%;
  box-sizing: border-box;
  margin-top: 20rpx;
  height: 200rpx;
  padding: 20rpx; 
}
.submitOrder {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  position: fixed;
  bottom: 0;
  left: 0;  
  border-top: 2rpx solid #ddd;
  width: 100%;  
}
.discount {
  padding-left: 40rpx;
}
.submit {
  padding: 40rpx;
  background: #ffe400;
}
.orderType {
  padding: 30rpx 40rpx;
  display: flex;
  justify-content: space-between;
  background: white;
  margin-top: 20rpx;
}
.padding {  
  padding-bottom: 160rpx;
}
</style>
