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
						<text v-if="sjkids == '0e12'">复旦大学附属华山医院</text>
						<text v-if="sjkids == '196a'">南京儿童医院</text>
						<text v-if="sjkids == '595f'">重庆医科大学附属儿童医院</text>
						<text v-if="sjkids == '688a' || sjkids == 'c3a9'">复旦大学附属华山医院</text>
						<text v-if="sjkids == 'ca3f'">广州妇女儿童医疗中心</text>
					</view>
				</view>
			</view>

			<!-- 日历组件 -->
			<view v-if="show">
				<!-- 心心相牵 -->
				<calendarXxxq v-if="sjkids == '196a'"></calendarXxxq> 
				<!-- 儿童摇篮之家 -->
				<calendarEtylzj v-if="sjkids == '595f'"></calendarEtylzj>
				<!-- 血酸全程管理 -->
				<!-- <calendarXsqcgl v-if="sjkids == '688a'"></calendarXsqcgl> -->
				<!-- 血酸全程管理 -->
				<calendarXsqcgl ref="yxb" v-if="sjkids == '688a'" :check="check"></calendarXsqcgl>
				<!-- 房颤助手 -->
				<calendarFczs ref="yxb" v-if="sjkids == 'c3a9'" :check="check"></calendarFczs>
				<!-- 胆道闭锁医患通 -->
				<calendarDdbsyht v-if="sjkids == 'ca3f'"></calendarDdbsyht>
			</view>
		</view>

		<!-- 导航按钮栏 -->
		<view>
			<menuBox v-if="show"></menuBox>
		</view>
		
		<!-- 任务栏 -->
		<view class="taskBox" v-if="taskList.length > 0">
			<view class="label">
				<li>我的</li>
				<li>康复任务</li>
				<li class="total">{{ taskTotal }}</li>
			</view>
			<view class="content">
				<ul>
					<li @click="toTask(index, item.url)" v-for="(item, index) in taskList" :key="index">
						{{ item.name }}
						<u-icon name="checkbox-mark" style="color: #73d13d;" v-if="task[index] == 1"></u-icon>
						<u-icon name="arrow-right" style="color: #d9d9d9;" v-else></u-icon>
					</li>
				</ul>
			</view>
		</view>

		<!-- 轮播图栏 -->
		<view class="swiperBox"><u-swiper :list="swiperList" border-radius="40"></u-swiper></view>

		<!-- 监测数据栏 -->
		<view v-if="dcDetail && show"><dc :dcDetail="dcDetail"></dc></view>
		
		<!-- 占位栏 -->
		<!-- <view style="height: 100upx;"></view> -->
	</view>
</template>

<script>
const app = getApp();
const dateFormat = require('../../utils/util.js');
import calendarYxb from '@/components/calendar/calendarYxb.vue';
import calendarXxxq from '@/components/calendar/calendarXxxq.vue';
import calendarEtylzj from '@/components/calendar/calendarEtylzj.vue';
import calendarXsqcgl from '@/components/calendar/calendarXsqcgl.vue';
import calendarFczs from '@/components/calendar/calendarFczs.vue';
import calendarDdbsyht from '@/components/calendar/calendarDdbsyht.vue';
import menuBox from '@/components/menu/menuBox.vue';
import dc from '@/components/dcReport/dc.vue';

export default {
	components: {
		calendarYxb,
		calendarXxxq,
		calendarEtylzj,
		calendarXsqcgl,
		calendarFczs,
		calendarDdbsyht,
		menuBox,
		dc
	},
	
	data() {
		return {
			userInfo: '',
			swiperList: [],
			taskList: [],
			dcDetail: '',
			uid: '',
			name: '',
			phone: '',
			task: [],
			taskTotal: 0,
			dev: 0,
			_id: '',
			doctorInfo: '',
			sjkids: '0e12',
			show: false,
			check:0
		};
	},

	onLoad() {
		this.getMiniAppInfo();
		this.getSwiper();
	},

	onShow() {
		this.check =  Math.random()
		if(uni.getStorageSync('task')){
			this.task = uni.getStorageSync('task')
			this.taskTotal = 0 
			for(let i in this.task){
				if(this.task[i] == 0){
					this.taskTotal++
				}
			}
			
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
						this.getTask();
						if (this.dev == 1 && (!uni.getStorageSync('uid') || !uni.getStorageSync('phone'))) {
							uni.navigateTo({
								url: '/pages/authorization/authorization'
							});
							return false
						}
						if (uni.getStorageSync('uid')) {
							this.uid = uni.getStorageSync('uid');
							this.userInfo = uni.getStorageSync('userInfo');
							this.name = uni.getStorageSync('name') ? uni.getStorageSync('name') : this.userInfo.nickName;
							this.phone = uni.getStorageSync('phone');
							this._id = uni.getStorageSync('_id');
							this.task = uni.getStorageSync('task');
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

		// 获取任务列表
		getTask() {
			wx.request({
				url: app.globalData.https + '/task/taskList',
				method: 'POST',
				data: {
					sjkids: uni.getStorageSync('sjkids') ? uni.getStorageSync('sjkids') : '0e12'
				},
				success: res => {
					if (res.data.code == 1) {
						this.taskList = res.data.data;
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
					sjkids: uni.getStorageSync('sjkids') ? uni.getStorageSync('sjkids') : '0e12'
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
						// this.getChatMsg();
						// this.getRecord();
						
					} else {
						console.log(res.data.message);
					}
				}
			});
		},

		// 获取日历数据
		getRecord() {
			wx.request({
				url: app.globalData.https + '/record/record',
				method: 'GET',
				data: {
					id: uni.getStorageSync('phone')
				},
				success: res => {
					if (res.data.code == 1) {
						this.calendarData = res.data;
					} else {
						console.log(res.data.message);
					}
				}
			});
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

		toAuth() {
			uni.navigateTo({
				url: '/pages/authorization/authorization'
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
.taskBox {
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	margin: 20upx;
	border-radius: 40upx;
	background: #fff;
	overflow: hidden;
	display: flex;

	.label {
		background: #3bbda1;
		padding: 20upx;
		height: auto;
		width: 200upx;
		color: #fff;
		border-radius: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		font-size: 24upx;

		.total {
			padding: 10upx 0;
			font-size: 40upx;
			font-weight: 700;
		}
	}

	.content {
		padding: 20upx 30upx;
		font-size: 30upx;
		font-weight: 700;
		width: 100%;
		display: flex;
		align-items: center;

		ul {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			color: #40a9ff;
			width: 100%;

			li {
				display: flex;
				justify-content: space-between;
				height: 55upx;
				line-height: 55upx;
			}
		}
	}
}

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

.swiperBox {
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
}
</style>
