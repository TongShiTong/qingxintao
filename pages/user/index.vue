<template>
	<view class="page">
		<view class="box01">
			<commonHead :headTitle="headTitle"></commonHead>
			<view class="userBox" v-if="userInfo.isLogin">
				<image :src="userInfo.avatar" class="userImg" mode="aspectFill"></image>
				<view class="infoBox01">
					<view class="nameInfo">
						<view class="nickName">{{userInfo.nickname}}</view>
						<text>邀请ID：{{userInfo.invitcode}}</text>
					</view>
					<view class="vipInfo">
						<view class="vipLevel">{{userInfo.group_name}}</view>
						<text>会员权益</text>
					</view>
					<view v-if="userInfo.isvip" class="time">到期时间{{userInfo.vip_end_time}}</view>
				</view>
				<navigator class="xfBtn"><image src="../../static/images/xfIcon.png" mode="aspectFill"></image>续费</navigator>
			</view>
			<view class="userBox" v-else>
				<image :src="userInfo.avatar" class="userImg" mode="aspectFill"></image>
				<view class="">
					<navigator url="/pages/login/login" >立即登录</navigator>
					<view class="time">
						如果您还没有账号，请先<navigator url="/pages/login/register" >注册会员</navigator>
					</view>
				</view>
			</view>
			
			<view class="profitBox" v-if="userInfo.isLogin">
				<view class="yueBox">
					<navigator url="/pages/user/balance/balance" class="profitTitle"><image src="../../static/images/yeIcon.png" mode="aspectFill"></image>我的余额（元）</navigator>
					<view class="yueCon">
						<view class="yueLeft"><text>余额</text>{{userInfo.money}}</view>
						<navigator class="txBtn" url="/pages/user/widthdraw"><image src="../../static/images/txIcon.png" mode="aspectFill"></image>提现</navigator>
					</view>
				</view>
				
				<view class="yueBox mySyBox">
					<view class="profitTitle"><image src="../../static/images/syIcon.png" mode="aspectFill"></image>我的收益（元）</view>
					<view class="profitCon">
						<view><text>待入账</text>{{userInfo.drz_money}}</view>
						<view><text>累计入账</text>{{userInfo.sum_money}}</view>
					</view>
				</view>
			</view>
			
			<view class="listBox">
				<navigator v-for="(item,index) in lists" :key="index" class="listItem" :url="item.url">
					<view><image :src="item.img" mode="aspectFill"></image>{{item.txt}}</view>
					<text class="iconfont iconyou"></text>
				</navigator>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	import commonHead from '@/components/common-head/common-head.vue'
	var userInfo = {
		avatar:'/static/images/avatar.png',
		nick:'',
		inviteId:'',
		vipLevel:'',
		time:'',
		yue:'',
		drz_money:'',
		sum_money:'',
		isLogin:false,
		isvip:false,
	}
	var lists = [
		{img:'/static/images/meIcon01.png',txt:'返利订单',url:'/pages/cashback/index'},
		{img:'/static/images/meIcon02.png',txt:'返佣订单',url:'/pages/cashback/cashback'},
		{img:'/static/images/meIcon03.png',txt:'推荐的会员'},
		{img:'/static/images/meIcon04.png',txt:'邀请好友',url:'/pages/user/invite'},
		{img:'/static/images/meIcon05.png',txt:'我的收藏'},
		{img:'/static/images/meIcon06.png',txt:'常见问题',url:'/pages/user/problem/problem'},
		{img:'/static/images/meIcon07.png',txt:'设置',url:'/pages/setting/index'},
	]
	var listsNoLogin=[
		{img:'/static/images/meIcon06.png',txt:'常见问题',url:'/pages/user/problem/problem'},
	];
	export default {
		components: {
			commonHead
		},
		data() {
			let userInfoData=this.$USERINFO();
			let listsData=userInfoData.isLogin?lists:listsNoLogin;
			return {
				headTitle:'我的',
				userInfo:this.$USERINFO(),
				lists:listsData,
			}
		},
		onShow(){
			let _this=this;
			_this.userInfo=this.$USERINFO();
			//获取用户信息
			_this.$GET_FUN('/api/user/userinfo', {}, res => {
				if (res.data.code == 1) {
					console.log(123);
					let userinfo=res.data.data;
					//let token=res.data.data.userinfo.token;
					userinfo.avatar=_this.$PIC(userinfo.avatar);
					userinfo.isLogin=true;
					uni.setStorageSync("userInfo",userinfo);
					//uni.setStorageSync("token",token);
					_this.userInfo=userinfo;
					_this.lists=lists;
					
					
				}
			});
		},
		onLoad() {
			let _this=this;
			// _this.userInfo.isLogin=false;
			//获取用户信息
			_this.$GET_FUN('/api/user/userinfo', {}, res => {
				if (res.data.code == 1) {
					console.log(123);
					let userinfo=res.data.data;
					//let token=res.data.data.userinfo.token;
					userinfo.avatar=_this.$PIC(userinfo.avatar);
					userinfo.isLogin=true;
					uni.setStorageSync("userInfo",userinfo);
					//uni.setStorageSync("token",token);
					_this.userInfo=userinfo;
					_this.lists=lists;
				}else if(res.data.code == 401){
					uni.setStorageSync("userInfo",[]);
					uni.setStorageSync("token","");
					_this.userInfo=_this.$USERINFO();
				}
			});
		},
		methods: {
		
		},
		
	}
</script>

<style>
	.page{background: #f7f7f5;min-height: 100vh;}
	.box01{background: url(../../static/images/uerBg.png) no-repeat;background-size: 100%;padding: 80rpx 20rpx 0;}
	.userBox{display: flex;justify-content: space-between;align-items: flex-start;padding: 20rpx;border-radius: 6px;background: #fff;margin-top: 50rpx;}
	.userImg{width: 124rpx;height: 124rpx;border-radius: 50%;border: 2px solid #d2d1d3;}
	.infoBox01{width: calc(100% - 300rpx);}
	.nameInfo,.vipInfo{display: flex;align-items: center;}
	.nickName{font-size: 32rpx;color: #222;margin-right: 20rpx;}
	.nameInfo text{font-size: 24rpx;color: #8e8c8d;}
	.vipLevel{display: flex;align-items: center;background: linear-gradient(to right,#9928fc,#b781ff);font-size: 24rpx;color: #fff;border-radius: 50px;margin-right: 20rpx;padding: 0 8rpx;}
	.vipInfo{margin: 10rpx 0;}
	.vipInfo text{font-size: 24rpx;color: #222;}
	.xfBtn{font-size: 26rpx;color: #f23520;display: flex;align-items: center;background: #ffeaed;border-radius: 50px;padding: 4rpx 16rpx;align-self: center;}
	.xfBtn image{width: 24rpx;height: 24rpx;margin-right:6rpx;}
	.time{font-size: 24rpx;color: #8e8c8d;}
	
	.profitBox{background: #fff;border-radius: 6px;margin-top: 20rpx;padding: 20rpx;}
	.profitTitle{font-size: 30rpx;color: #222;margin-bottom: 16rpx;display: flex;align-items: center;}
	.profitTitle image{width: 28rpx;height: 28rpx;margin-right: 10rpx;}
	.yueCon{display: flex;align-items: center;justify-content:space-between;padding-left: 38rpx;}
	.yueLeft{font-size: 34rpx;color: #e33329;font-weight: bold;display: flex;align-items: center;}
	.yueLeft text{font-size: 26rpx;color: #8e8c8d;width: 120rpx;display: inline-block;}
	.txBtn{display: flex;align-items: center;background: linear-gradient(to bottom,#fe6753,#ee230e);border-radius: 50px;font-size: 28rpx;color: #fff;padding: 6rpx 20rpx;}
	.txBtn image{width: 28rpx;height: 26rpx;margin-right: 6rpx;}
	.mySyBox{padding-top: 30rpx;margin-top: 30rpx;border-top: 1px solid #eee;}
	.profitCon{padding-left: 38rpx;display: flex;align-items: center;justify-content: space-between;}
	.profitCon view{font-size:34rpx;color: #ff7900;font-weight: bold;display: flex;align-items: center;}
	.profitCon text{ font-size: 26rpx;color: #8e8c8d;width: 120rpx;display: inline-block;}
	.listBox{padding:0 20rpx;background: #fff;border-radius: 6px;margin-top: 20rpx;}
	.listItem{display: flex;align-items: center;justify-content: space-between;padding: 26rpx 0;border-bottom: 1px solid #f7f7f5;}
	.listItem image{width: 30rpx;height: 30rpx;margin-right: 16rpx;}
	.listItem view{font-size: 28rpx;color: #333;display: flex;align-items: center;}
	.listItem text{font-size: 40rpx;color: #ccc;}
	.listBox .listItem:last-child{border-bottom: none;}
</style>
