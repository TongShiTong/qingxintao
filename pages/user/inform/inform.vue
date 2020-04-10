<template>
	<view class="inform">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">消息中心</view>
				<navigator class="rightBox"></navigator>
			</view>
		</view>
		<view><liuyuno-tabs :tabData="tabs" :defaultIndex="defaultIndex" /></view>
		<view class="xiaoxi">
			<view class="xxInfo">
				<view style="width: 120rpx;height: 120rpx;margin-right: 20rpx;"></view>
				<view>
					<view style="font-size: 30rpx;color: #1a1a1a;margin-bottom: 20rpx;">网站注册</view>
					<view style="font-size: 26rpx;color: #666;">
						尊敬的年会计师北方导航看了分局给对方上当受骗； 
					</view>
				</view>
			</view>
			<view style="display: flex;font-size: 26rpx;margin: 0 20rpx;color: #999;justify-content: space-between;">
				<view>来自一声到底</view>
				<view>2019-11-23 15:50:19</view>
			</view>
		</view>
	</view>
</template>

<script>
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	
	export default {
	    components: {
	        liuyunoTabs,
	    },
		data() {
			return {
				defaultIndex: 0,
				tabs: ["系统通知", "我的消息"]
			}
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
	.xiaoxi {
		margin: 20rpx 30rpx;
		border-radius: 16rpx;
		background: #f1f1f1;
		box-shadow: 0 20rpx 20rpx #f1f1f1;
		padding: 10rpx;
	}
	.xxInfo {
		display: flex;
		margin-bottom: 50rpx;
	}
</style>
