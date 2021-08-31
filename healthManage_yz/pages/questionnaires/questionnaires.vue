<template>
	<view>
		<view class="dcBox u-m-20">
			<view class="item u-flex u-row-between u-m-b-20">
				<view class="u-p-l-40" style="width: 520upx;">
					<view class="label row u-flex u-row-between">
						医院检查
					</view>
				</view>
				<view class="button" @click="toH5('https://mzfwh.huashan.org.cn/navigation/reportsearch')">查看</view>
			</view>

			<view class="item u-flex u-row-between u-m-b-20" v-for="(item, index) in list" :key="index">
				<view class="u-p-l-40" style="width: 520upx;">
					<view class="label row u-flex u-row-between">
						{{ item.title ? item.title : '就诊问卷' }}
						<u-tag text="评估中" size="mini" type="primary" />
					</view>
					<view class="row1">填写时间：{{ item.create_time }}</view>
				</view>
				<view class="button" @click="toReport(item._id)">查看报告</view>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
const dateFormat = require('../../utils/util.js');
export default {
	data() {
		return {
			list: []
		};
	},
	onLoad() {
		if (!uni.getStorageSync('uid') || !uni.getStorageSync('phone')) {
			uni.navigateTo({
				url: '/pages/authorization/authorization'
			});
			return false;
		} else {
			this.getReportList();
		}
	},
	onShow() {},
	methods: {
		getReportList() {
			wx.request({
				url: app.globalData.doctorHttps + '/getAllForm',
				method: 'GET',
				data: {
					templateid: '0e12',
					mid: 'scan_user_basic'
					// id: uni.getStorageSync('phone')
				},
				success: res => {
					if (res.data.success) {
						let list = [];
						for (let i in res.data.result.reverse()) {
							if (res.data.result[i].phone == uni.getStorageSync('phone')) {
								res.data.result[i].create_time = dateFormat.formatTimeHms(new Date(res.data.result[i].create_time));
								list.push(res.data.result[i]);
							}
						}
						// console.log(list);
						this.list = list;
					}
				}
			});
		},

		toH5(url) {
			uni.navigateTo({
				url: '/pages/h5/h5?url=' + encodeURIComponent(JSON.stringify(url))
			});
		},
		toReport(id) {
			uni.navigateTo({
				url: '../report/myReport?id=' + id
			});
		},

		dateToString(date) {
			var year = date.getFullYear();
			var month = (date.getMonth() + 1).toString();
			var day = date.getDate().toString();
			if (month.length == 1) {
				month = '0' + month;
			}
			if (day.length == 1) {
				day = '0' + day;
			}
			var dateTime = year + '-' + month + '-' + day;
			return dateTime;
		}
	}
};
</script>

<style scoped lang="scss">
.dcBox {
	p {
		margin: 20upx;
		font-size: 36upx;
		font-weight: 700;
	}

	.item {
		background: #fff;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		border-radius: 40upx;
		box-sizing: border-box;

		.row {
			height: 60upx;
			line-height: 60upx;
		}

		.row1 {
			height: 40upx;
			line-height: 40upx;
		}

		.label {
			font-size: 30upx;
			font-weight: 700;
			color: #3bbda1;
		}

		.cont {
			font-size: 24upx;
		}

		.button {
			background: #3bbda1;
			padding: 20upx;
			height: 150upx;
			width: 150upx;
			color: #fff;
			border-radius: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;
			white-space: nowrap;
		}
	}
}
</style>
