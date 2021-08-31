<template>
	<view>
		<gd-form :token="token"></gd-form>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			token: ''
		};
	},
	onLoad(options) {
		this.token = options.token
	},
	onShow() {},
	methods: {}
};
</script>

<style></style>
