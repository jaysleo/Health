<template>
	<view>
		<view class="logoBox"><u-image :fade="false" :lazy-load="false" src="/static/images/loginCover.png" width="500rpx" mode="widthFix" /></view>

		<view class="contentBox">
			<view>尊敬的用户，您好：</view>
			<view class="content">为了给你带来更优质的服务，请确认授权以下信息</view>
			<view class="tips">获得你的公开信息（昵称、头像等）</view>
			<u-button v-if="canIUseGetUserProfile" @click="getUserProfile" type="primary" block round>授权微信</u-button>
			<u-button v-else open-type="getUserInfo" @getuserinfo="getUserInfo" type="primary" block round>授权微信</u-button>

			<u-modal v-model="phoneModal" :show-cancel-button="false" :show-confirm-button="false" :show-title="false" :width="700">
				<view class="phoneModal u-p-50 u-text-center">
					<view class="u-m-b-50 u-font-lg">请填写您的信息</view>
					<u-form label-width="300">
						<u-form-item label="您的姓名" required><u-input v-model="localUserInfo.name" placeholder="您的姓名" input-align="right" /></u-form-item>
						<u-form-item label="您的身份证号" required><u-input v-model="localUserInfo.idcard" placeholder="您的身份证号" input-align="right" type="idcard" /></u-form-item>
						<u-form-item label="联系手机号" :border-bottom="false" class="u-text-right" required>
							<text v-if="phone">{{ phone }}</text>
							<u-button v-else open-type="getPhoneNumber" @getphonenumber="getPhone" type="primary" block size="mini" :disabled="!localUserInfo.name || !localUserInfo.idcard">
								授权手机号
							</u-button>
						</u-form-item>
						<!-- <u-form-item label="联系手机号" :border-bottom="false" class="u-text-right" required v-if="isYxb == 2">
							<u-input type="number" v-model="phone" placeholder="联系手机号" input-align="right" />
						</u-form-item> -->
						<view class="u-m-t-50"><u-button type="primary" block size="medium" @click="save" block>保存</u-button></view>
					</u-form>
				</view>
			</u-modal>
		</view>

		<u-calendar v-model="changeDateModal" mode="date" @change="dateChange"></u-calendar>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			canIUseGetUserProfile: false,
			wechatInfo: '',
			phoneModal: false,
			changeDateModal: false,
			localUserInfo: {},
			isYxb: '',
			phone: '',
			sickenTime: '',
			taskList: []
		};
	},
	onLoad() {
		if (uni.getUserProfile) {
			this.canIUseGetUserProfile = true;
		}
		this.getTask();
	},
	onShow() {
		if (uni.setStorageSync('wechatInfo')) {
			this.phoneModal = true;
		}
	},
	methods: {
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

		// 获取发病时间
		dateChange(e) {
			this.sickenTime = e.result;
		},

		// 新授权机制
		getUserProfile() {
			uni.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: res => {
					console.log(res);
					this.wechatInfo = res.userInfo;
					this.login();
				}
			});
		},

		// 老授权机制
		getUserInfo(e) {
			if (e.detail.errMsg == 'getUserInfo:ok') {
				this.wechatInfo = e.detail.userInfo;
				this.login();
			}
		},

		// 获取code uid
		login() {
			uni.login({
				success: res => {
					console.log(res);
					wx.request({
						url: app.globalData.https + '/Auth/miniProgramAuth',
						method: 'POST',
						data: {
							code: res.code,
							nickName: this.wechatInfo.nickName,
							avatarUrl: this.wechatInfo.avatarUrl,
							country: this.wechatInfo.country,
							province: this.wechatInfo.province,
							city: this.wechatInfo.city,
							gender: this.wechatInfo.gender,
							templageid: uni.getStorageSync('sjkids')
						},
						success: res => {
							if (res.data.code == 1) {
								this.localUserInfo = res.data.data;
								uni.setStorageSync('userInfo', this.localUserInfo);
								uni.setStorageSync('uid', this.localUserInfo.id);
								let task = [];
								for (let i in this.taskList) {
									task.push(0);
								}
								uni.setStorageSync('task', task);
								// uni.showToast({
								// 	title: '授权成功',
								// 	icon: 'success',
								// 	success: res => {
								// 		wx.navigateBack({
								// 			delta: 1
								// 		});
								// 	}
								// });
								this.phoneModal = true;
							} else {
								wx.showToast({
									title: res.data.msg,
									icon: 'none'
								});
							}
						}
					});
				}
			});
		},

		save() {
			if (!this.localUserInfo.name) {
				uni.showToast({
					title: '请填写您的姓名',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.idcard) {
				uni.showToast({
					title: '请填写您的身份证号',
					icon: 'none'
				});
				return false;
			}
			if (!this.phone) {
				uni.showToast({
					title: '请填写手机号',
					icon: 'none'
				});
				return false;
			}

			wx.request({
				url: app.globalData.https + '/wechat/queryOpenid',
				method: 'POST',
				data: {
					unionid: this.localUserInfo.unionid
				},
				success: queryOpenidRes => {
					// 新增患者
					wx.request({
						url: app.globalData.doctorHttps + '/addPatient',
						method: 'POST',
						data: {
							name: this.localUserInfo.name,
							phone: this.phone,
							openid: queryOpenidRes.data.data,
							miniOpenid: this.localUserInfo.openid,
							unionid: this.localUserInfo.unionid,
							gender: this.localUserInfo.gender,
							nickName: this.localUserInfo.nickName,
							avatarUrl: this.localUserInfo.avatarUrl,
							country: this.localUserInfo.country,
							province: this.localUserInfo.province,
							city: this.localUserInfo.city,
							idcard: this.localUserInfo.idcard,
							source: 'miniProgram',
							templateid: uni.getStorageSync('sjkids')
						},
						success: getPatientRes => {
							console.log(getPatientRes.data.success);
							if (getPatientRes.data.success) {
								uni.setStorageSync('userInfo', getPatientRes.data.result);
								uni.setStorageSync('name', getPatientRes.data.result.name);
								uni.setStorageSync('phone', this.phone);
								uni.setStorageSync('uid', getPatientRes.data.result._id);
								uni.showToast({
									title: '授权成功',
									icon: 'success',
									success: res => {
										if (uni.getStorageSync('sjkids') == '595f') {
											uni.navigateTo({
												url:'/pages/index/index'
											})
										}
										if (uni.getStorageSync('sjkids') == '196a') {
											uni.navigateTo({
												url: '../report/reportXxxq'
											});
										} else {
											uni.reLaunch({
												url:'/pages/index/index'
											})
										}	
										
									}
								});
							}
						}
					});
				}
			});
		},

		getPhone(e) {
			wx.request({
				url: app.globalData.https + '/Auth/getPhone',
				method: 'POST',
				data: {
					sessionKey: this.localUserInfo.session_key,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				},
				success: res => {
					if (res.data.code == 1) {
						this.phone = res.data.data.purePhoneNumber;
					} else {
						wx.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				}
			});
		}
	}
};
</script>

<style scoped>

.logoBox {
	margin: 40rpx;
	padding: 0 50rpx;
	text-align: center;
	border-bottom: 2rpx solid #f0f0f0;
	display: flex;
	justify-content: center;
}

.contentBox {
	margin: 40rpx;
	font-size: 32rpx;
}

.contentBox .content {
	margin-top: 10rpx;
}

.contentBox .tips {
	font-size: 26rpx;
	color: #bfbfbf;
	margin: 50rpx 0 80rpx;
}
</style>
