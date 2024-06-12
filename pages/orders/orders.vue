<template>
	<view v-for="(order, index) in orderList" :key="index">
	<view class="order-container">
		<view class="order-banner"></view>
			<view class="main">
				<view class="ord-info">
					<view class="ord-detail">
						<view class="restaurant-name">
							{{order.restaurantName}}
						</view>
					</view>
		<image class="restaurant-image" :src="order.restaurantImage" alt="restaurant Image"></image>
				</view>
				<view class="food-container">
				 <view v-for="(item, index) in order.foodList" :key="index" class="food-item">
				      <image class="food-image" :src="item.foodImage" alt="food Image"></image>
				      <view class="food-name"> {{item.foodName}} </view>
				    </view>
					</view>
				<view class="total-Price">
					￥{{order.totalPrice}}
				</view>
				<view class="quantity">
                   共{{order.quantity}}件
				</view>
	         <view class="operation">
	         	<view class="bus-tab">
	         		<view :class="tab=='order'?'tab tab-active' :'tab'" @click="tabChange('order')">
	         		  评价
	         		</view>
	         		<view :class="tab=='info'?'tab tab-active' :'tab'" @click="tabChange('info')">
	         		  详情
	         		</view>
	         	</view>
			<view class="order" v-if="tab=='order'">
				    <view class="bottom">
						<view class="sat-rid">
							你对骑手满意吗?
							<view contenteditable="true">
						<view>评分:_____</view></view>						 
						</view>
						<view class="sat-fod">
							你对商品满意吗？                
								<view contenteditable="true">
							<view>评分:_____</view></view>   
						</view>
					</view>          
				</view>
				<view class="info" v-if="tab=='info'">
					<view class="info_top">
							<view>
							<span>打包费:</span>
						<view class="packing-price">￥{{order.packprice}}</view>
						</view>
						<view><span>配送费:</span>
						<view class="delvery-price">￥{{order.delprice}}</view>
						</view>
						<view>
							<span>优惠:</span>
						<view class="prefernatial">￥{{order.prefer}}</view>
						</view>
						<span>合计:</span>
						<view class="total-Price">￥{{order.totalPrice}}
						</view>
						</view>
						<view class="address">
							配送地址:{{order.address}}
						</view>
						<view class='number'>
							订单号码:{{order.number}}
						</view>
						<view class="x-time">
							下单时间:2024-{{order.xTime}}/{{order.xTime2}}-{{order.xTime3}}:{{order.xTime4}}
						</view>
						<view class="s-time">
							送达时间:2024-{{order.sTime}}/{{order.sTime2}}-{{order.sTime3}}:{{order.sTime4}}
						</view>
						<view class="paymentmethod">
							支付方式:{{order.paymethod}}
						</view>
					</view>
					</view>
			</view>
			</view>
			</view>
</template>
<script>
	export default{
		data(){
			return{
				tab:'null',
				orderList:[
					{restaurantName:'香菌波克现烤汉堡(武大校园店)',
					restaurantImage:'/static/restaurant.png',
					totalPrice:24,
					quantity:2,
					packprice:3,
					delprice:2,
					prefer:3,
					address:'武汉大学南二门',
					number:592321,
					xTime:6,
					xTime2:12,
					xTime3:13,
					xTime4:12,
					sTime:6,
					sTime2:12,
					sTime3:13,
					sTime4:48,
					paymethod:'在线支付',
				    foodList: [
				        { foodName: '吮指原味鸡', foodImage: '/static/food.png'},
				        { foodName: '吮指原味鸡', foodImage: '/static/food.png'},
						],
				},
					{
						restaurantName:'黄焖鸡米饭（武大校园店)',
						restaurantImage:'/static/restaurant2.png',
						totalPrice:28,
						quantity:2,
						packprice:1,
						delprice:0,
						prefer:5,
						address:'武汉大学信息学部6舍',
						number:832192,
						xTime:6,
						xTime2:13,
						xTime3:14,
						xTime4:21,
						sTime:6,
						sTime2:14,
						sTime3:15,
						sTime4:11,
						paymethod:'在线支付',
					    foodList: [
					       { foodName: '黄焖鸡米饭', foodImage: '/static/food2.png'},
					       { foodName: '可乐', foodImage: '/static/food3.png'},
							],
				},
				]
			}
		},
		methods:{
			tabChange(data){
				if(this.tab===data){
					this.tab=null;
				}else{
					this.tab=data;
				}
			}
		}
	}
</script>

<style scoped>
	.order-banner{
		width: 100%;
		height: 40rpx;
		background-color: #f0f0f0;
	}
	.main{
		margin-top:-20rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		background-color: #fff;
	}
	.ord-info{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.ord-detail{
		width: 30%;
	}
	.restaurant-image{
		width: 160rpx;
		height: 160rpx;
		border: 2rpx solid #aaa;
		border-radius: 20rpx;
	}
	.restaurant-name{
		margin-left: -40px;
		white-space: nowrap;
		font-size: 35rpx;
		font-weight: bold;
		text-align: right;
	}
	.food-image{
		width: 220rpx;
		height: 220rpx;
		border: 2rpx solid #aaa;
		border-radius: 20rpx;
	}
    .food-name{
		margin: 10rpx 0;
		white-space: nowrap;
		overflow: hidden;
		font-size: 40rpx;
		font-weight: bold;
	}
	.total-Price{
		text-align: right;
	}
	.quantity{
		text-align: right;
	}
	.packing-price{
		text-align: right;
	}
	.delvery-price{
		text-align: right;
	}
	.prefernatial{
		text-align: right;
	}
	.bus-tab{
		width: 100;
		display:flex;
		justify-content: space-around;
		border-bottom: 2px solid #eee;
	}
	.tab{
		 padding: 10px 20px;
		  cursor: pointer;
		  border: 1px solid black; /* 添加边框属性 */
		  border-radius: 5px;
	}
	.tab-active{
       background-color: #f7f7f7; /* 设置激活时的背景色 */
       border-color: white; /* 设置白色边框 */
       color: black; /* 设置文本颜色 */
       font-weight: bold;
	}
	.sat-rid{
		margin: 10rpx 0;
		white-space: nowrap;
		overflow: hidden;
		font-size: 30rpx;
		font-weight: bold;
	}
	.sat-fod{
		margin: 10rpx 0;
		white-space: nowrap;
		overflow: hidden;
		font-size: 30rpx;
		font-weight: bold;
	}
	.flex-container {
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	.bottom{
	
	}
	.info_top{
		margin-top: 10rpx;
		background: white;
		padding: 20rpx 40rpx;
	}
	.food-container{
		display: flex;
		  flex-direction: row;
		  justify-content: flex-start; /* 可根据需要设置对齐方式 */
	}
</style>