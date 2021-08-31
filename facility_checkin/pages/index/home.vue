<template>
	<view class="content">
		<view class="img">
			<image src="../../static/img3.png" mode="aspectFit"></image>
		</view>
		<view class="title">设备物联孪生定位系统</view>
		<view class="scan">
			<view class="button" @click="scan">扫一扫 登记设备</view>
			<view class="button" @click="toLocation">查看所有设备位置</view>
		</view>
		<view class="log">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="main">
					<view>{{ item.info.detail.jbxx1 }}</view>
					<view>
						{{ item.info.detail.jbxx6 }}
					</view>
				</view>
				<view class="u-flex u-row-right u-m-b-40">
					<view class="buttonSmall" @click="toDetail(item.info.patientno)"><u-icon name="edit-pen-fill" class="u-m-r-10"></u-icon>登记</view>
					<view class="buttonSmall" @click="toLocationDetail(item.info.detail.jbxx6,item.info.detail.jbxx1)" v-if="item.info.detail.jbxx6"><u-icon name="map-fill" class="u-m-r-10"></u-icon>位置</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				now: '',
				overModal: false,
				list: []
			};
		},
		onLoad() {
			this.getList();
		},
		methods: {
			getList() {
				wx.request({
					url: 'https://sbzhgl.ifufan.com:4000/devices',
					method: 'GET',
					data: {},
					success: res => {
						if (res.data.code == 200) {
							// let data = []
							// for (let i in res.data.data) {
							// 	data.push({
							// 		patientno: res.data.data[i].info.patientno,
							// 		jbxx1: res.data.data[i].info.detail.jbxx1,
							// 		jbxx6: JSON.parse(res.data.data[i].info.detail.jbxx6)
							// 	})
							// }

							this.list = res.data.data;
						}
					}
				});
			},

			toDetail(id) {
				uni.navigateTo({
					url: '/pages/index/index?id=' + id
				});
			},

			toLocation() {
				uni.navigateTo({
					url: '/pages/index/location'
				})
			},
			
			toLocationDetail(location,name){
				uni.navigateTo({
					url: '/pages/index/locationDetail?location=' + location + '&name=' + name
				})
			},

			scan() {
				uni.scanCode({
					scanType: 'qrCode',
					success: function(res) {
						console.log(res)
						uni.navigateTo({
							url: '/' + res.path
						})
					}
				});
			}
		}
	};
</script>

<style scoped lang="less">
	.content {
		width: 100%;
	}

	.img {
		text-align: center;
		margin-top: 50upx;

		image {
			width: 750upx;
			height: 750upx;
		}
	}

	.title {
		font-size: 50upx;
		font-weight: 700;
		margin-top: -50upx;
		color: #fff;
		text-align: center;
	}

	.scan {
		text-align: center;
		display: flex;
		flex-direction: column;

		.button {
			margin: 30upx 40upx 0;
			padding: 20upx 50upx;
			color: #fff;
			font-size: 40upx;
			font-weight: 700;
			background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
			border-radius: 50upx;
			display: inline-block;
			border: 3upx solid rgba(255, 255, 255, 0.5);
		}
	}

	.log {
		margin: 30upx;

		.item {


			.main {
				width: 100%;
				background: rgba(255, 255, 255, 0.3);
				padding: 20upx;
				margin-bottom: 20upx;
				border-radius: 10upx;
				color: #fff;
				font-size: 30upx;
				display: flex;
				justify-content: space-between;
				border: 1px solid rgba(255, 255, 255, 0.3);
			}

			.buttonSmall {
				width: 160upx;
				padding: 10upx 20upx;
				margin: 0 10upx;
				text-align: center;
				color: #fff;
				font-weight: 700;
				background-image: linear-gradient(135deg, #24C6DC 0%, #514A9D 100%);
				border-radius: 20upx;
				display: inline-block;
				border: 1upx solid rgba(255, 255, 255, 0.5);
			}
		}
	}
</style>
