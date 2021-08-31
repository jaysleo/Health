<template>
	<view class="taskBox">
		<view class="img"><image src="../../static/images/report.png" mode="widthFix" @click="openReportModal"></image></view>

		<u-popup v-model="reportModal" mode="right" width="600rpx">
			<view class="modalBox">
				<image src="../../static/images/report.png" mode="" style="width: 560upx;margin-bottom: 20upx;border-radius: 20upx;" mode="widthFix"></image>
				<view class="u-text-right u-m-b-10">
					<u-button shape="square" size="mini" @click="getTask">
						<u-icon name="reload" class="u-m-r-10"></u-icon>
						刷新
					</u-button>
				</view>
				<view v-for="(item, index) in taskList" :key="index" style="margin-bottom: 40upx;">
					<view class="label">
						<view class="name">
							<image src="../../static/images/title.png"></image>
							{{ item.typeName }}
						</view>
						<view>{{ item.total }} / {{ item.list.length }}</view>
					</view>
					<view class="item" v-for="(itemChild, indexChild) in item.list" :key="indexChild" @click="toWebViewer(itemChild.url, index, indexChild)">
						<view style="width: 70%;">{{ itemChild.name }}</view>
						<view class="input" v-if="itemChild.check">已填写</view>
						<view class="unInput" v-if="!itemChild.check">未填写</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			reportModal: false,
			taskList: []
		};
	},

	props: {},

	watch: {
		'taskList'() {
			if(uni.getStorageSync('task')){
				let task = uni.getStorageSync('task');
				for (let i in this.taskList) {
					let total = 0
					for (let j in this.taskList[i].list) {
						this.taskList[i].list[j].check = task[i].list[j].value;
						if(this.taskList[i].list[j].check == 1){
							total ++ 
						}
					}
					this.taskList[i].total = total
				}
				console.log(this.taskList);
			} else {
				this.getTask();
			}
		}
	},

	created() {},

	methods: {
		openReportModal() {
			this.getTask();
			this.reportModal = true;
		},

		// 获取任务列表
		getTask() {
			wx.request({
				url: app.globalData.https + '/yxb/taskList',
				method: 'POST',
				data: {
					uid:uni.getStorageSync('phone')
				},
				success: res => {
					if (res.data.code == 1) {
						if (!uni.getStorageSync('task')) {
							let taskData = [];
							for (let i in res.data.data) {
								let listData = [];
								for (let j in res.data.data[i].list) {
									listData.push({
										id: res.data.data[i].list[j].id,
										value: 0
									});
								}
								taskData[i] = {
									id: res.data.data[i].id,
									list: listData
								};
							}
							uni.setStorageSync('task', taskData);
							console.log(taskData);
						}
						this.taskList = res.data.data;
					} else {
						console.log(res.data.message);
					}
				}
			});
		},

		toWebViewer(url, index, indexChild) {
			let taskData = uni.getStorageSync('task');
			taskData[index].list[indexChild].value = 1;
			uni.setStorageSync('task', taskData);
			setTimeout(() => {
				this.getTask();
			}, 500);

			console.log(taskData);
			uni.navigateTo({
				url: '/pages/webViewer/webViewer?url=' + url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.taskBox {
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	margin: 20upx;
	border-radius: 40upx;
	background: #fff;
	overflow: hidden;
	display: flex;

	.img {
		height: 200upx;
		width: 100%;
		border-radius: 40upx;
		display: flex;

		image {
			width: 100%;
			height: auto;
		}
	}

	.modalBox {
		padding: 20upx;

		.label {
			padding: 0 20upx;
			color: #3bbda1;
			display: flex;
			justify-content: space-between;

			image {
				width: 30upx;
				height: 30upx;
				margin-right: 10upx;
			}

			.name {
				font-size: 30upx;
				font-weight: 700;
			}
		}

		.item {
			display: flex;
			justify-content: space-between;
			padding: 20upx;
			border-radius: 20upx;
			background: #fafafa;
			margin-top: 20upx;
			font-weight: 700;

			.unInput {
				color: #ffc53d;
				font-weight: 500;
			}

			.input {
				font-weight: 500;
				color: #3bbda1;
			}
		}
	}
}
</style>
