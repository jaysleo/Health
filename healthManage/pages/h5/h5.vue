<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			};
		},
		onLoad(options) {
			console.log(JSON.parse(decodeURIComponent(options.url)))
			let random = Math.random()
			this.url = JSON.parse(decodeURIComponent(options.url))
		},
		onShow() {
		},
		methods: {
		}
	};
</script>

<style>
</style>
