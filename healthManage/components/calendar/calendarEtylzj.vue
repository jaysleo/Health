<template>
	<view>
		<view v-if="calendarData">
			<view class="planBox">
				<view class="u-flex u-row-center u-col-center" @click="toH5('https://api.ifufan.com/xxxy_tu/index.html?uid=' + phone)">
					<view class="u-flex u-col-center">
						<image src="/static/images/quxian.png" style="width: 40upx;height: 40upx;" class="u-m-r-10"></image>
						成长发育曲线
					</view>
				</view>
			</view>
			<view class="calendarBox">
				<zzx-calendar :dotList="calendarData" @selected-change="dayChange"></zzx-calendar>
				<view class="actionBox u-flex u-row-center u-m-t-20">
					<u-button type="warning" shape="circle" plain size="mini" class="u-m-r-10" @click="toReportDay">记录成长</u-button>
				</view>
			</view>
		</view>
		<view v-else class="u-p-60 u-text-center" style="color: #bfbfbf;">
			<u-loading mode="circle" color="#ffc53d" class="u-m-r-20"></u-loading>
			加载中
		</view>
	</view>
</template>

<script>
const app = getApp();
import zzxCalendar from '@/components/zzx-calendar/zzx-calendar.vue';
export default {
	components: {
		zzxCalendar
	},

	data() {
		return {
			planModal: false,
			recordId: '',
			calendarData: []
		};
	},

	props: {},

	created() {
		this.getCalendarData();
	},

	methods: {
		getCalendarData() {
			wx.request({
				url: app.globalData.appHttps + '/ylzj',
				method: 'GET',
				data: {
					uid: uni.getStorageSync('phone')
				},
				success: res => {
					if (res.data.code == 200) {
						// this.taskList = res.data.data;
						let calendarData = [];
						for (let i in res.data.data) {
							let data = JSON.parse(res.data.data[i].data);
							calendarData.push({
								name: '成长记录',
								type5: true,
								date: data.babyBirthday ? data.babyBirthday : data.measureDate,
								recordId: res.data.data[i].id
							});
						}
						this.calendarData = calendarData;
						// console.log(this.calendarData);
					} else {
						console.log(res.data.message);
					}
				}
			});
		},

		toReportDay() {
			uni.navigateTo({
				url: '/pages/report/reportDay'
			});
		},

		//点击日历事件
		dayChange(e) {
			if (e.info) {
				this.toH5('https://api.ifufan.com/ylzj_tu/index.html?uid=' + this.phone);
			} else {
				uni.navigateTo({
					url: '/pages/report/reportDay?date=' + e.fullDate
				});
			}
		},

		toH5(url) {
			if (!uni.getStorageSync('uid') && this.dev == 1) {
				uni.navigateTo({
					url: '/pages/authorization/authorization'
				});
				return false;
			} else {
				uni.navigateTo({
					url: '/pages/h5/h5?url=' + encodeURIComponent(JSON.stringify(url))
				});
			}
		},

		today() {
			var day = new Date();
			day.setTime(day.getTime());
			var today = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate();
			return today;
		}
	}
};
</script>

<style lang="less" scoped>
.planModalBox {
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	margin: 10upx 20upx;
	border-radius: 40upx;
	background: #e6fffb;
	padding: 20upx;

	.time {
		font-size: 24upx;
		color: #bfbfbf;
	}

	.item {
		height: 50upx;
		font-size: 25upx;

		.label {
			color: #bfbfbf;
			line-height: 30upx;
		}
		.value {
			font-weight: 700;
		}
	}
}
</style>
