<template>
	<view class="content-box">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">个人资料</view>
				<navigator class="rightBox"></navigator>
			</view>
		</view>
		<!-- <view class="rz-picter">
		  <image :src="avatar" class="img-avatar"></image>
		  <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" @tap="changeImage($event)" ref="avatarInput" class="uppic">

		</view> -->

		<view class="form">
			<label class="call-box" @tap="changeImage">
				<view class="call">头像</view>
				<view class="avatar">
					<image style="width: 64upx;height: 64upx;" :src="userInfo.avatar" mode="aspectFill"></image>
					<image style="width: 24upx;height: 24upx;margin-left: 10upx;" src="/static/other/chakan.png"></image>
				</view>
			</label>

			<label class="call-box">
				<view class="call">手机号</view>
				<view class="name-box">{{ userInfo.mobile }}</view>
			</label>
			<label class="call-box">
				<view class="call">用户名</view>
				<view class="name-box">{{ userInfo.nickname }}</view>
			</label>
			<navigator url="/pages/setting/collectmoney/index" hover-class="none" class="call-box">
				<view class="call">提现收款账号</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
			<navigator url="/pages/setting/collectmoney/collectmoney" hover-class="none" class="call-box">
				<view class="call">添加收款账号</view>
				<view><image src="/static/user/gengduo-icon2x.png"></image></view>
			</navigator>
		</view>
	</view>
</template>

<script>
// import http from '@/tools/utils/http.js'
export default {
	data() {
		return {
			userInfo: this.$USERINFO(),
			mobile: '',
			avatar: '',
			qiye: ''
		};
	},
	onLoad(e) {
		this.qiye = e.qiye;
		// this.userInfoData()
	},
	methods: {
		changeImage() {
			let _this = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['original'],
				success: res => {
					uni.uploadFile({
						url: _this.$BASE_URL + '/api/common/upload',
						filePath: res.tempFiles[0].path,
						name: 'file',
						header: {
							token: uni.getStorageSync('token'),
							'X-Requested-With': 'XMLHttpRequest'
							// 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						},
						success: res => {
							if (res.statusCode == 200) {
								var resData = JSON.parse(res.data);
								// console.log(resData);
								this.avatar = _this.$PIC(resData.data.url);
								if (typeof resData == 'object' && typeof resData.code != 'undefined' && resData.code == 1) {
									//图片上传成功
									_this.$POST_FUN('/api/user/profile', { avatar: resData.data.url }, res => {
										if (res.data.code == 1) {
											//更新用户信息
											_this.$GET_FUN('/api/user/userinfo', {}, res => {
												if (res.data.code == 1) {
													let userinfo=res.data.data;
													userinfo.avatar=_this.$PIC(userinfo.avatar);
													userinfo.isLogin=true;
													uni.setStorageSync("userInfo",userinfo);
													_this.userInfo=userinfo;
												}
											});
										}
									});
								}
							} else {
								//图片上传失败
							}
						},
						fail: res => {}
					});
				},
				fail: () => {}
			});
		},
		// 获取会员信息
		userInfoData() {
			http.apiRequest({
				api: '/user/userinfo',
				method: 'GET',
				data: {},
				secuss: (res, httpStatus) => {
					if (res.code == 1) {
						this.userInfo = res.data;
						this.mobile = this.userInfo.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
						this.avatar = res.data.avatar;
						console.log(res);
					} else {
						uni.showToast({
							title: res.msg
						});
					}
				},
				error: (res, httpStatus) => {
					uni.showToast({
						title: '请检查网络...'
					});
				}
			});
		}
	}
};
</script>

<style>
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
.content-box {
	width: 100%;
	/* padding-top: 60upx; */
}
.form {
	width: 100%;
	padding: 0upx 40upx 0;
	box-sizing: border-box;
}
.call-box {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 120upx;
	/* padding-top: 30upx; */
	border-bottom: 1upx solid #e6e6e6;
}
.call {
	font-size: 32upx;
	color: #1a1a1a;
	width: 120upx;
}

.name-box {
	color: #999;
	font-size: 28upx;
}
.avatar {
	display: flex;
	align-items: center;
}

.yg_content {
	margin-top: 50upx;
	text-align: center;
}
#upimg {
	display: none;
}
.yg_content p {
	padding: 10upx;
	display: inline-block;
	color: #fff;
	background: #08c;
	border: 1upx #ccc solid;
	border-radius: 10upx;
}
.yg_content p:active {
	opacity: 0.5;
}
.showimg {
	margin: 20upx auto;
	border: 1upx #ccc solid;
	border-radius: 10upx;
	width: 200upx;
	height: 200upx;
}
.showimg img {
	width: 100%;
	height: 100%;
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
</style>
