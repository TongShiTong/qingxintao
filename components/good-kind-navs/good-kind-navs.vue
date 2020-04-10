<template>
	<scroll-view scroll-x class="goodKindBox">
		<view v-for="(item,index) in goodKind" :key="index" class="kindItem" :class="index == curKind ? 'on' : ''" @click="checkKindChild(index)">{{item}}</view>
	</scroll-view>
</template>

<script>
	export default {
		name:'good-kind-navs',
		props:{
			goodKind:{//产品分类
				type:Array
			},
			curKind:{//当前分类的下标
				type:Number
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			checkKindChild(idx){
				this.$emit('checkKindParent',idx)
			}
		}
	}
</script>

<style>
	.goodKindBox{white-space: nowrap;}
	.kindItem{font-size: 30rpx;display: inline-block;margin-right: 36rpx;color: #222222;padding-bottom: 16rpx;position: relative;transition: all 100ms;}
	.kindItem.on{font-size: 36rpx;color: #f02a15;}
	.kindItem.on:after{content: '';display: block;width: 100%;height: 8rpx;background: linear-gradient(to right,#f33924,#fd6450);border-radius: 6px;position: absolute;left: 0;bottom:0;}
	
</style>
