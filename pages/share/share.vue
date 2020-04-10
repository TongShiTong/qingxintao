<template>
	<view class="share">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">分享宝贝</view>
				<navigator class="rightBox"></navigator>
			</view>
		</view>
		<view class="tips">分享给好友，好友确认收货后可获得1.84元佣金</view>
		<view class="chooseImg">
			<view>选择图片</view>
			<view>已选择0张</view>
		</view>
		<view class="chooseImgs">
			<view class="scrollImg">
				<image src="../../static/images/share01.png"></image>
				<image src="../../static/images/share01.png"></image>
				<image src="../../static/images/share01.png"></image>
				<image src="../../static/images/share01.png"></image>
			</view>
		</view>
		<view class="bianji">
			编辑分享文案
		</view>
		<view class="bianjiInfo">
			的缴费号圣诞节客户方加快速度开服活动V领开始的
		</view>
		<view class="jinggao">
			<view style="font-size: 24rpx;color: #999;">请不要修改‘{}’中的文字哦~</view>
			<view>仅复制分享文案</view>
		</view>
		<view style="font-size: 26rpx;text-align: center;margin-bottom: 30rpx;">图文分享到</view>
		<view class="shareTo">
			<view class="toInfo">
				<image src="../../static/images/weixin.png"></image>
				<view>微信好友</view>
			</view>
			<view class="toInfo">
				<image src="../../static/images/weixin.png"></image>
				<view>微信好友</view>
			</view>
			<view class="toInfo">
				<image src="../../static/images/qq.png"></image>
				<view>QQ好友</view>
			</view>
			<view class="toInfo">
				<image src="../../static/images/qq.png"></image>
				<view>QQ好友</view>
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
	.tips {width: 100%;height: 80rpx;text-align: center;color: #FFFFFF;font-size: 26rpx;background: #aaa;line-height: 80rpx;}
	.chooseImg {display: flex;justify-content: space-between;margin: 50rpx 20rpx 40rpx;font-size: 26rpx;color: #000000;}
	.chooseImgs {margin: 0 20rpx 50rpx;}
	.scrollImg {overflow-x: auto;white-space: nowrap;overflow-x: auto;overflow-y: hidden}
	.scrollImg image {width: 200rpx;height: 200rpx;margin-right: 20rpx;}
	.bianji {margin-left: 20rpx;margin-bottom: 40rpx; font-size: 26rpx;color: #000000;}
	.bianjiInfo {margin: 0 20rpx 0rpx;padding: 20rpx;width: 670rpx;height: 240rpx;background: #f1f1f1;border-radius: 20rpx;font-size: 24rpx;color: #666;}
	.jinggao {display: flex;justify-content: space-between;margin: 10rpx 20rpx 200rpx;font-size: 26rpx;color: #000000;}
	.shareTo {margin: 0 50rpx 50rpx;display: flex;justify-content: space-between;font-size: 26rpx;}
	.toInfo {display: flex;flex-direction: column;align-items: center;}
	.toInfo image {width: 100rpx;height: 100rpx;border-radius: 50%;margin-bottom: 20rpx;}
</style>
