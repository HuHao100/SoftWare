//后端端口
const BASE_url='http://localhost:9090'

//封装链接请求方法
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_url+options.url,
			method:options.method||'GET',
			data:options.data||{},
			success: (res) => {
				if(res.statusCode!==200){
					uni.showToast({
						title:'获取数据失败',
						icon:"error"
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:'请求接口失败',
					icon:"error"
				})
				reject(err)
			}
		})
	})
}