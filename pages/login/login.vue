<template>
	<view class="page">
		<image src="../../static/images/logo.png" class="logo" mode="aspectFill"></image>

		<view class="formBox">
			<input placeholder="手机号" placeholder-class="defaultInput" class="telInput" v-model="mobile" />
			<view class="codeBox">
				<input placeholder="验证码" class="codeInput" placeholder-class="defaultInput" v-model="code" />
				<view class="codeTxt" @click="countTime">{{ codeTxt }}</view>
			</view>

			<view class="btnItem loginBtn" @click="loginFun()">登录</view>
			<navigator class="btnItem zcBtn" url="register">注册</navigator>

			<view class="btnItem loginBtn" @click="taobaoLogin()">淘宝登录</view>
		</view>
	</view>
</template>

<script>
const Alibcsdk = uni.requireNativePlugin('UZK-Alibcsdk');

var countTime = 60; //倒计时事件
var timer = null; //定时器
var canClick = true; //防重复点击获取验证码按钮

export default {
	data() {
		return {
			codeTxt: '获取验证码',
			mobile: '',
			code: ''
		};
	},
	onLoad() {},
	methods: {
		//登录
		loginFun() {
			var _this = this;
			var myreg = /^[1][0-9]{10}$/;
			var mobile = this.mobile;
			var code = this.code;
			if (!myreg.test(mobile)) {
				this.alertFun('请输入正确的手机号');
			} else if (!code) {
				this.alertFun('请输入验证码');
			} else {
				_this.$GET_FUN(
					'/api/user/mobilelogin',
					{
						mobile: _this.mobile,
						captcha: code
					},
					res => {
						if (res.data.code == 1) {
							let userinfo = res.data.data.userinfo;
							let token = res.data.data.userinfo.token;
							userinfo.avatar = _this.$PIC(userinfo.avatar);
							userinfo.isLogin = true;
							uni.setStorageSync('userInfo', userinfo);
							uni.setStorageSync('token', token);
							this.alertFun('登录成功');
							setTimeout(function() {
								uni.reLaunch({
									url: '../user/index'
								});
							}, 1500);
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				);
			}
		},
		countTime() {
			var _this = this;
			if (canClick) {
				canClick = false;
				_this.$GET_FUN(
					'/api/sms/send',
					{
						mobile: _this.mobile,
						event: 'mobilelogin'
					},
					res => {
						if (res.data.code == 1) {
							let resData = [];
							let timeFun = function() {
								if (countTime > 0) {
									countTime--;
									_this.codeTxt = countTime + 's后重新获取';
									setTimeout(function() {
										timeFun();
									}, 1000);
								} else {
									countTime = 60;
									_this.codeTxt = '重新获取';
									clearInterval(timer);
									canClick = true;
								}
							};
							timeFun();
							// timer = setInterval(,1000)
						} else {
							canClick = true;
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					}
				);
			}
		},
		taobaoLogin() {
			var _this = this;
			var res = Alibcsdk.init(result => {
				Alibcsdk.login(result => {
					if (result.status == true) {
						uni.setStorageSync('AlibcUserInfo', result.data);

						_this.$POST_FUN('/api/user/taobaoLogin', result.data, res => {
							if (res.data.code == 1) {
								let userinfo = res.data.data.userinfo;
								let token = res.data.data.userinfo.token;
								userinfo.avatar = _this.$PIC(userinfo.avatar);
								userinfo.isLogin = true;
								uni.setStorageSync('userInfo', userinfo);
								uni.setStorageSync('token', token);
								this.alertFun('登录成功');
								setTimeout(function() {
									uni.reLaunch({
										url: '../user/index'
									});
								}, 1500);
								
								// _this.alertFun(res.data.msg);
								// setTimeout(function() {
								// 	uni.reLaunch({
								// 		url: '../user/index'
								// 	});
								// }, 1500);
							} else if (res.data.code == 818) {
								//跳转到信息完善页面信息
								_this.alertFun("完善用户信息");
								setTimeout(function() {
									uni.reLaunch({
										url: '../user/index'
									});
								}, 1500);
							} else {
								_this.alertFun(res.data.msg);
							}
						});
						console.log(result);
					} else {
						//授权失败
						_this.alertFun('授权失败');
					}
				});
			});
		}
	}
};
</script>
<style>
.page {
	background: #f7f7f5;
	padding-top: 80rpx;
	height: calc(100vh - 80rpx);
}
.logo {
	width: 140rpx;
	height: 140rpx;
	display: block;
	margin: 0 auto 80rpx;
}

.formBox {
	padding: 0 80rpx;
}
.defaultInput {
	font-size: 28rpx;
	color: #a2a2a2;
}
.telInput {
	width: calc(100% - 60rpx);
	height: 80rpx;
	background: #fff;
	border-radius: 50px;
	padding: 0 30rpx;
	font-size: 28rpx;
	color: #222;
}
.codeBox {
	width: calc(100% - 60rpx);
	height: 80rpx;
	background: #fff;
	border-radius: 50px;
	padding: 0 30rpx;
	margin: 20rpx 0 80rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.codeInput {
	width: 50%;
	font-size: 28rpx;
	color: #222;
}
.codeTxt {
	font-size: 28rpx;
	color: #f33824;
}
.btnItem {
	width: 80%;
	height: 80rpx;
	text-align: center;
	line-height: 80rpx;
	font-size: 30rpx;
	color: #fff;
	margin: 0 auto 30rpx;
	background: #f2897d;
	border-radius: 50px;
}
.loginBtn {
	background: linear-gradient(to bottom, #fd6652, #f02b16);
}
</style>
