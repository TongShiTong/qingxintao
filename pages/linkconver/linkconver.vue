<template>
	<view class="linkconver">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">链接转换</view>
				<navigator class="rightBox"></navigator>
			</view>
		</view>
		<view class="link">
			<image src="../../static/images/link.png" mode="aspectFill"></image>
		</view>
		<view class="clone">
			<view style="text-align: center;margin: 10rpx 0 20rpx;font-size: 30rpx;">淘宝支持平台</view>
			<view class="title">
				<!-- <view>待转换的链接</view>
				<view class="clear">清空内容</view> -->
				<view>淘宝</view>
				<view>天猫</view>
				<view>京东</view>
				<view>拼多多</view>
				<view>考拉</view>
				<view>唯品会</view>
			</view>
			<view class="info">
				<textarea value="" placeholder="请把复制的文字粘贴到此处" @click="Paste"/>
			</view>
			<view class="chakan">
				<view>
					查看省钱教程
				</view>
				<view class="qingchu">
					<view class="qc">清除</view>
					<view class="cx">查询优惠</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="titleinfo">
				古商古
			</view>
			<view class="infobox">
				<view class="sp">商品原价</view>
				<view>8.8</view>
			</view>
			<view class="infobox">
				<view class="sp">优惠卷</view>
				<view>-5</view>
			</view>
			<view class="infobox">
				<view class="sp">实际支付</view>
				<view>3.8</view>
			</view>
			<view class="infobox">
				<view class="sp sp1">再返现金</view>
				<view>0.38</view>
			</view>
			<view class="sy">使用红包可能会造成没有返利</view>
		</view>
		<view class="ckfx">查看订单及返现</view>
		<view class="shengqian">
			<view class="sqb">省钱宝已为您节省：<text>5.38元</text></view>
			<view class="msxd">马上下单</view>
		</view>
		<!-- <view class="btn">转换为我的链接</view> -->
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
			Paste() {
				uni.getClipboardData({
				    success: function (res) {
				        console.log(res.data);
				    }
				});
			}
		}
	}
</script>

<style>
.headBox{display: flex;align-items: center;justify-content: space-between;}
	.headBox text{display: inline-block;width: 20%;font-size: 40rpx;color: #fff;}
	.rightBox{width: 20%;font-size: 28rpx;color: #fff;text-align: right;}
	.headTitle{font-size:40rpx;color: #fff;}
	.hideHead{background: #c82418 url(../../static/images/titleBg.png) no-repeat center bottom 38rpx;position: fixed;width: 100%;left: 0;top:0;text-align: center;font-size: 40rpx;color: #fff;padding:80rpx 0 20rpx;z-index: 999;background-size: 220rpx 22rpx;}
	.box01{background: url(../../static/images/indexBg.png) no-repeat;background-size: 100%;padding: 80rpx 20rpx 40rpx;}
	.clone {
		margin: 20rpx 40rpx;
		background: rgb(255,236,183);
		box-shadow: 0 0 10rpx 10rpx #f2f2f2;
		/* border-radius: 16rpx; */
		padding: 20rpx 30rpx;
	}
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
		padding-bottom: 30rpx;
		color: #333;
	}
	.clear {
		font-size: 24rpx;
		color: rgb(254,127,0);
	}
	.info {
		height: 120rpx;
		padding: 20rpx;
		font-size: 32rpx;
		color: #1A1A1A;
		background: #fff;
		border-radius: 10rpx;
	}
	.info textarea {
		width: 100%;
		height: 100%;
	}
	.btn {
		width: 600rpx;
		height: 98rpx;
		background: rgb(254,127,0);
		border-radius: 50rpx;
		text-align: center;
		line-height: 98rpx;
		font-size: 28rpx;
		color: #fff;
		margin: 40rpx auto;
	}
	.link {
		width: 680rpx;
		height: 120rpx;
		margin: 20rpx auto;
	}
	.link image {
		width: 100%;
		height: 100%;
	}
	.chakan {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 26rpx;
		color: rgb(220,194,120);
		margin-top: 20rpx;
	}
	.qingchu {
		display: flex;
		align-items: center;
		font-size: 26rpx;
	}
	.qc {
		width: 140rpx;
		height: 60rpx;
		background: #fff;
		text-align: center;
		line-height: 60rpx;
		color: #000000;
		margin-right: 20rpx;
	}
	.cx {
		width: 140rpx;
		height: 60rpx;
		background: rgb(220,194,120);
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		margin-right: 20rpx;
	}
	.content {
		margin: 20rpx 40rpx;
		background: #fff;
		box-shadow: 0 0 10rpx 10rpx #f2f2f2;
		/* border-radius: 16rpx; */
		padding: 20rpx 30rpx;
	}
	.titleinfo {
		font-size: 28rpx;
		font-weight: bold;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #f2f2f2;
	}
	.infobox {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		margin-top: 20rpx;
	}
	.sp {
		width: 120rpx;
		height: 50rpx;
		background: #f2f2f2;
		line-height: 50rpx;
		text-align: center;
	}
	.sp1 {
		background: rgb(255,236,183);
		color: rgb(220,194,120);
	}
	.sy {
		font-size: 24rpx;
		color: #999;
		margin-top: 20rpx;
	}
	.ckfx {
		width: 190rpx;
		padding: 10rpx 0;
		text-align: center;
		margin: 0 auto;
		color: rgb(220,194,120);
		font-size: 26rpx;
		border-bottom: 1px solid rgb(220,194,120);
	}
	.shengqian {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		margin-top: 50rpx;
	}
	.sqb {
		width: 500rpx;
		height: 100rpx;
		background-color: #f2f2f2;
		color: #000000;
	}
	.sqb text {
		font-size: 30rpx;
		color: rgb(220,194,120);
	}
	.msxd {
		width: 250rpx;
		height: 100rpx;
		background-color: rgb(220,194,120);
	}
</style>
