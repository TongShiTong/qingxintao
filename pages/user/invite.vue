<template>
	<view class="page">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">邀请拿现金</view>
				<navigator class="rightBox"></navigator>
			</view>
			
			<view class="topBox">
				<view class="myCode">我的邀请码</view>
				<view class="codeBox">
					<view v-for="(item,index) in userInfo.codeNum" :key="index">{{item}}</view>
					
				</view>
				<view class="copyBtn" @click="copyFun(userInfo.codeNum)">复制邀请码</view>
				<view class="tip">邀请的好友也可在注册时直接填写邀请码</view>
				
				<view class="shareBox">
					<view class="shareItem">
						<image src="../../static/images/wxIcon.png" mode="aspectFill"></image>
						<view>发送给朋友</view>
					</view>
					
					<view class="shareItem">
						<image src="../../static/images/friendIcon.png" mode="aspectFill"></image>
						<view>分享到朋友圈</view>
					</view>
					
					<view class="shareItem">
						<image src="../../static/images/codeIcon.png" mode="aspectFill"></image>
						<view>发送给朋友</view>
					</view>
				</view>
			</view>
			
			
		</view>
		
		<view class="box02">
			<view class="ruleTitle">活动规则</view>
			<text>
				1.邀请1位返利新用户,新用户通过返利网APP在淘宝、超级返、商城  返利下单，单个商品实付金额>=69元，返利到账后，每邀请1位好  友您将获得10元的现金奖励，多邀多得，奖励无上限。您的好友  可以获得5元红包，红包开启条件为: 15天内通过返利网APP下单  ，返利到账后红包开启(不包括1元购、满减、买立返活动、虛拟  类目商品等)
				2.好友的订单不包括1元购、满减等活动订单，同时不包含虚拟类目  商品如话费充值、游戏点卡充值、购买网站会员等。
				3.被邀请的好友从注册日期一年内下单(按365天计算)， 邀请人可  获得奖励。否则邀请奖励不再发放。
				4.活动中如果发现通过作弊手段获得奖励的，将取消奖励，如购买   虚假商品、虚假发货、购买同城配送商品等行为
				5.同设备、手机号、支付宝、银行卡号、返利网账号，视为同一用  户，参与活动时不会发放邀请奖励。6.新规则从2020年3月31日00:00起对所有用户开放。
			</text>
		</view>
		
		
		
	</view>
</template>

<script>
	var userInfo = {
		nick:'鹿先森',
		yue:'200.00',
		drz_money:'166.27',
		sum_money:'112.87',
		amount:'123456@qq.com',
		codeNum:'12345'
	}
	
	export default {
		components: {
			
		},
		data() {
			return {
				userInfo:userInfo
			}
		},
		onLoad() {

		},
		methods: {
			
		}
	}
</script>

<style>
	.page{background: #f7f7f5;min-height: 100vh;}
	.box01{background: url(../../static/images/inviteBg.png) no-repeat;background-size: 100%;padding: 80rpx 20rpx 0;}
	.headBox{display: flex;align-items: center;justify-content: space-between;}
	.headBox text{display: inline-block;width: 20%;font-size: 40rpx;color: #fff;}
	.rightBox{width: 20%;font-size: 28rpx;color: #fff;text-align: right;}
	.headTitle{font-size:40rpx;color: #fff;}
	
	.topBox{text-align: center;margin-top: 200rpx;background: #fff;border-radius: 6px;padding:40rpx 20rpx;}
	.myCode{color: #100c0b;letter-spacing: 4rpx;margin-bottom: 20rpx;}
	.codeBox{display: flex;justify-content: center;}
	.codeBox view{width: 86rpx;height: 94rpx;background: #efefef;margin: 0 10rpx;text-align: center;line-height: 94rpx;border-radius: 6px;color: #ef2813;font-size: 40rpx;font-weight: bold;}
	.copyBtn{width: 390rpx;height: 82rpx;text-align: center;line-height: 82rpx;border-radius: 6px;background: linear-gradient(to bottom,#fc604c,#ef2813);font-size: 30rpx;color: #fff;margin: 40rpx auto 0;}
	.tip{font-size: 24rpx;color: #8e8c8d;margin: 20rpx 0 60rpx;}
	.shareBox{display: flex;justify-content: space-around;}
	.shareItem image{width: 100rpx;height: 100rpx;}
	.shareItem view{font-size: 24rpx;color: #8e8c8d;}
	
	.box02{padding: 40rpx 20rpx;}
	.ruleTitle{font-size: 28rpx;color: #ef2914;background: #ffeaed;border-radius: 50px;padding: 4rpx 20rpx;display: inline-block;}
	.box02 text{display: block;padding-top: 20rpx;font-size: 24rpx;color: #8e8c8d;line-height: 46rpx;}
</style>
