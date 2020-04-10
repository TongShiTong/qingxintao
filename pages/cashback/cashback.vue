<template>
	<view class="cashback">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">推荐返利</view>
				<navigator class="rightBox">历史记录</navigator>
			</view>
		</view>
		<view class="yixia">
			<view>已下单，未返现金？</view>
			<view>帮助</view>
		</view>
		<view class="tabs">
			<tui-tabs :tabs="tabs3" :isFixed="false" :currentTab="currentTab" @change="change" bottom="50%" :bgColor="bgColor"
			 color="#fff" selectedColor="#EB0909" :sliderWidth="146" :sliderHeight="52" sliderBgColor="#fff" :unlined="true"></tui-tabs>
		</view>
		<view class="wenxin">
			温馨提示
		</view>
		 <view class="ddlist">
			 <view class="tbdd">
				 <view class="tbdd1">淘宝订单</view>
				 <view>首单奖励</view>
			 </view>
			 <view class="title">
				 买2赠1
			 </view>
			 <view class="ddInfo">创建时间： 2019-10-28 13:12:55</view>
			 <view class="ddInfo">订单编号： 684255665566666544225</view>
			 <view class="ddInfo">订单金额： 24.9元</view>
			 <view class="tbdd">
				 <view class="tbdd1">返利金额：<text style="color: #F02C18;">1.05元</text></view>
				 <view class="tbdd1">已入账</view>
			 </view>
		 </view>
	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	export default {
		components: {
			tuiTabs
		},
		data() {
			return {
				currentTab: 0,
				bgColor: "linear-gradient(90deg, rgb(255, 118, 38), rgb(252, 30, 82))",
				tabs3: [{
					name: "淘宝订单"
				}, {
					name: "已通过"
				}, {
					name: "已到账"
				}, {
					name: "已撤销"
				}]
			}
		},
		methods: {
			change(e) {
				this.currentTab = e.index
			},
		}
	}
</script>

<style>
	.cashback {
		background-color: #f2f2f2;
	}
	.headBox{display: flex;align-items: center;justify-content: space-between;}
	.headBox text{display: inline-block;width: 20%;font-size: 40rpx;color: #fff;}
	.rightBox{width: 20%;font-size: 28rpx;color: #fff;text-align: right;}
	.headTitle{font-size:40rpx;color: #fff;}
	.hideHead{background: #c82418 url(../../static/images/titleBg.png) no-repeat center bottom 38rpx;position: fixed;width: 100%;left: 0;top:0;text-align: center;font-size: 40rpx;color: #fff;padding:80rpx 0 20rpx;z-index: 999;background-size: 220rpx 22rpx;}
	.box01{background: url(../../static/images/indexBg.png) no-repeat;background-size: 100%;padding: 80rpx 20rpx 40rpx;}
	.yixia {
		display: flex;
		justify-content: space-around;
		font-size: 26rpx;
		color: #e68519;
		background: #faf2df;
		/* width: 100%; */
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 30rpx;
		border-radius: 16rpx;
	}
	.tabs {
		margin: 0 30rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}
	.wenxin {
		margin: 0 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
		height: 160rpx;
		border-radius: 16rpx;
		font-size: 24rpx;
		color: #333;
		background: #FAF2DF;
	}
	.ddlist {
		margin: 0 30rpx;
		padding: 30rpx;
		box-sizing: border-box;
		/* height: 160rpx; */
		border-radius: 16rpx;
		font-size: 24rpx;
		color: #aaa;
		background: #fff;
	}
	.tbdd {
		display: flex;
		justify-content: space-between;
	}
	.tbdd1 {
		font-size: 26rpx;
		color: #333;
	}
	.title {
		margin: 30rpx 0 20rpx;
		font-size: 30rpx;
		color: #000000;
		font-weight: bold;
	}
	.ddInfo {
		margin-bottom: 20rpx;
	}
</style>
