<template>
	<view class="container">
		<view class="banner"></view>
		<view class="main">
			<view class="bus-info">
				<view class="bus-detail">
					<view class="name">
						{{business.name}}
					</view>
					<view class="score">
						{{business.score}}分
					</view>
					<view class="saleVolume">
						月销：{{business.saleVolume}}
					</view>
				</view>
				<image :src="$hostURL+business.image" class="bus-img" />
			</view>
			<view class="operation">
				<view class="bus-tab">
					<view :class="tab=='order'?'tab tab-active' :'tab'" @click="tabChange('order')">
					  点菜
					</view>
					<view :class="tab=='info'?'tab tab-active' :'tab'" @click="tabChange('info')">
					  商家
					</view>
				</view>
				<view class="order" v-if="tab=='order'">
					<scroll-view scroll-y="true" class="order-menubar">
						<view v-for="(item,index) in menu" :key="item.id" :class="index==menuID?'menu menu-selected' :'menu'" @click="menuChange(index)">
							{{item.type}}
						</view>
					</scroll-view>
					
					<scroll-view scroll-y="true" class="order-foodbar">
						<view v-for="(item,index) in foods" :key="item.id" class="food-info">
							<image :src="$hostURL+item.image" mode="heightFix" class="food-img"></image>
							<view class="food-detail">
								<view class="food-name">{{item.name}}</view>
								<view class="food-price">￥{{item.price}}</view>
								<view class="addOrReduce">
								  <text class="iconfont icon-reduce" @click="reduce(index)"></text>
								  <text> {{item.num}}</text>
								  <text class="iconfont icon-add" @click="add(index)"></text>
								</view>
							</view>
							
						</view>
					</scroll-view>
					<view class="bottomTab">
						<view class="curExpense">
							￥{{curExpense}}
						</view>
						<view class="delExpense">
							｜配送费：￥{{business.deliverExpense}}
						</view>
						<view class="confirm-enough"  v-if="this.expenseEnough" @click="toSubmitOrder()">
							选好了
						</view>
						<view class="confirm" v-else>
							￥{{business.beginExpense}}起送
						</view>
					</view>
				</view>
				<view class="info" v-if="tab=='info'">
					<view class="info_top">
					  <view class="info_title">
					    商家信息
					  </view>
					  <view class="iconfont icon-map">{{business.address}}</view>
					  <view class="iconfont icon-time2">配送时间：10:30-20:00</view>
					  <view class="iconfont icon-car">商家提供配送服务</view>
					  <view class="iconfont icon-money">¥{{business.beginExpense}}元起送｜配送费¥{{business.deliverExpense}}</view>
					  <view class="iconfont">电话：{{business.tel}}</view>
					</view>
					<view class="info_top">
					  <view class="info_title">
					    店内活动
					  </view>
					  <view class="iconfont icon-zhekou">满22减17；满50减33（在线支付专享）</view>
					  <view class="iconfont icon-zhekou">折扣商品2.6折起（在线支付专享)</view>
					  <view class="iconfont icon-zhekou">部分商品第二份半价</view>
					  
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab:'order',
				menuID:0,
				curExpense:0,
				expenseEnough:false,
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
				menu:[],
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
			//点击板块改变样式
			tabChange(data){
				this.tab=data;
			},
			menuChange(data){
				this.menuID=data;
			},
			//点击菜品的加减号时，使对应菜品对象的num变化，并遍历菜品数组计算当前价格
			add(index){
				this.foods[index].num++;
				this.countCurExpense()
			},
			reduce(index){
				if(this.foods[index].num>0){
					this.foods[index].num--;
					this.countCurExpense()
				}
			},
			countCurExpense(){
				var sum=0;
				for(var i=0;i<this.foods.length;i++){
					sum+=this.foods[i].num*this.foods[i].price;
				}
				this.curExpense=sum;
				if(this.curExpense>=this.business.beginExpense){
					this.expenseEnough=true;
				}else{
					this.expenseEnough=false;
				}
			},
			
			//跳转提交订单页面，把商家信息，选择的菜品信息，和总价格传过去。
			toSubmitOrder(){
				var chosenFoods=[];
				for(var i=0;i<this.foods.length;i++){
					if(this.foods[i].num!=0){
						chosenFoods.push(this.foods[i]);
					}
				}
				var business=encodeURIComponent(JSON.stringify(this.business));
				var foods=encodeURIComponent(JSON.stringify(chosenFoods));
				uni.navigateTo({
					url: '/pages/submitOrder/submitOrder?business='+business+'&foods='+foods+'&expense='+this.curExpense,
					
				});
			},
			
			//网络请求，获得相关信息
			async getBusInfo(busId){
				const res=await this.$myRequest({
					url:'/business/selectById',
					data:{
						id:busId
					}
				})
				this.business=res.data;
				console.log(res)
			},
			async getMenu(busId){
				const res=await this.$myRequest({
					url:'/menu/select',
					data:{
						id:busId
					}
				})
				this.menu=res.data;
			},
			async getfood(busId){
				const res=await this.$myRequest({
					url:'/food/select',
					data:{
						id:busId
					}
				})
				this.foods=res.data;
				for(var i=0;i<this.foods.length;i++){
					this.foods[i].num=0;
				}
				console.log(res);
			}
		},
		//接收外卖页传来的商家id，获取商家信息和菜单，渲染页面
		onLoad: function(option){
			uni.showLoading({
				title: '加载中',
				mask:true
			});
			this.getBusInfo(option.busId);
			this.getMenu(option.busId);
			this.getfood(option.busId);
			uni.hideLoading()
		}
	}
	
</script>

<style scoped>
	.banner{
		width: 100%;
		height: 150rpx;
		background-color: aquamarine;
	}
	.main{
		margin-top: -20rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		background-color: #fff;
	}
	.bus-info{
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.bus-detail{
		width: 60%;
	}
	.bus-img{
		width: 160rpx;
		height: 160rpx;
		border: 2rpx solid #aaa;
		border-radius: 20rpx;
	}
	.name{
		margin: 10rpx 0;
		white-space: nowrap;
		overflow: hidden;
		font-size: 40rpx;
		font-weight: bold;
	}
	.score{
		color: orange;
		display: inline-block;
		margin-right: 30rpx;
	}
	.saleVolume{
		display: inline-block;
	}
	.bus-tab{
		width: 100;
		display: flex;
		justify-content: space-around;
		border-bottom: 2px solid #eee;
	}
	.tab{
		width: 30%;
		padding: 30rpx;  
		text-align: center;
	}
	.tab-active{
		border-bottom: 4rpx solid #ffe400;
	}
	
	.order-menubar{
		float: left;
		height: 950rpx;
		padding-bottom: 130rpx;
		width: 25%;
		background: #eee;
	}
	.order-foodbar{
		float: left;
		height: 1080rpx;
		width: 75%;
	}
	.menu{
		padding: 40rpx 0;
		text-align: center;
		overflow: hidden;
		border-bottom: 2rpx solid #ddd;
	}
	.menu-selected{
		background-color: #fff;
		border-left: 8rpx solid #ffe400;
	}
	
	.food-info{
		display: flex;
		height: 250rpx;
		background-color: #fff;
		border-radius: 30rpx;
		border: 2rpx solid #ddd;
		margin: 15rpx;
	}
	.food-info .food-img{
		height: 100%;
		margin-left: 30rpx;
		max-width: 280rpx
	}
	.food-detail{
		position: absolute;
		right: 15%;
		padding-top:20rpx;
		text-align: right;
		height: 250rpx;
	}
	.food-name{
		float:right;
		max-height: 100rpx;
		overflow: hidden;
		font-size: 26rpx;
		width: 150rpx;
	}
	.food-price{
		color: red;
		font-size: 40rpx;
	}
	.addOrReduce{
		position: absolute;
		bottom: 60rpx;
		right: -10rpx;
	}
	.addOrReduce > .iconfont {
	  font-size: 40rpx;
	  color: #ffe400;
	  padding:15rpx;
	}
	
	.info_top {
	  margin-top: 10rpx;
	  background: white;
	  padding: 20rpx 40rpx;
	}
	.info_title {
	  font-weight: bold;
	  border-bottom: 2rpx solid #ddd;
	  padding-bottom: 20rpx;
	}
	.info_top>.iconfont {
	  line-height: 60rpx;
	  font-size: 28rpx;
	  color: #666;
	}
	.info_top>.iconfont:before {
	  margin-right: 20rpx;
	  font-size: 40rpx;
	}
	.info_top>.icon-zhekou:before {  
	  color: #f74d4d;
	}
	
	.bottomTab{
		position: fixed;
		bottom: 30rpx;
		background: #222;
		display: flex;
		align-items: center;
		width: 90%;
		border-radius: 50rpx;
		margin: 0 5%;
		height: 100rpx;
		
	}
	.bottomTab .curExpense{
		color: #fff;
		font-size: 40rpx;
		text-align: right;
		padding: 30rpx;
		flex-grow: 0.2;
	}
	.bottomTab .delExpense{
		color: #ccc;
		font-size: 27rpx;
	}
	.bottomTab .confirm{
		position:absolute;
		right: -2rpx;
		color: #ccc;
		font-size: 35rpx;
		
		width: 200rpx;
	}
	.bottomTab .confirm-enough{
		position:absolute;
		right: -2rpx;
		
		color: #000;
		height: 100rpx;
		width: 200rpx;
		border-top-right-radius: 50rpx;
		border-bottom-right-radius: 50rpx;
		font-size: 35rpx;
		font-weight: bold;
		text-align: center;
		line-height: 100rpx;
		background-color: #ffe400;
	}
</style>
