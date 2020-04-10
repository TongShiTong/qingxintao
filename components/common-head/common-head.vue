<template>
	<view class="headBox">
		{{headTitle}}
	</view>
</template>

<script>
	export default {
		name:'common-head',
		props:{
			headTitle:{//标题
				type:String
			}
		},
		data() {
			return {
				
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.headBox{font-size: 40rpx;color: #fff;background: url(../../static/images/titleBg.png) no-repeat center;text-align: center;background-size: 280rpx 22rpx;}
</style>
