<template>
	
	<!-- 添加判断是否登录,登录则展示登录界面,默认未登录 -->
	<view>
		<my-login></my-login>
	</view>
		
	<!-- <view>
		<view class="info">
			<img src="/static/logo.png" alt="" class="avatar"/>
			<text class="username">Hoshino</text>
		</view>
	</view> -->
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
		}
	}
</script>

<style>
	.info{
		background-color: aqua;
		padding: 30rpx;
	}
	
	.avatar{
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
	}
	.username{
		margin: 50rpx;
		vertical-align: top;
	}
</style>
