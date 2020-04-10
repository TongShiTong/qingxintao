<template>
	<view>
		<view class="search"><uniSearchBar :radius="radius" :cancelButton="cancelButton"></uniSearchBar></view>
		
			<view class="search-cat" v-if="hasHotKey">
				<view class="search-cat-tit"><text class="up-menu" >热门搜索</text></view>
				<view class="src-content">
					<view class="main-src">
						<view class="src-item " v-for="(item, index) in keywordlist" :key="index" @click="addKeywords(item)">{{ item }}</view>
					</view>
				</view>
			</view>
			
			
			<view class="search-cat"  v-if="hasHistoryKeyword" style="margin-top: 160rpx;">
				<view class="search-cat-tit">
					<view class="up-menu" >搜索历史</view>
					<view style="font-size: 30rpx; color: #999;" @tap="deleteKeyword">清空</view>
				</view>
				<view class="src-content">
					<view class="main-src">
						<view class="src-item" v-for="(item, index) in recentKeyword" @click="addKeywords(item)" :key="index">{{ item }}</view>
					</view>
				</view>
			</view>
		
	</view>
</template>

<script>
import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue';
export default {
	components: {
		uniSearchBar
	},
	data() {
		let hasHistoryKeyword = true;
		let recentKeyword = uni.getStorageSync('recentKeyword');
		
		if (recentKeyword.length == 0) {
			recentKeyword = [];
			hasHistoryKeyword = false;
		}
		
		return {
			userInfo: this.$USERINFO(),
			radius: 20,
			cancelButton: 'none',
			keywordlist: [],
			hasHotKey: true,
			recentKeyword: recentKeyword,
			hasHistoryKeyword: hasHistoryKeyword
		};
	},
	onLoad() {
		var _this = this;
		//获取热搜词
		_this.$GET_FUN('/api/system/getHotKeyword', {}, res => {
			if (res.data.code == 1) {
				_this.keywordlist = res.data.data.hot_keywords;
				_this.hasHotKey = true;
			}
		});
		let that = this
		uni.$on('updates',()=>{
			//将搜索词计入本地缓存
			let keyword = that.keyword
			let recentKeyword = uni.getStorageSync('recentKeyword');
			let hasKey = null;
			if (recentKeyword.length > 0) {
				recentKeyword.forEach(function(value, index) {
					if (value == keyword) {
						hasKey = index;
					}
				});
			} else {
				recentKeyword = [];
			}
			if (hasKey !== null) {
				recentKeyword.splice(hasKey, 1);
			}
			if(keyword!=''&&keyword!=null){
				recentKeyword.unshift(keyword);
			}
			uni.setStorageSync('recentKeyword', recentKeyword);
			this.recentKeyword= uni.getStorageSync('recentKeyword')
			this.hasHistoryKeyword = true;
		})
	},
	methods: {
		searchKeyword(e) {
			console.log(e);
		},
		addKeywords(keyword) {
			this.keywords = keyword;
			//将搜索词计入本地缓存
			let recentKeyword = uni.getStorageSync('recentKeyword');
			let hasKey = null;
			if (recentKeyword.length > 0) {
				recentKeyword.forEach(function(value, index) {
					if (value == keyword) {
						hasKey = index;
					}
				});
			} else {
				recentKeyword = [];
			}
			if (hasKey !== null) {
				recentKeyword.splice(hasKey, 1);
			}
			if(keyword!=''&&keyword!=null){
				recentKeyword.unshift(keyword);
			}
			
			uni.setStorageSync('recentKeyword', recentKeyword);
			uni.navigateTo({
				url: '/pages/search/searchResult?keywords=' + this.keywords
			});
		},
		deleteKeyword () {
			let recentKeyword = ""
			uni.setStorageSync('recentKeyword', recentKeyword);
			this.recentKeyword = recentKeyword;
			this.hasHistoryKeyword = false;
		}
	}
};
</script>
<style>
.search {
	padding-top: 80rpx;
}
.search-cat {
	/* position: fixed;
        top: 0;
        bottom: 0; */
	/* padding-top: 130px; */
	/* width: 100%; */
	/* height: 100%; */
	/* padding-bottom: 11px;
	background-color: #fff; */
	margin: 80rpx 40rpx;
}

.search-cat .search-cat-tit {
	/* position: relative;
	height: 10px;
	margin: 13px 3% 20px; */
	display: flex;justify-content: space-between;
}

.search-cat .search-cat-tit .up-menu {
	/* display: block;
	height: 20px;
	line-height: 20px;
	font-size: 0.9em;
	color: #999; */
	font-size: 32rpx;
	color: #999;
}

.src-content {
	/* margin: 20px 0 30px;
	width: 97%; */
}

.main-src .src-item {
	float: left;
	border-radius: 22px;
	padding: 0 10px;
	height: 23px;
	line-height: 23px;
	background-color: #f6f6f6;
	margin: 10px;
	position: relative;
	font-size: 13px;
	color: #333;
}

.main-title {
	height: 130px;
}

.main-title {
	background: #fc3f78;
	border-bottom-color: transparent;
	padding: 8px 10px;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 120;
	display: block;
	box-sizing: border-box;
}
</style>
