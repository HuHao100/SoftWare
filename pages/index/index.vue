<template>
	<view class="index-container">
		<uni-search-bar @confirm="search" @input="input" bgColor="rgba(255,255,255,1)" placeholder="搜索" radius="50"/>
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular class="swiper">
			<swiper-item>
				<view class="swiper-item">
					<image src="/static/entry_swiper_CrazyThursday.jpg" class="swiper-img"/>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="/static/logo.png" class="swiper-img" />
				</view>
			</swiper-item>
		</swiper>
		
		<view class="outerbox">
			<view class="innerbox">
				<image src="/static/icons/index-idle.png" class="icon"></image>
				<text>收闲置</text>
			</view>
			
			<navigator url="/pages/takeaway/takeaway">
				<view class="innerbox">
					<image src="/static/icons/index-takeaway.png" class="icon"></image>
					<text>点外卖</text>
				</view>
				
			</navigator>
			
			<view class="innerbox">
				<image src="/static/icons/index-delivery.png" class="icon"></image>
				<text>取快递</text>
			</view>
		</view>
		<view class="recommand-text">
			<text>兴趣推荐</text>
		</view>
		<view class="recommand-list">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiper:[],
			}
		},
		methods: {
			search(){
				console.log('search');
			},
			input(){
				console.log('input')
			},
				
			//调用util/api.js中封装的链接方法，请求轮播图数据
			async getSwiper(){
				const res=await this.$myRequest({
					url:'/music/select'
				})
				console.log(res);
				this.swiper=res;
			}
		},
		onLoad() {
			this.getSwiper()
		}
	}
</script>

<style lang="scss" scoped>
	
	
	.index-container {
		padding-top: 80rpx;
		font-size: 14px;
		line-height: 24px;
	}
	.swiper{
		border-radius: 20rpx;
		overflow: hidden;
		margin: 20rpx;
		height: 400rpx;
		.swiper-img{
			width: 100%;
		}
	}
	.outerbox{
		font-size: 30rpx;
		background-color: white;
		display: flex;
		justify-content: space-around;
		margin-top: 10rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-radius: 20rpx;
		box-shadow: 0rpx 10rpx 10rpx #e5e5e5;
	}
	.innerbox{
		width: 180rpx;
		height: 200rpx;
		border-radius: 5%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.icon{
		width: 100rpx;
		height: 100rpx;
	}
	
	.recommand-text{
		margin-top: 30rpx;
		margin-left: 30rpx;
		font-size: 35rpx;
	}
	
</style>
