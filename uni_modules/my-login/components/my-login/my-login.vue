<template>
	<view class = "login-container">
		<!-- 图标 -->
		<uni-icons type = "contact-filled" size = "100" color = "#AFAFAF"></uni-icons>
		
		<!-- 登录按钮 -->
		<button type = "primary" class = "btn-login" 
				@click="wxLogin"> 一键登录 </button>
		
		<view class = "tips-text"> 请登录后进行使用！</view>
	</view>
</template>

<script>
	export default 
	{
		data() 
		{
			return {
				userInfo: null
			};
		},
		
		methods: 
		{
			wxLogin() {
				uni.login({
					provider:'weixin',
					success:res => {
						uni.getUserInfo({
							provider:'weixin',
							success: userInfo => {
								this.userInfo = userInfo.userInfo;
								this.sendUserInfoToBackend(this.userInfo);
							},
								
							fail: err => {
								console.log('获取用户信息失败',err);
							}
						});
					},
						
					fail: err => {
						console.log('微信登录失败',err);
					}
				});
			},
			
				
			sendUserInfoToBackend(userInfo) {
				uni.request({
					url: 'http://localhost:9090/login',
					method:'POST',
					data: userInfo,
					success: res=> {
						this.token = res.data.token;
						console.log('登录成功');
					},
						
					fail:err => {
						console.log('登录失败',err);
					}
				});
			}
		}
	}
</script>


<style>
	.login-container {
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	
	
	
	.btn-login {
		width: 90%;
		border-radius:  25px;
		margin: 15px 0;
		background-color: #C00000;
	}
	
	.tips-text {
		font-size: 12px;
		color: gray;
	}
</style>
