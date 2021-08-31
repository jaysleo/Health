<template>
	<view>
		<view class="logoBox"><u-image :fade="false" :lazy-load="false" src="/static/images/loginCover.png" width="500rpx" mode="widthFix" /></view>
		<view class="contentBox">
			<view>尊敬的用户，您好：</view>
			<view class="content">为了给你带来更优质的服务，请确认授权以下信息</view>
			<view class="tips">获得你的公开信息（昵称、头像等）</view>
			<u-button v-if="canIUseGetUserProfile" @click="getUserProfile" type="primary" block round>授权微信</u-button>
			<u-button v-else open-type="getUserInfo" @getuserinfo="getUserInfo" type="primary" block round>授权微信</u-button>
			<!-- <u-button @click="phoneModal=true" type="primary" block round>授权微信</u-button> -->
			<u-modal v-model="phoneModal" :show-cancel-button="false" :show-confirm-button="false" :show-title="false" :width="700">
				<view class="phoneModal u-p-50 u-text-center">
					<view class="u-m-b-50 u-font-lg">请填写患者信息</view>
					<u-form label-width="300">
						<u-form-item label="您的姓名" required><u-input v-model="localUserInfo.name" placeholder="您的姓名" input-align="right" /></u-form-item>
						<u-form-item label="您的身份证号" required><u-input v-model="localUserInfo.idcard" placeholder="您的身份证号" input-align="right" type="idcard" /></u-form-item>
						<u-form-item label="您的性别" required>
							<u-radio-group v-model="localUserInfo.gender" class="u-flex u-row-right">
								<u-radio name="1">男</u-radio>
								<u-radio name="2">女</u-radio>
							</u-radio-group>
						</u-form-item>
						<u-form-item label="您的年龄" required><u-input v-model="localUserInfo.age" placeholder="您的年龄" input-align="right" type="number" /></u-form-item>
						<u-form-item label="您的身高" required>
							<view class="u-flex">
								<u-input type="number" v-model="localUserInfo.height" placeholder="您的身高" input-align="right" class="u-flex-1" />
								<text class="gray">cm</text>
							</view>
						</u-form-item>
						<u-form-item label="您的体重" required>
							<view class="u-flex">
								<u-input type="number" v-model="localUserInfo.weight" placeholder="您的体重" input-align="right" class="u-flex-1" />
								<text class="gray">kg</text>
							</view>
						</u-form-item>
						<u-form-item label="您的出生年月" right-icon="calendar" required>
							<text @click="onBirthshow(1)" v-if="localUserInfo.birthday">{{localUserInfo.birthday}}</text>
							<text @click="onBirthshow(1)" v-else style="color: #bfbfbf;">请选择</text>
						</u-form-item>
						<u-form-item label="您的籍贯" required>
							<view class="u-flex u-row-right">
								<text @click="onAreashow(1)" v-if="localUserInfo.province">{{localUserInfo.province}}{{localUserInfo.city}}</text>
								<text @click="onAreashow(1)" v-else style="color: #bfbfbf;">请选择</text>
							</view>
						</u-form-item>
						<u-form-item label="您的职业" required><u-input v-model="localUserInfo.profession" placeholder="您的职业" input-align="right" /></u-form-item>
						<u-form-item label="是否是痒诊病患者" required>
							<u-radio-group v-model="isYz" class="u-flex u-row-right">
								<u-radio name="1">是</u-radio>
								<u-radio name="2">否</u-radio>
							</u-radio-group>
						</u-form-item>
						<u-form-item label="首次发病时间" class="u-text-right" v-if="isYz == 1" right-icon="calendar" required>
							<text @click="sickenTimeModal = true" v-if="sickenTime">{{ sickenTime }}</text>
							<text @click="sickenTimeModal = true" v-else style="color: #bfbfbf;">请选择</text>
						</u-form-item>
						<u-form-item label="看诊医生姓名" required v-if="isYz == 1"><u-input v-model="localUserInfo.doctor" placeholder="您看诊医生的姓名" input-align="right" /></u-form-item>
						<u-form-item label="患者与您的关系" required v-if="isYz == 2">
							<u-radio-group v-model="localUserInfo.relation" class="u-flex u-row-right">
								<u-radio name="1">家人</u-radio>
								<u-radio name="2">朋友</u-radio>
							</u-radio-group>
						</u-form-item>
						<u-form-item label="患者姓名" required v-if="isYz == 2"><u-input v-model="localUserInfo.suffererName" placeholder="患者姓名" input-align="right" /></u-form-item>
						<u-form-item label="患者身份证号" required v-if="isYz == 2">
							<u-input v-model="localUserInfo.suffererIdcard" placeholder="患者身份证号" input-align="right" type="idcard" />
						</u-form-item>
						<u-form-item label="患者性别" required v-if="isYz == 2">
							<u-radio-group v-model="localUserInfo.suffererSex" class="u-flex u-row-right">
								<u-radio name="1">男</u-radio>
								<u-radio name="2">女</u-radio>
							</u-radio-group>
						</u-form-item>
						<u-form-item label="患者年龄" required v-if="isYz == 2"><u-input v-model="localUserInfo.suffererAge" placeholder="患者年龄" input-align="right" type="number" /></u-form-item>
						<u-form-item label="患者身高" required v-if="isYz == 2">
							<view class="u-flex">
								<u-input type="number" v-model="localUserInfo.suffererHeight" placeholder="患者身高" input-align="right" class="u-flex-1" />
								<text class="gray">cm</text>
							</view>
						</u-form-item>
						<u-form-item label="患者体重" required v-if="isYz == 2">
							<view class="u-flex">
								<u-input type="number" v-model="localUserInfo.suffererWeight" placeholder="患者体重" input-align="right" class="u-flex-1" />
								<text class="gray">kg</text>
							</view>
						</u-form-item>
						<u-form-item label="患者出生年月" right-icon="calendar" required v-if="isYz == 2">
							<text @click="onBirthshow(2)" v-if="localUserInfo.suffererBirthday">{{localUserInfo.suffererBirthday}}</text>
							<text @click="onBirthshow(2)" v-else style="color: #bfbfbf;">请选择</text>
						</u-form-item>
						<u-form-item label="患者籍贯" required v-if="isYz == 2">
							<view class="u-flex u-row-right">
								<text @click="onAreashow(2)" v-if="localUserInfo.suffererProvince">{{localUserInfo.suffererProvince}}{{localUserInfo.suffererCity}}</text>
								<text @click="onAreashow(2)" v-else style="color: #bfbfbf;">请选择</text>
							</view>
						</u-form-item>
						<u-form-item label="患者职业" required v-if="isYz == 2"><u-input v-model="localUserInfo.suffererProfession" placeholder="患者职业" input-align="right" /></u-form-item>
						<u-form-item label="首次发病时间" class="u-text-right" v-if="isYz == 2" right-icon="calendar" required>
							<text @click="sickenTimeModal = true" v-if="sickenTime">{{ sickenTime }}</text>
							<text @click="sickenTimeModal = true" v-else style="color: #bfbfbf;">请选择</text>
						</u-form-item>
						<!-- <u-form-item label="是否有关节痛/关节炎" required>
							<u-radio-group v-model="localUserInfo.isPsa" class="u-flex u-row-right">
								<u-radio name="1">是</u-radio>
								<u-radio name="2">否</u-radio>
							</u-radio-group>
						</u-form-item> -->
						<u-form-item label="联系手机号" :border-bottom="false" class="u-text-right" required v-if="isYz">
							<text v-if="phone">{{ phone }}</text>
							<u-button v-else open-type="getPhoneNumber" @getphonenumber="getPhone" type="primary" block size="mini" :disabled="!localUserInfo.name || !localUserInfo.idcard">
								授权手机号
							</u-button>
						</u-form-item>
						<!-- <u-form-item label="联系手机号" :border-bottom="false" class="u-text-right" required v-if="isYz == 2">
							<u-input type="number" v-model="phone" placeholder="联系手机号" input-align="right" />
						</u-form-item> -->
						<view class="u-m-t-50"><u-button type="primary" block size="medium" @click="save" block>保存</u-button></view>
					</u-form>
				</view>
			</u-modal>
		</view>

		<u-picker mode="time" v-model="sickenTimeModal" :params="{ year: true, month: true, day: true, hour: false, minute: false, second: false }" @confirm="sickenTimeChange"></u-picker>
		<u-picker mode="time" v-model="birthdayModal" :params="{ year: true, month: true, day: true, hour: false, minute: false, second: false }" @confirm="birthdayChange"></u-picker>
		<u-picker mode="region" v-model="areaModal" :safe-area-inset-bottom="true" @confirm="areaChange"></u-picker>
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
			sickenTimeModal: false,
			birthdayModal:false,
			areaModal:false,
			isbirth:0,
			isarea:0,
			localUserInfo: {},
			isYz: '',
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
					sjkids: uni.getStorageSync('sjkids') ? uni.getStorageSync('sjkids') : 'oe12'
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
		
		// 获取出生年月
		onBirthshow(index){
			this.isbirth = index;
			this.birthdayModal = true;
		},
		birthdayChange(e) {
			if(this.isbirth==1){
				this.localUserInfo.birthday = e.year + '-' + e.month + '-' + e.day;
			}else{
				this.localUserInfo.suffererBirthday = e.year + '-' + e.month + '-' + e.day;
			}
		},
		//获取省市区
		onAreashow(index){
			this.isarea = index;
			this.areaModal = true;
		},
		areaChange(e){
			if(this.isarea==1){
				this.localUserInfo.province = e.province.label;
				this.localUserInfo.city = e.city.label;
				this.localUserInfo.area = e.area.label;
			}else{
				this.localUserInfo.suffererProvince = e.province.label;
				this.localUserInfo.suffererCity = e.city.label;
				this.localUserInfo.suffererCountry = e.area.label;
			}
		},
		// 获取发病时间
		sickenTimeChange(e) {
			this.sickenTime = e.year + '-' + e.month + '-' + e.day;
		},

		// 新授权机制
		getUserProfile() {
			uni.getUserProfile({
				desc:'用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				lang:"zh_CN",
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
								// let task = [];
								// for(let i in this.taskList){
								// 	task.push(0)
								// }
								// uni.setStorageSync('task', task);
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
			if (!this.localUserInfo.sex) {
				uni.showToast({
					title: '请填写您的性别',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.age) {
				uni.showToast({
					title: '请填写您的年龄',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.height) {
				uni.showToast({
					title: '请填写您的身高',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.weight) {
				uni.showToast({
					title: '请填写您的体重',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.birthday) {
				uni.showToast({
					title: '请填写您的出生年月',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.province) {
				uni.showToast({
					title: '请填写您的籍贯',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.profession) {
				uni.showToast({
					title: '请填写您的职业',
					icon: 'none'
				});
				return false;
			}
			if (!this.isYz) {
				uni.showToast({
					title: '请选择是否是痒诊病患者',
					icon: 'none'
				});
				return false;
			}
			if (!this.sickenTime && this.isYz) {
				uni.showToast({
					title: '请选择首次发病时间',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.relation && this.isYz == '2') {
				uni.showToast({
					title: '请选择患者与您的关系',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.suffererName && this.isYz == '2') {
				uni.showToast({
					title: '请填写患者姓名',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.suffererIdcard && this.isYz == '2') {
				uni.showToast({
					title: '请填写患者身份证号',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.suffererSex && this.isYz == '2') {
				uni.showToast({
					title: '请填写患者性别',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.suffererAge && this.isYz == '2') {
				uni.showToast({
					title: '请填写患者年龄',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.suffererHeight && this.isYz == '2') {
				uni.showToast({
					title: '请填写患者身高',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.suffererWeight && this.isYz == '2') {
				uni.showToast({
					title: '请填写患者体重',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.suffererBirthday && this.isYz == '2') {
				uni.showToast({
					title: '请填写患者出生年月',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.suffererProvince && this.isYz == '2') {
				uni.showToast({
					title: '请填写患者籍贯',
					icon: 'none'
				});
				return false;
			}
			if (!this.localUserInfo.suffererProfession && this.isYz == '2') {
				uni.showToast({
					title: '请填写患者职业',
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
			if (!/^1[34578]\d{9}$/.test(this.phone)) {
				uni.showToast({
					title: '请填写手正确的手机号',
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
							templateid: 'bad2',
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
							relation: this.localUserInfo.relation,
							suffererName: this.localUserInfo.suffererName,
							suffererIdcard: this.localUserInfo.suffererIdcard,
							source: 'miniProgram',
							isYz: this.isYz,
							isPsa: this.localUserInfo.isPsa,
							firstSickenTime: this.sickenTime,
							age:this.localUserInfo.age,
							height:this.localUserInfo.height,
							weight:this.localUserInfo.weight,
							birthday:this.localUserInfo.birthday,
							nativeplace:this.localUserInfo.nativeplace,
							profession:this.localUserInfo.profession,
							suffererSex:this.localUserInfo.suffererSex,
							suffererAge:this.localUserInfo.suffererAge,
							suffererHeight:this.localUserInfo.suffererHeight,
							suffererWeight:this.localUserInfo.suffererWeight,
							suffererBirthday:this.localUserInfo.suffererBirthday,
							suffererProvince:this.localUserInfo.suffererProvince,
							suffererCity:this.localUserInfo.suffererCity,
							suffererProfession:this.localUserInfo.suffererProfession
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
										uni.navigateTo({
											url: '../report/report'
										});
										// wx.navigateBack({
										// 	delta: 1
										// });
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
.gray{
	margin-left: 20rpx;
	color: #bfbfbf;
}
</style>
