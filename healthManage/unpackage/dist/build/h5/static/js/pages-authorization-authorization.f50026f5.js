(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-authorization-authorization"],{"0482":function(t,e,n){"use strict";var o=n("a419"),a=n.n(o);a.a},"1e58":function(t,e,n){var o=n("24fb");e=o(!1),e.push([t.i,".logoBox[data-v-6954aa84]{margin:%?40?%;padding:0 %?50?%;text-align:center;border-bottom:%?2?% solid #f0f0f0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.contentBox[data-v-6954aa84]{margin:%?40?%;font-size:%?32?%}.contentBox .content[data-v-6954aa84]{margin-top:%?10?%}.contentBox .tips[data-v-6954aa84]{font-size:%?26?%;color:#bfbfbf;margin:%?50?% 0 %?80?%}",""]),t.exports=e},"2d93":function(t,e,n){"use strict";n.r(e);var o=n("36fc"),a=n("7509");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("4737");var r,s=n("f0c5"),u=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"6954aa84",null,!1,o["a"],r);e["default"]=u.exports},3076:function(t,e,n){"use strict";n("a9e3"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o={name:"u-image",props:{src:{type:String,default:""},mode:{type:String,default:"aspectFill"},width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:"auto"},shape:{type:String,default:"square"},borderRadius:{type:[String,Number],default:0},lazyLoad:{type:Boolean,default:!0},showMenuByLongpress:{type:Boolean,default:!0},loadingIcon:{type:String,default:"photo"},errorIcon:{type:String,default:"error-circle"},showLoading:{type:Boolean,default:!0},showError:{type:Boolean,default:!0},fade:{type:Boolean,default:!0},webp:{type:Boolean,default:!1},duration:{type:[String,Number],default:500},bgColor:{type:String,default:"#f3f4f6"}},data:function(){return{isError:!1,loading:!0,opacity:1,durationTime:this.duration,backgroundStyle:{}}},watch:{src:{immediate:!0,handler:function(t){t?this.isError=!1:(this.isError=!0,this.loading=!1)}}},computed:{wrapStyle:function(){var t={};return t.width=this.$u.addUnit(this.width),t.height=this.$u.addUnit(this.height),t.borderRadius="circle"==this.shape?"50%":this.$u.addUnit(this.borderRadius),t.overflow=this.borderRadius>0?"hidden":"visible",this.fade&&(t.opacity=this.opacity,t.transition="opacity ".concat(Number(this.durationTime)/1e3,"s ease-in-out")),t}},methods:{onClick:function(){this.$emit("click")},onErrorHandler:function(t){this.loading=!1,this.isError=!0,this.$emit("error",t)},onLoadHandler:function(){var t=this;if(this.loading=!1,this.isError=!1,this.$emit("load"),!this.fade)return this.removeBgColor();this.opacity=0,this.durationTime=0,setTimeout((function(){t.durationTime=t.duration,t.opacity=1,setTimeout((function(){t.removeBgColor()}),t.durationTime)}),50)},removeBgColor:function(){this.backgroundStyle={backgroundColor:"transparent"}}}};e.default=o},"36fc":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uImage:n("862e").default,uButton:n("e587").default,uModal:n("f564").default,uForm:n("d921").default,uFormItem:n("13db").default,uInput:n("9086").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("v-uni-view",{staticClass:"logoBox"},[n("u-image",{attrs:{fade:!1,"lazy-load":!1,src:"/static/images/loginCover.png",width:"500rpx",mode:"widthFix"}})],1),n("v-uni-view",{staticClass:"contentBox"},[n("v-uni-view",[t._v("尊敬的用户，您好：")]),n("v-uni-view",{staticClass:"content"},[t._v("为了给你带来更优质的服务，请确认授权以下信息")]),n("v-uni-view",{staticClass:"tips"},[t._v("获得你的公开信息（昵称、头像等）")]),t.canIUseGetUserProfile?n("u-button",{attrs:{type:"primary",block:!0,round:!0},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.getUserProfile.apply(void 0,arguments)}}},[t._v("授权微信")]):n("u-button",{attrs:{"open-type":"getUserInfo",type:"primary",block:!0,round:!0},on:{getuserinfo:function(e){arguments[0]=e=t.$handleEvent(e),t.getUserInfo.apply(void 0,arguments)}}},[t._v("授权微信")]),n("u-modal",{attrs:{"show-cancel-button":!1,"show-confirm-button":!1,"show-title":!1},model:{value:t.phoneModal,callback:function(e){t.phoneModal=e},expression:"phoneModal"}},[n("v-uni-view",{staticClass:"phoneModal u-p-50 u-text-center"},[n("v-uni-view",{staticClass:"u-m-b-50 u-font-lg"},[t._v("请填写患者姓名和授权手机号完成绑定")]),n("u-form",{attrs:{"label-width":"200"}},[n("u-form-item",{attrs:{label:"患者姓名"}},[n("u-input",{attrs:{placeholder:"请填写患者姓名"},model:{value:t.localUserInfo.name,callback:function(e){t.$set(t.localUserInfo,"name",e)},expression:"localUserInfo.name"}})],1),n("u-form-item",{attrs:{label:"联系手机号","border-bottom":!1}},[n("u-button",{attrs:{"open-type":"getPhoneNumber",type:"primary",block:!0,size:"medium",disabled:!t.localUserInfo.name},on:{getphonenumber:function(e){arguments[0]=e=t.$handleEvent(e),t.getPhone.apply(void 0,arguments)}}},[t._v("授权手机号")])],1)],1)],1)],1)],1)],1)},i=[]},4737:function(t,e,n){"use strict";var o=n("dc11"),a=n.n(o);a.a},"69ed":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=getApp(),a={data:function(){return{canIUseGetUserProfile:!1,wechatInfo:"",phoneModal:!1,localUserInfo:""}},onLoad:function(){uni.getUserProfile&&(this.canIUseGetUserProfile=!0)},onShow:function(){uni.setStorageSync("wechatInfo")&&(this.phoneModal=!0)},methods:{getUserProfile:function(){var t=this;uni.getUserProfile({desc:"用于完善会员资料",success:function(e){console.log(e),t.wechatInfo=e.userInfo,t.login()}})},getUserInfo:function(t){"getUserInfo:ok"==t.detail.errMsg&&(this.wechatInfo=t.detail.userInfo,this.login())},login:function(){var t=this;uni.login({success:function(e){console.log(e),wx.request({url:o.globalData.https+"/Auth/miniProgramAuth",method:"POST",data:{code:e.code,nickName:t.wechatInfo.nickName,avatarUrl:t.wechatInfo.avatarUrl,country:t.wechatInfo.country,province:t.wechatInfo.province,city:t.wechatInfo.city,gender:t.wechatInfo.gender},success:function(e){if(1==e.data.code){t.localUserInfo=e.data.data,uni.setStorageSync("userInfo",t.localUserInfo),uni.setStorageSync("uid",t.localUserInfo.id);var n=[0,0,0,0,0];uni.setStorageSync("task",n),uni.showToast({title:"授权成功",icon:"success",success:function(t){wx.navigateBack({delta:1})}})}else wx.showToast({title:e.data.msg,icon:"none"})}})}})},getPhone:function(t){var e=this;wx.request({url:o.globalData.https+"/Auth/getPhone",method:"POST",data:{sessionKey:this.localUserInfo.session_key,encryptedData:t.detail.encryptedData,iv:t.detail.iv},success:function(t){1==t.data.code?wx.request({url:o.globalData.https+"/wechat/queryOpenid",method:"POST",data:{unionid:e.localUserInfo.unionid},success:function(n){wx.request({url:o.globalData.doctorHttps+"/addPatient",method:"POST",data:{templateid:"0e12",name:e.localUserInfo.name,phone:t.data.data.purePhoneNumber,openid:n.data.data,miniOpenid:e.localUserInfo.openid,unionid:e.localUserInfo.unionid,gender:e.localUserInfo.gender,nickName:e.localUserInfo.nickName,avatarUrl:e.localUserInfo.avatarUrl,country:e.localUserInfo.country,province:e.localUserInfo.province,city:e.localUserInfo.city,source:"miniProgram"},success:function(e){console.log(e.data.success),e.data.success&&(uni.setStorageSync("userInfo",e.data.result),uni.setStorageSync("name",e.data.result.name),uni.setStorageSync("phone",t.data.data.purePhoneNumber),uni.setStorageSync("uid",e.data.result._id),uni.showToast({title:"授权成功",icon:"success",success:function(t){wx.navigateBack({delta:1})}}))}})}}):wx.showToast({title:t.data.msg,icon:"none"})}})}}};e.default=a},7509:function(t,e,n){"use strict";n.r(e);var o=n("69ed"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},"862e":function(t,e,n){"use strict";n.r(e);var o=n("b02a"),a=n("9922");for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("0482");var r,s=n("f0c5"),u=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"3fdd3616",null,!1,o["a"],r);e["default"]=u.exports},"86bd":function(t,e,n){var o=n("24fb");e=o(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-image[data-v-3fdd3616]{position:relative;-webkit-transition:opacity .5s ease-in-out;transition:opacity .5s ease-in-out}.u-image__image[data-v-3fdd3616]{width:100%;height:100%}.u-image__loading[data-v-3fdd3616], .u-image__error[data-v-3fdd3616]{position:absolute;top:0;left:0;width:100%;height:100%;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;background-color:#f3f4f6;color:#909399;font-size:%?46?%}',""]),t.exports=e},9922:function(t,e,n){"use strict";n.r(e);var o=n("3076"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},a419:function(t,e,n){var o=n("86bd");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=n("4f06").default;a("a918a63c",o,!0,{sourceMap:!1,shadowMode:!1})},b02a:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uIcon:n("f2a6").default},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"u-image",style:[t.wrapStyle,t.backgroundStyle],on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onClick.apply(void 0,arguments)}}},[t.isError?t._e():n("v-uni-image",{staticClass:"u-image__image",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius)},attrs:{src:t.src,mode:t.mode,"lazy-load":t.lazyLoad,"show-menu-by-longpress":t.showMenuByLongpress},on:{error:function(e){arguments[0]=e=t.$handleEvent(e),t.onErrorHandler.apply(void 0,arguments)},load:function(e){arguments[0]=e=t.$handleEvent(e),t.onLoadHandler.apply(void 0,arguments)}}}),t.showLoading&&t.loading?n("v-uni-view",{staticClass:"u-image__loading",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius),backgroundColor:this.bgColor}},[t.$slots.loading?t._t("loading"):n("u-icon",{attrs:{name:t.loadingIcon,width:t.width,height:t.height}})],2):t._e(),t.showError&&t.isError&&!t.loading?n("v-uni-view",{staticClass:"u-image__error",style:{borderRadius:"circle"==t.shape?"50%":t.$u.addUnit(t.borderRadius)}},[t.$slots.error?t._t("error"):n("u-icon",{attrs:{name:t.errorIcon,width:t.width,height:t.height}})],2):t._e()],1)},i=[]},dc11:function(t,e,n){var o=n("1e58");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var a=n("4f06").default;a("0521eb98",o,!0,{sourceMap:!1,shadowMode:!1})}}]);