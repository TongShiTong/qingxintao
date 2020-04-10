import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

//挂载一些常用的属性/方法 [全局变量、全局方法] (这种挂载的方式就省去在每个所需页面引入的操作，直接this.的方式就可以调取这个方法) start

//gloabal路径

Vue.prototype.$BASE_URL = "http://www.qingxintao.com" //测试版  平时开发用这个
Vue.prototype.$ANNEX_URL = "http://www.qingxintao.com" //测试版  平时开发用这个

//复制粘贴的功能
Vue.prototype.$PIC = function(picUrl) {
	if (picUrl.indexOf('https://') == -1 && picUrl.indexOf('http://') == -1&& picUrl.indexOf('//') == -1) {
		picUrl = this.$ANNEX_URL + picUrl;
	}
	return picUrl;
}
// get请求方法
Vue.prototype.$GET_FUN = function(url, data, Success, Fail) {
	if (url.indexOf('https://') == -1 && url.indexOf('http://') == -1) {
		url = this.$BASE_URL + url;
	}
	let TOKEN=uni.getStorageSync("token");
	//console.log(TOKEN);
	uni.request({
		url: url, //接口地址
		data: data, //传入的数据
		method: "GET",
		dataType: "json",
		header: {
			// 'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
			'content-type': 'multipart/form-data' ,//自定义请求头信息
			'Accept': 'application/json, text/javascript, ' ,//自定义请求头信息
			'X-Requested-With': 'XMLHttpRequest' ,//自定义请求头信息
			'token':TOKEN,
		},
		success: (res) => {
			if (typeof Success === "function") {
				Success(res)
			}
		},
		fail: (errMsg) => {
			if (typeof Fail === "function") {
				Fail(errMsg)
			}
		}
	});
}

// post请求方法
Vue.prototype.$POST_FUN = function(url, data, Success, Fail) {
	if (url.indexOf('https://') == -1 && url.indexOf('http://') == -1) {
		url = this.$BASE_URL + url;
	}
	let TOKEN=uni.getStorageSync("token");
	uni.request({
		url: url, //接口地址
		data: data, //传入的数据
		method: "POST",
		dataType: "json",
		header: {
			'content-type': 'application/x-www-form-urlencoded' ,//自定义请求头信息
			'token':TOKEN,
		},
		success: (res) => {
			if (typeof Success === "function") {
				Success(res)
			}
		},
		fail: (errMsg) => {
			if (typeof Fail === "function") {
				Fail(errMsg)
			}
			uni.getNetworkType({
				success: function(res) {
					console.log(res.networkType);
					if (res.networkType == 'none') {
						uni.showToast({
							title: "请检查网络",
							icon: "none"
						})
					}
				}
			});
		}
	});
}

// //单个文件或图片上传
// Vue.prototype.$UPLOAD_FILE = function(url, File, Success, Fail) {
// 	if (url.indexOf('https://') == -1 && url.indexOf('http://') == -1) {
// 		url = this.$BASE_URL + url;
// 	}
// 	let TOKEN=uni.getStorageSync("token");
// 	let filesList=[];
	
// 	uni.uploadFile({
// 		url: _this.$BASE_URL + "/common/upload",
// 		files:filesList,
// 		filePath: res.tempFiles[0].path,
// 		name: "file",
// 		header: {
// 			'token': uni.getStorageSync("token"),
// 			'X-Requested-With': 'XMLHttpRequest',
// 			// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
// 		},
// 		success: (res) => {
// 			if (typeof Success === "function") {
// 				Success(res)
// 			}
// 		},
// 		fail: (res) => {
// 			if (typeof Fail === "function") {
// 				Fail(errMsg)
// 			}
// 			uni.getNetworkType({
// 				success: function(res) {
// 					console.log(res.networkType);
// 					if (res.networkType == 'none') {
// 						uni.showToast({
// 							title: "请检查网络",
// 							icon: "none"
// 						})
// 					}
// 				}
// 			});
// 		},
// 	});
// }


Vue.prototype.$USERINFO = function() {
	var userInfo = {
		avatar:'/static/images/avatar.png',
		nick:'',
		inviteId:'',
		vipLevel:'',
		time:'',
		yue:'',
		drz_money:'',
		sum_money:'',
		isLogin:false,
		isvip:false,
	}
	let userInfoData=uni.getStorageSync("userInfo")||userInfo;
	return userInfoData;
}

//时间戳转  y-m-d h:m:s 格式
Vue.prototype.timestampToTime = function(timestamp) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	return Y + M + D + h + m + s;
}

//时间戳转  自定义格式
Vue.prototype.timestampToTime02 = function(timestamp, type) {
	var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var Y = date.getFullYear() + '-';
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

	switch (type) {
		case 1:
			return M + D;
			break;
	}

}

//复制粘贴的功能
Vue.prototype.copyFun = function(txt) {
	uni.setClipboardData({
		data: txt,
		success: function() {
			uni.showToast({
				title: '复制成功！',
				icon: 'none'
			});
		}
	});
}

//弹出框方式
Vue.prototype.alertFun = function(txt) {
		uni.showToast({
			title: txt,
			icon: 'none',
			duration: 1000
		})
	},

	//自定义的导航栏的返回事件
	Vue.prototype.backToBeforePage = function() {
		uni.navigateBack({
			delta: 1
		});
	}

//挂载一些常用的属性/方法 [全局变量、全局方法] (这种挂载的方式就省去在每个所需页面引入的操作，直接this.的方式就可以调取这个方法) end 

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
