<template>
	<view class="dcBox u-m-20">
		<div class="title u-flex u-row-between">
			<view>
				监测数据
				<text class="u-light-color u-font-xs u-m-l-20">{{ dcDetail.create_time }}</text>
			</view>
			<u-button type="primary" shape="circle" size="mini" ripple @click="toSeeDoctor">
				<u-icon name="scan" class="u-m-r-10"></u-icon>
				扫码问诊
			</u-button>
		</div>
		<!-- PASI -->
		<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.pasi">
			<view class="u-flex">
				<view class="label row u-p-l-30 u-p-r-30" style="width: 300upx;">PASI评分</view>
				<view class="cont">
					<text class="$u-type-error u-m-r-10 value">{{ dcDetail.pasi }}</text>
					分
				</view>
			</view>
			<view class="button" style="background: #597ef7;">评估中</view>
		</view>
		
		<!-- BSA -->
		<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.bsa">
			<view class="u-flex">
				<view class="label row u-p-l-30 u-p-r-30" style="width: 300upx;">BSA评分</view>
				<view class="cont">
					<text class="$u-type-error u-m-r-10 value">{{ dcDetail.bsa }}</text>
					分
				</view>
			</view>
			<view class="button" style="background: #597ef7;">评估中</view>
		</view>
		
		<!-- 血压(收缩压) -->
		<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.mmHgHigh">
			<view class="u-flex titleBox">
				<view class="label row u-p-l-30 u-p-r-30">血压(收缩压)</view>
				<view class="cont">
					<text class="$u-type-error u-m-r-10 value">{{ dcDetail.mmHgHigh ? dcDetail.mmHgHigh : '110' }}</text>
					mmHg
					<p class="tips">90 ~ 140 mmHg</p>
				</view>
			</view>
			<view class="button" v-if="dcDetail.mmHgHigh > 140" style="background: #ff4d4f;">偏高</view>
			<view class="button" v-if="dcDetail.mmHgHigh < 90" style="background: #ff4d4f;">偏低</view>
			<view class="button" v-if="dcDetail.mmHgHigh <= 140 && dcDetail.mmHgHigh >= 90" style="background: #73d13d;">正常</view>
		</view>
		
		<!-- 血压(舒张压) -->
		<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.mmHgLow">
			<view class="u-flex titleBox">
				<view class="label row u-p-l-30 u-p-r-30">血压(舒张压)</view>
				<view class="cont">
					<text class="$u-type-error u-m-r-10 value">{{ dcDetail.mmHgLow ? dcDetail.mmHgLow : '80' }}</text>
					mmHg
					<p class="tips">60 ~ 90 mmHg</p>
				</view>
			</view>
			<view class="button" v-if="dcDetail.mmHgLow > 90" style="background: #ff4d4f;">偏高</view>
			<view class="button" v-if="dcDetail.mmHgLow < 60" style="background: #ff4d4f;">偏低</view>
			<view class="button" v-if="dcDetail.mmHgLow <= 90 && dcDetail.mmHgLow >= 60" style="background: #73d13d;">正常</view>
		</view>
		
		<!-- 血糖 -->
		<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.mmol">
			<view class="u-flex titleBox">
				<view class="label row u-p-l-30 u-p-r-30">血糖</view>
				<view class="cont">
					<text class="$u-type-error u-m-r-10 value">{{ dcDetail.mmol }}</text>
					mmol/L
					<p class="tips">3.9 ~ 6.1 mmol/L</p>
				</view>
			</view>
			<view class="button" v-if="dcDetail.mmol > 6.1" style="background: #ff4d4f;">偏高</view>
			<view class="button" v-if="dcDetail.mmol < 3.9" style="background: #ff4d4f;">偏低</view>
			<view class="button" v-if="dcDetail.mmol <= 6.1 && dcDetail.mmol >= 3.9" style="background: #73d13d;">正常</view>
		</view>
		
		<!-- 糖化血红蛋白 -->
		<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.HbAlc">
			<view class="u-flex titleBox">
				<view class="label row u-p-l-30 u-p-r-30">糖化血红蛋白</view>
				<view class="cont">
					<text class="$u-type-error u-m-r-10 value">{{ dcDetail.HbAlc }}</text>
					%
					<p class="tips">4 ~ 6 %</p>
				</view>
			</view>
			<view class="button" v-if="dcDetail.HbAlc > 6" style="background: #ff4d4f;">偏高</view>
			<view class="button" v-if="dcDetail.HbAlc < 4" style="background: #ff4d4f;">偏低</view>
			<view class="button" v-if="dcDetail.HbAlc <= 6 && dcDetail.HbAlc >= 4" style="background: #73d13d;">正常</view>
		</view>
		
		<!-- 胰岛素 -->
		<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.insulin">
			<view class="u-flex titleBox">
				<view class="label row u-p-l-30 u-p-r-30">胰岛素</view>
				<view class="cont">
					<text class="$u-type-error u-m-r-10 value">{{ dcDetail.insulin }}</text>
					mIU/L
					<p class="tips">5 ~ 20 mIU/L</p>
				</view>
			</view>
			<view class="button" v-if="dcDetail.insulin > 20" style="background: #ff4d4f;">偏高</view>
			<view class="button" v-if="dcDetail.insulin < 5" style="background: #ff4d4f;">偏低</view>
			<view class="button" v-if="dcDetail.insulin <= 20 && dcDetail.insulin >= 5" style="background: #73d13d;">正常</view>
		</view>
		
		<!-- C肽 -->
		<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.Cpeptide">
			<view class="u-flex titleBox">
				<view class="label row u-p-l-30 u-p-r-30">C肽</view>
				<view class="cont">
					<text class="$u-type-error u-m-r-10 value">{{ dcDetail.Cpeptide }}</text>
					ng/ml
					<p class="tips">0.65~2.7 ng/ml</p>
				</view>
			</view>
			<view class="button" v-if="dcDetail.Cpeptide > 2.7" style="background: #ff4d4f;">偏高</view>
			<view class="button" v-if="dcDetail.Cpeptide < 0.65" style="background: #ff4d4f;">偏低</view>
			<view class="button" v-if="dcDetail.Cpeptide <= 2.7 && dcDetail.Cpeptide >= 0.65" style="background: #73d13d;">正常</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
		  return {
		  }
		},
		
		props: {
			dcDetail: {
				type: Object, 
				default() {
					return '';
				}
			},
		},
		
		created() {
		},
		
		methods:{
		}
		
	};
</script>

<style lang="less" scoped>
	
	.dcBox {
		.title {
			margin: 20upx;
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
			}
	
			.row {
				text-align: center;
			}
	
			.row1 {
				height: 40upx;
				line-height: 40upx;
			}
	
			.label {
				width: 40%;
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
	
				.tips {
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
