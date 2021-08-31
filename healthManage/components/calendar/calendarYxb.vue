<template>
	<view>
		<view v-if="calendarData">
			<view class="planBox" v-if="calendarData.nextDay" @click="planModal = true">
				<view class="u-flex u-row-between">
					<view>
						<u-icon name="checkmark-circle" class="u-m-r-10"></u-icon>
						用药方案
						<u-tag text="用药记录" shape="circle" class="u-m-l-10" border-color="#36cfc9" color="#36cfc9" mode="plain" />
					</view>
					<view>
						<text style="color: #bfbfbf;font-weight: 500;" class="u-m-r-10">下次用药</text>
						<text v-if="calendarData.nextDay">{{ calendarData.nextDay }}</text>
						<text v-else>无</text>
					</view>
				</view>
			</view>
			<view class="planBox" v-else  @click="addYaoLog">
				<view class="u-flex u-row-between">
					<view>
						<u-icon name="checkmark-circle" class="u-m-r-10"></u-icon>
						用药方案
						<u-tag text="用药记录" shape="circle" class="u-m-l-10" border-color="#36cfc9" color="#36cfc9" mode="plain" />
					</view>
					<view>
						<text style="color: #bfbfbf;font-weight: 500;" class="u-m-r-10">下次用药</text>
						<text v-if="calendarData.nextDay">{{ calendarData.nextDay }}</text>
						<text v-else>无</text>
					</view>
				</view>
			</view>
			<view class="calendarBox">
				<zzx-calendar :dotList="calendarData.calendarData" @selected-change="dayChange"></zzx-calendar>
				<view class="actionBox u-flex u-row-center u-m-t-20">
					<u-button type="warning" shape="circle" plain size="mini" class="u-m-r-10" @click="addYaoLog">
						记录用药
					</u-button>
					<!-- <u-button type="warning" shape="circle" plain size="mini" class="u-m-r-10" @click="addPisunLog">
						记录皮损
					</u-button> -->
				</view>
			</view>
		</view>
		<view v-else class="u-p-60 u-text-center" style="color: #bfbfbf;">
			<u-loading mode="circle" color="#ffc53d" class="u-m-r-20"></u-loading>
			加载中
		</view>
		
		
		<!-- 用药记录左侧弹窗 -->
		<u-popup mode="left" v-model="planModal" title="用药方案" :show-cancel-button="false" mask-close-able :show-confirm-button="false" :width="600">
			<view
				class="planModalBox"
				v-for="(item, index) in calendarData.log"
				:key="index"
				v-if="item.name"
				:style="item.recordId == recordId ? 'background:#69c0ff;color:#fff!important' : ''"
				@click="editYao(item.useTime,item.recordId)"
			>
				<view class="u-flex u-row-between item">
					<view class="label" :style="item.recordId == recordId ? 'color:#fff!important' : ''">
						<u-icon name="checkmark-circle" class="u-m-r-10"></u-icon>
						用药方案
					</view>
					<view class="value">{{ item.name }}</view>
				</view>
				<view class="u-flex u-row-between item">
					<view class="label" :style="item.recordId == recordId ? 'color:#fff!important' : ''">
						<u-icon name="calendar" class="u-m-r-10"></u-icon>
						用药计划
					</view>
					<view class="value">{{ item.useTime }} ~ {{ item.nextUseTime }}</view>
				</view>
				<view class="u-flex u-row-between item">
					<view class="label" :style="item.recordId == recordId ? 'color:#fff!important' : ''">
						<u-icon name="clock" class="u-m-r-10"></u-icon>
						下次用药
					</view>
					<view class="value">{{ item.nextUseTime }}</view>
				</view>
				<view class="u-flex u-row-between item">
					<view class="label" :style="item.recordId == recordId ? 'color:#fff!important' : ''">
						<u-icon name="edit-pen" class="u-m-r-10"></u-icon>
						填写时间
					</view>
					<view class="value">{{ item.createTime }}</view>
				</view>
				<view class="u-flex u-row-between item">
					<view class="label" :style="item.recordId == recordId ? 'color:#fff!important' : ''">
						<u-icon name="edit-pen" class="u-m-r-10"></u-icon>
						操作
					</view>
					<view class="value">
						<u-button size="mini" type="primary" class="u-m-r-10" @click="editYao(item.recordId)">修改</u-button>
						<u-button size="mini" type="error" @click="delYao(item.recordId)">删除</u-button>
					</view>
				</view>
			</view>
			<view v-if="recordList.length == 0" class="noList u-flex u-col-center u-row-center" style="height: 100%;">
				<view>
					<view class="u-text-center u-m-b-20" style="color: #bfbfbf;">无用药记录</view>
					<u-button type="warning" shape="circle" plain size="mini" @click="addYaoLog">
						添加用药记录
					</u-button>
				</view>
			</view>
		</u-popup>
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
			calendarData: ''
	  }
	},
	
	props: {
		check: {
			type: Number, 
			default() {
				return 0;
			}
		},
	},
	
	created() {
		this.getCalendarData();
	},
	
	watch:{
		'check'(){
			if(this.check){
				this.getCalendarData();
			}
		}
	},
	
	methods:{
		getCalendarData() {
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
		
		addYaoLog(){
			let url = 'https://api.ifufan.com/yongyao/index.html?random=' + Math.random() + '&uid=' + uni.getStorageSync('phone') + '&currentDate=' + this.today()
			uni.navigateTo({
				url: '/pages/h5/h5?url=' + encodeURIComponent(JSON.stringify(url))
			});
		},
		
		editYao(date,recordId){
			let url = 'https://api.ifufan.com/yongyao/index.html?random=' + Math.random() + '&uid=' + uni.getStorageSync('phone') + '#/edite/' + recordId;
			uni.navigateTo({
				url: '/pages/h5/h5?url=' + encodeURIComponent(JSON.stringify(url))
			});
		},
		
		addPisunLog(){
			let url = 'https://guat.bigecko.com/web01api/test/index.html#/maintain_recod?random=' + Math.random() + '&uid=' + uni.getStorageSync('phone')
			uni.navigateTo({
				url: '/pages/h5/h5?url=' + encodeURIComponent(JSON.stringify(url))
			});
		},
		
		delYao(recordId) {
			wx.request({
				url: app.globalData.appHttps + '/yxb_yongyaojilu/delete',
				method: 'POST',
				data: {
					id:recordId
				},
				header: {
					Accept: 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
					'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg3OTY1NzMsInVzZXJuYW1lIjoieHMxODB4eHh4ODQ4NCJ9.vURqw-2UrWXA_mjL69Ts5vZfEmKl1M8ZSIqKf25A-iY',
					Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg3OTY1NzMsInVzZXJuYW1lIjoieHMxODB4eHh4ODQ4NCJ9.vURqw-2UrWXA_mjL69Ts5vZfEmKl1M8ZSIqKf25A-iY'
				},
				success: res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '删除成功',
						});
						this.getCalendarData()
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						});
					}
				}
			});
			
		},
		
		//点击日历事件
		dayChange(e) {
			if (e.info) {
				if (e.info.type2 || e.info.type1) {
					this.planModal = true;
					this.recordId = e.info.recordId;
				}
			} else {
				let url = 'https://api.ifufan.com/yongyao/index.html?random=' + Math.random() + '&uid=' + uni.getStorageSync('phone') + '&currentDate=' + e.fullDate
				uni.navigateTo({
					url: '/pages/h5/h5?url=' + encodeURIComponent(JSON.stringify(url))
				});
			}
		},
		
		today(){
			var day = new Date();
			day.setTime(day.getTime());
			var today = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
			return today
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
