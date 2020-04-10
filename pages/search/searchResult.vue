<template>
	<view class="page">
		<view>
			<view class="search">
				<uniSearchBar :radius="radius" :cancelButton="cancelButton" :placeholder="keyword"></uniSearchBar>
			</view>
		</view>
		<view class="kindsBox">
			<goodKindNavs
				:goodKind="goodKind"
				:curKind="curKind"
				@checkKindParent="checkKindParent"
				class="shaixuan"
				>
			</goodKindNavs>
		</view>
		<view class="box02">
			
			<navigator class="brandItem" v-for="(item,index) in goodList" :key="index" :url="'/pages/index/proDetails?itemid='+item.item_id" >
				<view class="goodList">
					<!-- <view class="goodItem" v-for="(gItem,gIndex) in item.goods" :key="gIndex"> -->
						<image :src="item.pict_url" class="goodImg" mode="aspectFill"></image>
						<view class="goodRight">
							<view class="goodName">
								<!-- <image :src="item.pict_url" class="shopLogo" mode="aspectFill"></image> -->
								{{item.title}}
							</view>
							
							<view class="goodInfoMid">
								<view class="shopInfo">原价￥{{item.reserve_price}}</view>
								<view class="sales">{{item.coupon_total_count-item.coupon_remain_count}}人已枪</view>
							</view>
							
							<view class="couponBox">
								<view class="couponLeft">券后￥<text>{{item.zk_final_price}}</text></view>
								<view class="couponRight">
									<text class="dotItem dotLeft"></text>{{item.coupon_amount}}元券<text class="dotItem dotRight"></text>
								</view>
							</view>
							
							<view class="winBox" v-if="!userInfo.isvip">
								<view  class="winItem winLeft">预估赚{{item.commission_price}}</view>
								<view class="winItem winRight" ><text class="iconfont icondiamonds"></text>升级赚{{item.commission_price_super}}</view>
							</view>
							<view class="winBox" v-if="userInfo.isvip">
								<view  class="winItem winLeft">预估赚{{item.commission_price_super}}</view>
							</view>
						</view>
					<!-- </view> -->
				</view>
			</navigator>
			
		</view>
	</view>
</template>

<script>
	import uniGrid from '@/components/uni-grid/uni-grid.vue'
	import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue'
	import goodKindNavs from '@/components/good-kind-navs/good-kind-navs.vue'
	import commonHead from '@/components/common-head/common-head.vue'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'

	var goodKind = ['推荐','销量','价格','只看有券']
	var goodList = []
	export default {
		components: {
			uniGrid,
			uniGridItem,
			goodKindNavs,
			uniSearchBar,
			commonHead
		},
		data() {
			return {
				userInfo:this.$USERINFO(),
				radius: 20,
				keyword:"",
				cancelButton: "none",
				headTitle:'品牌热卖',
				dotStyle: { //轮播图知识点的颜色
						backgroundColor: 'rgb(201, 199, 200)',
						selectedBackgroundColor: 'rgba(0, 0, 0,.8)',
						border: 'none',
						selectedBorder: 'none'
					},
				current:0,//当前轮播图的下标
				
				goodKind:goodKind,//产品分类
				curKind:0,//当前产品分类的下标
				goodList:goodList,//产品列表
				opacity:0,
			}
		},
		onLoad(option) {
			var _this = this;
			_this.keyword=option.keywords;
			uniSearchBar.searchVal=_this.keyword;
			uniSearchBar.show=true;
			uniSearchBar.showSync=true;
			_this.$GET_FUN('/api/tbk/searchGoods', {
				keyword:option.keywords,
				page:1,
				limit:15,
			}, res => {
				if (res.data.code == 1) {
					let resData = [];
					uni.$emit('updates',{})
					// console.log(res.data);
					res.data.data.list.forEach(item => {
						resData.push(item);
					
					});
					_this.goodList = resData;
					
				}
			});
			//uniSearchBar.props.placeholder.default=_this.keyword;
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
	.search {margin-top: 80rpx;}
	.headBox{display: flex;align-items: center;justify-content: space-between;}
	.headBox text{display: inline-block;width: 20%;font-size: 40rpx;color: #fff;}
	.rightBox{width: 20%;font-size: 28rpx;color: #fff;text-align: right;}
	.headTitle{font-size:40rpx;color: #fff;}
	.hideHead{background: #c82418 url(../../static/images/titleBg.png) no-repeat center bottom 38rpx;position: fixed;width: 100%;left: 0;top:0;text-align: center;font-size: 40rpx;color: #fff;padding:80rpx 0 20rpx;z-index: 999;background-size: 220rpx 22rpx;}
	.box01{background: url(../../static/images/indexBg.png) no-repeat;background-size: 100%;padding: 80rpx 20rpx 40rpx;}
	
	.nineBox{padding: 20rpx;background: #fff;margin-top: 50rpx;border-radius: 6px;}
	.kindImage{width: 84rpx;height: 84rpx;}
	.kindText{font-size: 26rpx;color: #222;margin-top: 6rpx;}
	.kindDesc{font-size: 24rpx;color: #8e8c8d;}
	.grid-item-box{display: flex;flex-direction: column;align-items: center;justify-content: center;flex: 1;padding: 10rpx 0;margin-bottom: 20rpx;}
	
	.box02{padding: 20rpx;background: #f7f7f5;}
	.kindsBox{padding: 20rpx;}
	.shaixuan {text-align: center;}
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