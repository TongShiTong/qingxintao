<template>
	<view class="page">
		<view class="hideHead" :style="{ opacity: opacity }">
			<text class="iconfont iconleft1" @click="backToBeforePage"></text>
			<view>{{ vipServiceInfo.title }}</view>
			<text></text>
		</view>

		<view class="vipserverorder">
			<view>{{ vipServiceInfo.title }}</view>
			<view>{{ vipServiceInfo.price }}</view>
			<view>服务期限：{{ vipServiceInfo.period }}{{ vipServiceInfo.period_unit_text }}</view>
			<view>支付方式：支付宝</view>
			<view @click="buyVip">购买</view>
		</view>
	</view>
</template>

<script>
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
export default {
	components: {
		uniSwiperDot
	},
	data() {
		return {
			userInfo:this.$USERINFO(),
			vipServiceInfo: { title: '' }, //商品信息
			current: 0, //当前轮播图的下标
			dotStyle: {
				//轮播图知识点的颜色
				backgroundColor: 'rgb(255, 255, 255)',
				selectedBackgroundColor: 'rgba(255, 255, 255,.8)',
				border: 'none',
				selectedBorder: 'none'
			},

			opacity: 0
		};
	},
	onLoad(option) {
		var _this = this;
		_this.$GET_FUN('/api/vip_buy/vipServerDetail', { id: option.itemid }, res => {
			console.log(res);
			if (res.data.code == 1) {
				_this.vipServiceInfo = res.data.data;
			}
		});
	},
	methods: {
		buyVip() {
			var _this = this;
			_this.$GET_FUN(
				'/api/vip_buy/buy',
				{
					vip_id: _this.vipServiceInfo.id,
					pay_type: 3
				},
				res => {
					console.log(res);
					if (res.data.code == 1) {
						let resp = res.data.data;
						let orderinfo = resp.payResp;
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: orderinfo,
							success: function(res) {
								 // {"channel":{"id":"alipay","description":"支付宝","serviceReady":true},"description":"","rawdata":"{\"resultStatus\":\"9000\",\"memo\":\"\",\"result\":\"{\\\"alipay_trade_app_pay_response\\\":{\\\"code\\\":\\\"10000\\\",\\\"msg\\\":\\\"Success\\\",\\\"app_id\\\":\\\"2021001142614875\\\",\\\"auth_app_id\\\":\\\"2021001142614875\\\",\\\"charset\\\":\\\"UTF-8\\\",\\\"timestamp\\\":\\\"2020-03-20 13:15:37\\\",\\\"out_trade_no\\\":\\\"202003201315368271376632\\\",\\\"total_amount\\\":\\\"0.01\\\",\\\"trade_no\\\":\\\"2020032022001408620511367975\\\",\\\"seller_id\\\":\\\"2088731149998553\\\"},\\\"sign\\\":\\\"Vw1tFH1qGWhKuQR0d6wnOvpR8ZlUG34WLGp6HGp82ERxyYajtbEJHR72zyPHh+bfLKUHon0dAd8Os2ZhK43cK9viITS9zkPuQTHp8VtWOYft9de175LzOP\\/8OcZFZ2Ib4sjhkvXB1Sp3n96Vf0CfCCmW8uWcj8mrZCA68ww6QLcrpqNNbBEAUf3OnRm79ktMUpMr7UjfxZrVV\\/YZ9Jv2Cu\\/ANVUPZ9IgraiOILfpM57bM5GBdyTmo49KxVWQkKFWc5mW6p3oi4NkpIzoVPHFDcGVb4kt7tpA9j5WMtGocB1uholKONwTdJ9flD2SQ8dIUfxt71O8W7bALrD5D7Fn0A==\\\",\\\"sign_type\\\":\\\"RSA2\\\"}};extendInfo={{\\\"doNotExit\\\":true,\\\"isDisplayResult\\\":true}\"}","errMsg":"requestPayment:ok"}
								 //更新会员信息
								_this.$GET_FUN('/api/user/userinfo', {}, res => {
									if (res.data.code == 1) {
										let userinfo=res.data.data;
										userinfo.avatar=_this.$PIC(userinfo.avatar);
										userinfo.isLogin=true;
										uni.setStorageSync("userInfo",userinfo);
										_this.userInfo=userinfo;

									}
								});
								 
								console.log('success:' + JSON.stringify(res));
							},
							fail: function(err) {
								console.log('fail:' + JSON.stringify(err));
							}
						});
						// let p=uni.getProvider({
						// 	service:"payment",
						// 	function (service,provider){
						// 		console.log("getProvider",service);
						// 		 // uni.requestPayment({
						// 			//  provider:"",
						// 			//  orderInfo:orderinfo",
						// 		 // })
						// 	},
						// 	function (){console.log("getProvider2",res);},
						// 	function (){console.log("getProvider3",res);},
						// 	});
						// 	console.log(p);
					}
				}
			);
		}
	}
};
</script>

<style>
.vipserverorder {
	margin-top: 2rem;
}
.hideHead {
	background: #fff;
	position: fixed;
	width: calc(100% - 40rpx);
	left: 0;
	top: 0;
	padding: 80rpx 20rpx 20rpx;
	z-index: 999;
	display: flex;
	align-items: center;
	box-shadow: 0 2px 10px #ccc;
}
.hideHead text {
	width: 20%;
	color: #222;
	font-size: 40rpx;
}
.hideHead view {
	width: 60%;
	text-align: center;
	font-size: 32rpx;
	color: #000;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
}
.backBtn {
	position: fixed;
	width: 60rpx;
	height: 60rpx;
	left: 40rpx;
	top: 80rpx;
	z-index: 999;
}

.swiper-box {
	height: 720rpx;
}
.swiperImage {
	width: 100%;
	height: 720rpx;
}

.box01 {
	padding: 20rpx;
}
.goodName {
	font-size: 30rpx;
	color: #000;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.goodName image {
	width: 34rpx;
	height: 34rpx;
	margin-right: 4rpx;
}
.goodSales {
	font-size: 26rpx;
	color: #8e8c8d;
	margin: 10rpx 0 20rpx;
}
.priceBox {
	display: flex;
	align-items: flex-end;
}
.priceBox01 {
	font-size: 20rpx;
	color: #fff;
	background: linear-gradient(to right, #ef2914, #fd6450);
	border-radius: 4px;
	padding: 2rpx 10rpx;
}
.priceBox02 {
	font-size: 20rpx;
	color: #000;
	margin-left: 10rpx;
}
.priceBox02 text {
	font-size: 44rpx;
	font-weight: bold;
}
.priceBox03 {
	font-size: 22rpx;
	color: #8e8c8d;
	text-decoration: line-through;
	margin-left: 10rpx;
}

.box02 {
	padding: 20rpx;
	background: #f7f7f5;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.box02 view {
	font-size: 24rpx;
	color: #222;
}
.box02 .sjBtn {
	display: flex;
	align-items: center;
	background: linear-gradient(to right, #9826fc, #b782ff);
	border-radius: 50px;
	font-size: 24rpx;
	color: #fff;
	padding: 12rpx 20rpx;
}
.sjBtn text {
	font-size: 28rpx;
	color: #f5cca7;
	margin-right: 6rpx;
}

.box03 {
	padding: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.box03Left {
	width: 450rpx;
	height: 148rpx;
	background: url(../../static/images/couponLeftBg.png) no-repeat;
	background-size: 100%;
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
}
.acount {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
	color: #fff;
}
.acount text {
	font-size: 36rpx;
	margin-right: 6rpx;
}
.time {
	font-size: 24rpx;
	color: #fff;
	text-align: center;
	margin-top: 10rpx;
}
.box03Right {
	width: 190rpx;
	height: 148rpx;
	background: url(../../static/images/couponRightBg.png) no-repeat;
	background-size: 100%;
	text-align: center;
	line-height: 148rpx;
	font-size: 28rpx;
	color: #fff;
}

.box04 {
	border-top: 20rpx solid #f7f7f5;
	border-bottom: 20rpx solid #f7f7f5;
	padding: 20rpx;
}
.box04Flex {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.box04Left {
	display: flex;
	align-items: center;
}
.shopImg {
	width: 118rpx;
	height: 118rpx;
	margin-right: 20rpx;
}
.catImg {
	width: 116rpx;
	height: 18rpx;
}
.shopName {
	font-size: 30rpx;
	color: #222;
}
.ggBtn {
	font-size: 24rpx;
	color: #ca161f;
}
.box04Right {
	font-size: 26rpx;
	color: #fff;
	background: linear-gradient(to bottom, #fc604c, #ef2813);
	border-radius: 50px;
	padding: 10rpx 20rpx;
}
.shopDesc {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20rpx;
}
.descItem {
	display: flex;
	align-items: center;
}
.txt01 {
	font-size: 26rpx;
	color: #999;
	margin-right: 20rpx;
}
.score {
	background: #f1f1f1;
	font-size: 26rpx;
	color: #999;
}

.box05 {
	padding: 40rpx 20rpx 20rpx;
	border-bottom: 20rpx solid #f7f7f5;
}
.box05Title {
	font-size: 36rpx;
	text-align: center;
	margin-bottom: 40rpx;
}
.box05List {
	display: flex;
	justify-content: space-between;
}
.goodItem {
	width: 32%;
}
.goodItem image {
	width: 100%;
	height: 230rpx;
}
.proName {
	font-size: 26rpx;
	color: #222;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.proPrice {
	font-size: 24rpx;
	color: #f02b16;
	font-weight: bold;
}
.proPrice text {
	font-size: 36rpx;
}

.box06 {
	padding: 40rpx 20rpx 20rpx;
}
.box06 image {
	width: 100%;
}

.fixHieghtBox {
	width: 100%;
	height: 120rpx;
}
.fixBox {
	position: fixed;
	width: 100%;
	height: 114rpx;
	display: flex;
	bottom: 0;
	left: 0;
	z-index: 999;
	background: #f8f6f9;
}
.fixBtn {
	height: 114rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.fixBtn01 {
	width: 25%;
}
.fixBtn02 {
	width: 35%;
	background: #fba401;
}
.fixBtn03 {
	width: 40%;
	background: linear-gradient(to right, #ee2510, #fd634f);
}
.fixTxt01 {
	font-size: 30rpx;
	color: #8e8c8c;
}
.fixBtn01 .iconfont {
	font-size: 40rpx;
	color: #8e8c8c;
	font-weight: bold;
}
.bsTxt {
	font-size: 24rpx;
	color: #fff;
}
.bsTxt text {
	font-size: 40rpx;
}
.fixTxt02 {
	font-size: 26rpx;
	color: #fff;
}
.fixBtn01.on text {
	color: #f02d18;
}
.fixBtn01.on view {
	color: #f02d18;
}
.fixRight {
	position: fixed;
	display: flex;
	align-items: center;
	right: 0;
	bottom: 150rpx;
	background: linear-gradient(to right, #9722fc, #b16ffe);
	border-radius: 50px 0 0 50px;
	font-size: 30rpx;
	color: #fff;
	padding: 16rpx 20rpx;
	z-index: 999;
}
.fixRight text {
	margin-right: 10rpx;
	color: #ffde9d;
}
</style>
