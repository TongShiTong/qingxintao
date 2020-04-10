<template>
	<view class="page">
		<view class="box01">
			<!-- <view class="hideHead" :style="{opacity:opacity}">品牌热卖</view>
			
			<commonHead :headTitle="headTitle"></commonHead> -->
			<view class="headBox">
				<text class="iconfont iconleft1" @click="backToBeforePage()"></text>
				<view class="headTitle">品牌</view>
				<navigator class="rightBox"></navigator>
			</view>
			
			<view class="nineBox">
				<uni-grid :column="4" :square="false" :show-border="false" :highlight="false" @change="gridChange">
					<uni-grid-item v-for="(item, index) in nines" :index="index" :key="index">
						<view class="grid-item-box">
							<image :src="item.img" class="kindImage" mode="aspectFill" />
							<text class="kindText">{{ item.txt }}</text>
							<view class="kindDesc">{{item.desc}}</view>
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</view>
		
		<view class="kindsBox">
			<goodKindNavs
				:goodKind="goodKind"
				:curKind="curKind"
				@checkKindParent="checkKindParent"
				>
			</goodKindNavs>
		</view>
	
		<view class="box02">
			<view class="brandItem" v-for="(item,index) in goodList" :key="index">
				<view class="brandInfo" :style="{backgroundColor:item.brand.color}">
					<view class="brandLeft">
						<image :src="item.brand.img" mode="widthFix" class="brandImg"></image>
						<view class="brandName">{{item.brand.name}}</view>
					</view>
					
					<navigator class="brandRight">更多</navigator>
				</view>
				
				<view class="goodList">
					<view class="goodItem" v-for="(gItem,gIndex) in item.goods" :key="gIndex">
						<image :src="gItem.img" class="goodImg" mode="aspectFill"></image>
						<view class="goodRight">
							
							<view class="goodName">
								<image :src="gItem.shopLogo" class="shopLogo" mode="aspectFill"></image>
								{{gItem.name}}
							</view>
							
							<view class="goodInfoMid">
								<view class="shopInfo">原价￥{{gItem.oldPrice}}</view>
								<view class="sales">{{gItem.sales}}人已枪</view>
							</view>
							
							<view class="couponBox">
								<view class="couponLeft">券后￥<text>{{gItem.money}}</text></view>
								<view class="couponRight" :style="{backgroundColor:item.brand.color}">
									<text class="dotItem dotLeft"></text>{{gItem.coupon}}元券<text class="dotItem dotRight"></text>
								</view>
							</view>
							
							<view class="winBox">
								<view class="winItem winLeft" :style="{color:item.brand.color,borderColor:item.brand.color}">预估赚{{gItem.yg_win}}</view>
								<view class="winItem winRight" :style="{backgroundColor:item.brand.color}"><text class="iconfont icondiamonds"></text>升级赚{{gItem.sj_win}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import goodKindNavs from '@/components/good-kind-navs/good-kind-navs.vue'
	import commonHead from '@/components/common-head/common-head.vue'
	var nines = [
		{img:'/static/images/brand01.png',txt:'三只松鼠',desc:'最高返佣90%'},
		{img:'/static/images/brand02.png',txt:'百草味',desc:'最高返佣90%'},
		{img:'/static/images/brand03.png',txt:'良品铺子',desc:'最高返佣90%'},
		{img:'/static/images/brand04.png',txt:'高梵',desc:'最高返佣90%'},
		{img:'/static/images/brand05.png',txt:'DHC',desc:'最高返佣90%'},
		{img:'/static/images/brand06.png',txt:'雅诗兰黛',desc:'最高返佣90%'},
		{img:'/static/images/brand07.png',txt:'百雀羚',desc:'最高返佣90%'},
		{img:'/static/images/brand08.png',txt:'美宝莲',desc:'最高返佣90%'}
	]
	var goodKind = ['精选','女装','男装','内衣','美妆','配置','童装','家居','内衣','美妆','配置','童装','家居']
	var goodList = [
		{
			brand:{
				img:'/static/images/brandIcon01.png',
				name:'高梵旗舰店',
				color:'#ce282c'
			},
			goods:[
				{
					img:'/static/images/goodImg.png',
					name:'高梵2019新款时尚工装羽绒服女中长款韩版连帽蓄热保暖',
					shop:'高梵旗舰店',
					shopLogo:'/static/images/shopLogo.png',
					sales:'25000',
					oldPrice:'980',
					money:'649',
					coupon:'150',
					yg_win:'18.8',
					sj_win:'28.8'
				},
				{
					img:'/static/images/goodImg.png',
					name:'高梵2019新款时尚工装羽绒服女中长款韩版连帽蓄热保暖',
					shop:'高梵旗舰店',
					shopLogo:'/static/images/shopLogo.png',
					sales:'25000',
					oldPrice:'980',
					money:'649',
					coupon:'150',
					yg_win:'18.8',
					sj_win:'28.8'
				}
			]
			
		},{
			brand:{
				img:'/static/images/brandIcon02.png',
				name:'三只松鼠旗舰店',
				color:'#789158'
			},
			goods:[
				{
					img:'/static/images/goodImg.png',
					name:'高梵2019新款时尚工装羽绒服女中长款韩版连帽蓄热保暖',
					shop:'高梵旗舰店',
					shopLogo:'/static/images/shopLogo.png',
					sales:'25000',
					oldPrice:'980',
					money:'649',
					coupon:'150',
					yg_win:'18.8',
					sj_win:'28.8'
				},
				{
					img:'/static/images/goodImg.png',
					name:'高梵2019新款时尚工装羽绒服女中长款韩版连帽蓄热保暖',
					shop:'高梵旗舰店',
					shopLogo:'/static/images/shopLogo.png',
					sales:'25000',
					oldPrice:'980',
					money:'649',
					coupon:'150',
					yg_win:'18.8',
					sj_win:'28.8'
				}
			]
			
		},{
			brand:{
				img:'/static/images/brandIcon03.png',
				name:'DHC旗舰店',
				color:'#023793'
			},
			goods:[
				{
					img:'/static/images/goodImg.png',
					name:'高梵2019新款时尚工装羽绒服女中长款韩版连帽蓄热保暖',
					shop:'高梵旗舰店',
					shopLogo:'/static/images/shopLogo.png',
					sales:'25000',
					oldPrice:'980',
					money:'649',
					coupon:'150',
					yg_win:'18.8',
					sj_win:'28.8'
				},
				{
					img:'/static/images/goodImg.png',
					name:'高梵2019新款时尚工装羽绒服女中长款韩版连帽蓄热保暖',
					shop:'高梵旗舰店',
					shopLogo:'/static/images/shopLogo.png',
					sales:'25000',
					oldPrice:'980',
					money:'649',
					coupon:'150',
					yg_win:'18.8',
					sj_win:'28.8'
				}
			]
			
		}
	]
	export default {
		components: {
			uniGrid,
			uniGridItem,
			goodKindNavs,
			commonHead
		},
		data() {
			return {
				headTitle:'品牌热卖',
				dotStyle: { //轮播图知识点的颜色
						backgroundColor: 'rgb(201, 199, 200)',
						selectedBackgroundColor: 'rgba(0, 0, 0,.8)',
						border: 'none',
						selectedBorder: 'none'
					},
				current:0,//当前轮播图的下标
				nines:nines,//九宫格部分
				goodKind:goodKind,//产品分类
				curKind:0,//当前产品分类的下标
				goodList:goodList,//产品列表
				opacity:0,
			}
		},
		onLoad() {

		},
		methods: {
			//轮播图的滚动事件
			change(e) {
				this.current = e.detail.current
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
			}
		},
		
		onPageScroll(option) {
			this.opacity = 0.004*option.scrollTop;
			
		},
	}
</script>

<style>
	.headBox{display: flex;align-items: center;justify-content: space-between;}
	.headBox text{display: inline-block;width: 20%;font-size: 40rpx;color: #fff;}
	.rightBox{width: 20%;font-size: 28rpx;color: #fff;text-align: right;}
	.headTitle{font-size:40rpx;color: #fff;}
	.hideHead{background: #c82418 url(../../static/images/titleBg.png) no-repeat center bottom 38rpx;position: fixed;width: 100%;left: 0;top:0;text-align: center;font-size: 40rpx;color: #fff;padding:80rpx 0 20rpx;z-index: 999;background-size: 220rpx 22rpx;}
	.box01{background: url(../../static/images/indexBg.png) no-repeat;background-size: 100%;padding: 80rpx 20rpx 0;}
	
	.nineBox{padding: 20rpx;background: #fff;margin-top: 50rpx;border-radius: 6px;}
	.kindImage{width: 84rpx;height: 84rpx;}
	.kindText{font-size: 26rpx;color: #222;margin-top: 6rpx;}
	.kindDesc{font-size: 24rpx;color: #8e8c8d;}
	.grid-item-box{display: flex;flex-direction: column;align-items: center;justify-content: center;flex: 1;padding: 10rpx 0;margin-bottom: 20rpx;}
	
	.box02{padding: 20rpx;background: #f7f7f5;}
	.kindsBox{padding: 20rpx;}
	.brandItem{margin-bottom: 24rpx;}
	.brandInfo{display: flex;align-items: center;justify-content: space-between;border-radius: 6px 6px 0 0;padding: 18rpx 24rpx;}
	.brandLeft{display: flex;align-items: center;}
	.brandRight{font-size: 26rpx;color: #fff;background: url(../../static/images/rightIcon.png) no-repeat right center;background-size: 26rpx 26rpx;padding-right: 36rpx;}
	.brandImg{width: 86rpx;height: auto;margin-right: 20rpx;}
	.brandName{font-size: 28rpx;color: #fff;}
	.goodList{padding: 22rpx 18rpx;background: #fff;display: flex;justify-content: space-between;}
	.goodItem{width: 48%;}
	.goodImg{width: 100%;height: 328rpx;}
	.goodRight{}
	.goodName{font-size: 28rpx;color: #222;margin-bottom: 20rpx;display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;}
	.hotImg{width: 82rpx;height: 30rpx;margin-right: 6rpx;}
	.goodInfoMid,.couponBox{display: flex;align-items: center;justify-content: space-between;margin-bottom: 20rpx;}
	.shopInfo{display: flex;align-items: center;font-size: 24rpx;color: #8e8c8d;}
	.shopLogo{width: 34rpx;height: 34rpx;margin-right: 4rpx;}
	.sales{font-size: 24rpx;color: #8e8c8d;}
	.couponLeft{font-size: 24rpx;color: #000;font-weight: bold;}
	.couponLeft text{font-size: 32rpx;}
	.couponRight{font-size: 24rpx;color: #f02b16;background:#f02b16;border-radius: 3px;color: #fff;overflow: hidden;display: flex;align-items: center;justify-content: space-between;padding: 2rpx 0;}
	.couponRight text{background: #fff;width: 20rpx;height: 20rpx;border-radius: 50px;}
	.dotLeft{transform: translateX(-10rpx);}
	.dotRight{transform: translateX(10rpx);}
	.winBox{display: flex;align-items: center;justify-content: space-between;}
	.winItem{display: flex;align-items: center;font-size: 22rpx;color: #ee240f;padding: 2rpx 4rpx;}
	.winLeft{border: 1px solid #ee240f;}
	.winRight{color: #fff;}
	.winRight text{font-size: 28rpx;}
</style>
