<template>
	<view class="page">
		<view class="hideHead" :style="{opacity:opacity}">
			<text class="iconfont iconleft1" @click="backToBeforePage"></text>
			<view>{{goodInfo.title}}</view>
			<text></text>
		</view>
		<image src="../../static/images/backIcon.png" mode="aspectFill" class="backBtn" @click="backToBeforePage"></image>
		
		<view class="swiperBox">
			<uni-swiper-dot :info="goodInfo.small_images" :current="current" mode="round" :dots-styles="dotStyle" field="content">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in goodInfo.small_images" :key="index">
						<view :class="item.colorClass" class="swiper-item">
							<image class="swiperImage" :src="item" mode="aspectFill" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
		</view>
		
		<view class="box01">
			<view class="goodName"><image src="../../static/images/shopLogo.png" mode="aspectFill"></image>{{goodInfo.title}}</view>
			<view class="goodSales">月销{{goodInfo.sales}}</view>
			<view class="priceBox">
				<view class="priceBox01">券后价</view>
				<view class="priceBox02">￥<text>{{goodInfo.zk_final_price-goodInfo.coupon_amount}}</text></view>
				<view class="priceBox03">￥{{goodInfo.reserve_price}}</view>
			</view>
		</view>
		<view class="box02" v-if="!userInfo.isvip">
			<view>现在升级超级会员，立刻拿{{goodInfo.commission_price_super}}元返利</view>
			<navigator url="../vip/index" class="sjBtn"><text class="iconfont icondiamonds"></text>立即升级</navigator>
		</view>
		
		<view class="box03" v-if="goodInfo.coupon_amount>0">
			<view class="box03Left">
				<view class="acount"><text>{{goodInfo.coupon_amount}}</text>元优惠券</view>
				<view class="time">使用时间：{{goodInfo.coupon_end_time}}前</view>
			</view>
			<view class="box03Right" @tap="openTaoItem">立即领取</view>
		</view>
		
		<view class="box04">
			<view class="box04Flex">
				<view class="box04Left">
					<image :src="goodInfo.shop_title" mode="aspectFill" class="shopImg"></image>
					<view class="shopInfo">
						<view class="shopName">{{goodInfo.shop_title}}</view>
						<image src="../../static/images/catImg.png" mode="aspectFill" class="catImg"></image>
						<navigator class="ggBtn">进店逛逛</navigator>
					</view>
				</view>
				
				<navigator class="box04Right">全部店铺优惠</navigator>
			</view>
			
			<!-- <view class="shopDesc">
				<view class="descItem" v-for="(item,index) in goodInfo.shopInfo.desc" :key="index">
					<view class="txt01">{{item.txt01}}</view>
					<view class="score">{{item.score}}</view>
				</view>
			</view> -->
			
		</view>
		
		<!-- <view class="box05">
			<view class="box05Title">猜你喜欢</view>
			<view class="box05List">
				<navigator v-for="(item,index) in goodList" :key="index" class="goodItem">
					<image :src="item.img" mode="aspectFill"></image>
					<view class="proName">{{item.name}}</view>
					<view class="proPrice">￥<text>{{item.price}}</text></view>
				</navigator>
			</view>
		</view> -->
		
	<!-- 	<view class="box06">
			<view class="box05Title">商品详情</view>
			<image :src="goodInfo.details" mode="widthFix"></image>
		</view> -->
		
		<view v-if="!userInfo.isvip" class="fixHieghtBox"></view>
		
		<view v-if="!userInfo.isvip"  class="fixRight"><navigator open-type="switchTab" url="../vip/index"><text class="iconfont icondiamonds"></text>升级会员多赚{{goodInfo.diff_prices}}元</navigator></view>
		
		<view class="fixBox">
			<view class="fixBtn fixBtn01" :class="goodInfo.isCollection ? 'on' : ''" @click="collectionFun">
				<text class="iconfont" :class="goodInfo.isCollection ? 'iconshoucang' : 'iconshoucang1'"></text>
				<view class="fixTxt01">收藏</view>
			</view>
			
			<view class="fixBtn fixBtn02" @click="shareFun">
				<view v-if="!userInfo.isvip" class="bsTxt">￥<text>{{goodInfo.commission_price}}</text></view>
				<view v-if="userInfo.isvip" class="bsTxt">￥<text>{{goodInfo.commission_price_super}}</text></view>
				<view class="fixTxt02">分享赚</view>
			</view>
			
			<view class="fixBtn fixBtn03" @tap="openTaoItem">
				<view v-if="!userInfo.isvip" class="bsTxt">￥<text>{{goodInfo.commission_price}}</text></view>
				<view v-if="userInfo.isvip" class="bsTxt">￥<text>{{goodInfo.commission_price_super}}</text></view>
				<view class="fixTxt02">自购省</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	const Alibcsdk= uni.requireNativePlugin('UZK-Alibcsdk');
	console.log('Alibcsdk',Alibcsdk);
		
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	
	var goodInfo = {
		isCollection:false,//是否收藏
	}
	
	var goodList = [
		{img:'/static/images/goodImg02.png',name:'高梵2019秋冬新款百搭内穿羽绒背心女短',price:'99'},
		{img:'/static/images/goodImg02.png',name:'高梵2019秋冬新款百搭内穿羽绒背心女短',price:'99'},
		{img:'/static/images/goodImg02.png',name:'高梵2019秋冬新款百搭内穿羽绒背心女短',price:'99'}
	]
	export default {
		components: {
			uniSwiperDot
		},
		data() {
			return {
				userInfo:this.$USERINFO(),
				goodInfo:goodInfo,//商品信息
				current:0,//当前轮播图的下标
				dotStyle: { //轮播图知识点的颜色
						backgroundColor: 'rgb(255, 255, 255)',
						selectedBackgroundColor: 'rgba(255, 255, 255,.8)',
						border: 'none',
						selectedBorder: 'none'
					},
				goodList:goodList,//猜你喜欢商品列表
				opacity:0,
			}
		},
		onLoad(option) {
			var _this = this;
			_this.$GET_FUN('/api/tbk/getGoodsInfo', { goods_id: option.itemid }, res => {
				console.log(res);
				if (res.data.code == 1) {
					// let resData = [];
					// res.data.data.forEach(item => {
					// 	// item.imageurl = _this.$PIC(item.imageurl);
					// 	resData.push(item);
					// });
					let goodInfo= res.data.data;
					goodInfo.diff_prices=(goodInfo.commission_price_super*100 - goodInfo.commission_price*100)/100;
					_this.goodInfo = goodInfo;
					
					
					console.log(_this.goodInfo);
				}
			});
		},
		methods: {
			openTaoItem(){
				var _this = this;
				var res=Alibcsdk.init(result=>{
						Alibcsdk.openurl({
							url:_this.goodInfo.url,//类型：字符串    描述：（必传）如优惠券二合一领券页面，也可打开百川SDK套件内的相关页面
							linkkey:"", //类型：字符串  描述：（可选项）拉起淘宝或者天猫客户端，默认拉起淘宝客户端  默认值：taobao  取值范围：taobao（淘宝）   tamll（天猫）IOS暂不支持拉起天猫客户端
							pid:"mm_817590099_1225150102_109924750131",//类型：字符串  描述：(可选项)采用联盟PID方式打点。
							adzoneid:"109947400015",//类型：字符串   描述：(可选项)采用联盟adzoneid方式打点，传入该参数之后pid参数失效,adzoneid  为pid三段式第三段，如pid : mm_123_456_789,adzoneid为789
							appkey:"28233943",//类型：字符串  描述：（可选项）淘宝联盟Appkey，当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。  特别说明：当采用联盟adzoneid方式分佣打点，该参数为必传，否则分佣打点失败。
							nativeFailedMode:"",//类型：字符串  描述：（可选项）唤端失败模式（用户在未安装手淘的一些操作） 默认值：download  取值范围： h5(应用内webview打开)  download(跳转到淘宝下载页)  none（不做处理）
						}, result=>{
						console.log(result);
						})
				    }); 
			},
			
			//轮播图的滚动事件
			change(e) {
				this.current = e.detail.current
			},
			
			openApp(){
				//调用第三方程序打开指定的URL void plus.runtime.openURL( url, errorCB, identity );
				// url: ( String ) 必选 要打开的URL地址
				// 字符串类型，各平台支持的地址类型存在差异，参考平台URL支持表。
				// errorCB: ( OpenErrorCallback ) 可选 打开URL地址失败的回调
				// 打开指定URL地址失败时回调，并返回失败信息。
				// identity: ( String ) 可选 指定打开URL地址的程序名称
				// 在iOS平台此参数被忽略，在Android平台为程序包名，如果指定的包名不存在，则打开URL地址失败。
				// let url="taobao://detail.tmall.com/item.htm?id=542332289619";
				// let  errorCB=function(e){}
				// let identity="com.taobao.taobao";
				// plus.runtime.openURL( url, errorCB, identity );
			},
			
			//点击收藏的事件
			collectionFun(){
				this.goodInfo.isCollection = !this.goodInfo.isCollection
				if(this.goodInfo.isCollection){
					this.alertFun("收藏成功")
				}else{
					this.alertFun("取消收藏")
				}
			},
			shareFun() {
				uni.navigateTo({
				    url: '/pages/share/share'
				});
			},
			onPageScroll(option) {
				this.opacity = 0.004*option.scrollTop;	
			},
		}
	}
</script>

<style>
	.hideHead{background: #fff;position: fixed;width: calc(100% - 40rpx);left: 0;top:0;padding:80rpx 20rpx 20rpx;z-index: 999;display: flex;align-items: center;box-shadow: 0 2px 10px #ccc;}
	.hideHead text{width: 20%;color: #222;font-size: 40rpx;}
	.hideHead view{width: 60%;text-align: center;font-size: 32rpx;color: #000;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden;}
	.backBtn{position: fixed;width: 60rpx;height: 60rpx;left: 40rpx;top:80rpx;z-index: 999;}
	
	.swiper-box{height: 720rpx;}
	.swiperImage{width: 100%;height: 720rpx;}
	
	.box01{padding: 20rpx;}
	.goodName{font-size: 30rpx;color: #000;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;}
	.goodName image{width: 34rpx;height: 34rpx;margin-right: 4rpx;}
	.goodSales{font-size: 26rpx;color: #8e8c8d;margin: 10rpx 0 20rpx;}
	.priceBox{display: flex;align-items: flex-end;}
	.priceBox01{font-size: 20rpx;color: #fff;background: linear-gradient(to right,#ef2914,#fd6450);border-radius: 4px;padding: 2rpx 10rpx;}
	.priceBox02{font-size: 20rpx;color: #000;margin-left: 10rpx;}
	.priceBox02 text{font-size: 44rpx;font-weight: bold;}
	.priceBox03{font-size: 22rpx;color: #8e8c8d;text-decoration: line-through;margin-left: 10rpx;}
	
	.box02{padding: 20rpx;background: #f7f7f5;display: flex;align-items: center;justify-content: space-between;}
	.box02 view{font-size: 24rpx;color: #222;}
	.box02 .sjBtn{display: flex;align-items: center;background: linear-gradient(to right,#9826fc,#b782ff);border-radius: 50px;font-size: 24rpx;color: #fff;padding: 12rpx 20rpx;}
	.sjBtn text{font-size: 28rpx;color: #f5cca7;margin-right: 6rpx;}
	
	.box03{padding: 20rpx;display: flex;align-items: center;justify-content: center;}
	.box03Left{width: 450rpx;height: 148rpx;background: url(../../static/images/couponLeftBg.png) no-repeat;background-size: 100%;display: flex;flex-direction: column;align-content: center;justify-content: center;}
	.acount{display: flex;align-items: center;justify-content: center;font-size: 28rpx;color: #fff;}
	.acount text{font-size: 36rpx;margin-right: 6rpx;}
	.time{font-size: 24rpx;color: #fff;text-align: center;margin-top: 10rpx;}
	.box03Right{width: 190rpx;height: 148rpx;background: url(../../static/images/couponRightBg.png) no-repeat;background-size: 100%;text-align: center;line-height: 148rpx;font-size: 28rpx;color: #fff;}
	
	.box04{border-top: 20rpx solid #f7f7f5;border-bottom: 20rpx solid #f7f7f5;padding: 20rpx;}
	.box04Flex{display: flex;align-items: center;justify-content: space-between;}
	.box04Left{display: flex;align-items: center;}
	.shopImg{width: 118rpx;height: 118rpx;margin-right: 20rpx;}
	.catImg{width: 116rpx;height: 18rpx;}
	.shopName{font-size: 30rpx;color: #222;}
	.ggBtn{font-size: 24rpx;color: #ca161f;}
	.box04Right{font-size: 26rpx;color: #fff;background: linear-gradient(to bottom,#fc604c,#ef2813);border-radius: 50px;padding: 10rpx 20rpx;}
	.shopDesc{display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;}
	.descItem{display: flex;align-items: center;}
	.txt01{font-size: 26rpx;color: #999;margin-right: 20rpx;}
	.score{background: #f1f1f1;font-size: 26rpx;color: #999;}
	
	.box05{padding:40rpx 20rpx 20rpx;border-bottom: 20rpx solid #f7f7f5;}
	.box05Title{font-size: 36rpx;text-align: center;margin-bottom: 40rpx;}
	.box05List{display: flex;justify-content: space-between;}
	.goodItem{width: 32%;}
	.goodItem image{width: 100%;height: 230rpx;}
	.proName{font-size: 26rpx;color: #222;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;}
	.proPrice{font-size: 24rpx;color: #f02b16;font-weight: bold;}
	.proPrice text{font-size: 36rpx;}
	
	.box06{padding: 40rpx 20rpx 20rpx;}
	.box06 image{width: 100%;}
	
	.fixHieghtBox{width: 100%;height: 120rpx;}
	.fixBox{position: fixed;width: 100%;height: 114rpx;display: flex;bottom:0;left: 0;z-index: 999;background: #f8f6f9;}
	.fixBtn{height: 114rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;}
	.fixBtn01{width: 25%;}
	.fixBtn02{width: 35%;background: #fba401;}
	.fixBtn03{width: 40%;background: linear-gradient(to right,#ee2510,#fd634f);}
	.fixTxt01{font-size: 30rpx;color: #8e8c8c;}
	.fixBtn01 .iconfont{font-size: 40rpx;color: #8e8c8c;font-weight: bold;}
	.bsTxt{font-size: 24rpx;color: #fff;}
	.bsTxt text{font-size: 40rpx;}
	.fixTxt02{font-size: 26rpx;color: #fff;}
	.fixBtn01.on text{color: #f02d18;}
	.fixBtn01.on view{color: #f02d18;}
	.fixRight{position: fixed;display: flex;align-items: center;right: 0;bottom:150rpx;background: linear-gradient(to right,#9722fc,#b16ffe);border-radius: 50px 0 0 50px;font-size: 30rpx;color: #fff;padding:16rpx 20rpx;z-index: 999;}
	.fixRight text{margin-right: 10rpx;color: #ffde9d;}
</style>
