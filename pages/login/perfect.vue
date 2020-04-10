<template>
	<view class="page">
	  <image src="../../static/images/logo.png" class="logo" mode="aspectFill"></image>
	  <view>
		  头像
		 <image :src="alibcUserInfo.avatarUrl" mode="aspectFill"></image>
	  </view>
	  <view>
	  		  昵称：{{alibcUserInfo.nick}}
	  </view>
	  <view class="formBox">
		  <input placeholder="手机号" placeholder-class="defaultInput" class="telInput" v-model="mobile" type="number"/>
		  <view class="codeBox">
			  <input placeholder="验证码" class="codeInput" placeholder-class="defaultInput" v-model="code"/>
			  <view class="codeTxt" @click="countTime()">{{codeTxt}}</view>
		  </view>
		  
		  <input placeholder="设置密码" placeholder-class="defaultInput" class="telInput" v-model="password" password/>
		  <input placeholder="邀请码" placeholder-class="defaultInput" class="telInput" v-model="invitcode"/>
		  
		  <view class="btnItem loginBtn" @click="registerFun()">注册</view>
		  <navigator class="btnItem zcBtn" url="login">登录</navigator>
	  </view>
	</view>
</template>

<script>
	var countTime = 60 //倒计时事件
	var timer = null //定时器
	var canClick = true //防重复点击获取验证码按钮
	
	export default {
		
		data() {
			let AlibcUserInfo =uni.getStorageSync('AlibcUserInfo')||[];
			return {
				alibcUserInfo:AlibcUserInfo,
				codeTxt:'获取验证码',
				mobile:'',
				code:'',
				password:'',
				invitcode:''
			}
		},
		onLoad() {
			
		},
		methods: {
			//注册
			registerFun(){
				var _this = this;
				var myreg=/^[1][0-9]{10}$/
				var _tel = this.mobile
				var _code = this.code
				var _psw = this.password
				var _yqm = this.invitcode
				if(!myreg.test(_tel)){
					this.alertFun("请输入正确的手机号")
				}else if(!_code){
					this.alertFun("请输入验证码")
				}else if(!_psw){
					this.alertFun("请设置密码")
				}else if(_yqm){
					this.alertFun("请输入邀请码")
				}else{
					_this.$GET_FUN('/api/user/register', {
						mobile:_this.mobile,
						captcha:_this.code,
						password:_this.password,
						invitcode:_this.invitcode,
					}, res => {
						if (res.data.code == 1) {
							let userinfo=res.data.data.userinfo;
							let token=res.data.data.userinfo.token;
							userinfo.avatar=_this.$PIC(userinfo.avatar);
							userinfo.isLogin=true;
							uni.setStorageSync("userInfo",userinfo);
							uni.setStorageSync("token",token);
							this.alertFun("注册成功")
							setTimeout(function() {
								uni.reLaunch({
									url:'../user/index'
								})
							}, 1500);
						}else{
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					});
					
					
					
					// this.alertFun("注册成功")
					// setTimeout(function() {
					// 	uni.reLaunch({
					// 		url:'../index/index'
					// 	})
					// }, 1500);
				}
				
			},
			
			countTime(){
				var _this = this
				if(canClick){
					canClick = false;
					_this.$GET_FUN('/api/sms/send', {
						mobile:_this.mobile,
						event:'register',
					}, res => {
						if (res.data.code == 1) {
							let resData = [];
							let timeFun=function(){
								if(countTime > 0){
									countTime --
									_this.codeTxt = countTime + "s后重新获取";
									setTimeout(function(){timeFun()},1000);
								}else{
									countTime = 60
									_this.codeTxt = "重新获取"
									clearInterval(timer)
									canClick = true
								}
							};
							timeFun();
							// timer = setInterval(,1000)
						}else{
							canClick = true;
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
						}
					});
					
				}
				
				
			},
		}
	}
</script>

<style>
	.page{background: #f7f7f5;padding-top: 80rpx;height: calc(100vh - 80rpx);}
	.logo{width: 140rpx;height: 140rpx;display: block;margin: 0 auto 80rpx;}
	
	.formBox{padding: 0 80rpx;}
	.defaultInput{font-size: 28rpx;color: #a2a2a2;}
	.telInput{width: calc(100% - 60rpx);height: 80rpx;background: #fff;border-radius: 50px;padding: 0 30rpx;font-size: 28rpx;color: #222;margin-bottom: 20rpx;}
	.codeBox{width: calc(100% - 60rpx);height: 80rpx;background: #fff;border-radius: 50px;padding: 0 30rpx;display: flex;align-items: center;justify-content: space-between;margin-bottom: 20rpx;}
	.codeInput{width: 50%;font-size: 28rpx;color: #222;}
	.codeTxt{font-size: 28rpx;color: #f33824;}
	.btnItem{width: 80%;height: 80rpx;text-align: center;line-height: 80rpx;font-size: 30rpx;color: #fff;margin:0 auto 30rpx;background: #f2897d;border-radius: 50px;}
	.loginBtn{background: linear-gradient(to bottom,#fd6652,#f02b16);margin-top: 80rpx;}
</style>
