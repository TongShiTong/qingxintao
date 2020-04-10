<template>
	<view>
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">提现收款方式</view>
				<navigator class="rightBox"></navigator>
			</view>
		</view>
		<view class="tianjia">
			<navigator url="/pages/setting/collectmoney/collectmoney" hover-class="none" class="call-box">
				<view class="call">添加收款账号</view>
			</navigator>
		</view>
		<view class="zhifub">
			<view>支付宝</view>
			<view style="text-align: right;">王大锤</view>
			<view style="text-align: right;font-size: 40rpx;font-weight: bold;">88888.@qq.com</view>
		</view>
		
	</view>
</template>

<script>

	export default {
		
		data() {
			return {
				
			}
		},
		onLoad() {
	
		},
		methods: {
			

		}
	}
</script>

<style>
	.headBox{display: flex;align-items: center;justify-content: space-between;}
	.headBox text{display: inline-block;width: 20%;font-size: 40rpx;color: #fff;}
	.rightBox{width: 20%;font-size: 28rpx;color: #fff;text-align: right;}
	.headTitle{font-size:40rpx;color: #fff;}
	.hideHead{background: #c82418 url(../../../static/images/titleBg.png) no-repeat center bottom 38rpx;position: fixed;width: 100%;left: 0;top:0;text-align: center;font-size: 40rpx;color: #fff;padding:80rpx 0 20rpx;z-index: 999;background-size: 220rpx 22rpx;}
	.box01{background: url(../../../static/images/indexBg.png) no-repeat;background-size: 100%;padding: 80rpx 20rpx 40rpx;}
	.tishi {width: 100%;height: 80rpx;line-height: 80rpx;padding-left: 40rpx;box-sizing: border-box;font-size: 30rpx;color: #999;background-color: #fff9f7;}
	
	.form {
		padding: 40upx;
		padding-top: 0;
		width: 100%;
		box-sizing: border-box;
	}
	.uni-input {
		border-bottom:1px solid #999;
		padding-top: 30upx;
		padding-bottom:30upx;
	}
	.btn {
		width: 520upx;
		height: 88upx;
		font-size: 38upx;
		color: #fff;
		background: #c82418;
		line-height: 88upx;
		border-radius: 44upx;
		text-align: center;
		margin-top: 80upx;
	}
	.yanzhengma {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.yanzhengma view {
		font-size: 30upx;
		color: #c82418;
	}
	.tianjia {
		border: 1px solid #aaa;
		width: 690rpx;
		margin: 0 auto;
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		color: #999;
		text-align: center;
	}
	.zhifub {
		width: 690rpx;
		/* height: 300rpx; */
		background-color: #10a4ea;
		margin: 30rpx auto;
		border-radius: 16rpx;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 26rpx;
		color: #fff;
		line-height: 2em;
	}
</style>
