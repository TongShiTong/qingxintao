<template>
	<view class="content-box">
		<view class="setting">
			<view class="box01">
				<view class="headBox">
					<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
					<view class="headTitle">设置</view>
					<navigator class="rightBox"></navigator>
				</view>
			</view>
		</view>
		<!-- <view style="height: 60upx;"></view> -->
		<view class="form">
			<!-- <navigator url="/pages/Identity_switch/Identity_switch?yonggong=2" hover-class="none" class="call-box">
				<view class="call">身份切换</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator> -->
			<navigator url="/pages/setting/info" hover-class="none" class="call-box">
				<view class="call">个人资料</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<view @tap="taoBaoAuth" hover-class="none" class="call-box">
				<view class="call">淘宝授权</view>
				<view>
					已授权/未授权
					<image src="/static/user/gengduo-icon2x.png"></image>
				</view>
			</view>
			<view @tap="unTaoBaoAuth" hover-class="none" class="call-box">
				<view class="call">取消淘宝授权</view>
				<view>
					已授权/未授权
					<image src="/static/user/gengduo-icon2x.png"></image>
				</view>
			</view>
			<view @tap="channelRecord" hover-class="none" class="call-box">
				<view class="call">渠道备案</view>
				<view>
					已授权/未授权
					<image src="/static/user/gengduo-icon2x.png"></image>
				</view>
			</view>

			<navigator url="/pages/setting/setting" hover-class="none" class="call-box">
				<view class="call">服务协议及隐私政策</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<navigator url="/pages/setting/feedback" hover-class="none" class="call-box">
				<view class="call">联系我们</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<!-- <navigator url="/pages/login/login" hover-class="none" class="call-box">
				<view class="call">登录</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator> -->
			<!-- <navigator url="/pages/index/hunter_terminal/user/c_service/c_service" hover-class="none" class="call-box">
				<view class="call">联系方式</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator> -->
			<navigator url="/pages/setting/feedback" hover-class="none" class="call-box">
				<view class="call">意见反馈</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<!-- <navigator url="/pages/logout/logout" hover-class="none" class="call-box" style="border: none;">
				<view class="call">注销账号</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator> -->
		</view>
		<view @tap="loginOut">
			<view class="call1">退出登录</view>
			<!-- <view>></view> -->
		</view>
	</view>
</template>

<script>
const Alibcsdk = uni.requireNativePlugin('UZK-Alibcsdk');
export default {
	data() {
		return {
			userInfo: this.$USERINFO(),
			typeid: '',
			realname: '',
			id_card: '',
			mobile: ''
		};
	},
	onLoad() {},
	methods: {
		taoBaoAuth: function(e) {
			var _this = this;
			var res = Alibcsdk.init(result => {
				Alibcsdk.login(result => {
					// {
					// 	"msg": "登录成功",
					// 	"data": {
					// 		"nick": "沉醉_寒风",
					// 		"topAuthCode": "EKm8t1rjiK6342P5OlR4MC506431844",
					// 		"openSid": "503bf690d0f2849e7d2c79f28f0f1cbf800066ea7b921f56a6445c2a00c1803ed67cd6ef8a9b5b1f2a5bfc2d11ab912b",
					// 		"avatarUrl": "https://wwc.alicdn.com/avatar/getAvatar.do?userIdStrV2=6FKsVBini39Fc5il4hMYNgTT&type=taobao",
					// 		"topExpireTime": "7776000",
					// 		"openId": "AAGlNMb8AJoHEEDRSYA5IsDx",
					// 		"topAccessToken": "6300c21eca47056fd75c53c45dfa599a2caa9bfb122b96d379553966",
					// 		"userid": "379553966"
					// 	},
					// 	"status": true
					// }
					if (result.status == true) {
						uni.setStorageSync('AlibcUserInfo', result.data);
						console.log(result.data)
						_this.$POST_FUN('/api/user/taobaoBand', result.data, res => {
							console.log(res);
							if (res.data.code == 1) {
								_this.alertFun(res.data.msg);
							}else{
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
		},

		channelRecord() {
			var _this = this;
			var url = 'https://mos.m.taobao.com/inviter/register?inviterCode=2W7YYZ&src=pub&app=common&rtag=qxt' + _this.userInfo.id;
			Alibcsdk.openurl(
				{
					url: url
				},
				result => {
					console.log(result);
				}
			);
		},
		unTaoBaoAuth(e) {
			Alibcsdk.logout(result => {
				if (result.status) {
					this.alertFun('登出成功');
					// uni.showToast({
					// 	title: '登出成功'
					// });
				}
				console.log(JSON.stringify(result));
			});
		},
		loginOut() {
			var _this = this;
			_this.$GET_FUN(
				'/api/user/logout',
				{},
				res => {
					uni.removeStorageSync('userInfo');
					uni.removeStorageSync('token');
					this.alertFun('退出登陆成功');
					setTimeout(function() {
						uni.reLaunch({
							url: '../login/login'
						});
					}, 1500);
				},
				res => {
					uni.removeStorageSync('userInfo');
					uni.removeStorageSync('token');
					this.alertFun('退出登陆成功');
					setTimeout(function() {
						uni.reLaunch({
							url: '../login/login'
						});
					}, 1500);
				}
			);
		}
	}
};
</script>

<style>
.content-box {
	width: 100%;
	background: #f7f7f7;
}
.form {
	width: 100%;
	padding: 0upx 40upx 0;
	box-sizing: border-box;
	background: #fff;
}
.call-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 120upx;
	border-bottom: 1upx solid #e6e6e6;
}
.call-box image {
	width: 24upx;
	height: 24upx;
}
.call {
	font-size: 32upx;
	color: #1a1a1a;
	/* width: 210upx; */
}
.uni-input {
	font-size: 30upx;
	color: #333;
	font-weight: bold;
}
.btn {
	margin: 0 auto;
	margin-top: 308upx;
	width: 400upx;
	height: 94upx;
	background: #ff5a1f;
	text-align: center;
	line-height: 94upx;
	font-size: 36upx;
	color: #fff;
	border-radius: 6upx;
}
.call1 {
	margin-top: 16upx;
	width: 750upx;
	height: 94upx;
	font-size: 32upx;
	line-height: 94upx;
	text-align: center;
	background: #fff;
	color: #ff5a1f;
}
.headBox {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.headBox text {
	display: inline-block;
	width: 20%;
	font-size: 40rpx;
	color: #fff;
}
.rightBox {
	width: 20%;
	font-size: 28rpx;
	color: #fff;
	text-align: right;
}
.headTitle {
	font-size: 40rpx;
	color: #fff;
}
.hideHead {
	background: #c82418 url(../../static/images/titleBg.png) no-repeat center bottom 38rpx;
	position: fixed;
	width: 100%;
	left: 0;
	top: 0;
	text-align: center;
	font-size: 40rpx;
	color: #fff;
	padding: 80rpx 0 20rpx;
	z-index: 999;
	background-size: 220rpx 22rpx;
}
.box01 {
	background: url(../../static/images/indexBg.png) no-repeat;
	background-size: 100%;
	padding: 80rpx 20rpx 40rpx;
}
</style>
