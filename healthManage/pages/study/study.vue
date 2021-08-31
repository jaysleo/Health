<template>
	<view>
		<view class="listBox">
			<view class="itemBox" v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
				<image :src="item.img" mode="aspectFill"></image>
				<view class="main">
					<view class="title">{{item.title}}</view>
					<view class="footer">
						<view>{{item.createTime | timeFrom}}</view>
						<view>
							<u-icon name="eye" class="u-m-r-10"></u-icon>
							{{item.view}}
							<u-icon name="thumb-up" class="u-m-r-10 u-m-l-20"></u-icon>
							{{item.nice}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp();
export default {
	data() {
		return {
			list:[]
		};
	},
	
	onLoad() {
		this.getList()
	},
	
	methods: {
		getList() {
			wx.request({
				url: app.globalData.https + '/miniapi/articleList',
				method: 'POST',
				data: {
					sjkids: uni.getStorageSync('sjkids') ? uni.getStorageSync('sjkids') : '0e12'
				},
				success: res => {
					if (res.data.code == 1) {
						this.list = res.data.data
					}
				}
			});
		},
		
		toDetail(id){
			uni.navigateTo({
				url:'/pages/study/studyDetail?id=' + id
			})
		}
	}
};
</script>

<style scoped lang="scss">
page {
	background: #f8f8f8 !important;
}
.listBox {
	.itemBox {
		background: #fff;
		margin: 20upx;
		border-radius: 40upx;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		overflow: hidden;
		
		image{
			width: 100%;
			height: 400upx;
		}
		
		.main{
			padding: 30upx;
			
			.title{
				font-weight: 700;
				font-size: 40upx;
			}
			
			.footer{
				display: flex;
				justify-content: space-between;
				margin: 20upx 0 0upx;
				color: #bfbfbf;
			}
		}
	}
}
</style>
