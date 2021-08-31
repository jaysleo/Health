<template>
	<view>
		<!-- 医生信息栏 -->
		<view class="doctorInfoBox" v-if="show">
			<view class="doctor u-flex u-row-between">
				<image class="doctorImg u-m-l-40" src="../../static/images/doctor.png" mode=""></image>
				<view style="width: 65%;">
					<view>
						<text style="color: #bfbfbf;" class="u-m-r-10">主治医生</text>
						<text style="font-weight: 700;font-size: 40upx;">{{ doctorInfo.doctorname }}</text>
					</view>
					<view class="u-m-t-10">
						<text style="color: #bfbfbf;" class="u-m-r-10">所属医院</text>
						<text v-if="sjkids == 'bad2'">复旦大学附属华山医院</text>
						<text v-if="sjkids == '0e12'">复旦大学附属华山医院</text>
						<text v-if="sjkids == '196a'">南京儿童医院</text>
						<text v-if="sjkids == '595f'">重庆医科大学附属儿童医院</text>
					</view>
				</view>
			</view>

			<!-- 日历组件 -->
			<view>
				<!-- 痒诊 -->
				<calendarYz v-if="calendarData" :calendarData="calendarData" @reload="getRecord"></calendarYz>
				<view v-else class="u-p-60 u-text-center" style="color: #bfbfbf;">
					<u-loading mode="circle" color="#ffc53d" class="u-m-r-20"></u-loading>
					加载中
				</view>
			</view>
		</view>

		<!-- 任务栏 -->
		<view><report></report></view>

		<!-- 导航按钮栏 -->
		<view class="menuBox" v-if="show">
			<u-grid :col="3" :border="false">
				<u-grid-item bg-color="none" @click="toAdvisory" v-if="sjkids == 'bad2' || sjkids == '0e12' || sjkids == '196a' || sjkids == '595f'">
					<u-badge :count="msgListTotal" :offset="[20, 60]"></u-badge>
					<u-icon name="/static/images/icon3.png" :size="80"></u-icon>
					<view class="grid-text">咨询医生</view>
				</u-grid-item>
				<u-grid-item bg-color="none" @click="toExp" v-if="sjkids == 'bad2' || sjkids == '0e12' || sjkids == '196a' || sjkids == '595f'">
					<u-icon name="/static/images/icon10.png" :size="80"></u-icon>
					<view class="grid-text">病友经验</view>
				</u-grid-item>
				<u-grid-item bg-color="none" @click="toH5('https://mzfwh.huashan.org.cn/doctor/userreservation')" v-if="sjkids == 'bad2' || sjkids == '0e12'">
					<u-icon name="/static/images/icon8.png" :size="80"></u-icon>
					<view class="grid-text">我的预约</view>
				</u-grid-item>
				<u-grid-item bg-color="none" @click="toH5('https://mzfwh.huashan.org.cn/revisit/index')" v-if="sjkids == 'bad2' || sjkids == '0e12'">
					<u-icon name="/static/images/icon6.png" :size="80"></u-icon>
					<view class="grid-text">配药</view>
				</u-grid-item>
				<u-grid-item bg-color="none" @click="toMyQuestionnaires" v-if="sjkids == 'bad2' || sjkids == '0e12'">
					<u-icon name="/static/images/icon7.png" :size="80"></u-icon>
					<view class="grid-text">我的报告</view>
				</u-grid-item>
				<u-grid-item bg-color="none" @click="toMy" v-if="sjkids == 'bad2' || sjkids == '0e12' || sjkids == '196a' || sjkids == '595f'">
					<u-icon name="/static/images/icon9.png" :size="80"></u-icon>
					<view class="grid-text">我的资料</view>
				</u-grid-item>
			</u-grid>
		</view>

		<!-- 轮播图栏 -->
		<view class="swiperBox"><u-swiper :list="swiperList" border-radius="40"></u-swiper></view>

		<!-- 通知栏 -->
		<view class="noticeBox" @click="toAdvisory">
			<u-notice-bar type="none" mode="vertical" :more-icon="true" :is-circular="false" border-radius="8" :list="noticeList"></u-notice-bar>
		</view>

		<!-- 监测数据栏 -->
		<view v-if="dcDetail && show"><dc :dcDetail="dcDetail"></dc></view>

		<view style="height: 100upx;"></view>

		<u-modal v-model="phoneModal" :show-cancel-button="false" :show-confirm-button="false" :show-title="false">
			<view class="phoneModal u-p-50 u-text-center">
				<view class="u-m-b-50 u-font-lg">请授权手机号完成绑定</view>
				<u-button open-type="getPhoneNumber" @getphonenumber="getPhone" type="primary" block size="medium">授权手机号</u-button>
			</view>
		</u-modal>
	</view>
</template>

<script>
const app = getApp();
const dateFormat = require('../../utils/util.js');
import calendarYz from '@/components/calendar/calendarYz.vue';
import dc from '@/components/dcReport/dc.vue';
import report from '@/components/report/report.vue';

export default {
	components: {
		calendarYz,
		dc,
		report
	},
	data() {
		return {
			setIntervalId: '',
			msgList: [],
			msgListTotal: 0,
			userInfo: '',
			swiperList: [],
			noticeList: [],
			taskList: [],
			dcDetail: '',
			uid: '',
			name: '',
			phone: '',
			phoneModal: false,
			task: [],
			taskTotal: 5,
			dev: 0,
			_id: '',
			doctorInfo: '',
			planModal: false,
			yongyaoList: [],
			recordId: '',
			nextDay: '',
			sjkids: 'bad2',
			show: false,
			calendarData: '',
			loading: false
		};
	},

	onLoad() {
		this.getMiniAppInfo();
		this.getSwiper();
		// this.getTask()
	},

	onShow() {
		this.dev = uni.getStorageSync('dev');
		if (uni.getStorageSync('phone')) {
			this.getRecord();
		}
	},

	onHide() {
		clearInterval(this.setIntervalId);
	},

	onUnload() {
		clearInterval(this.setIntervalId);
	},

	watch: {
		dev() {
			this.dev = uni.getStorageSync('dev');
		}
	},

	methods: {
		// 获取小程序信息
		getMiniAppInfo() {
			wx.request({
				url: app.globalData.https + '/miniApi/getBaseInfo',
				method: 'POST',
				data: {
					appid: app.globalData.appid
				},
				success: res => {
					if (res.data.code == 1) {
						this.dev = res.data.data.dev;
						this.sjkids = res.data.data.sjkids;
						uni.setStorageSync('sjkids', res.data.data.sjkids);
						uni.setStorageSync('dev', res.data.data.dev);
						// this.getTask();
						if (this.dev == 1 && (!uni.getStorageSync('uid') || !uni.getStorageSync('phone'))) {
								uni.navigateTo({
									url: '/pages/authorization/authorization'
								});
						}
						if (uni.getStorageSync('uid')) {
							this.uid = uni.getStorageSync('uid');
							this.userInfo = uni.getStorageSync('userInfo');
							this.name = uni.getStorageSync('name') ? uni.getStorageSync('name') : this.userInfo.nickName; //JSON.parse(uni.getStorageSync('userInfo'));
							this.phone = uni.getStorageSync('phone');
							this._id = uni.getStorageSync('_id');
							this.task = uni.getStorageSync('task');
							let total = 0;
							for (let item in this.task) {
								if (this.task[item] == 0) {
									total++;
								}
							}
							this.taskTotal = total;
							if (uni.getStorageSync('phone')) {
								this.getXunshuDoctorsjk();
							}

							this.show = res.data.data.dev;
						}
					} else {
						console.log(res.data.message);
					}
				}
			});
		},


		// 获取轮播图
		getSwiper() {
			wx.request({
				url: app.globalData.https + '/MiniApi/swiperList',
				method: 'POST',
				data: {
					sjkids: uni.getStorageSync('sjkids') ? uni.getStorageSync('sjkids') : 'bad2'
				},
				success: res => {
					if (res.data.code == 1) {
						this.swiperList = res.data.data;
					} else {
						console.log(res.data.message);
					}
				}
			});
		},

		// 报告数据
		getReportList() {
			wx.request({
				url: app.globalData.doctorHttps + '/getAllForm',
				method: 'GET',
				data: {
					templateid: uni.getStorageSync('sjkids'),
					mid: 'scan_user_basic'
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
						this.dcDetail = list[0];
						console.log(this.dcDetail);
					}
				}
			});
		},

		// 获取医生信息
		getXunshuDoctorsjk() {
			wx.request({
				url: app.globalData.appHttps + '/xunshuDoctorsjklist',
				method: 'GET',
				header: {
					Accept: '*/*',
					'Content-Type': 'application/json;charset=UTF-8',
					'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg3OTY1NzMsInVzZXJuYW1lIjoieHMxODB4eHh4ODQ4NCJ9.vURqw-2UrWXA_mjL69Ts5vZfEmKl1M8ZSIqKf25A-iY'
				},
				data: {
					pageSize: 1000
				},
				success: res => {
					if (res.data.code == 200) {
						let targetDisease = res.data.result.records.find(item => item.sjkids == uni.getStorageSync('sjkids')); // 银屑病：0e12 fcf2 血透：592f //高危 // 血栓688a // 胆道闭锁 ca3f // 2b51
						this.doctorInfo = targetDisease;
						uni.setStorageSync('illnessInfo', targetDisease);
						this.getChatMsg();
						this.getRecord();
						this.setIntervalId = setInterval(() => {
							this.getChatMsg();
						}, 3000);
					} else {
						console.log(res.data.message);
					}
				}
			});
		},

		// 获取日历数据
		getRecord() {
			this.loading = true;
			wx.request({
				url: app.globalData.https + '/record/record',
				method: 'GET',
				data: {
					id: uni.getStorageSync('phone')
				},
				success: res => {
					this.loading = false;
					if (res.data.code == 1) {
						this.calendarData = res.data;
					} else {
						console.log(res.data.message);
					}
				}
			});
		},

		//点击日历事件
		dayChange(e) {
			// console.log(e);
			if (e.info) {
				// console.log(e.info);
				if (e.info.type2 || e.info.type1) {
					// this.toH5('https://guat.bigecko.com/web01/index.html#/answer?uid=' + this.phone + '&recordId=' + e.info.recordId + '&currentDate=' + e.info.date)
					this.planModal = true;
					this.recordId = e.info.recordId;
				}
				if (e.info.type5 && this.sjkids == '595f') {
					this.toH5('https://api.ifufan.com/ylzj_tu/index.html?uid=' + this.phone);
				}
				if (e.info.type5 && this.sjkids == '196a') {
					this.toH5('https://api.ifufan.com/xxxy_tu/index.html?uid=' + this.phone);
				}
			} else {
				if (this.sjkids == 'bad2') {
					this.toH5('https://guat.bigecko.com/web01/index.html#/answer?uid=' + this.phone + '&currentDate=' + e.fullDate);
				}
				if (this.sjkids == '595f') {
					uni.navigateTo({
						url: '/pages/report/reportDay?date=' + e.fullDate
					});
				}
				if (this.sjkids == '196a') {
					uni.navigateTo({
						url: '/pages/report/reportDay1?date=' + e.fullDate
					});
				}
			}
		},

		unique(arr) {
			for (var i = 0; i < arr.length - 1; i++) {
				for (var j = i + 1; j < arr.length; j++) {
					if (arr[i].name == arr[j].name) {
						arr.splice(j, 1);
						j--;
					}
				}
			}
			return arr;
		},

		// 获取通知消息
		getChatMsg() {
			wx.request({
				url: app.globalData.appHttps + '/chat/unread',
				method: 'GET',
				data: {
					senderid: uni.getStorageSync('illnessInfo').id,
					receiverid: uni.getStorageSync('phone')
				},
				success: res => {
					if (res.data.code == 200) {
						this.msgList = res.data.data;
						this.msgListTotal = res.data.data.length;
						let arr = [];
						for (let i in res.data.data) {
							arr.push(this.dateStr(res.data.data[i].time) + '医生给你发了一条消息。');
						}
						this.noticeList = arr;
					} else {
						console.log(res.data.message);
					}
				}
			});
		},

		// 任务跳转
		toTask(index, url) {
			if (!uni.getStorageSync('uid') && this.dev == 1) {
				uni.navigateTo({
					url: '/pages/authorization/authorization'
				});
				return false;
			}
			this.toH5(url + '?uid=' + uni.getStorageSync('phone'));
			setTimeout(() => {
				this.task[index] = 1;
				uni.setStorageSync('task', this.task);
			}, 1000);
		},

		toMyQuestionnaires() {
			if (!uni.getStorageSync('uid')) {
				uni.navigateTo({
					url: '/pages/authorization/authorization'
				});
				return false;
			} else {
				uni.navigateTo({
					url: '/pages/questionnaires/questionnaires'
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

		toWebViewer(url) {
			if (!uni.getStorageSync('uid')) {
				uni.navigateTo({
					url: '/pages/authorization/authorization'
				});
				return false;
			} else {
				uni.navigateTo({
					url: '/pages/webViewer/webViewer?url=' + encodeURIComponent(url + '?uid+' + uni.getStorageSync('phone'))
				});
			}
		},

		toExp() {
			if (!uni.getStorageSync('uid')) {
				uni.navigateTo({
					url: '/pages/authorization/authorization'
				});
				return false;
			}
			uni.navigateTo({
				url: '/pages/exp/exp'
			});
		},

		toAdvisory() {
			if (!uni.getStorageSync('uid')) {
				uni.navigateTo({
					url: '/pages/authorization/authorization'
				});
				return false;
			} else {
				uni.navigateTo({
					url: '/pages/advisory/advisory'
				});
			}
		},

		toExp() {
			if (!uni.getStorageSync('uid')) {
				uni.navigateTo({
					url: '/pages/authorization/authorization'
				});
				return false;
			} else {
				uni.navigateTo({
					url: '/pages/exp/exp'
				});
			}
		},

		toReportDay() {
			if (!uni.getStorageSync('uid')) {
				uni.navigateTo({
					url: '/pages/authorization/authorization1'
				});
				return false;
			} else {
				uni.navigateTo({
					url: '/pages/report/reportDay'
				});
			}
		},

		toReportDay1() {
			if (!uni.getStorageSync('uid')) {
				uni.navigateTo({
					url: '/pages/authorization/authorization1'
				});
				return false;
			} else {
				uni.navigateTo({
					url: '/pages/report/reportDay1'
				});
			}
		},

		toAuth() {
			uni.navigateTo({
				url: '/pages/authorization/authorization'
			});
		},

		toMy() {
			if (!uni.getStorageSync('uid')) {
				uni.navigateTo({
					url: '/pages/authorization/authorization'
				});
				return false;
			} else {
				uni.navigateTo({
					url: '/pages/my/my'
				});
			}
		},

		toSeeDoctor() {
			uni.navigateTo({
				url: '/pages/seeDoctor/seeDoctor'
			});
		},

		dateFormat(fmt, date) {
			let ret;
			const opt = {
				'Y+': date.getFullYear().toString(), // 年
				'm+': (date.getMonth() + 1).toString(), // 月
				'd+': date.getDate().toString(), // 日
				'H+': date.getHours().toString(), // 时
				'M+': date.getMinutes().toString(), // 分
				'S+': date.getSeconds().toString() // 秒
				// 有其他格式化字符需求可以继续添加，必须转化成字符串
			};
			for (let k in opt) {
				ret = new RegExp('(' + k + ')').exec(fmt);
				if (ret) {
					fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
				}
			}
			return fmt;
		},

		Replace(str, from, to) {
			return str.split(from).join(to);
		},
		parseDate(dateStr) {
			return new Date(this.Replace(dateStr, '-', '/'));
		},

		AddDays(date, value) {
			date = this.parseDate(date);
			date.setDate(date.getDate() + value);
			return this.dateFormat('YYYY-mm-dd', date);
		},

		dateStr(date) {
			//获取js 时间戳
			var dateTimeStamp = new Date(date).getTime();
			var time = new Date().getTime();
			//去掉 js 时间戳后三位，与php 时间戳保持一致
			time = parseInt((time - dateTimeStamp) / 1000);
			//存储转换值
			var s;
			if (time < 60 * 10) {
				//十分钟内
				return '刚刚';
			} else if (time < 60 * 60 && time >= 60 * 10) {
				//超过十分钟少于1小时
				s = Math.floor(time / 60);
				return s + '分钟前';
			} else if (time < 60 * 60 * 24 && time >= 60 * 60) {
				//超过1小时少于24小时
				s = Math.floor(time / 60 / 60);
				return s + '小时前';
			} else if (time < 60 * 60 * 24 * 3 && time >= 60 * 60 * 24) {
				//超过1天少于3天内
				s = Math.floor(time / 60 / 60 / 24);
				return s + '天前';
			} else {
				//超过3天
				return date;
			}
		}
	}
};
</script>

<style lang="scss">
.userInfoBox {
	margin: 20upx 20upx 0 20upx;
	padding: 20upx;
	align-items: center;
	font-size: 30upx;
	font-weight: 700;

	u-avatar {
		margin-right: 40upx;
	}
}

.menuBox {
	margin: 20upx;

	.grid-text {
		// padding-top: 20upx;
	}
}

.swiperBox {
	margin: 20upx;
}

.noticeBox {
	margin: 20upx;
}

.doctorInfoBox {
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	margin: 100upx 20upx 20upx;
	border-radius: 40upx;
	background: #fff;
	padding: 20upx;

	.doctorImg {
		margin-top: -100upx;
		width: 160upx;
		height: 200upx;
	}
	.doctor {
		width: 100%;
	}

	.planBox {
		background: #e6fffb;
		border-radius: 40upx;
		margin-top: 20upx;
		padding: 40upx;
		font-weight: 700;

		.item {
			height: 50upx;

			.label {
				color: #bfbfbf;
				line-height: 30upx;
			}
			.value {
				font-weight: 700;
			}
		}
	}

	.calendarBox {
		margin-top: 20upx;
		background: #fffbe6;
		border-radius: 40upx;
		padding: 20upx 0;
	}
}
</style>
