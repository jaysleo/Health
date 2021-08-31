<template>
	<view class="content">
		<view class="logoBox"><u-image :fade="false" :lazy-load="false" src="/static/images/loginCover.png" width="400rpx" mode="widthFix" /></view>
		<view class="label">三步完成本次就诊</view>
		<view class="tips">（完成大约需要3分钟）</view>
		<view class="step"><u-steps :list="numList" :current="2" direction="column"></u-steps></view>
		<view><u-button type="primary" block @click="stepSubmit0">我知道了，下一步</u-button></view>

		<!-- 第一步 -->
		<view class="step1" v-if="step == 1">
			<view class="step"><u-steps mode="number" :list="numList" :current="step - 1"></u-steps></view>
			<view class="logoBox"><u-image :fade="false" :lazy-load="false" src="/static/images/bingli.png" width="500rpx" mode="widthFix" /></view>
			<view class="label">填写</view>
			<view class="tips">从病历本上查看本次的PASI和BSA评分</view>
			<view class="formBox">
				<u-form :label-width="400">
					<u-form-item label="PASI评分">
						<!-- <u-input v-model="stepFrom.pasi" type="digit" /> -->
						<u-number-box v-model="stepFrom.pasi" :min="1" :max="100" :positive-integer="false" :step="0.1" :press-time="100"></u-number-box>
						<text slot="right">分</text>
					</u-form-item>
					<u-form-item label="BSA评分">
						<!-- <u-input v-model="stepFrom.bsa" /> -->
						<u-number-box v-model="stepFrom.bsa" type="digit" :min="1" :max="100" :positive-integer="false" :step="0.1" :press-time="100"></u-number-box>
						<text slot="right">分</text>
					</u-form-item>
				</u-form>
			</view>
			<u-button type="primary" block @click="stepSubmit1">保存并下一步</u-button>
			<!-- <u-button v-else open-type="getPhoneNumber" @getphonenumber="getPhone" type="primary" block>保存并下一步</u-button> -->
		</view>

		<view class="step1" v-if="step == 2">
			<view class="step"><u-steps mode="number" :list="numList" :current="step - 1"></u-steps></view>
			<view class="label">您用的生物制剂是哪种？</view>
			<view class="formBox">
				<u-form :label-width="400">
					<u-form-item>
						<u-radio-group v-model="stepFrom.drugType" size="50" width="33%">
							<u-radio v-for="(item, index) in list" :key="index" :name="item.name" style="">{{ item.name }}</u-radio>
						</u-radio-group>
					</u-form-item>
					<u-form-item label="这次打了几支">
						<u-input v-model="stepFrom.drugTotal" type="digit" />
						<text slot="right">支</text>
					</u-form-item>
					<u-form-item label="这次花了多少钱">
						<u-input v-model="stepFrom.drugPrice" type="digit" />
						<text slot="right">元</text>
					</u-form-item>
				</u-form>
			</view>
			<view class="buttonBox"><u-button type="primary" block @click="stepSubmit2">保存并下一步</u-button></view>
		</view>

		<view class="step1" v-if="step == 3">
			<view class="step"><u-steps mode="number" :list="numList" :current="step - 1"></u-steps></view>
			<view class="label">请记录你的基础数据？</view>
			<view class="formBox">
				<u-form :label-width="400">
					<!-- <u-form-item label="体型">
						<u-input v-model="stepFrom.bodyType" />
						<text slot="right"></text>
					</u-form-item> -->
					<u-form-item label="血压(收缩压/高压)">
						<u-input v-model="stepFrom.mmHgHigh" type="digit" />
						<text slot="right">mmHg</text>
					</u-form-item>
					<u-form-item label="血压(舒张/低压)">
						<u-input v-model="stepFrom.mmHgLow" type="digit" />
						<text slot="right">mmHg</text>
					</u-form-item>
					<u-form-item label="血糖">
						<u-input v-model="stepFrom.mmol" type="digit" />
						<text slot="right">mmol/L</text>
					</u-form-item>
					<u-form-item label="糖化血红蛋白">
						<u-input v-model="stepFrom.HbAlc" type="digit" />
						<text slot="right">%</text>
					</u-form-item>
					<u-form-item label="胰岛素">
						<u-input v-model="stepFrom.insulin" type="digit" />
						<text slot="right">mIU/L</text>
					</u-form-item>
					<u-form-item label="C肽">
						<u-input v-model="stepFrom.Cpeptide" type="digit" />
						<text slot="right">ng/ml</text>
					</u-form-item>
				</u-form>
			</view>
			<view class="buttonBox">
				<u-button type="primary" block @click="submit">保存并分析</u-button>
				<!-- 
				<u-button v-else open-type="getPhoneNumber" @getphonenumber="getPhone" type="primary" block>保存并分析</u-button> 
				-->
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			phone: '',
			userInfo: '',
			numList: [
				{
					name: '记录PASI和BSA分数'
				},
				{
					name: '记录生物制剂情况'
				},
				{
					name: '记录你的基础数值'
				}
			],
			stepFrom: {
				pasi: 60, //PASI评分
				bsa: 60, //BSA评分
				drugType: '', //生物制剂类型
				drugTotal: '', //打了几支
				drugPrice: '', //花了多少钱
				bodyType: '', //体型
				mmHgHigh: '', //血压(收缩压)
				mmHgLow: '', //血压(舒张压)
				mmol: '', //血糖
				HbAlc: '', //糖化血红蛋白
				insulin: '', //胰岛素
				Cpeptide: '' //C肽
			},
			step: 3,
			list: [
				{
					name: '拓咨',
					disabled: false
				},
				{
					name: '可善挺',
					disabled: false
				},
				{
					name: '修美乐',
					disabled: false
				},
				{
					name: '特诺雅',
					disabled: false
				},
				{
					name: '写斯奴',
					disabled: false
				},
				{
					name: '益赛普',
					disabled: false
				}
			],
			userModal: false,
		};
	},
	onLoad() {
		if (!uni.getStorageSync('phone')) {
			uni.navigateTo({
				url: '/pages/authorization/authorization'
			});
		} 
	},

	onShow() {
		if (uni.getStorageSync('phone')) {
			this.phone = uni.getStorageSync('phone');
		}
		if (uni.getStorageSync('userInfo')) {
			this.userInfo = uni.getStorageSync('userInfo');
		}
	},

	methods: {
		save() {
			wx.request({
				url: app.globalData.doctorHttps + '/addPatient',
				method: 'POST',
				data: {
					templateid: '0e12',
					phone: uni.getStorageSync('phone'),
					isYxb: this.isYxb,
					firstSickenTime: this.sickenTime
				},
				success: res => {
					console.log(res.data.success);
					if (res.data.success) {
						this.userModal = false;
					}
				}
			});
		},

		getPhone(e) {
			wx.request({
				url: app.globalData.https + '/Auth/getPhone',
				method: 'POST',
				data: {
					sessionKey: this.userInfo.session_key,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				},
				success: res => {
					if (res.data.code == 1) {
						wx.request({
							url: app.globalData.https + '/wechat/queryOpenid',
							method: 'POST',
							data: {
								unionid: this.userInfo.unionid
							},
							success: queryOpenidRes => {
								// 新增患者
								wx.request({
									url: app.globalData.doctorHttps + '/addPatient',
									method: 'POST',
									data: {
										templateid: '0e12',
										name: this.userInfo.name,
										phone: res.data.data.purePhoneNumber,
										openid: queryOpenidRes.data.data,
										miniOpenid: this.userInfo.openid,
										unionid: this.userInfo.unionid,
										gender: this.userInfo.gender,
										nickName: this.userInfo.nickName,
										avatarUrl: this.userInfo.avatarUrl,
										country: this.userInfo.country,
										province: this.userInfo.province,
										city: this.userInfo.city,
										source: 'miniProgram'
									},
									success: getPatientRes => {
										console.log(getPatientRes.data.success);
										if (getPatientRes.data.success) {
											this.phone = res.data.data.purePhoneNumber;
											uni.setStorageSync('phone', res.data.data.purePhoneNumber);
											this.stepSubmit1();
										}
									}
								});
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
		},

		stepSubmit0() {
			this.step = 1;
		},

		stepSubmit1() {
			if (!this.stepFrom.pasi) {
				uni.showToast({
					title: '请填写PASI评分',
					icon: 'none'
				});
				return false;
			}
			if (!this.stepFrom.bsa) {
				uni.showToast({
					title: '请填写BSA评分',
					icon: 'none'
				});
				return false;
			}
			this.step = 2;
		},

		stepSubmit2() {
			if (!this.stepFrom.drugType) {
				uni.showToast({
					title: '请选择生物制剂',
					icon: 'none'
				});
				return false;
			}
			if (!this.stepFrom.drugTotal) {
				uni.showToast({
					title: '请填写打了几支',
					icon: 'none'
				});
				return false;
			}
			if (!this.stepFrom.drugPrice) {
				uni.showToast({
					title: '请填写花了多少钱',
					icon: 'none'
				});
				return false;
			}
			this.step = 3;
		},

		submit() {
			wx.request({
				url: app.globalData.doctorHttps + '/saveFormDetail',
				method: 'POST',
				data: {
					templateid: '0e12',
					mid: 'scan_user_basic',
					isMicroApp: 1,
					title: '就诊问卷',
					phone: uni.getStorageSync('phone'),
					pasi: this.stepFrom.pasi, //PASI评分
					bsa: this.stepFrom.bsa, //BSA评分
					drugType: this.stepFrom.drugType, //生物制剂类型
					drugTotal: this.stepFrom.drugTotal, //打了几支
					drugPrice: this.stepFrom.drugPrice, //花了多少钱
					// bodyType:this.stepFrom.bodyType, //体型
					mmHgHigh: this.stepFrom.mmHgHigh, //血压(收缩压)
					mmHgLow: this.stepFrom.mmHgLow, //血压(舒张压)
					mmol: this.stepFrom.mmol, //血糖
					HbAlc: this.stepFrom.HbAlc, //糖化血红蛋白
					insulin: this.stepFrom.insulin, //胰岛素
					Cpeptide: this.stepFrom.Cpeptide, //C肽
					isYxb: this.isYxb,
					firstSickenTime: this.sickenTime
				},
				success: res => {
					if (res.data.success) {
						uni.reLaunch({
							url: '../report/report?id=' + res.data.result._id
						});
					}
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	padding: 40upx;
}
.logoBox {
	margin: 40rpx;
	padding: 0 50rpx;
	text-align: center;
	border-bottom: 2rpx solid #f0f0f0;
	display: flex;
	justify-content: center;
}
.label {
	font-size: 50upx;
	font-weight: 700;
	margin: 20upx 0 20upx;
}
.step {
	margin: 50upx 0;
}

.step1 {
	padding: 40upx;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background: #fff;
	z-index: 100;
	overflow: scroll;
	overflow-y: auto;
	overflow-x: hidden;
}

.formBox {
	margin: 20upx 0;
}

/deep/ .u-radio {
	margin-bottom: 20upx;
}

.buttonBox {
	margin-top: 50upx;
}
</style>
