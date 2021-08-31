<template>
	<view class="content">
		<view class="wechatBox">
			<view class="avatar">
				<u-avatar v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" :size="120"></u-avatar>
			</view>
			<u-cell-item title="昵称" :arrow="false">{{ userInfo.nickName }}</u-cell-item>
			<u-cell-item title="姓名" :arrow="false">{{ userInfo.name }}</u-cell-item>
			<u-cell-item title="手机号" :arrow="false" :border-bottom="false">{{ userInfo.phone }}</u-cell-item>
		</view>
		<!-- <view class="wechatBox u-flex u-row-between">
			<u-avatar v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl"></u-avatar>
			<view>
				<view style="font-weight: 700;" class="u-font-lg u-text-right">{{ userInfo.nickName }}</view>
				<view>{{ userInfo.phone }} {{ userInfo.name }}</view>
			</view>
		</view> -->
		<!-- <view class="formBox">
			<u-cell-group :border="false">
				<u-cell-item title="共患疾病信息" label="共患疾病信息" @click="toH5('https://guat.bigecko.com/web01api/web/index.html#/comorbidities_recod?random=0.5892888324954355&uid=')" v-if="sjkids == '0e12'">
					<u-icon slot="icon" size="80" name="https://api.ifufan.com/yxb/assets/image/icon3.png" style="margin-right: 20upx;"></u-icon>
				</u-cell-item>
				<u-cell-item title="疾病严重程度评估" label="PASI、BSA、PGA、生活质量、瘙痒等" @click="modal = true" v-if="sjkids == '0e12'">
					<u-icon slot="icon" size="80" name="https://api.ifufan.com/yxb/assets/image/icon4.png" style="margin-right: 20upx;"></u-icon>
				</u-cell-item>
				<u-cell-item title="生理指标及异常指标检测" label="身高、体重、血糖、血压、Homa等" :border-bottom="false" @click="toH5('https://api.ifufan.com/yxb/blj/home.html?random=0.44186152806592305&uid=')" v-if="sjkids == '0e12' || sjkids == '196a' || sjkids == '595f'">
					<u-icon slot="icon" size="80" name="https://api.ifufan.com/yxb/assets/image/icon5.png" style="margin-right: 20upx;"></u-icon>
				</u-cell-item>
			</u-cell-group>
		</view> -->

		<!-- <view><u-button type="primary" block @click="check">保存</u-button></view> -->
		<view class="u-m-t-20 quit"><u-button  type="error" block @click="quit">退出登录</u-button></view>

		<u-action-sheet :list="list" v-model="modal" @click="goChange"></u-action-sheet>
	</view>
</template> 

<script>
const app = getApp();
export default {
	data() {
		return {
			userInfo: '',
			modal: false,
			list: [
				{
					text: 'PASI'
				},
				// {
				// 	text: 'BSA'
				// },
				// {
				// 	text: 'PGA'
				// },
				{
					text: '生活质量'
				},
				{
					text: '瘙痒'
				}
			],
			sjkids:''
		};
	},
	onLoad() {
		this.queryUserInfo();
		this.sjkids = uni.getStorageSync('sjkids')
		this.userInfo = uni.getStorageSync('userInfo');
		console.log(this.userInfo);
	},
	methods: {
		goChange(index) {
			switch (index) {
				case 0:
					uni.navigateTo({
						url: '/pages/webViewer/webViewer?url=' + 'https://guat.bigecko.com/web01api/web/index.html#/pasi_recod?random=0.1898152751674731&uid=' + uni.getStorageSync('phone')
					});
					break;
				case 1:
					uni.navigateTo({
						url: '/pages/webViewer/webViewer?url=' + 'https://guat.bigecko.com/web01api/web/index.html#/skin_quality?uid=' + uni.getStorageSync('phone')
					});
					break;
				case 2:
					uni.navigateTo({
						url: '/pages/gdForm/gdForm?token=pLKrUR'
					});
					break;
			}
		},

		toH5(url) {
			let uidUrl = url + uni.getStorageSync('phone')
			uni.navigateTo({
				url: '/pages/h5/h5?url=' + encodeURIComponent(JSON.stringify(uidUrl))
			});
		},

		getPhone() {
			uni.login({
				success: res => {
					console.log(res);
					wx.request({
						url: app.globalData.https + '/Auth/miniProgramAuth',
						method: 'POST',
						data: {
							code: res.code
						},
						success: loginRes => {
							if (res.data.code == 1) {
								wx.request({
									url: app.globalData.https + '/Auth/getPhone',
									method: 'POST',
									data: {
										sessionKey: loginRes.data.data.session_key,
										encryptedData: e.detail.encryptedData,
										iv: e.detail.iv
									},
									success: phoneRes => {
										if (res.data.code == 1) {
											this.userInfo.phone = phoneRes.data.data.purePhoneNumber;
										}
									}
								});
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

		check() {
			if (this.userInfo.idcard) {
				wx.request({
					url: app.globalData.appHttps + '/validateIdcard?idcard=' + this.userInfo.idcard,
					method: 'POST',
					data: {},
					header: {
						Accept: 'application/json, text/plain, */*',
						'Content-Type': 'application/json',
						'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg3OTY1NzMsInVzZXJuYW1lIjoieHMxODB4eHh4ODQ4NCJ9.vURqw-2UrWXA_mjL69Ts5vZfEmKl1M8ZSIqKf25A-iY',
						Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg3OTY1NzMsInVzZXJuYW1lIjoieHMxODB4eHh4ODQ4NCJ9.vURqw-2UrWXA_mjL69Ts5vZfEmKl1M8ZSIqKf25A-iY'
					},
					success: res => {
						if (res.data.success) {
							this.userInfo.birthday = this.getBirthdayFromIdCard(this.userInfo.idcard);
							this.editUserInfo();
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none'
							});
						}
					}
				});
			} else {
				// this.editUserInfo()
			}
		},

		editUserInfo() {
			uni.request({
				url: app.globalData.doctorHttps + '/addPatient',
				method: 'POST',
				data: {
					templateid: 'bad2',
					name: this.userInfo.name,
					idcard: this.userInfo.idcard,
					birthday: this.userInfo.birthday
				},
				success: getPatientRes => {
					console.log(getPatientRes.data.success);
					if (getPatientRes.data.success) {
						uni.showToast({
							title: '保存成功',
							icon: 'success',
							success: res => {
								wx.navigateBack({
									delta: 1
								});
							}
						});
					}
				}
			});
		},

		queryUserInfo() {
			wx.request({
				url: app.globalData.doctorHttps + '/getPatient',
				method: 'GET',
				data: {
					templateid: 'bad2',
					phone: uni.getStorageSync('phone')
				},
				success: getPatientRes => {
					if (getPatientRes.data.success) {
						this.userInfo = getPatientRes.data.result;
					}
				}
			});
		},

		// 截图出生日月
		getBirthdayFromIdCard(idCard) {
			var birthday = '';
			if (idCard != null && idCard != '') {
				if (idCard.length == 15) {
					birthday = '19' + idCard.substr(6, 6);
				} else if (idCard.length == 18) {
					birthday = idCard.substr(6, 8);
				}

				birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-');
			}
			console.log(birthday);
			return birthday;
		},

		// 退出登录
		quit() {
			uni.clearStorageSync();
			uni.reLaunch({
				url: '/pages/index/index'
			});
		}
	}
};
</script>

<style>
.content {
	padding: 40upx;
}
.wechatBox {
	padding: 40upx;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	border-radius: 40upx;
	background: #fff;
	margin-top: 50upx;
	margin-bottom: 40upx;
	position: relative;
}
.formBox {
	padding: 20upx;
	box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
	border-radius: 40upx;
	background: #fff;
	margin-bottom: 40upx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}

.quit {
	position: fixed;
	margin: 20upx;
	left: 0;
	bottom: 0;
	width: 710upx;
}

.avatar{
	position: absolute;
	top: -60upx;
	left: 0upx;
	width: 100%;
	text-align: center;
}
</style>
