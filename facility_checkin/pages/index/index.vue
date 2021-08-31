<template>
	<view class="content">
		<image class="img2" src="../../static/img2.png" mode="aspectFit"></image>
		<view class="title">设备物联孪生定位系统</view>
		<view class="wechatBox">
			<u-form :model="form" ref="uForm" label-width="200">
				<u-form-item label="设备名称">{{ form.jbxx1 }}</u-form-item>
				<u-form-item label="设备编号">{{ form.jbxx2 }}</u-form-item>
				<u-form-item label="记录时间">{{ now | date('yyyy年mm月dd日 hh时MM分') }}</u-form-item>
				<u-form-item label="提交人姓名">
					<u-input v-model="form.name" placeholder="请填写姓名" />
				</u-form-item>
				<u-form-item label="提交人科室">
					<text @click="sectionModal = true"> {{form.section ? form.section[0] + ' ' + form.section[1] : '请选择科室'}}</text>
				</u-form-item>
				<u-form-item label="当前所在位置" :border-bottom="false">{{ form.jbxx6 }}</u-form-item>
			</u-form>
			<view class="u-m-t-50">
				<u-button type="primary" ripple shape="circle" block @click="scan">扫一扫 患者住院码</u-button>
			</view>
		</view>

		<u-popup mode="bottom" v-model="overModal" :mask-close-able="false">
			<view class="overContent">
				<image style="width: 200upx;height: 200upx;margin-bottom: 30upx;" src="/static/success.png"
					mode="aspectFit"></image>
				<view>登记成功</view>
			</view>
		</u-popup>
		
		<!-- 科室选择弹窗 -->
		<u-select v-model="sectionModal" mode="mutil-column-auto" :list="sectionData" @confirm="sectionChange"></u-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sectionModal:false,
				sectionData: [{
						value: '2号楼',
						label: '2号楼',
						children: [{
								value: 'B1F设备层',
								label: 'B1F设备层'
							},
							{
								value: '1F放射科CT｜DSA',
								label: '1F放射科CT｜DSA'
							},
							{
								value: '2F神经外科术后监护室',
								label: '2F神经外科术后监护室'
							},
							{
								value: '3F神经外科',
								label: '3F神经外科'
							},
							{
								value: '4F普外科',
								label: '4F普外科'
							},
							{
								value: '5F普外科｜快通道外科｜耳鼻咽喉科｜颌面外科',
								label: '5F普外科｜快通道外科｜耳鼻咽喉科｜颌面外科'
							},
							{
								value: '6F心内科｜心胸外科（心外科）',
								label: '6F心内科｜心胸外科（心外科）'
							},
							{
								value: '7F呼吸科｜心胸外科（胸外科）',
								label: '7F呼吸科｜心胸外科（胸外科）'
							},
							{
								value: '8F泌尿外科',
								label: '8F泌尿外科'
							},
							{
								value: '9F手外科',
								label: '9F手外科'
							},
							{
								value: '10F血液科｜介入科',
								label: '10F血液科｜介入科'
							},
							{
								value: '11F运动医学科｜皮肤科',
								label: '11F运动医学科｜皮肤科'
							},
							{
								value: '12F骨科｜消化科',
								label: '12F骨科｜消化科'
							},
							{
								value: '13F骨科',
								label: '13F骨科'
							},
							{
								value: '14F神经内科',
								label: '14F神经内科'
							},
							{
								value: '15F神经内科',
								label: '15F神经内科'
							},
							{
								value: '16F普外科｜胰腺外科',
								label: '16F普外科｜胰腺外科'
							},
							{
								value: '17F普外科',
								label: '17F普外科'
							},
							{
								value: '18F全科',
								label: '18F全科'
							},
							{
								value: '19F老年医学科',
								label: '19F老年医学科'
							},
							{
								value: '20F营养科',
								label: '20F营养科'
							}
						]
					},
					{
						value: '3号楼',
						label: '3号楼',
						children: [
							{
								value: '1F放射科｜石膏间',
								label: '1F放射科｜石膏间'
							},
							{
								value: '2F内窥镜室｜脑电图室｜眼科｜肺功能科｜神经肌电图室｜睡眠障碍诊治中心',
								label: '2F内窥镜室｜脑电图室｜眼科｜肺功能科｜神经肌电图室｜睡眠障碍诊治中心'
							},
							{
								value: '3F超声医学科｜心电图室',
								label: '3F超声医学科｜心电图室'
							},
							{
								value: '4F检验医学科',
								label: '4F检验医学科'
							},
							{
								value: '5F检验医学科',
								label: '5F检验医学科'
							},
							{
								value: '6F37病区｜肿瘤科｜风湿科｜日间病房',
								label: '6F37病区｜肿瘤科｜风湿科｜日间病房'
							},
							{
								value: '7F38病区(肾病科｜眼科)',
								label: '7F38病区(肾病科｜眼科)'
							}
						]
					},
					{
						value: '6号楼',
						label: '6号楼',
						children: [{
								value: 'B1F设备机组房',
								label: 'B1F设备机组房'
							},
							{
								value: '1F输血科',
								label: '1F输血科'
							},
							{
								value: '2F实验室',
								label: '2F实验室'
							},
							{
								value: '3F实验室',
								label: '3F实验室'
							},
							{
								value: '4F实验室',
								label: '4F实验室'
							},
							{
								value: '5F住院手术室',
								label: '5F住院手术室'
							},
							{
								value: '6F住院手术室',
								label: '6F住院手术室'
							},
							{
								value: '7F住院手术室',
								label: '7F住院手术室'
							},
							{
								value: '8F住院手术室',
								label: '8F住院手术室'
							},
							{
								value: '9F重症监护室ICU',
								label: '9F重症监护室ICU'
							},
							{
								value: '10F神经外科',
								label: '10F神经外科'
							},
							{
								value: '11F综合病房',
								label: '11F综合病房'
							},
							{
								value: '12F综合病房',
								label: '12F综合病房'
							},
							{
								value: '13F综合病房',
								label: '13F综合病房'
							},
							{
								value: '14F综合病房',
								label: '14F综合病房'
							},
							{
								value: '15F国际医疗中心住院部',
								label: '15F国际医疗中心住院部'
							},
							{
								value: '16F国际医疗中心住院部',
								label: '16F国际医疗中心住院部'
							},
							{
								value: '17F老年医学科',
								label: '17F老年医学科'
							},
							{
								value: '18F老年医学科',
								label: '18F老年医学科'
							},
							{
								value: '19F老年医学科',
								label: '19F老年医学科'
							},
							{
								value: '20F老年医学科',
								label: '20F老年医学科'
							}
						]
					}
				],
				id: '',
				form: {},
				now: '',
				overModal: false
			};
		},
		
		onLoad(options) {
			this.id = options.id;
			this.getDetail();
			var myDate = new Date();
			this.now = myDate.getTime();
		},
		
		methods: {
			sectionChange(e){
				let section = [e[0].value,e[1].value]
				this.form.section = section 
				console.log(section)
			},
			
			getDetail() {
				wx.request({
					url: 'https://sbzhgl.ifufan.com:4000/devices/' + this.id,
					method: 'GET',
					data: {},
					success: res => {
						if (res.data.code == 200) {
							this.form = res.data.data[0].info.detail;
							if (uni.getStorageSync('name')) {
								this.form.name = uni.getStorageSync('name');
								console.log(this.form.name);
							}
							if (uni.getStorageSync('section')) {
								this.form.section = uni.getStorageSync('section');
							}
						}
					}
				});
			},

			scan() {
				var that = this
				uni.scanCode({
					scanType: 'qrCode',
					success: function(res) {
						console.log(res.result);
						wx.request({
							url: 'https://api.ifufan.com:8800/cdr/getPatientBypi?zypi=' + res.result,
							method: 'GET',
							success: result => {
								that.form.zhuyuanhao = res.result;
								that.form.huanzhexingming = result.data['姓名'];
								that.form.bingqu = result.data['病区'];
								that.form.chuanghao = result.data['床号'];
								that.over();
							}
						});
					}
				});
			},

			over() {
				if (!this.form.name) {
					uni.showToast({
						title: '请填写提交人姓名',
						icon: 'none'
					});
					return false;
				}
				if (!this.form.section) {
					uni.showToast({
						title: '请填写提交人科室',
						icon: 'none'
					});
					return false;
				}
				if (!this.form.zhuyuanhao) {
					uni.showToast({
						title: '扫患者码失败,请重新扫码',
						icon: 'none'
					});
					return false;
				}
				let data = {
					jbxx1: this.form.jbxx1,
					jbxx2: this.form.jbxx2,
					jbxx3: this.now,
					jbxx4: this.form.name,
					jbxx5: this.form.section,
					jbxx6: this.form.section,
					jbxx7: this.form.zhuyuanhao,
					jbxx8: this.form.huanzhexingming,
					jbxx9: this.form.bingqu,
					jbxx10: this.form.chuanghao
				};
				wx.request({
					url: 'https://sbzhgl.ifufan.com:4000/devices',
					method: 'POST',
					data: {
						patientno: this.id,
						detail: data
					},
					success: res => {
						console.log(res.data);
						if (res.data.code == 200) {
							uni.setStorageSync('name', this.form.name);
							uni.setStorageSync('section', this.form.section);
							this.overModal = true;
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/index/home'
								});
							}, 2000);
						}
					}
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
		background: rgba(255, 255, 255, 0.9);
		margin-top: 50upx;
		margin-bottom: 40upx;
		position: relative;
	}

	.title {
		font-size: 46rpx;
		font-weight: 700;
		color: #fff;
		text-align: center;
		z-index: 100;
		margin-top: -100upx;
	}

	.quit {
		position: fixed;
		margin: 20upx;
		left: 0;
		bottom: 0;
		width: 710upx;
	}

	.img2 {
		width: 300upx;
		margin: -100upx 175upx 0;
	}

	.overContent {
		text-align: center;
		font-size: 40upx;
		font-weight: 700;
		padding: 60upx 0;
	}
</style>
