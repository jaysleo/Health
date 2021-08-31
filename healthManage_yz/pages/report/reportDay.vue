<template>
	<view class="content">
		<view class="u-m-b-50 u-font-lg title">记录宝宝成长信息</view>
		<u-form label-width="300" label-align="right" :label-style="{ paddingRight: '20px' }">
			<u-form-item label="测量日期">
				<!-- <text @click="changeDateModal = true" v-if="form.measureDate">{{ form.measureDate }}</text> -->
				<text @click="changeDateModal = true" :style="measureDate ? '' : 'color: #bfbfbf;'">
					{{measureDate ? measureDate : '请选择'}}
					</text>
			</u-form-item>
			<u-form-item label="测量头围">
				<text @click="headModal = true" v-if="form.head">{{ form.headLabel }}</text>
				<text @click="headModal = true" v-else style="color: #bfbfbf;">请选择</text>
			</u-form-item>
			<u-form-item label="测量身高">
				<text @click="heightModal = true" v-if="form.height">{{ form.heightLabel }}</text>
				<text @click="heightModal = true" v-else style="color: #bfbfbf;">请选择</text>
			</u-form-item>
			<u-form-item label="测量体重">
				<text @click="weightModal = true" v-if="form.weight">{{ form.weightLabel }}</text>
				<text @click="weightModal = true" v-else style="color: #bfbfbf;">请选择</text>
			</u-form-item>
			<view class="u-m-t-50 u-text-center"><u-button type="primary" @click="save" block>保存</u-button></view>
		</u-form>

		<u-calendar v-model="changeDateModal" mode="date" @change="dateChange"></u-calendar>
		<u-select v-model="headModal" mode="mutil-column" :list="headDate" @confirm="headChange">请选择</u-select>
		<u-select v-model="heightModal" mode="mutil-column" :list="heightDate" @confirm="heightChange">请选择</u-select>
		<u-select v-model="weightModal" mode="mutil-column" :list="weightDate" @confirm="weightChange">请选择</u-select>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			id: '',
			changeDateModal: false,
			heightDate: [],
			weightDate: [],
			headDate: [],
			heightModal: false,
			weightModal: false,
			headModal: false,
			form: {},
			measureDate:''
		};
	},
	onLoad(options) {
		if(options.date){
				this.measureDate = options.date
				console.log(this.form.measureDate )
		}
		this.getHeightDate();
		this.getWeightDate();
		this.getHeadDate();
	},
	onShow() {
	},
	methods: {
		save(){
			if(!this.measureDate){
				uni.showToast({
					title: '请填写测量日期',
					icon: 'none'
				});
				return false;
			}
			if(!this.form.head){
				uni.showToast({
					title: '请选择测量头围',
					icon: 'none'
				});
				return false;
			}
			if(!this.form.height){
				uni.showToast({
					title: '请选择测量身高',
					icon: 'none'
				});
				return false;
			}
			if(!this.form.weight){
				uni.showToast({
					title: '请选择测量体重',
					icon: 'none'
				});
				return false;
			}
			this.form.measureDate = this.measureDate
			let formData = JSON.stringify(this.form)
			wx.request({
				url: app.globalData.appHttps + '/ylzj',
				method: 'POST',
				data: {
					uid: uni.getStorageSync('phone'),
					data:formData
				},
				success: res => {
					uni.showToast({
						title:'添加成功',
						icon:'success'
					})
					setTimeout(() => {
						uni.reLaunch({
							url:'../index/index'
						})
					}, 2000);
				}
			});
		},
		
		dateChange(e) {
			this.measureDate = e.result;
		},
		
		headChange(e) {
			this.form.head = e[0].value + e[1].value / 10;
			this.form.headLabel = e[0].label + e[1].label;
		},
		
		heightChange(e) {
			this.form.height = e[0].value + e[1].value / 10;
			this.form.heightLabel = e[0].label + e[1].label;
		},
		
		weightChange(e) {
			this.form.weight = e[0].value + e[1].value / 10;
			this.form.weightLabel = e[0].label + e[1].label;
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
					label:'.' + i + 'CM',
					value: i
				});
			}
			this.headDate[0] = row1Data;
			this.headDate[1] = row2Data;
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
					label:'.' + i + 'CM',
					value: i
				});
			}
			this.heightDate[0] = row1Data;
			this.heightDate[1] = row2Data;
		},
		
		getWeightDate() {
			let row1Data = [];
			let row2Data = [];
			for (let i = 2; i <= 49; i++) {
				row1Data.push({
					label: i,
					value: i
				});
			}
			for (let i = 0; i <= 9; i++) {
				row2Data.push({
					label:'.' + i + 'KG',
					value: i
				});
			}
			this.weightDate[0] = row1Data;
			this.weightDate[1] = row2Data;
		},


	}
};
</script>

<style scoped lang="scss">
.content {
	padding: 40upx;
	
	.title{
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
