<template>
	<view class="takeaway-container">
		<view class="takeaway-nav">
			<uni-search-bar @confirm="search" @input="input" bgColor="#ddd" placeholder="搜索商家" radius="50"/>
		</view>
		
		<view class="sort-list">
			<view :class="sortID==0?'sort-selected' :'sort'"  @click="getbusinessCombined()">
				综合排序
			</view>
			<view :class="sortID==1?'sort-selected' :'sort'" @click="getbusinessScore()">
				评分排序
			</view>
			<view :class="sortID==2?'sort-selected' :'sort'" @click="getbusinessSale()">
				销量排序
			</view>
		</view>
		<view class="res-list">
			<view class="res" v-for="item in business" :key="item.id" @click="turnToBus(item.id)">
				<image :src="$hostURL+item.image" class="res-img"></image>
				<view class="res-brief-info">
					<text class="name">{{item.name}}</text><br />
					<text class="score">{{item.score}}分</text>
					<text class="detail">月销：{{item.saleVolume}}</text><br />
					<text class="detail">起送：{{item.beginExpense}}￥  配送费:{{item.deliverExpense}}￥</text><br />
					<text class="detail">30分钟  1.4km</text>
				</view>
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				business:[{
					id:1,
					image:"",
					name:"商家名",
					score:4.9,
					saleVolume:3005,
					beginExpense:20,
					deliverExpense:8
				}],
				sortID:0
			}
		},
		watch: {
		},
		methods: {
			async search(e){
				const res=await this.$myRequest({
					url:'/business/search',
					data:{
						key:e.value
					}
				})
				this.business=res.data;
				console.log(res)
			},
			input(){
				console.log('input')
			},
			//点击商家，接收商家id跳转到商家菜单页面
			turnToBus(busId){
				uni.navigateTo({
					url: '/pages/business/business?busId='+busId,
				});
			},
			//综合排序商家
			async getbusinessCombined(){
				this.sortID=0;
				const res=await this.$myRequest({
					url:'/business/all'
				})
				this.business=res.data;
				console.log(res)
			},
			//分数排序商家
			async getbusinessScore(){
				this.sortID=1;
				const res=await this.$myRequest({
					url:'/business/score'
				})
				this.business=res.data;
				console.log(res)
			},
			//销量排序商家
			async getbusinessSale(){
				this.sortID=2;
				const res=await this.$myRequest({
					url:'/business/sale'
				})
				console.log(res)
				this.business=res.data;
			}
		},
		onLoad(){
			this.getbusinessCombined();
		}
	}
</script>

<style scoped>
	
.uni-searchbar{
	margin: -10rpx 0;
}	
	
.sort-list{
	display: flex;
	justify-content: space-around;
	margin: 0 10rpx;
	padding: 0;
}
.sort{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 34%;
	height: 60rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	font-size: 35rpx;
	background-color: #eee;
}
.sort-selected{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 34%;
	height: 60rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	font-size: 35rpx;
	background-color: #393;
	color: #ffc;
}
.res{
	height: 200rpx;
	display: flex;
	border-radius: 20rpx;
	background-color: #fff;
	box-shadow: 0rpx 10rpx 10rpx #e5e5e5;
	margin: 10rpx;
	padding: 20rpx;
}
.res-img{
	height: 200rpx;
	width: 200rpx;
	border-radius: 10rpx;
}
.res-brief-info{
	margin-left: 20rpx;
}
.name{
	font-weight: bold;
	white-space: nowrap;
	overflow: hidden;
}
.score{
	margin-right: 20rpx;
	font-weight: bold;
	color: orange;
}
.detail{
	font-size: 30rpx;
	color: gray;
}
</style>
