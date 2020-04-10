<template>
	<view class="page">
		<view class="box01">
			<!-- <view class="topBox">
				<view class="searchBox">
					<view class="searchLeft">
						<text class="iconfont iconsousuo"></text>
						<input disabled="true" @click="search" placeholder="搜索商品标题 领优惠券拿返现" placeholder-class="defaultInput" class="searchInput"/>
					</view>
					
					<text class="iconfont iconxiangji scanEnter"></text>
				</view>
				
				<navigator class="newsEnter"><text class="iconfont iconxiaoxi1"></text></navigator>
			</view> -->
			
			<!-- <view class="adBox">
				<view class="adTxts">
					<view class="adTxtItem">1.复制商品链接</view>
					<view class="adTxtItem">2.领优惠券</view>
					<view class="adTxtItem">3.下单拿返利/分享赚钱</view>
				</view>
				<image src="../../static/images/adImg.png" mode="aspectFill" class="adImg"></image>
			</view> -->
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">京东</view>
				<text class="iconfont iconsousuo"></text>
			</view>
			<view class="swiperBox">
				<uni-swiper-dot :info="banners" :current="current" mode="round" :dots-styles="dotStyle" field="content">
					<swiper class="swiper-box" @change="change">
						<swiper-item v-for="(item, index) in banners" :key="index">
							<view :class="item.colorClass" class="swiper-item">
								<image class="swiperImage" :src="item" mode="aspectFill" />
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
		</view>
	
		<view class="box02">
			<!-- <view class="nineBox">
				<uni-grid :column="5" :square="false" :show-border="false" :highlight="false" @change="gridChange">
					<uni-grid-item v-for="(item, index) in nines" :index="index" :key="index">
						<navigator class="grid-item-box" :url="item.url">
							<image :src="item.img" class="kindImage" mode="aspectFill" />
							<text class="kindText">{{ item.txt }}</text>
						</navigator>
					</uni-grid-item>
				</uni-grid>
			</view> -->
			<goodKindNavs
				:goodKind="goodKind"
				:curKind="curKind"
				@checkKindParent="checkKindParent"
				class="biaoti"
				>
			</goodKindNavs>
			<view class="conBox">
				<!-- <view class="ad3ImgBox">
					<image src="../../static/images/adImg01.png" mode="aspectFill" class="adImg01"></image>
					<view class="adImgBox">
						<image src="../../static/images/adImg02.png" mode="aspectFill" class="adImg02"></image>
						<image src="../../static/images/adImg03.png" mode="aspectFill" class="adImg02"></image>
					</view>
				</view>
				
				<view class="ad4ImgBox">
					<image src="../../static/images/adImg04.png" mode="aspectFill" class="adImg03"></image>
					<image src="../../static/images/adImg05.png" mode="aspectFill" class="adImg03"></image>
					<image src="../../static/images/adImg06.png" mode="aspectFill" class="adImg03"></image>
					<image src="../../static/images/adImg07.png" mode="aspectFill" class="adImg03"></image>
				</view>
				
				<view class="adSwiperBox">
					<uni-swiper-dot :info="adBanners" :current="adCurrent" mode="round" :dots-styles="dotStyle" field="content">
						<swiper class="swiper-box" @change="adChange">
							<swiper-item v-for="(item, index) in adBanners" :key="index">
								<view :class="item.colorClass" class="swiper-item">
									<image class="swiperImage" :src="item" mode="aspectFill" />
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view> -->
				<view class="goodList">
					<navigator class="goodItem" v-for="(item,index) in goodList" :key="index" url="proDetails">
						<image :src="item.img" class="goodImg" mode="aspectFill"></image>
						<view class="goodRight">
							
							<view class="goodName">
								<image src="../../static/images/hotIcon.png" class="hotImg" mode="aspectFill"></image>
								{{item.name}}
							</view>
							
							<view class="goodInfoMid">
								<view class="shopInfo">
									<image :src="item.shopLogo" class="shopLogo" mode="aspectFill"></image>
									{{item.shop}}
								</view>
								<view class="sales">{{item.sales}}人已枪</view>
							</view>
							
							<view class="couponBox">
								<view class="couponLeft">券后￥<text>{{item.money}}</text></view>
								<view class="couponRight">
									<text>券</text>￥{{item.coupon}}
								</view>
							</view>
							
							<view class="winBox">
								<view class="winItem winLeft">预估赚￥{{item.yg_win}}</view>
								<view class="winItem winRight"><text class="iconfont icondiamonds"></text>升级赚￥{{item.sj_win}}</view>
							</view>
						</view>
					</navigator>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import goodKindNavs from '@/components/good-kind-navs/good-kind-navs.vue'
	var banners = ['/static/images/banner.png','/static/images/banner.png','/static/images/banner.png']
	var adBanners = ['/static/images/adBanner.png','/static/images/adBanner.png','/static/images/adBanner.png']
	var nines = [
		{img:'/static/images/kind01.png',txt:'精挑细选'},
		{img:'/static/images/kind02.png',txt:'淘宝'},
		{img:'/static/images/kind03.png',txt:'京东'},
		{img:'/static/images/kind04.png',txt:'拼多多'},
		{img:'/static/images/kind05.png',txt:'聚划算'},
		{img:'/static/images/kind06.png',txt:'网易考拉'},
		{img:'/static/images/kind07.png',txt:'9.9专区',url:'/pages/zone/zone'},
		{img:'/static/images/kind08.png',txt:'大额券'},
		{img:'/static/images/kind09.png',txt:'重磅新品',url:'/pages/zone/bigDeal'},
		{img:'/static/images/kind10.png',txt:'销量榜'},
	]
	var goodKind = ['精选','女装','男装','内衣','美妆','配置','童装','家居','内衣','美妆','配置','童装','家居']
	var goodList = [
		{
			img:'/static/images/goodImg.png',
			name:'高梵2019新款时尚工装羽绒服女中长款韩版连帽蓄热保暖',
			shop:'高梵旗舰店',
			shopLogo:'/static/images/shopLogo.png',
			sales:'25000',
			money:'649',
			coupon:'150',
			yg_win:'18.8',
			sj_win:'28.8'
		},{
			img:'/static/images/goodImg.png',
			name:'高梵2019新款时尚工装羽绒服女中长款韩版连帽蓄热保暖',
			shop:'高梵旗舰店',
			shopLogo:'/static/images/shopLogo.png',
			sales:'25000',
			money:'649',
			coupon:'150',
			yg_win:'18.8',
			sj_win:'28.8'
		},{
			img:'/static/images/goodImg.png',
			name:'高梵2019新款时尚工装羽绒服女中长款韩版连帽蓄热保暖',
			shop:'高梵旗舰店',
			shopLogo:'/static/images/shopLogo.png',
			sales:'25000',
			money:'649',
			coupon:'150',
			yg_win:'18.8',
			sj_win:'28.8'
		}
	]
	export default {
		components: {
			uniSwiperDot,
			uniGrid,
			uniGridItem,
			goodKindNavs
		},
		data() {
			return {
				banners:banners,//顶部轮播图
				dotStyle: { //轮播图知识点的颜色
						backgroundColor: 'rgb(201, 199, 200)',
						selectedBackgroundColor: 'rgba(0, 0, 0,.8)',
						border: 'none',
						selectedBorder: 'none'
					},
				current:0,//当前轮播图的下标
				adCurrent:0,//当前广告轮播图的下标
				nines:nines,//九宫格部分
				adBanners:adBanners,//广告位的轮播图
				goodKind:goodKind,//产品分类
				curKind:0,//当前产品分类的下标
				goodList:goodList,//产品列表
			}
		},
		onLoad() {
			this.demoFun()
		},
		methods: {
			//轮播图的滚动事件
			change(e) {
				this.current = e.detail.current
			},
			search() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			adChange(e){
				this.adCurrent = e.detail.current
			},
			
			//九宫格部分的点击事件
			gridChange(e) {
				let {
					index
				} = e.detail
			
				
				uni.showToast({
					title: `点击第${index+1}个宫格`,
					icon: 'none'
				})
			},
			
			//选择产品分类
			checkKindParent(idx){
				this.curKind = idx
			},
			
			demoFun(){
				var _this = this
				_this.$GET_FUN(
					_this.$BASE_URL + '/api/demo/test1',
					{},
					function(res){
						console.log(res);
					}
				)
			}
		}
	}
</script>

<style>
	.headBox{display: flex;align-items: center;justify-content: space-between;margin-bottom: 40rpx;}
	.headBox text{display: inline-block;width: 20%;font-size: 40rpx;color: #fff;}
	.rightBox{width: 20%;font-size: 28rpx;color: #fff;text-align: right;}
	.headTitle{font-size:40rpx;color: #fff;}
	.box01{background: url(../../static/images/indexBg.png) no-repeat;background-size: 100%;padding: 80rpx 20rpx 0;}
	.topBox{display: flex;align-items: center;justify-content: space-between;}
	.searchBox{width: 82%;background: #fff;border-radius: 50rpx;display: flex;align-items: center;justify-content: space-between;padding: 8rpx 24rpx;}
	.searchLeft{display: flex;align-items: center;width: 90%;}
	.searchLeft text{font-size: 46rpx;margin-right: 10rpx;color: #a0a2a0;}
	.defaultInput{font-size:28rpx;color: #a0a2a0;}
	.searchInput{width: calc(100% - 66rpx);}
	.scanEnter{font-size: 40rpx;color: #a0a2a0;}
	.newsEnter text{font-size: 56rpx;color: #fff;}
	
	.adBox{display: flex;align-items: center;justify-content: space-between;margin: 10rpx 0 30rpx;}
	.adTxts{display: flex;align-items: center;}
	.adTxtItem{font-size: 22rpx;color: #fff;margin-right: 10rpx;}
	.adImg{width: 150rpx;height: 42rpx;}
	.swiper-box{height: 280rpx;}
	.swiperImage{width: 710rpx;height: 280rpx;}
	
	.box02{}
	.nineBox{padding: 20rpx;}
	.kindImage{width: 84rpx;height: 84rpx;}
	.kindText{font-size: 24rpx;color: #8e8c8d;margin-top: 6rpx;}
	.grid-item-box{display: flex;flex-direction: column;align-items: center;justify-content: center;flex: 1;padding: 10rpx 0;}
	.conBox{background: #f7f7f5;padding: 10rpx 20rpx 10rpx;}
	.adSwiperBox{margin-bottom: 50rpx;}
	.ad3ImgBox{display: flex;align-items: center;justify-content: space-between;}
	.adImg01{width: 348rpx;height: 364rpx;}
	.adImgBox{display: flex;flex-direction: column;justify-content: space-between;height: 364rpx;}
	.adImg02{width: 345rpx;height: 176rpx;}
	.ad4ImgBox{display: flex;justify-content: space-between;padding: 30rpx 0 60rpx;}
	.adImg03{width: 166rpx;height: 232rpx;}
	
	.biaoti {text-align: center;background: #fff;padding: 40rpx 20rpx 20rpx;overflow: hidden;width: 710rpx;}
	.goodList{margin-top: 20rpx;}
	.goodItem{display: flex;align-items: center;justify-content: space-between;border-radius: 12rpx;overflow: hidden; margin-bottom: 44rpx;background: #fff;}
	.goodImg{width: 264rpx;height: 262rpx;}
	.goodRight{width: calc(100% - 280rpx);height: 262rpx;}
	.goodName{font-size: 28rpx;color: #222;margin-bottom: 20rpx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;}
	.hotImg{width: 82rpx;height: 30rpx;margin-right: 6rpx;}
	.goodInfoMid,.couponBox{display: flex;align-items: center;justify-content: space-between;margin-bottom: 20rpx;}
	.shopInfo{display: flex;align-items: center;font-size: 24rpx;color: #8e8c8d;}
	.shopLogo{width: 34rpx;height: 34rpx;margin-right: 4rpx;}
	.sales{font-size: 24rpx;color: #8e8c8d;}
	.couponLeft{font-size: 24rpx;color: #000;font-weight: bold;}
	.couponLeft text{font-size: 32rpx;}
	.couponRight{font-size: 24rpx;color: #f02b16;border: 1px solid #f02b16;border-radius: 3px;padding-right: 6rpx;}
	.couponRight text{background: #f02b16;color: #fff;padding: 0 4rpx;margin-right: 6rpx;}
	.winBox{display: flex;align-items: center;}
	.winItem{display: flex;align-items: center;margin-right: 20rpx;font-size: 22rpx;color: #ee240f;padding: 2rpx 4rpx;}
	.winLeft{border: 1px solid #ee240f;}
	.winRight{background: linear-gradient(to right,#ee240f,#fc614d);color: #fff;}
	.winRight text{font-size: 28rpx;}
</style>
