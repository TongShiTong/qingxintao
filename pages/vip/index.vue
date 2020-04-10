<template>
	<view class="page">
		<view class="box01">
			<view class="hideHead" :style="{ opacity: opacity }">会员中心</view>
			<commonHead :headTitle="headTitle"></commonHead>
			<view class="userBox">
				<image :src="userInfo.avatar" class="userImg" mode="aspectFill"></image>
				<view class="infoBox01">
					<view class="nameInfo">
						<view class="nickName">{{ userInfo.nickname }}</view>
						<text>邀请码：{{ userInfo.invitcode }}</text>
					</view>
					<view class="vipInfo"><view class="vipLevel">{{ userInfo.group_name }}</view></view>
				</view>
				<navigator class="xfBtn" v-if="!userInfo.isvip">
					<image src="../../static/images/xfIcon.png" mode="aspectFill"></image>
					升级
				</navigator>
				<navigator class="xfBtn" v-if="userInfo.isvip">
					<image src="../../static/images/xfIcon.png" mode="aspectFill"></image>
					续费
				</navigator>
			</view>

			<view class="advsBox">
				<view class="vipTitle">升级超级会员权益</view>
				<view class="nineBox">
					<uni-grid :column="3" :square="false" :show-border="false" :highlight="false">
						<uni-grid-item v-for="(item, index) in vipAdv" :index="index" :key="index">
							<view class="grid-item-box">
								<image :src="item.img" class="kindImage" mode="aspectFill" />
								<view class="kindText">{{ item.txt }}</view>
								<view class="kindDesc">{{ item.desc }}</view>
							</view>
						</uni-grid-item>
					</uni-grid>
				</view>
			</view>

			<view class="myDetails" v-if="userInfo.isvip">
				<view class="moneyBox">
					<view>
						累计省钱
						<text>{{ userInfo.drz_money }}</text>
					</view>
					<view>
						累计赚钱
						<text>{{ userInfo.sum_money }}</text>
					</view>
				</view>

				<view class="yqFriendBtn">邀请好友一起省钱赚钱</view>
				<view class="myBtns">
					<view>
						<image src="/static/images/tjIcon.png" mode="aspectFill"></image>
						我的推荐
					</view>
					<view>
						<image src="/static/images/orderIcon.png" mode="aspectFill"></image>
						返佣订单
					</view>
				</view>
			</view>

			<view class="vipsBox" v-if="!userInfo.isvip">
				<view class="vipsItem" v-for="(item, index) in vipServer" :key="index">
					<view class="vipsPrice">￥{{ item.price }}</view>
					<view class="vipsTime">{{ item.name }}</view>
					<navigator :url="'/pages/vip/buyvip?itemid='+item.id" class="openBtn">立即开通</navigator>
				</view>
			</view>

			<view class="inviteBox" v-if="!userInfo.isvip">
				<view class="inviteTitle">邀请好友送超级会员</view>
				<view class="iniviteTxt">邀请20人注册APP，送一年至尊黑卡VIP</view>
				<view class="percentBox">
					<view class="outerBox"><view class="innerBox"></view></view>
					<view class="yqNum">
						<text>0</text>
						/20人
					</view>
				</view>
				<view class="inviteBtn">立即邀请</view>
			</view>
			<view class="mansBox">
				<view class="inviteTitle">超级会员赚钱榜</view>
				<view class="kindsTab">
					<view v-for="(item, index) in manlist" :key="index" class="kindItem" :class="index == curKind ? 'on' : ''" @click="toggleKind(index)">{{ item.kind }}</view>
				</view>
				<view class="mansList">
					<view class="mansItem" v-for="(item, index) in manlist[0].mans" :key="index">
						<view
							class="num"
							:style="{ background: index == 0 ? '#fdb507' : index == 1 ? '#b0bac4' : index == 2 ? '#d8a188' : '', color: index > 2 ? '#222' : '#fff' }"
						>
							{{ index + 1 }}
						</view>
						<image :src="item.img" mode="aspectFill" class="manImg"></image>
						<view class="manName">{{ item.nick }}</view>
						<view class="price01">
							返利
							<text>￥{{ item.price01 }}</text>
						</view>
						<view class="price01">
							佣金
							<text>￥{{ item.price02 }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="articlesBox">
				<view class="inviteTitle">超级会员赚课堂</view>
				<view class="articlesList">
					<view class="articleItem" v-for="(item, index) in news" :key="index">
						<image :src="item.img" class="articleImg" mode="aspectFill"></image>
						<view class="articleName">{{ item.txt }}</view>
						<view class="articleTxt">{{ item.desc }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import commonHead from '@/components/common-head/common-head.vue';
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
var userInfo = {
	avatar: '/static/images/avatar.png',
	nick: '',
	inviteId: '',
	vipLevel: '',
	time: '',
	yue: '',
	drz_money: '',
	sum_money: '',
	isLogin: false,
	isvip: false
};

var vipAdv = [
	{ img: '/static/images/vip01.png', txt: '所有权益', desc: '超级会员' },
	{ img: '/static/images/vip02.png', txt: '收益提升57.4%', desc: '自买返佣' },
	{ img: '/static/images/vip03.png', txt: '收益提升57.4%', desc: '分享返佣' },
	{ img: '/static/images/vip04.png', txt: '奖励45.3%', desc: '直接会员出单' },
	{ img: '/static/images/vip05.png', txt: '奖励29.3%', desc: '间接会员出单' },
	{ img: '/static/images/vip06.png', txt: '奖励6.66%', desc: '直属会员团队' }
];


var manlist = [
	{
		kind: '周榜',
		mans: [
			{ img: '/static/images/goodImg.png', nick: '姐姐糖', price01: '1662.87', price02: '1662.87' },
			{ img: '/static/images/goodImg.png', nick: '桃花笑', price01: '1662.87', price02: '1662.87' },
			{ img: '/static/images/goodImg.png', nick: '离殇', price01: '1662.87', price02: '1662.87' },
			{ img: '/static/images/goodImg.png', nick: '中二少年', price01: '1662.87', price02: '1662.87' }
		]
	},
	{
		kind: '月榜',
		mans: [
			{ img: '/static/images/goodImg.png', nick: '姐姐糖', price01: '1662.87', price02: '1662.87' },
			{ img: '/static/images/goodImg.png', nick: '桃花笑', price01: '1662.87', price02: '1662.87' },
			{ img: '/static/images/goodImg.png', nick: '离殇', price01: '1662.87', price02: '1662.87' },
			{ img: '/static/images/goodImg.png', nick: '中二少年', price01: '1662.87', price02: '1662.87' }
		]
	}
];
var news = [
	{ img: '/static/images/newsImg01.png', txt: '环球之旅第一站·首尔站', desc: '2019-10-24加入清新淘' },
	{ img: '/static/images/newsImg02.png', txt: '环球之旅第二站·大阪站', desc: '2019-10-24加入清新淘' }
];
export default {
	components: {
		commonHead,
		uniGrid,
		uniGridItem
	},
	data() {
		let userInfoData = this.$USERINFO();
		return {
			headTitle: '会员中心',
			userInfo: userInfoData,
			vipAdv: vipAdv, //会员权益
			vipServer: [], //vip种类及对应的价格
			manlist: manlist, //榜单列表
			curKind: 0, //当前的榜单下标
			news: news, //软文列表
			opacity: 0
		};
	},
	onShow(){
		let _this=this;
		_this.userInfo=this.$USERINFO();
	},
	onLoad() {
		var _this = this;
		//获取会员等级列表
		_this.$GET_FUN('/api/vip_buy/vipServer', {}, res => {
			if (res.data.code == 1) {
				_this.vipServer=res.data.data.list;
			}else{
				
			}
		});
	},
	methods: {
		//切换榜单分类
		toggleKind(idx) {
			this.curKind = idx;
		}
	},
	onPageScroll(option) {
		this.opacity = 0.004 * option.scrollTop;
	}
};
</script>

<style>
.hideHead {
	background: #7e36e5 url(../../static/images/titleBg.png) no-repeat center bottom 38rpx;
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
.page {
	background: #fdf4ff;
	min-height: 100vh;
}
.box01 {
	background: url(../../static/images/vipBg.png) no-repeat;
	background-size: 100%;
	padding: 80rpx 20rpx 0;
}
.userBox {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	border-radius: 6px;
	background: #fff;
	margin-top: 50rpx;
}
.userImg {
	width: 124rpx;
	height: 124rpx;
	border-radius: 50%;
	border: 2px solid #d2d1d3;
}
.infoBox01 {
	width: calc(100% - 300rpx);
}
.nameInfo,
.vipInfo {
	display: flex;
	align-items: center;
}
.nickName {
	font-size: 32rpx;
	color: #222;
	margin-right: 20rpx;
}
.nameInfo text {
	font-size: 24rpx;
	color: #8e8c8d;
}
.vipLevel {
	display: flex;
	align-items: center;
	background: linear-gradient(to right, #9928fc, #b781ff);
	font-size: 24rpx;
	color: #fff;
	border-radius: 50px;
	margin-right: 20rpx;
	padding: 0 8rpx;
}
.vipInfo {
	margin: 10rpx 0;
}
.xfBtn {
	font-size: 26rpx;
	color: #f23520;
	display: flex;
	align-items: center;
	background: #ffeaed;
	border-radius: 50px;
	padding: 4rpx 16rpx;
	align-self: center;
}
.xfBtn image {
	width: 24rpx;
	height: 24rpx;
	margin-right: 6rpx;
}

.advsBox {
	background: linear-gradient(to right, #8035e9, #a53ce2);
	padding: 20rpx;
	border-radius: 6px;
	margin: 20rpx 0;
}
.nineBox {
	text-align: center;
}
.grid-item-box {
	padding: 20rpx 0;
}
.kindImage {
	width: 70rpx;
	height: 70rpx;
}
.vipTitle {
	font-size: 36rpx;
	color: #f9f6fe;
	padding: 20rpx 0;
	border-bottom: 1px solid #e9e9e9;
}
.kindText {
	font-size: 26rpx;
	color: #f9f6fe;
}
.kindDesc {
	font-size: 24rpx;
	color: #f9f6fe;
}

.vipsBox {
	padding: 0 20rpx;
	background: #fff;
	border-radius: 6px;
	background: #fff;
	margin-top: 20rpx;
}
.vipsItem {
	display: flex;
	justify-content: space-between;
	align-content: center;
	padding: 26rpx 0;
}
.vipsPrice {
	width: 20%;
	font-size: 30rpx;
	color: #222;
}
.vipsTime {
	width: 50%;
	font-size: 30rpx;
	color: #9c9a9b;
}
.openBtn {
	width: 144rpx;
	height: 48rpx;
	background: #e1251b;
	text-align: center;
	line-height: 48rpx;
	font-size: 24rpx;
	color: #f7c8c6;
	border-radius: 50px;
}

.inviteBox {
	padding: 20rpx;
	background: #fff;
	border-radius: 6px;
	margin-top: 20rpx;
}
.inviteTitle {
	font-size: 36rpx;
	color: #000;
	padding: 20rpx 0;
	text-align: center;
}
.iniviteTxt {
	font-size: 24rpx;
	color: #222;
	margin-top: 40rpx;
	margin-bottom: 20rpx;
}
.percentBox {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.outerBox {
	width: 518rpx;
	height: 16rpx;
	border-radius: 10px;
	background: #f3f3f3;
	overflow: hidden;
}
.innerBox {
	height: 16rpx;
	background: #7e35e9;
	width: 10%;
	border-radius: 10px;
}
.yqNum {
	font-size: 24rpx;
	color: #222;
}
.yqNum text {
	color: red;
}
.inviteBtn {
	width: 264rpx;
	height: 80rpx;
	border-radius: 6px;
	background: linear-gradient(to right, #7e35e9, #9e3be3, #a83de1);
	text-align: center;
	line-height: 80rpx;
	font-size: 28rpx;
	color: #fff;
	margin: 40rpx auto;
}

.mansBox {
	padding: 20rpx 0;
}
.kindsTab {
	display: flex;
}
.kindItem {
	width: 50%;
	height: 100rpx;
	background: #7e35e9;
	text-align: center;
	line-height: 100rpx;
	font-size: 30rpx;
	color: #e6e1f2;
	position: relative;
}
.kindItem.on:after {
	content: '';
	display: block;
	width: 0;
	height: 0;
	border-bottom: 16rpx solid #fff;
	border-left: 16rpx solid transparent;
	border-right: 16rpx solid transparent;
	position: absolute;
	bottom: 0;
	left: calc(50% - 14rpx);
}
.mansList {
	padding: 20rpx;
}
.mansItem {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20rpx 0;
}
.num {
	width: 36rpx;
	height: 36rpx;
	border-radius: 50px;
	text-align: center;
	line-height: 36rpx;
	font-size: 24rpx;
}
.manImg {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50px;
}
.manName {
	font-size: 28rpx;
	color: #222;
	width: 20%;
	overflow: hidden;
	height: 30rpx;
	line-height: 30rpx;
}
.price01 {
	font-size: 28rpx;
	color: #8e8c8d;
	width: 30%;
	overflow: hidden;
	height: 30rpx;
	line-height: 30rpx;
	white-space: normal;
	display: flex;
	align-items: center;
}
.price01 text {
	color: #e1251b;
}

.articlesBox {
	padding: 20rpx;
	background: #fff;
	border-radius: 6px;
	margin-top: 20rpx;
}
.articlesList {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 40rpx;
}
.articleItem {
	width: 48%;
}
.articleImg {
	width: 100%;
	height: 220rpx;
}
.articleName {
	font-size: 30rpx;
	color: #000;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
	overflow: hidden;
	margin: 6rpx 0 10rpx;
}
.articleTxt {
	font-size: 24rpx;
	color: #8e8c8d;
}

.myDetails {
	padding: 20rpx;
	background: #fff;
	border-radius: 6px;
	margin-top: 20rpx;
}
.moneyBox {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.moneyBox view {
	width: 50%;
	font-size: 24rpx;
	color: #8e8c8d;
	display: flex;
	align-items: center;
	justify-content: center;
}
.moneyBox text {
	font-size: 36rpx;
	color: #e1251b;
	font-weight: bold;
	margin-left: 20rpx;
}
.yqFriendBtn {
	width: 100%;
	height: 94rpx;
	border-radius: 6px;
	text-align: center;
	line-height: 94rpx;
	font-size: 30rpx;
	color: #fff;
	background: linear-gradient(to right, #7e35e9, #a83de1);
	margin: 30rpx auto 40rpx;
}
.myBtns {
	display: flex;
	justify-content: space-between;
}
.myBtns view {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 280rpx;
	height: 64rpx;
	background: #ffeaed;
	border-radius: 6px;
	font-size: 26rpx;
	color: #f74c38;
}
.myBtns image {
	width: 28rpx;
	height: 28rpx;
	margin-right: 6rpx;
}
</style>
