(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0896":function(n,t,e){"use strict";var o=e("e62e"),u=e.n(o);u.a},"12cd":function(n,t,e){"use strict";e.r(t);var o=e("afaa"),u=e("3dc1");for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);e("0896");var a,r=e("f0c5"),c=Object(r["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);t["default"]=c.exports},"2f04":function(n,t,e){"use strict";(function(n){e("834b");o(e("66fd"));var t=o(e("12cd"));function o(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},"3dc1":function(n,t,e){"use strict";e.r(t);var o=e("eec8"),u=e.n(o);for(var i in o)"default"!==i&&function(n){e.d(t,n,(function(){return o[n]}))}(i);t["default"]=u.a},afaa:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return o}));var o={uForm:function(){return e.e("node-modules/uview-ui/components/u-form/u-form").then(e.bind(null,"c25e"))},uFormItem:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(e.bind(null,"15b3"))},uInput:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/uview-ui/components/u-input/u-input")]).then(e.bind(null,"7430"))},uButton:function(){return e.e("node-modules/uview-ui/components/u-button/u-button").then(e.bind(null,"44f1"))},uPopup:function(){return e.e("node-modules/uview-ui/components/u-popup/u-popup").then(e.bind(null,"952d"))}},u=function(){var n=this,t=n.$createElement,e=(n._self._c,n._f("date")(n.now,"yyyy年mm月dd日 hh时MM分"));n.$mp.data=Object.assign({},{$root:{f0:e}})},i=[]},e62e:function(n,t,e){},eec8:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{id:"",form:{},now:"",overModal:!1}},onLoad:function(n){this.id=n.id,this.getDetail();var t=new Date;this.now=t.getTime()},methods:{getDetail:function(){var t=this;wx.request({url:"https://sbzhgl.ifufan.com:4000/devices/"+this.id,method:"GET",data:{},success:function(e){200==e.data.code&&(t.form=e.data.data[0].info.detail,n.getStorageSync("name")&&(t.form.name=n.getStorageSync("name"),console.log(t.form.name)),n.getStorageSync("section")&&(t.form.section=n.getStorageSync("section")))}})},scan:function(){var t=this;n.scanCode({scanType:"qrCode",success:function(n){console.log(n.result),wx.request({url:"https://api.ifufan.com:8800/cdr/getPatientBypi?zypi="+n.result,method:"GET",success:function(e){t.form.zhuyuanhao=n.result,t.form.huanzhexingming=e.data["姓名"],t.form.bingqu=e.data["病区"],t.form.chuanghao=e.data["床号"],t.over()}})}})},over:function(){var t=this;if(!this.form.name)return n.showToast({title:"请填写提交人姓名",icon:"none"}),!1;if(!this.form.section)return n.showToast({title:"请填写提交人科室",icon:"none"}),!1;if(!this.form.zhuyuanhao)return n.showToast({title:"扫患者码失败,请重新扫码",icon:"none"}),!1;var e={jbxx1:this.form.jbxx1,jbxx2:this.form.jbxx2,jbxx3:this.now,jbxx4:this.form.name,jbxx5:this.form.section,jbxx6:this.form.section,jbxx7:this.form.zhuyuanhao,jbxx8:this.form.huanzhexingming,jbxx9:this.form.bingqu,jbxx10:this.form.chuanghao};wx.request({url:"https://sbzhgl.ifufan.com:4000/devices",method:"POST",data:{patientno:this.id,detail:e},success:function(e){console.log(e.data),200==e.data.code&&(n.setStorageSync("name",t.form.name),n.setStorageSync("section",t.form.section),t.overModal=!0,setTimeout((function(){n.reLaunch({url:"/pages/index/home"})}),2e3))}})}}};t.default=e}).call(this,e("543d")["default"])}},[["2f04","common/runtime","common/vendor"]]]);