(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-report-myReport"],{"0f0d":function(t,e,i){"use strict";i("c975"),i("a9e3"),i("d3b7"),i("ac1f"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"u-button",props:{hairLine:{type:Boolean,default:!0},type:{type:String,default:"default"},size:{type:String,default:"default"},shape:{type:String,default:"square"},plain:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},openType:{type:String,default:""},formType:{type:String,default:""},appParameter:{type:String,default:""},hoverStopPropagation:{type:Boolean,default:!1},lang:{type:String,default:"en"},sessionFrom:{type:String,default:""},sendMessageTitle:{type:String,default:""},sendMessagePath:{type:String,default:""},sendMessageImg:{type:String,default:""},showMessageCard:{type:Boolean,default:!1},hoverBgColor:{type:String,default:""},rippleBgColor:{type:String,default:""},ripple:{type:Boolean,default:!1},hoverClass:{type:String,default:""},customStyle:{type:Object,default:function(){return{}}},dataName:{type:String,default:""},throttleTime:{type:[String,Number],default:1e3},hoverStartTime:{type:[String,Number],default:20},hoverStayTime:{type:[String,Number],default:150}},computed:{getHoverClass:function(){if(this.loading||this.disabled||this.ripple||this.hoverClass)return"";var t="";return t=this.plain?"u-"+this.type+"-plain-hover":"u-"+this.type+"-hover",t},showHairLineBorder:function(){return["primary","success","error","warning"].indexOf(this.type)>=0&&!this.plain?"":"u-hairline-border"}},data:function(){return{rippleTop:0,rippleLeft:0,fields:{},waveActive:!1}},methods:{click:function(t){var e=this;this.$u.throttle((function(){!0!==e.loading&&!0!==e.disabled&&(e.ripple&&(e.waveActive=!1,e.$nextTick((function(){this.getWaveQuery(t)}))),e.$emit("click",t))}),this.throttleTime)},getWaveQuery:function(t){var e=this;this.getElQuery().then((function(i){var a=i[0];if(a.width&&a.width&&(a.targetWidth=a.height>a.width?a.height:a.width,a.targetWidth)){e.fields=a;var n="",r="";n=t.touches[0].clientX,r=t.touches[0].clientY,e.rippleTop=r-a.top-a.targetWidth/2,e.rippleLeft=n-a.left-a.targetWidth/2,e.$nextTick((function(){e.waveActive=!0}))}}))},getElQuery:function(){var t=this;return new Promise((function(e){var i="";i=uni.createSelectorQuery().in(t),i.select(".u-btn").boundingClientRect(),i.exec((function(t){e(t)}))}))},getphonenumber:function(t){this.$emit("getphonenumber",t)},getuserinfo:function(t){this.$emit("getuserinfo",t)},error:function(t){this.$emit("error",t)},opensetting:function(t){this.$emit("opensetting",t)},launchapp:function(t){this.$emit("launchapp",t)}}};e.default=a},"15ad":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.content[data-v-6d770dd0]{padding:%?40?%}.label[data-v-6d770dd0]{font-size:%?50?%;font-weight:700;margin:%?40?% 0 %?20?%}.tips[data-v-6d770dd0]{margin-top:%?40?%;color:#8c8c8c}.danger[data-v-6d770dd0]{color:#ff4d4f;font-weight:700;font-size:%?40?%}.blue[data-v-6d770dd0]{color:#597ef7;font-weight:700;font-size:%?40?%}.buttonBox[data-v-6d770dd0]{margin-top:%?50?%}.dcBox .title[data-v-6d770dd0]{margin:%?80?% 0 %?20?%;font-size:%?36?%;font-weight:700}.dcBox .item[data-v-6d770dd0]{background:#fff;box-shadow:rgba(149,157,165,.2) 0 8px 24px;border-radius:%?40?%;box-sizing:border-box}.dcBox .item .titleBox[data-v-6d770dd0]{width:%?540?%;height:%?150?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.dcBox .item .row[data-v-6d770dd0]{text-align:center}.dcBox .item .row1[data-v-6d770dd0]{height:%?40?%;line-height:%?40?%}.dcBox .item .itemLabel[data-v-6d770dd0]{width:40%!important;font-size:%?30?%;font-weight:700;color:#3bbda1}.dcBox .item .cont[data-v-6d770dd0]{width:60%;font-size:%?24?%}.dcBox .item .cont .value[data-v-6d770dd0]{font-size:%?50?%;font-weight:700}.dcBox .item .cont .itemTips[data-v-6d770dd0]{color:#bfbfbf}.dcBox .item .button[data-v-6d770dd0]{background:#3bbda1;padding:%?20?%;height:%?150?%;width:%?150?%;color:#fff;border-radius:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;white-space:nowrap}',""]),t.exports=e},"3a34":function(t,e,i){"use strict";var a=i("a114"),n=i.n(a);n.a},"40c3":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.u-btn[data-v-2d78619c]::after{border:none}.u-btn[data-v-2d78619c]{position:relative;border:0;display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;overflow:visible;line-height:1;\r\ndisplay:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;\r\n-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;cursor:pointer;padding:0 %?40?%;z-index:1;box-sizing:border-box;-webkit-transition:all .15s;transition:all .15s}.u-btn--bold-border[data-v-2d78619c]{border:1px solid #fff}.u-btn--default[data-v-2d78619c]{color:#606266;border-color:#c0c4cc;background-color:#fff}.u-btn--primary[data-v-2d78619c]{color:#fff;border-color:#2979ff;background-color:#2979ff}.u-btn--success[data-v-2d78619c]{color:#fff;border-color:#19be6b;background-color:#19be6b}.u-btn--error[data-v-2d78619c]{color:#fff;border-color:#fa3534;background-color:#fa3534}.u-btn--warning[data-v-2d78619c]{color:#fff;border-color:#f90;background-color:#f90}.u-btn--default--disabled[data-v-2d78619c]{color:#fff;border-color:#e4e7ed;background-color:#fff}.u-btn--primary--disabled[data-v-2d78619c]{color:#fff!important;border-color:#a0cfff!important;background-color:#a0cfff!important}.u-btn--success--disabled[data-v-2d78619c]{color:#fff!important;border-color:#71d5a1!important;background-color:#71d5a1!important}.u-btn--error--disabled[data-v-2d78619c]{color:#fff!important;border-color:#fab6b6!important;background-color:#fab6b6!important}.u-btn--warning--disabled[data-v-2d78619c]{color:#fff!important;border-color:#fcbd71!important;background-color:#fcbd71!important}.u-btn--primary--plain[data-v-2d78619c]{color:#2979ff!important;border-color:#a0cfff!important;background-color:#ecf5ff!important}.u-btn--success--plain[data-v-2d78619c]{color:#19be6b!important;border-color:#71d5a1!important;background-color:#dbf1e1!important}.u-btn--error--plain[data-v-2d78619c]{color:#fa3534!important;border-color:#fab6b6!important;background-color:#fef0f0!important}.u-btn--warning--plain[data-v-2d78619c]{color:#f90!important;border-color:#fcbd71!important;background-color:#fdf6ec!important}.u-hairline-border[data-v-2d78619c]:after{content:" ";position:absolute;pointer-events:none;box-sizing:border-box;-webkit-transform-origin:0 0;transform-origin:0 0;left:0;top:0;width:199.8%;height:199.7%;-webkit-transform:scale(.5);transform:scale(.5);border:1px solid currentColor;z-index:1}.u-wave-ripple[data-v-2d78619c]{z-index:0;position:absolute;border-radius:100%;background-clip:padding-box;pointer-events:none;-webkit-user-select:none;user-select:none;-webkit-transform:scale(0);transform:scale(0);opacity:1;-webkit-transform-origin:center;transform-origin:center}.u-wave-ripple.u-wave-active[data-v-2d78619c]{opacity:0;-webkit-transform:scale(2);transform:scale(2);-webkit-transition:opacity 1s linear,-webkit-transform .4s linear;transition:opacity 1s linear,-webkit-transform .4s linear;transition:opacity 1s linear,transform .4s linear;transition:opacity 1s linear,transform .4s linear,-webkit-transform .4s linear}.u-round-circle[data-v-2d78619c]{border-radius:%?100?%}.u-round-circle[data-v-2d78619c]::after{border-radius:%?100?%}.u-loading[data-v-2d78619c]::after{background-color:hsla(0,0%,100%,.35)}.u-size-default[data-v-2d78619c]{font-size:%?30?%;height:%?80?%;line-height:%?80?%}.u-size-medium[data-v-2d78619c]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;width:auto;font-size:%?26?%;height:%?70?%;line-height:%?70?%;padding:0 %?80?%}.u-size-mini[data-v-2d78619c]{display:-webkit-inline-box;display:-webkit-inline-flex;display:inline-flex;width:auto;font-size:%?22?%;padding-top:1px;height:%?50?%;line-height:%?50?%;padding:0 %?20?%}.u-primary-plain-hover[data-v-2d78619c]{color:#fff!important;background:#2b85e4!important}.u-default-plain-hover[data-v-2d78619c]{color:#2b85e4!important;background:#ecf5ff!important}.u-success-plain-hover[data-v-2d78619c]{color:#fff!important;background:#18b566!important}.u-warning-plain-hover[data-v-2d78619c]{color:#fff!important;background:#f29100!important}.u-error-plain-hover[data-v-2d78619c]{color:#fff!important;background:#dd6161!important}.u-info-plain-hover[data-v-2d78619c]{color:#fff!important;background:#82848a!important}.u-default-hover[data-v-2d78619c]{color:#2b85e4!important;border-color:#2b85e4!important;background-color:#ecf5ff!important}.u-primary-hover[data-v-2d78619c]{background:#2b85e4!important;color:#fff}.u-success-hover[data-v-2d78619c]{background:#18b566!important;color:#fff}.u-info-hover[data-v-2d78619c]{background:#82848a!important;color:#fff}.u-warning-hover[data-v-2d78619c]{background:#f29100!important;color:#fff}.u-error-hover[data-v-2d78619c]{background:#dd6161!important;color:#fff}',""]),t.exports=e},6864:function(t,e,i){"use strict";i.r(e);var a=i("7343"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},"6c09":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-button",{staticClass:"u-btn u-line-1 u-fix-ios-appearance",class:["u-size-"+t.size,t.plain?"u-btn--"+t.type+"--plain":"",t.loading?"u-loading":"","circle"==t.shape?"u-round-circle":"",t.hairLine?t.showHairLineBorder:"u-btn--bold-border","u-btn--"+t.type,t.disabled?"u-btn--"+t.type+"--disabled":""],style:[t.customStyle,{overflow:t.ripple?"hidden":"visible"}],attrs:{id:"u-wave-btn","hover-start-time":Number(t.hoverStartTime),"hover-stay-time":Number(t.hoverStayTime),disabled:t.disabled,"form-type":t.formType,"open-type":t.openType,"app-parameter":t.appParameter,"hover-stop-propagation":t.hoverStopPropagation,"send-message-title":t.sendMessageTitle,"send-message-path":"sendMessagePath",lang:t.lang,"data-name":t.dataName,"session-from":t.sessionFrom,"send-message-img":t.sendMessageImg,"show-message-card":t.showMessageCard,"hover-class":t.getHoverClass,loading:t.loading},on:{getphonenumber:function(e){arguments[0]=e=t.$handleEvent(e),t.getphonenumber.apply(void 0,arguments)},getuserinfo:function(e){arguments[0]=e=t.$handleEvent(e),t.getuserinfo.apply(void 0,arguments)},error:function(e){arguments[0]=e=t.$handleEvent(e),t.error.apply(void 0,arguments)},opensetting:function(e){arguments[0]=e=t.$handleEvent(e),t.opensetting.apply(void 0,arguments)},launchapp:function(e){arguments[0]=e=t.$handleEvent(e),t.launchapp.apply(void 0,arguments)},click:function(e){e.stopPropagation(),arguments[0]=e=t.$handleEvent(e),t.click(e)}}},[t._t("default"),t.ripple?i("v-uni-view",{staticClass:"u-wave-ripple",class:[t.waveActive?"u-wave-active":""],style:{top:t.rippleTop+"px",left:t.rippleLeft+"px",width:t.fields.targetWidth+"px",height:t.fields.targetWidth+"px","background-color":t.rippleBgColor||"rgba(0, 0, 0, 0.15)"}}):t._e()],2)},r=[]},7343:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=getApp(),n={data:function(){return{id:"",dcDetail:"",nice1:0,nice2:0,nice3:0,nice4:0}},onLoad:function(t){this.id=t.id,this.getDetail()},methods:{remember1:function(){this.nice1=1,uni.showToast({title:"赞"})},remember2:function(){this.nice2=1,uni.showToast({title:"赞"})},remember3:function(){this.nice3=1,uni.showToast({title:"赞"})},remember4:function(){this.nice4=1,uni.showToast({title:"赞"})},getDetail:function(){var t=this;wx.request({url:a.globalData.doctorHttps+"/getFormDetail",method:"GET",data:{templateid:"0e12",mid:"scan_user_basic",id:this.id},success:function(e){e.data.success?t.dcDetail=e.data.result.models:console.log(e.data.message)}})},toHome:function(){uni.navigateTo({url:"../index/index"})}}};e.default=n},"81df":function(t,e,i){"use strict";var a=i("d17b"),n=i.n(a);n.a},a114:function(t,e,i){var a=i("15ad");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("35672d8a",a,!0,{sourceMap:!1,shadowMode:!1})},a7b2:function(t,e,i){"use strict";i.r(e);var a=i("0f0d"),n=i.n(a);for(var r in a)"default"!==r&&function(t){i.d(e,t,(function(){return a[t]}))}(r);e["default"]=n.a},ae42:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return r})),i.d(e,"a",(function(){return a}));var a={uIcon:i("f2a6").default,uButton:i("e587").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"label"},[t._v("您的病情报告")]),i("v-uni-view",{staticClass:"tips"},[t._v("疾病严重程度为："),i("v-uni-text",{staticClass:"danger"},[t._v("评估中")])],1),i("v-uni-view",{staticClass:"tips"},[t._v("与您相似的银屑病人有324个，加入中心可以查看")]),i("v-uni-view",{staticClass:"label u-m-t-70"},[t._v("给您的建议：4个")]),i("v-uni-view",{staticClass:"tips u-flex u-row-between"},[t._v("遵照医生的医嘱，按时用药"),1==t.nice1?i("u-icon",{attrs:{name:"thumb-up-fill",color:"#73d13d",size:"46"}}):t._e(),0==t.nice1?i("u-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.remember1.apply(void 0,arguments)}}},[t._v("我记住了")]):t._e()],1),i("v-uni-view",{staticClass:"tips u-flex u-row-between"},[t._v("及时回医院，每月按时门诊随访"),1==t.nice2?i("u-icon",{attrs:{name:"thumb-up-fill",color:"#73d13d",size:"46"}}):t._e(),0==t.nice2?i("u-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.remember2.apply(void 0,arguments)}}},[t._v("我记住了")]):t._e()],1),i("v-uni-view",{staticClass:"tips u-flex u-row-between"},[t._v("有问题及时咨询医生"),1==t.nice3?i("u-icon",{attrs:{name:"thumb-up-fill",color:"#73d13d",size:"46"}}):t._e(),0==t.nice3?i("u-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.remember3.apply(void 0,arguments)}}},[t._v("我记住了")]):t._e()],1),i("v-uni-view",{staticClass:"tips u-flex u-row-between"},[i("v-uni-view",[t._v("完善共病记录、PSA等"),i("li",[t._v("赠送小程序3次咨询医生的机会")])]),1==t.nice4?i("u-icon",{attrs:{name:"thumb-up-fill",color:"#73d13d",size:"46"}}):t._e(),0==t.nice4?i("u-button",{attrs:{type:"success",size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.remember4.apply(void 0,arguments)}}},[t._v("我记住了")]):t._e()],1),i("v-uni-view",{staticClass:"dcBox"},[i("div",{staticClass:"title u-flex u-row-between"},[i("v-uni-view",[t._v("监测数据"),i("v-uni-text",{staticClass:"u-light-color u-font-xs u-m-l-20"},[t._v(t._s(t.dcDetail.create_time))])],1)],1),t.dcDetail.pasi?i("v-uni-view",{staticClass:"item u-flex u-row-between u-m-b-20"},[i("v-uni-view",{staticClass:"u-flex titleBox"},[i("v-uni-view",{staticClass:"itemLabel row u-p-l-30 u-p-r-30",staticStyle:{width:"300upx"}},[t._v("PASI评分")]),i("v-uni-view",{staticClass:"cont"},[i("v-uni-text",{staticClass:"$u-type-error u-m-r-10 value"},[t._v(t._s(t.dcDetail.pasi))]),t._v("分")],1)],1),i("v-uni-view",{staticClass:"button",staticStyle:{background:"#597ef7"}},[t._v("评估中")])],1):t._e(),t.dcDetail.bsa?i("v-uni-view",{staticClass:"item u-flex u-row-between u-m-b-20"},[i("v-uni-view",{staticClass:"u-flex titleBox"},[i("v-uni-view",{staticClass:"itemLabel row u-p-l-30 u-p-r-30",staticStyle:{width:"300upx"}},[t._v("BSA评分")]),i("v-uni-view",{staticClass:"cont"},[i("v-uni-text",{staticClass:"$u-type-error u-m-r-10 value"},[t._v(t._s(t.dcDetail.bsa))]),t._v("分")],1)],1),i("v-uni-view",{staticClass:"button",staticStyle:{background:"#597ef7"}},[t._v("评估中")])],1):t._e(),t.dcDetail.mmHgHigh?i("v-uni-view",{staticClass:"item u-flex u-row-between u-m-b-20"},[i("v-uni-view",{staticClass:"u-flex titleBox"},[i("v-uni-view",{staticClass:"itemLabel row u-p-l-30 u-p-r-30"},[t._v("血压(收缩压)")]),i("v-uni-view",{staticClass:"cont"},[i("v-uni-text",{staticClass:"$u-type-error u-m-r-10 value"},[t._v(t._s(t.dcDetail.mmHgHigh?t.dcDetail.mmHgHigh:"110"))]),t._v("mmHg"),i("p",{staticClass:"itemTips"},[t._v("90 ~ 140 mmHg")])],1)],1),t.dcDetail.mmHgHigh>140?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏高")]):t._e(),t.dcDetail.mmHgHigh<90?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏低")]):t._e(),t.dcDetail.mmHgHigh<=140&&t.dcDetail.mmHgHigh>=90?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#73d13d"}},[t._v("正常")]):t._e()],1):t._e(),t.dcDetail.mmHgLow?i("v-uni-view",{staticClass:"item u-flex u-row-between u-m-b-20"},[i("v-uni-view",{staticClass:"u-flex titleBox"},[i("v-uni-view",{staticClass:"itemLabel row u-p-l-30 u-p-r-30"},[t._v("血压(舒张压)")]),i("v-uni-view",{staticClass:"cont"},[i("v-uni-text",{staticClass:"$u-type-error u-m-r-10 value"},[t._v(t._s(t.dcDetail.mmHgLow?t.dcDetail.mmHgLow:"80"))]),t._v("mmHg"),i("p",{staticClass:"itemTips"},[t._v("60 ~ 90 mmHg")])],1)],1),t.dcDetail.mmHgLow>90?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏高")]):t._e(),t.dcDetail.mmHgLow<60?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏低")]):t._e(),t.dcDetail.mmHgLow<=90&&t.dcDetail.mmHgLow>=60?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#73d13d"}},[t._v("正常")]):t._e()],1):t._e(),t.dcDetail.mmol?i("v-uni-view",{staticClass:"item u-flex u-row-between u-m-b-20"},[i("v-uni-view",{staticClass:"u-flex titleBox"},[i("v-uni-view",{staticClass:"itemLabel row u-p-l-30 u-p-r-30"},[t._v("血糖")]),i("v-uni-view",{staticClass:"cont"},[i("v-uni-text",{staticClass:"$u-type-error u-m-r-10 value"},[t._v(t._s(t.dcDetail.mmol))]),t._v("mmol/L"),i("p",{staticClass:"itemTips"},[t._v("3.9 ~ 6.1 mmol/L")])],1)],1),t.dcDetail.mmol>6.1?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏高")]):t._e(),t.dcDetail.mmol<3.9?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏低")]):t._e(),t.dcDetail.mmol<=6.1&&t.dcDetail.mmol>=3.9?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#73d13d"}},[t._v("正常")]):t._e()],1):t._e(),t.dcDetail.HbAlc?i("v-uni-view",{staticClass:"item u-flex u-row-between u-m-b-20"},[i("v-uni-view",{staticClass:"u-flex titleBox"},[i("v-uni-view",{staticClass:"itemLabel row u-p-l-30 u-p-r-30"},[t._v("糖化血红蛋白")]),i("v-uni-view",{staticClass:"cont"},[i("v-uni-text",{staticClass:"$u-type-error u-m-r-10 value"},[t._v(t._s(t.dcDetail.HbAlc))]),t._v("%"),i("p",{staticClass:"itemTips"},[t._v("4 ~ 6 %")])],1)],1),t.dcDetail.HbAlc>6?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏高")]):t._e(),t.dcDetail.HbAlc<4?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏低")]):t._e(),t.dcDetail.HbAlc<=6&&t.dcDetail.HbAlc>=4?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#73d13d"}},[t._v("正常")]):t._e()],1):t._e(),t.dcDetail.insulin?i("v-uni-view",{staticClass:"item u-flex u-row-between u-m-b-20"},[i("v-uni-view",{staticClass:"u-flex titleBox"},[i("v-uni-view",{staticClass:"itemLabel row u-p-l-30 u-p-r-30"},[t._v("胰岛素")]),i("v-uni-view",{staticClass:"cont"},[i("v-uni-text",{staticClass:"$u-type-error u-m-r-10 value"},[t._v(t._s(t.dcDetail.insulin))]),t._v("mIU/L"),i("p",{staticClass:"itemTips"},[t._v("5 ~ 20 mIU/L")])],1)],1),t.dcDetail.insulin>20?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏高")]):t._e(),t.dcDetail.insulin<5?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏低")]):t._e(),t.dcDetail.insulin<=20&&t.dcDetail.insulin>=5?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#73d13d"}},[t._v("正常")]):t._e()],1):t._e(),t.dcDetail.Cpeptide?i("v-uni-view",{staticClass:"item u-flex u-row-between u-m-b-20"},[i("v-uni-view",{staticClass:"u-flex titleBox"},[i("v-uni-view",{staticClass:"itemLabel row u-p-l-30 u-p-r-30"},[t._v("C肽")]),i("v-uni-view",{staticClass:"cont"},[i("v-uni-text",{staticClass:"$u-type-error u-m-r-10 value"},[t._v(t._s(t.dcDetail.Cpeptide))]),t._v("ng/ml"),i("p",{staticClass:"itemTips"},[t._v("0.65~2.7 ng/ml")])],1)],1),t.dcDetail.Cpeptide>2.7?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏高")]):t._e(),t.dcDetail.Cpeptide<.65?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#ff4d4f"}},[t._v("偏低")]):t._e(),t.dcDetail.Cpeptide<=2.7&&t.dcDetail.Cpeptide>=.65?i("v-uni-view",{staticClass:"button",staticStyle:{background:"#73d13d"}},[t._v("正常")]):t._e()],1):t._e()],1)],1)},r=[]},d17b:function(t,e,i){var a=i("40c3");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("5ac804be",a,!0,{sourceMap:!1,shadowMode:!1})},d6a6:function(t,e,i){"use strict";i.r(e);var a=i("ae42"),n=i("6864");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("3a34");var o,s=i("f0c5"),l=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"6d770dd0",null,!1,a["a"],o);e["default"]=l.exports},e587:function(t,e,i){"use strict";i.r(e);var a=i("6c09"),n=i("a7b2");for(var r in n)"default"!==r&&function(t){i.d(e,t,(function(){return n[t]}))}(r);i("81df");var o,s=i("f0c5"),l=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"2d78619c",null,!1,a["a"],o);e["default"]=l.exports}}]);