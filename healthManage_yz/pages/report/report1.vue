<template>
	<view class="content">
		<view class="u-m-b-50 u-font-lg title">请填写宝宝信息</view>
		<u-form label-width="300" label-align="right" :label-style="{ paddingRight: '20px' }">
			<u-form-item label="宝宝昵称"><u-input v-model="form.babyName" placeholder="宝宝昵称" /></u-form-item>
			<u-form-item label="宝宝生日">
				<text @click="birthdayModal = true" v-if="form.babyBirthday">{{ form.babyBirthday }}</text>
				<text @click="birthdayModal = true" v-else style="color: #bfbfbf;">请选择</text>
			</u-form-item>
			<u-form-item label="宝宝性别" style="text-align: right;">
				<u-radio-group v-model="form.babySex">
					<u-radio name="1">小帅锅</u-radio>
					<u-radio name="2">小公举</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="怀孕时间">
				<text @click="pregnancyTimeModal = true" v-if="form.pregnancyTime">{{ form.pregnancyTime }}</text>
				<text @click="pregnancyTimeModal = true" v-else style="color: #bfbfbf;">请选择</text>
			</u-form-item>
			<u-form-item label="怀孕天数">
				<text @click="weekDayModal = true" v-if="form.pregnancyDays">{{ form.pregnancyDaysLabel }}</text>
				<text @click="weekDayModal = true" v-else style="color: #bfbfbf;">请选择</text>
			</u-form-item>
			<u-form-item label="出生头围">
				<text @click="headModal = true" v-if="form.head">{{ form.headLabel }}</text>
				<text @click="headModal = true" v-else style="color: #bfbfbf;">请选择</text>
			</u-form-item>
			<u-form-item label="出生身高">
				<text @click="heightModal = true" v-if="form.height">{{ form.heightLabel }}</text>
				<text @click="heightModal = true" v-else style="color: #bfbfbf;">请选择</text>
			</u-form-item>
			<u-form-item label="出生体重">
				<text @click="weightModal = true" v-if="form.weight">{{ form.weightLabel }}</text>
				<text @click="weightModal = true" v-else style="color: #bfbfbf;">请选择</text>
			</u-form-item>
			<view class="u-m-t-50 u-text-center"><u-button type="primary" @click="save" block>保存</u-button></view>
		</u-form>

		<u-modal v-model="wechatNoModal" :show-cancel-button="false" :show-confirm-button="false" :show-title="false" :width="700">
			<view class="u-p-20 u-text-center">
				<view class="u-m-b-50 u-m-t-50 u-font-lg">
					为了您能第一时间收到通知
					<p>请关注我们的公众号</p>
				</view>
				<official-account style="width: 80%;"></official-account>
				<view style="width: 100%;" class="u-flex u-row-center">点击上方关注按钮，快速关注</view>
				<view>或在微信'添加好友' - '公众号' - 搜索'循数助手' 进行关注</view>
				<view class="u-m-t-50"><u-button type="primary" @click="toHome">已关注,进入银屑病管理中心</u-button></view>
			</view>
		</u-modal>

		<u-calendar v-model="birthdayModal" mode="date" @change="birthdayChange"></u-calendar>
		<u-calendar v-model="pregnancyTimeModal" mode="date" @change="pregnancyTimeChange"></u-calendar>
		<u-select v-model="weekDayModal" mode="mutil-column" :list="weekDayDate" @confirm="weekDayChange">请选择</u-select>
		<u-select v-model="heightModal" mode="mutil-column" :list="heightDate" @confirm="heightChange">请选择</u-select>
		<u-select v-model="weightModal" mode="mutil-column" :list="weightDate" @confirm="weightChange">请选择</u-select>
		<u-select v-model="headModal" mode="mutil-column" :list="headDate" @confirm="headChange">请选择</u-select>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			id: '',
			changeDateModal: false,
			wechatNoModal: false,
			status: false,
			nice1: 0,
			nice2: 0,
			nice3: 0,
			nice4: 0,
			dcDetail: '',
			userInfo: '',
			courseDisease: '',
			weekDayDate: [],
			heightDate: [],
			weightDate: [],
			headDate: [],
			birthdayModal: false,
			pregnancyTimeModal: false,
			weekDayModal: false,
			heightModal: false,
			weightModal: false,
			headModal: false,
			form: {}
		};
	},
	onLoad(options) {
		this.getWeekDate();
		this.getHeightDate();
		this.getWeightDate();
		this.getHeadDate();
	},
	onShow() {},
	methods: {
		save() {
			if (!this.form.babyName) {
				uni.showToast({
					title: '请填写宝宝昵称',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.babyBirthday) {
				uni.showToast({
					title: '请填写宝宝生日',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.babySex) {
				uni.showToast({
					title: '请选择宝宝性别',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.pregnancyTime) {
				uni.showToast({
					title: '请选择怀孕日期',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.pregnancyDays) {
				uni.showToast({
					title: '请选择怀孕天数',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.head) {
				uni.showToast({
					title: '请选择出生头围',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.height) {
				uni.showToast({
					title: '请选择出生身高',
					icon: 'none'
				});
				return false;
			}
			if (!this.form.weight) {
				uni.showToast({
					title: '请选择出生体重',
					icon: 'none'
				});
				return false;
			}
			let formData = JSON.stringify(this.form);
			wx.request({
				url: app.globalData.appHttps + '/ylzj',
				method: 'POST',
				data: {
					uid: uni.getStorageSync('phone'),
					data: formData
				},
				success: res => {
					uni.showToast({
						title: '添加成功',
						icon: 'success'
					});
					setTimeout(() => {
						uni.reLaunch({
							url: '../index/index'
						});
					}, 2000);
				}
			});
		},

		birthdayChange(e) {
			this.form.babyBirthday = e.result;
		},

		pregnancyTimeChange(e) {
			this.form.pregnancyTime = e.result;
		},

		weekDayChange(e) {
			this.form.pregnancyDays = e[0].value * 7 + e[1].value;
			this.form.pregnancyDaysLabel = e[0].label + e[1].label;
		},

		heightChange(e) {
			this.form.height = e[0].value + e[1].value / 10;
			this.form.heightLabel = e[0].label + e[1].label;
		},

		weightChange(e) {
			this.form.weight = e[0].value + e[1].value / 10;
			this.form.weightLabel = e[0].label + e[1].label;
		},

		headChange(e) {
			this.form.head = e[0].value + e[1].value / 10;
			this.form.headLabel = e[0].label + e[1].label;
		},

		getWeekDate() {
			let weekData = [];
			let dayData = [];
			for (let i = 20; i <= 100; i++) {
				weekData.push({
					label: i + '周',
					value: i
				});
			}
			for (let i = 0; i <= 6; i++) {
				dayData.push({
					label: i + '天',
					value: i
				});
			}
			this.weekDayDate[0] = weekData;
			this.weekDayDate[1] = dayData;
		},

		getHeightDate() {
			let row1Data = [];
			let row2Data = [];
			for (let i = 40; i <= 129; i++) {
				row1Data.push({
					label: i,
					value: i
				});
			}
			for (let i = 0; i <= 9; i++) {
				row2Data.push({
					label: '.' + i + 'CM',
					value: i
				});
			}
			this.heightDate[0] = row1Data;
			this.heightDate[1] = row2Data;
		},

		getWeightDate() {
			let row1Data = [];
			let row2Data = [];
			for (let i = 2; i <= 70; i++) {
				row1Data.push({
					label: i,
					value: i
				});
			}
			for (let i = 0; i <= 9; i++) {
				row2Data.push({
					label: '.' + i + 'KG',
					value: i
				});
			}
			this.weightDate[0] = row1Data;
			this.weightDate[1] = row2Data;
		},

		getHeadDate() {
			let row1Data = [];
			let row2Data = [];
			for (let i = 15; i <= 45; i++) {
				row1Data.push({
					label: i,
					value: i
				});
			}
			for (let i = 0; i <= 9; i++) {
				row2Data.push({
					label: '.' + i + 'CM',
					value: i
				});
			}
			this.headDate[0] = row1Data;
			this.headDate[1] = row2Data;
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	padding: 40upx;

	.title {
		background: #5cdbd3;
		padding: 50upx;
		border-radius: 40upx;
		color: #fff;
		font-size: 40upx;
		font-weight: 700;
		text-align: center;
	}
}
.label {
	font-size: 50upx;
	font-weight: 700;
	margin: 40upx 0 20upx;
}

.tips {
	margin-top: 40upx;
	color: #8c8c8c;
}
.danger {
	color: #ff4d4f;
	font-weight: 700;
	font-size: 40upx;
}

.blue {
	color: #597ef7;
	font-weight: 700;
	font-size: 40upx;
}

.buttonBox {
	margin-top: 50upx;
}

.dcBox {
	.title {
		margin: 80upx 0 20upx;
		font-size: 36upx;
		font-weight: 700;
	}

	.item {
		background: #fff;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		border-radius: 40upx;
		box-sizing: border-box;

		.titleBox {
			width: 540upx;
			height: 150upx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.row {
			text-align: center;
		}

		.row1 {
			height: 40upx;
			line-height: 40upx;
		}

		.itemLabel {
			width: 40% !important;
			font-size: 30upx;
			font-weight: 700;
			color: #3bbda1;
		}

		.cont {
			width: 60%;
			font-size: 24upx;

			.value {
				font-size: 50upx;
				font-weight: 700;
			}

			.itemTips {
				color: #bfbfbf;
			}
		}

		.button {
			background: #3bbda1;
			padding: 20upx;
			height: 150upx;
			width: 150upx;
			color: #fff;
			border-radius: 40upx;
			display: flex;
			align-items: center;
			justify-content: center;
			white-space: nowrap;
		}
	}
}
</style>
