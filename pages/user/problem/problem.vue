<template>
	<view class="prob">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">常见问题</view>
				<navigator class="rightBox"></navigator>
			</view>
		</view>
		<view class="probInfo">
			<view class="guanyuIn">
				<view class="guanyu" style="font-size: 36rpx;color: #1a1a1a;">关于订单</view>
				<view class="guanyu">1.已确认收货的订单失效了？</view>
				<view class="guanyu">2.有订单笔数却</view>
			</view>
		</view>
	</view>
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
	.box01{padding: 80rpx 20rpx 20rpx;}
	.headBox{display: flex;align-items: center;justify-content: space-between;}
	.headBox text{display: inline-block;width: 20%;font-size: 40rpx;color: #000;}
	.rightBox{width: 20%;font-size: 28rpx;color: #fff;text-align: right;}
	.yueInfo {display: flex;justify-content: space-around;align-items: center;font-size: 26rpx;height: 100rpx;border-bottom: 1px solid #ccc;}
	.probInfo {
		width: 100%;
		background: #f1f1f1;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #666;
	}
	.guanyuIn {
		background: #fff;
		border-radius: 16rpx;
	}
	.guanyu{
		height: 100rpx;
		line-height: 100rpx;
		margin: 0 20rpx;
		border-bottom: 1px solid #eee;
	}
</style>
