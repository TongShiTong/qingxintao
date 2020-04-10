<template>
	<view class="balanceDetail">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">记录详情</view>
				<navigator class="rightBox"></navigator>
			</view>
		</view>
		<view class="zfb">
			<view>支付宝</view>
			<view class="money">48.00</view>
			<view class="tixian">提现成功</view>
		</view>
		<view class="qudao">
			<view>提取金额</view>
			<view>48.00元</view>
		</view>
		<view class="qudao">
			<view>手续费</view>
			<view>0.00元</view>
		</view>
		<view class="qudao">
			<view>收款方式</view>
			<view>支付宝</view>
		</view>
		<view class="qudao">
			<view>收款方式</view>
			<view>支付宝</view>
		</view>
		<view class="qudao">
			<view>收款账户</view>
			<view>8254 **** **** .com</view>
		</view>
		<view class="qudao">
			<view>收款人姓名</view>
			<view>*先忠</view>
		</view>
		<view class="qudao">
			<view>提报时间</view>
			<view>2015-09-22 18:26</view>
		</view>
		<view style="font-size: 28rpx;color: #aaa;text-align: center;">对此订单有疑惑，请联系<text style="color: #4CD964;">在线客服</text></view>
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
	.zfb {font-size: 40rpx;color: #666; padding: 30rpx 30rpx 50rpx; margin-bottom: 50rpx; border-bottom: 6rpx solid #F1F1F1;}
	.money {font-size: 60rpx;color: #1a1a1a; text-align: center;margin-top:80rpx;margin-bottom: 20rpx;}
	.tixian {font-size: 28rpx; color: #4CD964;text-align: center;}
	.qudao {margin: 0 30rpx 30rpx;display: flex;justify-content: space-between;color: #666;font-size: 28rpx;}
</style>
