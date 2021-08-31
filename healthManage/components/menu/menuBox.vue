<template>
	<view class="menuBox">
		<!-- 通知栏 -->
		<view class="noticeBox" @click="toAdvisory">
			<u-notice-bar type="none" mode="vertical" :more-icon="true" :is-circular="false" border-radius="8" :list="noticeList"></u-notice-bar>
		</view>

		<u-grid :col="3" :border="false">
			<u-grid-item bg-color="none" @click="toAdvisory" v-if="sjkids == '0e12' || sjkids == '196a' || sjkids == '595f' || sjkids == '688a' || sjkids == 'c3a9' || sjkids == 'ca3f'">
				<u-badge :count="msgListTotal" :offset="[20, 60]"></u-badge>
				<u-icon name="/static/images/icon3.png" :size="80"></u-icon>
				<view class="grid-text">咨询医生</view>
			</u-grid-item>
			<u-grid-item bg-color="none" @click="toExp" v-if="sjkids == '0e12' || sjkids == '196a' || sjkids == '595f' || sjkids == '688a' || sjkids == 'c3a9' || sjkids == 'ca3f'">
				<u-icon name="/static/images/icon10.png" :size="80"></u-icon>
				<view class="grid-text">病友经验</view>
			</u-grid-item>
	<!-- 		<u-grid-item bg-color="none" @click="toStudy" v-if="sjkids == '0e12' || sjkids == '196a' || sjkids == '595f' || sjkids == '688a' || sjkids == 'c3a9' || sjkids == 'ca3f'">
				<u-icon name="/static/images/icon12.png" :size="80"></u-icon>
				<view class="grid-text">学习中心</view>
			</u-grid-item> -->
			<u-grid-item bg-color="none" @click="toH5('https://mzfwh.huashan.org.cn/doctor/userreservation')" v-if="sjkids == '0e12'">
				<u-icon name="/static/images/icon8.png" :size="80"></u-icon>
				<view class="grid-text">我的预约</view>
			</u-grid-item>
			<u-grid-item bg-color="none" @click="toH5('https://mzfwh.huashan.org.cn/doctor/detail?id=20114&hospitalid=17')" v-if="sjkids == 'c3a9'">
				<u-icon name="/static/images/icon8.png" :size="80"></u-icon>
				<view class="grid-text">预约挂号</view>
			</u-grid-item>
			<u-grid-item bg-color="none" @click="toVta" v-if="sjkids == '688a'">
				<u-icon name="/static/images/vte.png" :size="80"></u-icon>
				<view class="grid-text">VTE自评</view>
			</u-grid-item>
			<u-grid-item bg-color="none" @click="toXzpg" v-if="sjkids == 'c3a9'">
				<u-icon name="/static/images/xzpg.png" :size="80"></u-icon>
				<view class="grid-text">心脏评估</view>
			</u-grid-item>
			<u-grid-item bg-color="none" @click="toCxdt" v-if="sjkids == 'c3a9'">
				<u-icon name="/static/images/cxdt.png" :size="80"></u-icon>
				<view class="grid-text">测心电图</view>
			</u-grid-item>
			
			<u-grid-item bg-color="none" @click="toH5('https://mzfwh.huashan.org.cn/revisit/index')" v-if="sjkids == '0e12' || sjkids == '688a'">
				<u-icon name="/static/images/icon6.png" :size="80"></u-icon>
				<view class="grid-text">复诊配药</view>
			</u-grid-item>
			<u-grid-item bg-color="none" @click="toMyQuestionnaires" v-if="sjkids == '0e12' || sjkids == '688a'">
				<u-icon name="/static/images/icon7.png" :size="80"></u-icon>
				<view class="grid-text">我的报告</view>
			</u-grid-item>
			<u-grid-item bg-color="none" @click="toMy" v-if="sjkids == '0e12' || sjkids == '196a' || sjkids == '595f' || sjkids == '688a' || sjkids == 'c3a9' || sjkids == 'ca3f'">
				<u-icon name="/static/images/icon9.png" :size="80"></u-icon>
				<view class="grid-text">我的资料</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			sjkids: '',
			noticeList: '',
			msgList: [],
			msgListTotal: 0,
			senderid: '',
			setIntervalId: ''
		};
	},

	created() {
		this.sjkids = uni.getStorageSync('sjkids');
		if (uni.getStorageSync('illnessInfo')) {
			this.senderid = uni.getStorageSync('illnessInfo').id;
			this.getChatMsg();
			this.setIntervalId = setInterval(() => {
				this.getChatMsg();
			}, 3000);
		}
	},

	onHide() {
		clearInterval(this.setIntervalId);
	},

	onUnload() {
		clearInterval(this.setIntervalId);
	},

	methods: {
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

		//跳转咨询医生
		toAdvisory() {
			uni.navigateTo({
				url: '/pages/advisory/advisory'
			});
		},

		//跳转病友经验
		toExp() {
			uni.navigateTo({
				url: '/pages/exp/exp'
			});
		},
		
		toStudy() {
			uni.navigateTo({
				url: '/pages/study/study'
			});
		},
		

		//跳转我的报告
		toMyQuestionnaires() {
			uni.navigateTo({
				url: '/pages/questionnaires/questionnaires'
			});
		},

		//跳转我的资料
		toMy() {
			uni.navigateTo({
				url: '/pages/my/my'
			});
		},

		//跳转VTA评估小程序
		toVta() {
			uni.navigateToMiniProgram({
				appId: 'wxc3ec23f6297776f3',
				path: 'pages/index/index',
				envVersion: 'release' //跳转到b的正式版
			});
		},
		
		//跳转心脏评估小程序
		toXzpg() {
			uni.navigateToMiniProgram({
				appId: 'wx11755b8cfc2c0c0e',
				// path: 'pages/index/index',
				envVersion: 'release' //跳转到b的正式版
			});
		},
		
		//跳转测心电图小程序
		toCxdt() {
			uni.navigateToMiniProgram({
				appId: 'wx8e9df60245d1e6e1',
				// path: 'pages/index/index',
				envVersion: 'release' //跳转到b的正式版
			});
		},

		toH5(url) {
			uni.navigateTo({
				url: '/pages/h5/h5?url=' + encodeURIComponent(JSON.stringify(url))
			});
		}
	}
};
</script>

<style lang="less" scoped>
.menuBox {
	margin: 20upx;
}
.noticeBox {
	margin: 20upx;
}
</style>
