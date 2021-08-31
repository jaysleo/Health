<template>
	<view class="u-p-20">
		<view class="" style="margin-top: 20upx;" v-for="(item,index) in sectionData" :key="index">
			<view style="font-weight: 700;font-size: 36upx;color: #fff;">
				{{item.label}}
			</view>
			<view style="position: relative;">
				<image src="../../static/floorA.png" mode="widthFix" style="opacity: 1;" v-if="tab === 0"></image>
				<image src="../../static/floorB.png" mode="widthFix" style="opacity: 1;" v-if="tab === 1"></image>
				<image src="../../static/floorC.png" mode="widthFix" style="opacity: 1;" v-if="tab === 2"></image>
				<view class="u-flex u-col-center u-row-center"
					style="color: #fff;position: absolute;left: 0;top: 0;width: 100%;height: 100%;flex-direction:column">
					<view
						style="padding: 20upx 40upx;background: red;border-radius: 40upx;margin-bottom: 5upx;background:radial-gradient(circle,#ec008c,#fc6767)"
						v-for="(itemShebei,indexShebei) in item.shebei" :key="indexShebei">
						<u-icon name="map-fill" class="u-m-r-10"></u-icon>{{itemShebei}}
					</view>
				</view>
			</view>
		</view>

		<view style="height: 200upx;"></view>

		<view class="scan">
			<view class="button" @click="tabChange(0)"
				:style="tab == 0 ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);' : 'background: linear-gradient(135deg, #BBD2C5 0%, #bdc3c7 100%)'">
				2号楼</view>
			<view class="button" @click="tabChange(2)"
				:style="tab == 2 ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);' : 'background: linear-gradient(135deg, #BBD2C5 0%, #bdc3c7 100%)'">
				3号楼</view>
			<view class="button" @click="tabChange(1)"
				:style="tab == 1 ? 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);' : 'background: linear-gradient(135deg, #BBD2C5 0%, #bdc3c7 100%)'">
				6号楼
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: 0,
				sectionData: []
			};
		},

		onLoad() {
			this.getList()
		},

		methods: {
			tabChange(e) {
				this.tab = e
				this.getList()
			},
			getList() {
				wx.request({
					url: 'https://sbzhgl.ifufan.com:4000/devices',
					method: 'GET',
					data: {},
					success: res => {
						if (res.data.code == 200) {
							if (this.tab === 0) {
								var sectionData = [{
										value: '20F营养科',
										label: '20F营养科'
									},
									{
										value: '19F老年医学科',
										label: '19F老年医学科'
									},
									{
										value: '18F全科',
										label: '18F全科'
									}, {
										value: '17F普外科',
										label: '17F普外科'
									},
									{
										value: '16F普外科｜胰腺外科',
										label: '16F普外科｜胰腺外科'
									},
									{
										value: '15F神经内科',
										label: '15F神经内科'
									},
									{
										value: '14F神经内科',
										label: '14F神经内科'
									},
									{
										value: '13F骨科',
										label: '13F骨科'
									},
									{
										value: '12F骨科｜消化科',
										label: '12F骨科｜消化科'
									},
									{
										value: '11F运动医学科｜皮肤科',
										label: '11F运动医学科｜皮肤科'
									},
									{
										value: '10F血液科｜介入科',
										label: '10F血液科｜介入科'
									},
									{
										value: '9F手外科',
										label: '9F手外科'
									},
									{
										value: '8F泌尿外科',
										label: '8F泌尿外科'
									},
									{
										value: '7F呼吸科｜心胸外科（胸外科）',
										label: '7F呼吸科｜心胸外科（胸外科）'
									},
									{
										value: '6F心内科｜心胸外科（心外科）',
										label: '6F心内科｜心胸外科（心外科）'
									},
									{
										value: '5F普外科｜快通道外科｜耳鼻咽喉科｜颌面外科',
										label: '5F普外科｜快通道外科｜耳鼻咽喉科｜颌面外科'
									},
									{
										value: '4F普外科',
										label: '4F普外科'
									},
									{
										value: '3F神经外科',
										label: '3F神经外科'
									},
									{
										value: '2F神经外科术后监护室',
										label: '2F神经外科术后监护室'
									},
									{
										value: '1F放射科CT｜DSA',
										label: '1F放射科CT｜DSA'
									}, {
										value: 'B1F设备层',
										label: 'B1F设备层'
									}
								];
							}
							if (this.tab === 1) {
								var sectionData = [{
										value: '20F老年医学科',
										label: '20F老年医学科'
									},
									{
										value: '19F老年医学科',
										label: '19F老年医学科'
									},
									{
										value: '18F老年医学科',
										label: '18F老年医学科'
									},
									{
										value: '17F老年医学科',
										label: '17F老年医学科'
									},
									{
										value: '16F国际医疗中心住院部',
										label: '16F国际医疗中心住院部'
									},
									{
										value: '15F国际医疗中心住院部',
										label: '15F国际医疗中心住院部'
									},
									{
										value: '14F综合病房',
										label: '14F综合病房'
									},
									{
										value: '13F综合病房',
										label: '13F综合病房'
									},
									{
										value: '12F综合病房',
										label: '12F综合病房'
									},
									{
										value: '11F综合病房',
										label: '11F综合病房'
									},
									{
										value: '10F神经外科',
										label: '10F神经外科'
									},
									{
										value: '9F重症监护室ICU',
										label: '9F重症监护室ICU'
									},
									{
										value: '8F住院手术室',
										label: '8F住院手术室'
									},
									{
										value: '7F住院手术室',
										label: '7F住院手术室'
									},
									{
										value: '6F住院手术室',
										label: '6F住院手术室'
									},
									{
										value: '5F住院手术室',
										label: '5F住院手术室'
									},
									{
										value: '4F实验室',
										label: '4F实验室'
									},
									{
										value: '3F实验室',
										label: '3F实验室'
									},
									{
										value: '2F实验室',
										label: '2F实验室'
									},
									{
										value: '1F输血科',
										label: '1F输血科'
									}, {
										value: 'B1F设备机组房',
										label: 'B1F设备机组房'
									}
								]
							}
							if (this.tab === 2) {
								var sectionData = [{
										value: '7F38病区(肾病科｜眼科)',
										label: '7F38病区(肾病科｜眼科)'
									},
									{
										value: '6F37病区｜肿瘤科｜风湿科｜日间病房',
										label: '6F37病区｜肿瘤科｜风湿科｜日间病房'
									},
									{
										value: '5F检验医学科',
										label: '5F检验医学科'
									},
									{
										value: '4F检验医学科',
										label: '4F检验医学科'
									},
									{
										value: '3F超声医学科｜心电图室',
										label: '3F超声医学科｜心电图室'
									},
									{
										value: '2F内窥镜室｜脑电图室｜眼科｜肺功能科｜神经肌电图室｜睡眠障碍诊治中心',
										label: '2F内窥镜室｜脑电图室｜眼科｜肺功能科｜神经肌电图室｜睡眠障碍诊治中心'
									},
									{
										value: '1F放射科｜石膏间',
										label: '1F放射科｜石膏间'
									}
								]
							}
							for (let i in sectionData) {
								for (let j in res.data.data) {
									if (res.data.data[j].info.detail.jbxx6[1] == sectionData[i].label) {
										let shebei = []
										shebei.push(res.data.data[j].info.detail.jbxx1)
										sectionData[i].shebei = shebei
									}
								}
							}
							this.sectionData = sectionData
						}

					}
				});
			},
		}
	};
</script>

<style scoped lang="less">
	image {
		width: 100%;
		height: auto;
	}

	.scan {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		text-align: center;
		padding: 0 50upx;
		display: flex;
		justify-content: space-between;

		.button {
			margin: 50upx 0 20upx;
			padding: 20upx 50upx;
			color: #fff;
			font-size: 40upx;
			font-weight: 700;

			border-radius: 50upx;
			display: inline-block;
			border: 3upx solid rgba(255, 255, 255, 0.5);
		}
	}
</style>
