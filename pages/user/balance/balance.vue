<template>
	<view class="balance">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">余额明细</view>
				<navigator class="rightBox"></navigator>
			</view>
		</view>
		<navigator url="/pages/user/balance/balanceDetail" class="yueInfo">
			<view>提现</view>
			<view>-40.00元</view>
			<view>2019-12-06 23:35:34</view>
			<view>处理中</view>
		</navigator>
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
</style>
