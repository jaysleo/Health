<template>
	<view class="box">
		<view class="header">
			<image :src="detail.img" class="img" mode="widthFix"></image>
			<view class="titleBox">
				<view class="title">{{ detail.title }}</view>
				<view class="footer">
					<view>{{ detail.createTime | timeFrom }}</view>
					<view>
						<u-icon name="eye" class="u-m-r-10"></u-icon>
						{{ detail.view }}
						<u-icon name="thumb-up" class="u-m-r-10 u-m-l-20"></u-icon>
						{{ detail.nice }}
					</view>
				</view>
			</view>
		</view>

		<view class="content"><u-parse :html="detail.content"></u-parse></view>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			detail: ''
		};
	},

	onLoad(options) {
		this.id = options.id;
		this.getDetail();
	},

	methods: {
		getDetail() {
			wx.request({
				url: app.globalData.https + '/miniapi/articleDetail',
				method: 'POST',
				data: {
					id: this.id
				},
				success: res => {
					if (res.data.code == 1) {
						this.detail = res.data.data;
					}
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
page {
	background: #fff!important;
}
.box {
	padding: 20upx;

	.img {
		width: 100%;
	}

	.titleBox {
		padding: 30upx 0;

		.title {
			font-weight: 700;
			font-size: 40upx;
		}

		.footer {
			display: flex;
			justify-content: space-between;
			margin: 20upx 0 0upx;
			color: #bfbfbf;
		}
	}
}
</style>
