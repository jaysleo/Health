<template>
	<view>
		<block v-if="show">
			<view class="comment" v-for="(item, index) in commentList" :key="index">
				<view class="left"><image :src="item.avatar ? item.avatar : '/static/images/userIcon.png'" mode="aspectFill"></image></view>
				<view class="right">
					<view class="top">
						<view class="name">{{ item.sendername }}</view>
					</view>
					<view class="content">
						<p>#{{ item.title }}</p>
						{{ item.content }}
						<view style="padding: 10upx 0;" v-if="item.imgs">
							<u-row gutter="16">
								<u-col span="4" v-for="(itemImg, indexImg) in item.imgs" :key="indexImg">
									<view style="padding-top: 10upx;">
										<u-image :border-radius="20" width="180" height="180" :src="itemImg" mode="aspectFill" @click="previewImage(itemImg, item.imgs)"></u-image>
									</view>
								</u-col>
							</u-row>
						</view>
					</view>
					<view class="reply-box">
						<view class="item" v-for="(replysItem, replysIndex) in item.replys" :key="replysIndex" :style="replysIndex == item.replys.length - 1 ? 'border-bottom:none' : ''">
							<view class="left"><image :src="item.avatar ? item.avatar : '/static/images/userIcon.png'" mode="aspectFill"></image></view>
							<view class="right">
								<view class="username">{{ replysItem.name }}</view>
								<view class="text">{{ replysItem.content }}</view>
								<view class="sendTime">{{ replysItem.time }}</view>
							</view>
						</view>
					</view>
					<view class="bottom">
						<text>{{ item.sendtime }}</text>
						<u-button type="primary" size="mini" @click="reply(item.id)">回复</u-button>
					</view>
				</view>
			</view>
		</block>
		<view style="padding-top: 400upx;" v-if="commentList.length == 0 || !commentList"><u-empty text="暂无内容" mode="list"></u-empty></view>

		<view style="height: 150upx;"></view>

		<view class="addBox">
			<u-button type="primary" @click="addModal = true">
				<u-icon name="chat" class="u-m-r-20"></u-icon>
				留言
			</u-button>
		</view>
		<u-modal v-model="addModal" class="addModal" title="添加留言" :show-confirm-button="false" mask-close-able>
			<view class="u-p-40">
				<u-form :model="addForm" ref="addForm" label-position="top">
					<u-form-item label="标题" required><u-input v-model="addForm.title" placeholder="请填写标题" /></u-form-item>
					<u-form-item label="内容" :border-bottom="false" required>
						<u-input type="textarea" auto-height :height="200" placeholder-style="color: #303133" :maxlength="300" placeholder="请填写内容" v-model="addForm.msgContent" />
					</u-form-item>
					<u-form-item :label="'上传图片'" :border-bottom="false">
						<u-upload max-count="9" :width="150" :height="150" name="img" @on-success="imgUpload" action="https://api.ifufan.com:8800/upload"></u-upload>
					</u-form-item>
				</u-form>
				<u-button type="primary" @click="add">提交</u-button>
			</view>
		</u-modal>

		<u-modal v-model="replyModal" class="addModal" title="回复留言" :show-confirm-button="false" mask-close-able>
			<view class="u-p-40">
				<u-form :model="addForm" ref="addForm" label-position="top">
					<u-form-item label="内容" :border-bottom="false" required>
						<u-input type="textarea" auto-height :height="200" placeholder-style="color: #303133" :maxlength="300" placeholder="请填写内容" v-model="replyContent" />
					</u-form-item>
				</u-form>
				<u-button type="primary" @click="replySend">提交</u-button>
			</view>
		</u-modal>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			commentList: [],
			show: false,
			addModal: false,
			addForm: {},
			replyModal: false,
			replyContent: '',
			pagenumber: 1,
			pagesize: 5,
			imgs: []
		};
	},
	onLoad() {
		this.getExpList();
	},
	onShow() {},
	watch: {
		commentList() {
			this.show = false;
			setTimeout(() => {
				this.show = true;
			}, 10);
		}
	},
	onReachBottom() {
		this.getExpList();
	},
	methods: {
		//获取经验记录
		getExpList() {
			wx.request({
				url: app.globalData.appHttps + '/topic/gettopic',
				method: 'GET',
				header: {
					Accept: '*/*',
					'Content-Type': 'application/json;charset=UTF-8',
					'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg3OTY1NzMsInVzZXJuYW1lIjoieHMxODB4eHh4ODQ4NCJ9.vURqw-2UrWXA_mjL69Ts5vZfEmKl1M8ZSIqKf25A-iY'
				},
				data: {
					sjkids: '0e12',
					pagesize: this.pagesize,
					pagenumber: this.pagenumber,
					hasReply: 1
				},
				success: res => {
					if (res.data.code == 200) {
						if (res.data.data.length > 0) {
							for (let i in res.data.data) {
								res.data.data[i].imgs = JSON.parse(res.data.data[i].imgs);
								res.data.data[i].sendtime = this.dateStr(res.data.data[i].sendtime);
								for(let j in res.data.data[i].replys){
									res.data.data[i].replys[j].time = this.dateStr(res.data.data[i].replys[j].time);
								}
							}
							setTimeout(() => {
								this.commentList = [...this.commentList, ...res.data.data];
								this.pagenumber++;
							}, 500);
						}
					}
				}
			});
		},

		reply(id) {
			this.replyId = id;
			this.replyModal = true;
		},

		replySend() {
			if (!this.replyContent) {
				uni.showToast({
					title: '请填写内容',
					icon: 'none'
				});
				return false;
			}
			wx.request({
				url: app.globalData.appHttps + '/topic/addReply',
				method: 'POST',
				header: {
					Accept: '*/*',
					'Content-Type': 'application/json;charset=UTF-8',
					'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg3OTY1NzMsInVzZXJuYW1lIjoieHMxODB4eHh4ODQ4NCJ9.vURqw-2UrWXA_mjL69Ts5vZfEmKl1M8ZSIqKf25A-iY'
				},
				data: {
					topicid: this.replyId,
					content: this.replyContent,
					name: uni.getStorageSync('userInfo').nickName,
					avatar: uni.getStorageSync('userInfo').avatarUrl
				},
				success: res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '提交成功'
						});
						this.replyModal = false;
						this.pagenumber = 1;
						this.commentList = [];
						this.getExpList();
					}
				}
			});
		},

		//留言
		add() {
			if (!this.addForm.title) {
				uni.showToast({
					title: '请填写标题',
					icon: 'none'
				});
				return false;
			}
			if (!this.addForm.msgContent) {
				uni.showToast({
					title: '请填写内容',
					icon: 'none'
				});
				return false;
			}
			wx.request({
				url: app.globalData.appHttps + '/topic/addTopic',
				method: 'POST',
				header: {
					Accept: '*/*',
					'Content-Type': 'application/json;charset=UTF-8',
					'X-Access-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTg3OTY1NzMsInVzZXJuYW1lIjoieHMxODB4eHh4ODQ4NCJ9.vURqw-2UrWXA_mjL69Ts5vZfEmKl1M8ZSIqKf25A-iY'
				},
				data: {
					sjkids: '0e12',
					// dsid: this.illnessInfo.id,
					title: this.addForm.title,
					content: this.addForm.msgContent,
					imgs: JSON.stringify(this.imgs),
					sendername: uni.getStorageSync('userInfo').nickName,
					avatar: uni.getStorageSync('userInfo').avatarUrl
				},
				success: res => {
					if (res.data.code == 200) {
						uni.showToast({
							title: '提交成功'
						});
						this.addModal = false;
						this.pagenumber = 1;
						this.commentList = [];
						this.getExpList();
					}
				}
			});
		},
		// 上传图片
		imgUpload(data) {
			console.log(data);
			if (data.code == 200) {
				this.imgs.push('https://api.ifufan.com:8800/img/' + data.data.filename);
				console.log(this.imgs);
			}
		},

		previewImage(url, urls) {
			wx.previewImage({
				current: url, // 当前显示图片的http链接
				urls: urls // 需要预览的图片http链接列表
			});
		},

		dateStr(date) {
			//获取js 时间戳
			// var dateTimeStamp = new Date(date).getTime();
			var time = new Date().getTime();
			//去掉 js 时间戳后三位，与php 时间戳保持一致
			time = parseInt((time - date) / 1000);
			//存储转换值
			var s;
			if (time < 60 * 10) {
				//十分钟内
				return '刚刚';
			} else if (time < 60 * 60 && time >= 60 * 10) {
				//超过十分钟少于1小时
				s = Math.floor(time / 60);
				return s + '分钟前';
			} else if (time < 60 * 60 * 24 && time >= 60 * 60) {
				//超过1小时少于24小时
				s = Math.floor(time / 60 / 60);
				return s + '小时前';
			} else if (time < 60 * 60 * 24 * 3 && time >= 60 * 60 * 24) {
				//超过1天少于3天内
				s = Math.floor(time / 60 / 60 / 24);
				return s + '天前';
			} else {
				//超过3天
				return date;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.comment {
	display: flex;
	padding: 30rpx;
	.left {
		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 50%;
			background-color: #f2f2f2;
		}
	}
	.right {
		flex: 1;
		padding-left: 20rpx;
		font-size: 30rpx;
		.top {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 10rpx;
			.like {
				display: flex;
				align-items: center;
				color: #9a9a9a;
				font-size: 26rpx;
				.num {
					margin-right: 4rpx;
					color: #9a9a9a;
				}
			}
			.highlight {
				color: #5677fc;
				.num {
					color: #5677fc;
				}
			}
		}
		.content {
			margin-bottom: 10rpx;

			p {
				font-size: 30upx;
				font-weight: 700;
				margin-bottom: 10upx;
				color: #597ef7;
			}
		}
		.reply-box {
			background-color: rgb(242, 242, 242);
			border-radius: 12rpx;
			.item {
				padding: 20rpx;
				border-bottom: solid 1rpx $u-border-color;
				display: flex;

				.left {
					image {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						background-color: #f2f2f2;
					}
				}

				.username {
					font-size: 24rpx;
					color: #000;
				}

				.sendTime {
					font-size: 24rpx;
					color: #999999;
				}
			}
			.all-reply {
				padding: 20rpx;
				display: flex;
				color: #5677fc;
				align-items: center;
				.more {
					margin-left: 6rpx;
				}
			}
		}
		.bottom {
			margin-top: 20upx;
			display: flex;
			justify-content: space-between;
			font-size: 26upx;
			align-items: center;
			color: #9a9a9a;
			.reply {
				color: #5677fc;
				margin-left: 10rpx;
			}
		}
	}
}

.addBox {
	position: fixed;
	left: 0;
	bottom: 0;
	margin: 40upx;
	width: 670upx;
	z-index: 100;
}
.placeholder {
	color: #303133 !important;
	font-size: 24upx !important;
}
.imgsBox {
	width: 100%;
	display: flex;

	.item {
		margin: 10upx;
	}
}
</style>
