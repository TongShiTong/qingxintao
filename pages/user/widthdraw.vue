<template>
	<view class="page">
		<view class="box01">
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">提现</view>
				<navigator class="rightBox">提现记录</navigator>
			</view>
			
			<view class="topBox">
				<view class="sumMoney">{{userInfo.yue}}</view>
				<view class="detailBox">
					<view>累计赚钱<text>{{userInfo.sum_money}}</text></view>
					<view>即将到账<text>{{userInfo.drz_money}}</text></view>
				</view>
			</view>
		</view>
		
		<view class="box02">
			<view class="formBox">
				<view class="formItem">
					<view class="formLeft">收款账号</view>
					<view class="formRight">{{userInfo.amount}}<text class="iconfont iconyou"></text></view>
				</view>
				
				<view class="formItem">
					<view class="formLeft">收款方式</view>
					<view class="formRight">支付宝</view>
				</view>
				
				<view class="formItem">
					<view class="formLeft">姓   名</view>
					<view class="formRight">{{userInfo.nick}}</view>
				</view>
				
				<view class="formItem">
					<view class="formLeft">提取金额</view>
					<input type="number" value="" placeholder="请输入提取金额" placeholder-class="defaultInput" class="formRight"/>
				</view>
				
			</view>
			
			<view class="tipBox">
				<view>温馨提示：</view>
				<text>
					1.提现金额不满50元，收1元手续费；首次提现不收取手续费。
					2.请确保您的返利实名和支付宝实名信息一致，方可提现成功。
				</text>
			</view>
			
			<view class="txBtn">确认提现</view>
		</view>
		
		
		
	</view>
</template>

<script>
	var userInfo = {
		nick:'鹿先森',
		yue:'200.00',
		drz_money:'166.27',
		sum_money:'112.87',
		amount:'123456@qq.com'
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
	.box01{background: url(../../static/images/txBg.png) no-repeat;background-size: 100%;padding: 80rpx 20rpx 0;height: 250rpx;}
	.headBox{display: flex;align-items: center;justify-content: space-between;padding: 20rpx 0;}
	.headBox text{display: inline-block;width: 20%;font-size: 40rpx;color: #fff;}
	.rightBox{width: 20%;font-size: 28rpx;color: #fff;text-align: right;}
	.headTitle{font-size:40rpx;color: #fff;}
	
	.topBox{text-align: center;margin-top: 20rpx;}
	.detailBox{display: flex;justify-content: space-between;}
	.sumMoney{color: #fff;font-size: 40rpx;margin-bottom: 20rpx;}
	.detailBox view{width: 50%;font-size: 24rpx;color: #fff;display: flex;align-items: center;justify-content: center;position: relative;}
	.detailBox text{font-size: 34rpx;margin-left: 20rpx;}
	.detailBox view:first-child:after{content: '';display: block;position: absolute;width: 1px;height: 30rpx;right:0;top:10rpx;background: #fff;}
	
	.box02{height: calc(100vh - 330rpx);background: #f7f7f5;padding: 20rpx;}
	.formBox{padding: 20rpx;background: #fff;border-radius: 6px;}
	.formItem{display: flex;align-items: center;justify-content: space-between;padding: 20rpx 0;border-bottom: 1px solid #f7f7f5;}
	.formLeft{font-size: 30rpx;color: #333; text-align: justify;text-align-last: justify;width:120rpx;}
	.formRight{font-size: 30rpx;color: #8e8c8d;text-align: right;}
	
	.tipBox{padding: 20rpx;margin-top: 20rpx;}
	.tipBox view{font-size: 30rpx;color: #959394;}
	.tipBox text{font-size: 24rpx;color: #959394;}
	.txBtn{width: 620rpx;height: 92rpx;background: linear-gradient(to bottom,#fd6551,#f02c18);font-size: 34rpx;color: #fff;text-align: center;line-height: 92rpx;border-radius: 6px;margin: 60rpx auto 0;}
</style>
