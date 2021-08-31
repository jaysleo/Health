<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
const app = getApp();
	export default {
		data() {
			return {
				url:''
			};
		},
		onLoad(options) {
			let random = Math.random()
			let uid = uni.getStorageSync('phone')
			this.url = options.url + '?random=' + random + '&uid=' + uid;
			console.log(this.url)
		},
		onShow() {
		},
		methods: {
		}
	};
</script>

<style>
</style>
