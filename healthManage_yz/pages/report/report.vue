<template>
	<view class="content">
		<view class="label">您的病情报告</view>
		<!-- <view class="tips">疾病严重程度为：<text style="" class="danger">评估中</text></view> -->
		<view class="tips">
			患者姓名：
			<text style="" class="blue">{{ userInfo.isYz == 2 ? userInfo.suffererName : userInfo.name }}</text>
		</view>
		<view class="tips">
			身份证号：
			<text style="" class="blue">{{ userInfo.isYz == 2 ? userInfo.suffererIdcard : userInfo.idcard }}</text>
		</view>
		<view class="tips">
			手机号：
			<text style="" class="blue">{{ userInfo.phone }}</text>
		</view>
		<!-- <view class="tips" v-if="userInfo.isYz">
			是否是银屑病患者：
			<text style="" class="danger" v-if="userInfo.isYz == '1'">是</text>
			<text style="" class="blue" v-if="userInfo.isYz == '0'">否</text>
			<text style="" class="blue" v-if="userInfo.isYz == '2'">否</text>
		</view> -->
		<view class="tips" v-if="userInfo.isYz == '1'">
			银屑病病程：
			<text style="" class="danger">{{ courseDisease }}</text>
		</view>
		<!-- <view class="tips">与您相似的银屑病人有324个，加入中心可以查看</view> -->
		<view class="label u-m-t-70">给您的建议：4个</view>
		<view class="tips u-flex u-row-between">
			遵照医生的医嘱，按时用药
			<u-icon name="thumb-up-fill" color="#73d13d" size="46" v-if="nice1 == 1"></u-icon>
			<u-button type="success" size="mini" @click="remember1" v-if="nice1 == 0">我记住了</u-button>
		</view>
		<view class="tips u-flex u-row-between">
			及时回医院，每月按时门诊随访
			<u-icon name="thumb-up-fill" color="#73d13d" size="46" v-if="nice2 == 1"></u-icon>
			<u-button type="success" size="mini" @click="remember2" v-if="nice2 == 0">我记住了</u-button>
		</view>
		<view class="tips u-flex u-row-between">
			有问题及时咨询医生
			<u-icon name="thumb-up-fill" color="#73d13d" size="46" v-if="nice3 == 1"></u-icon>
			<u-button type="success" size="mini" @click="remember3" v-if="nice3 == 0">我记住了</u-button>
		</view>
		<view class="tips u-flex u-row-between">
			<view>
				完善共病记录、PSA等
				<li>赠送小程序3次咨询医生的机会</li>
			</view>
			<u-icon name="thumb-up-fill" color="#73d13d" size="46" v-if="nice4 == 1"></u-icon>
			<u-button type="success" size="mini" @click="remember4" v-if="nice4 == 0">我记住了</u-button>
		</view>
		
		<!-- 监测数据栏 -->
		<view class="dcBox">
			<div class="title u-flex u-row-between">
				<view>
					监测数据
					<text class="u-light-color u-font-xs u-m-l-20">{{ dcDetail.create_time }}</text>
				</view>
			</div>
			<!-- PASI -->
			<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.pasi">
				<view class="u-flex titleBox">
					<view class="itemLabel row u-p-l-30 u-p-r-30" style="width: 300upx;">PASI评分</view>
					<view class="cont">
						<text class="$u-type-error u-m-r-10 value">{{ dcDetail.pasi }}</text>
						分
					</view>
				</view>
				<view class="button" style="background: #597ef7;">评估中</view>
			</view>
		
			<!-- BSA -->
			<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.bsa">
				<view class="u-flex titleBox">
					<view class="itemLabel row u-p-l-30 u-p-r-30" style="width: 300upx;">BSA评分</view>
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
					<view class="itemLabel row u-p-l-30 u-p-r-30">血压(收缩压)</view>
					<view class="cont">
						<text class="$u-type-error u-m-r-10 value">{{ dcDetail.mmHgHigh ? dcDetail.mmHgHigh : '110' }}</text>
						mmHg
						<p class="itemTips">90 ~ 140 mmHg</p>
					</view>
				</view>
				<view class="button" v-if="dcDetail.mmHgHigh > 140" style="background: #ff4d4f;">偏高</view>
				<view class="button" v-if="dcDetail.mmHgHigh < 90" style="background: #ff4d4f;">偏低</view>
				<view class="button" v-if="dcDetail.mmHgHigh <= 140 && dcDetail.mmHgHigh >= 90" style="background: #73d13d;">正常</view>
			</view>
		
			<!-- 血压(舒张压) -->
			<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.mmHgLow">
				<view class="u-flex titleBox">
					<view class="itemLabel row u-p-l-30 u-p-r-30">血压(舒张压)</view>
					<view class="cont">
						<text class="$u-type-error u-m-r-10 value">{{ dcDetail.mmHgLow ? dcDetail.mmHgLow : '80' }}</text>
						mmHg
						<p class="itemTips">60 ~ 90 mmHg</p>
					</view>
				</view>
				<view class="button" v-if="dcDetail.mmHgLow > 90" style="background: #ff4d4f;">偏高</view>
				<view class="button" v-if="dcDetail.mmHgLow < 60" style="background: #ff4d4f;">偏低</view>
				<view class="button" v-if="dcDetail.mmHgLow <= 90 && dcDetail.mmHgLow >= 60" style="background: #73d13d;">正常</view>
			</view>
		
			<!-- 血糖 -->
			<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.mmol">
				<view class="u-flex titleBox">
					<view class="itemLabel row u-p-l-30 u-p-r-30">血糖</view>
					<view class="cont">
						<text class="$u-type-error u-m-r-10 value">{{ dcDetail.mmol }}</text>
						mmol/L
						<p class="itemTips">3.9 ~ 6.1 mmol/L</p>
					</view>
				</view>
				<view class="button" v-if="dcDetail.mmol > 6.1" style="background: #ff4d4f;">偏高</view>
				<view class="button" v-if="dcDetail.mmol < 3.9" style="background: #ff4d4f;">偏低</view>
				<view class="button" v-if="dcDetail.mmol <= 6.1 && dcDetail.mmol >= 3.9" style="background: #73d13d;">正常</view>
			</view>
		
			<!-- 糖化血红蛋白 -->
			<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.HbAlc">
				<view class="u-flex titleBox">
					<view class="itemLabel row u-p-l-30 u-p-r-30">糖化血红蛋白</view>
					<view class="cont">
						<text class="$u-type-error u-m-r-10 value">{{ dcDetail.HbAlc }}</text>
						%
						<p class="itemTips">4 ~ 6 %</p>
					</view>
				</view>
				<view class="button" v-if="dcDetail.HbAlc > 6" style="background: #ff4d4f;">偏高</view>
				<view class="button" v-if="dcDetail.HbAlc < 4" style="background: #ff4d4f;">偏低</view>
				<view class="button" v-if="dcDetail.HbAlc <= 6 && dcDetail.HbAlc >= 4" style="background: #73d13d;">正常</view>
			</view>
		
			<!-- 胰岛素 -->
			<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.insulin">
				<view class="u-flex titleBox">
					<view class="itemLabel row u-p-l-30 u-p-r-30">胰岛素</view>
					<view class="cont">
						<text class="$u-type-error u-m-r-10 value">{{ dcDetail.insulin }}</text>
						mIU/L
						<p class="itemTips">5 ~ 20 mIU/L</p>
					</view>
				</view>
				<view class="button" v-if="dcDetail.insulin > 20" style="background: #ff4d4f;">偏高</view>
				<view class="button" v-if="dcDetail.insulin < 5" style="background: #ff4d4f;">偏低</view>
				<view class="button" v-if="dcDetail.insulin <= 20 && dcDetail.insulin >= 5" style="background: #73d13d;">正常</view>
			</view>
		
			<!-- C肽 -->
			<view class="item u-flex u-row-between u-m-b-20" v-if="dcDetail.Cpeptide">
				<view class="u-flex titleBox">
					<view class="itemLabel row u-p-l-30 u-p-r-30">C肽</view>
					<view class="cont">
						<text class="$u-type-error u-m-r-10 value">{{ dcDetail.Cpeptide }}</text>
						ng/ml
						<p class="itemTips">0.65~2.7 ng/ml</p>
					</view>
				</view>
				<view class="button" v-if="dcDetail.Cpeptide > 2.7" style="background: #ff4d4f;">偏高</view>
				<view class="button" v-if="dcDetail.Cpeptide < 0.65" style="background: #ff4d4f;">偏低</view>
				<view class="button" v-if="dcDetail.Cpeptide <= 2.7 && dcDetail.Cpeptide >= 0.65" style="background: #73d13d;">正常</view>
			</view>
		</view>
		
		
		<view class="u-m-t-80"><u-button type="primary" block v-if="!status" @click="wechatNoModal = true">阅读完毕，进入银屑病管理中心</u-button></view>
		<view class="u-m-t-80"><u-button type="primary" block v-if="status" @click="toHome">阅读完毕，进入银屑病管理中心</u-button></view>
		
		
		<u-modal v-model="wechatNoModal" :show-cancel-button="false" :show-confirm-button="false" :show-title="false" :width="700">
			<view class="u-p-20 u-text-center">
				<view class="u-m-b-50 u-m-t-50 u-font-lg">为了您能第一时间收到通知<p>请关注我们的公众号</p></view>
				<official-account style="width: 80%;"></official-account>
				<view style="width: 100%;" class="u-flex u-row-center">
					点击上方关注按钮，快速关注
				</view>
				<view>
					或在微信'添加好友' - '公众号' - 搜索'循数助手' 进行关注
				</view>
				<view class="u-m-t-50" >
					<u-button type="primary" @click="toHome">已关注,进入银屑病管理中心</u-button>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			id:'',
			wechatNoModal:false,
			status:false,
			nice1: 0,
			nice2: 0,
			nice3: 0,
			nice4: 0,
			dcDetail:'',
			userInfo: '',
			courseDisease:''
		};
	},
	onLoad(options) {
		// this.getOfficialStatus()
		this.id = options.id
		this.getDetail();
		this.queryUserInfo();
	},
	onShow() {
		this.getOfficialStatus()
	},
	methods: {
		remember1() {
			this.nice1 = 1;
			uni.showToast({
				title: '赞'
			});
		},
		remember2() {
			this.nice2 = 1;
			uni.showToast({
				title: '赞'
			});
		},
		remember3() {
			this.nice3 = 1;
			uni.showToast({
				title: '赞'
			});
		},
		remember4() {
			this.nice4 = 1;
			uni.showToast({
				title: '赞'
			});
		},
		getOfficialStatus(){
			wx.request({
				url: app.globalData.https + '/wechat/getOfficialStatus',
				method: 'POST',
				data: {
					openid: uni.getStorageSync('userInfo').openid
				},
				success: res => {
					if (res.data.code == 1) {
						let data = res.data.data
						if(data.subscribe == 1){
							this.status = true
							this.wechatNoModal = false
						} else {
							this.status = false
						}
					} else {
						console.log(res.data.message);
					}
				}
			});
		},
		queryUserInfo() {
			wx.request({
				url: app.globalData.doctorHttps + '/getPatient',
				method: 'GET',
				data: {
					templateid: '0e12',
					phone: uni.getStorageSync('phone')
				},
				success: getPatientRes => {
					if (getPatientRes.data.success) {
						this.userInfo = getPatientRes.data.result;
						if(getPatientRes.data.result.firstSickenTime){
							var myDate = new Date();
							console.log(myDate.toLocaleDateString())
							console.log(this.diffDate(getPatientRes.data.result.firstSickenTime,myDate.toLocaleDateString()))
							this.courseDisease = this.diffDate(getPatientRes.data.result.firstSickenTime,myDate.toLocaleDateString())
						}
					}
				}
			});
		},
		
		//获取详情
		getDetail() {
			wx.request({
				url: app.globalData.doctorHttps + '/getFormDetail',
				method: 'GET',
				data: {
					templateid: '0e12',
					mid: 'scan_user_basic',
					id: this.id
				},
				success: res => {
					if (res.data.success) {
						this.dcDetail = res.data.result.models;
					} else {
						console.log(res.data.message);
					}
				}
			});
		},
		toHome() {
			uni.reLaunch({
				url:'../index/index'
			})
		},
		
		diffDate(date1, date2) {
			let begin = new Date(date1);
			let end = new Date(date2);
		
			// 如果开始时间晚于结束时间，交换日期，并记录交换状态
			let swap = false;
			if (begin > end) {
				let tmp = begin;
				begin = end;
				end = tmp;
				swap = true;
			}
		
			// 分别取二个日期的年、月、日值
			let d1 = begin.getDate();
			let m1 = begin.getMonth() + 1;
			let y1 = begin.getFullYear();
			let d2 = end.getDate();
			let m2 = end.getMonth() + 1;
			let y2 = end.getFullYear();
		
			// 获取每个月的天数，这里要注意一下闰年的2月
			var getMonthDays = function(y, m) {
				var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				if (m == 2 && (y % 400 == 0 || (y % 4 == 0 && y % 100 != 0))) {
					return 29;
				}
				return aMonthDays[m];
			};
		
			let y, m, d;
			let tempD = 0;
			let tmpM = 0;
			let tmpY = 0;
		
			// 计算日，不足时向月份借
			if (d2 >= d1) {
				d = d2 - d1;
			} else {
				tmpM = -1;
				d = getMonthDays(y1, m1) + d2 - d1;
			}
		
			// 计算月，不足时向年份借
			if (m2 + tmpM >= m1) {
				m = m2 + tmpM - m1;
			} else {
				tmpY = -1;
				m = 12 + m2 + tmpM - m1;
			}
		
			// 计算年
			y = y2 + tmpY - y1;
		
			// 拼接距离字符串 输出格式如："5天"， "5月 05天"， "5年 05月 05日"
			let str = '';
			if (y > 0) {
				if(m > 0){
					str = y + '年 ' + ('0' + m).substr(-2) + '月 ';
				} else if(m == 0){
					str = y + '年 ';
				}
			} else if (m > 0) {
				str = m + '月';
			} else if (m == 0) {
				str = '1月';
			}
		
			// 完整输出
			return str;
		}
	}
};
</script>

<style scoped lang="scss">
.content {
	padding: 40upx;
}
.label {
	font-size: 50upx;
	font-weight: 700;
	margin: 40upx 0 20upx;
}

.tips{
	margin-top: 40upx;
	color: #8c8c8c;
}
.danger{
	color: #ff4d4f;
	font-weight: 700;
	font-size: 40upx;
}

.blue{
	color: #597ef7;
	font-weight: 700;
	font-size: 40upx;
}


.buttonBox{
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
