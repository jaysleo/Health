<template>
	<view>
		<view class="chatBox">
			<block v-for="(item, index) in msgList" :key="index">
				<view class="item" :style="item.isMine ? 'justify-content: flex-end' : 'justify-content: flex-start'">
					<u-avatar v-if="!item.isMine" src="/static/images/icon3.png" size="50"></u-avatar>
					<view class="card" v-if="item.type == 2" @click="toH5(doctorHttps + '/detail/' + item.msg.templateid + '/' + item.msg.mid + '?phone=' + phone)">
						<u-icon name="order" :size="40" class="u-m-r-10"></u-icon>
						请填写问卷：{{ item.msg.mname }}
					</view>
					<view class="text" v-if="item.type == 3"><u-image :src="item.msg" mode="widthFix" :border-radius="20" width="300" height="auto"></u-image></view>
					<view class="text" v-if="item.type == 1">{{ item.msg }}</view>
					<u-avatar v-if="item.isMine" :src="userInfo.avatarUrl" size="50"></u-avatar>
				</view>
			</block>
		</view>
		<view class="inputBox">
			<u-icon name="photo" :size="50" @click="uploadImg"></u-icon>
			<u-search
				placeholder="请输入咨询内容"
				search-icon="chat"
				v-model="keyword"
				action-text="发送"
				@custom="sendMsg"
				@search="sendMsg"
				style="width: 100%;margin-left: 10upx;"
			></u-search>
		</view>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			userInfo: '',
			phone: '',
			illnessInfo: '',
			msgList: [],
			keyword: '',
			setIntervalId: '',
			doctorHttps: '',
			img: ''
		};
	},
	onShow() {
		if (!uni.getStorageSync('uid') || !uni.getStorageSync('phone')) {
			uni.navigateTo({
				url: '/pages/authorization/authorization'
			});
			return false;
		} else {
			this.userInfo = uni.getStorageSync('userInfo');
			this.phone = uni.getStorageSync('phone');
			this.doctorHttps = app.globalData.doctorHttps;
			if (uni.getStorageSync('illnessInfo')) {
				this.illnessInfo = uni.getStorageSync('illnessInfo');
				this.getChatResetg();
				this.getMsgList();
				this.setIntervalId = setInterval(() => {
					this.getMsgList();
				}, 3000);
			}
		}
	},

	onUnload() {
		clearInterval(this.setIntervalId);
	},

	methods: {
		// 发消息
		sendMsg() {
			if (!this.keyword) {
				uni.showToast({
					title: '请填写咨询内容',
					icon: 'none'
				});
				return false;
			}
			let id = new Date().valueOf().toString();
			wx.request({
				url: app.globalData.appHttps + '/chat',
				method: 'POST',
				data: {
					id: id,
					senderid: uni.getStorageSync('phone'),
					sendername: this.userInfo.nickName,
					receiverid: this.illnessInfo.id,
					receivername: this.illnessInfo.doctorname,
					msg: this.keyword
				},
				success: res => {
					if (res.data.code == 200) {
						let newMsg = {
							id: id,
							isMine: true,
							msg: this.keyword
						};
						this.msgList = [...this.msgList, ...[newMsg]];
						this.keyword = '';
						setTimeout(() => {
							uni.pageScrollTo({
								scrollTop: 9999,
								duration: 0
							});
						}, 100);
					}
				}
			});
		},

		// 发图片消息
		sendImgMsg() {
			let id = new Date().valueOf().toString();
			wx.request({
				url: app.globalData.appHttps + '/chat',
				method: 'POST',
				data: {
					id: id,
					senderid: uni.getStorageSync('phone'),
					sendername: this.userInfo.nickName,
					receiverid: this.illnessInfo.id,
					receivername: this.illnessInfo.doctorname,
					type: 3,
					msg: this.img
				},
				success: res => {
					if (res.data.code == 200) {
						let newMsg = {
							id: id,
							isMine: true,
							type: 3,
							msg: this.img
						};
						this.msgList = [...this.msgList, ...[newMsg]];
						this.keyword = '';
						setTimeout(() => {
							uni.pageScrollTo({
								scrollTop: 9999,
								duration: 0
							});
						}, 500);
					}
				}
			});
		},

		getChatResetg() {
			wx.request({
				url: app.globalData.appHttps + '/chat/reset',
				method: 'GET',
				data: {
					receiverid: uni.getStorageSync('phone')
				}
			});
		},

		// 获取消息列表
		getMsgList() {
			wx.request({
				url: app.globalData.appHttps + '/chat',
				method: 'GET',
				data: {
					senderid: uni.getStorageSync('phone'),
					receiverid: this.illnessInfo.id
				},
				success: res => {
					if (res.data.code == 200 && res.data.data.length != this.msgList.length) {
						res.data.data.forEach(item => {
							item.isMine = item.senderid == uni.getStorageSync('phone');
							if (item.type == 2) {
								item.msg = JSON.parse(item.msg);
							}
						});
						this.msgList = res.data.data;
						console.log(this.msgList);
						setTimeout(() => {
							uni.pageScrollTo({
								scrollTop: 9999,
								duration: 0
							});
						}, 100);
					}
				}
			});
		},

		uploadImg() {
			uni.chooseImage({
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: 'https://api.ifufan.com:8800/upload', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'img',
						formData: {},
						success: uploadFileRes => {
							console.log(uploadFileRes.data);
							let imgData = JSON.parse(uploadFileRes.data).data.filename;
							this.img = 'https://api.ifufan.com:8800/img/' + imgData;
							this.sendImgMsg();
						}
					});
				}
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

<style scoped lang="scss">
page {
	background: #f8f8f8 !important;
}
.inputBox {
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	padding: 20upx;
	display: flex;
}
.chatBox {
	height: 100%;
	padding: 20upx;
	padding-bottom: 100upx;

	.item {
		display: flex;
		align-items: center;
		margin-bottom: 20upx;

		.text {
			background: #fff;
			padding: 20upx;
			border-radius: 10upx;
			margin: 0 20upx;
			box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		}

		.card {
			background-image: linear-gradient(to bottom right, #48c6ef, #6f86d6);
			// background: #f6ffed;
			padding: 20upx;
			border-radius: 10upx;
			margin: 0 20upx;
			font-size: 34upx;
			color: #fff;
			box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		}
	}
}
</style>
