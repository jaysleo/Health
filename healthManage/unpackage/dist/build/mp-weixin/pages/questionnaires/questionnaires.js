(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/questionnaires/questionnaires"],{"006b":function(t,e,n){},"38c7":function(t,e,n){"use strict";n.r(e);var a=n("e9e1"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=r.a},"4b23":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var a={uTag:function(){return n.e("node-modules/uview-ui/components/u-tag/u-tag").then(n.bind(null,"f4c7"))}},r=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"74dc":function(t,e,n){"use strict";(function(t){n("4766");a(n("66fd"));var e=a(n("8693"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"7ce1":function(t,e,n){"use strict";var a=n("006b"),r=n.n(a);r.a},8693:function(t,e,n){"use strict";n.r(e);var a=n("4b23"),r=n("38c7");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("7ce1");var u,i=n("f0c5"),c=Object(i["a"])(r["default"],a["b"],a["c"],!1,null,"5f1cdc12",null,!1,a["a"],u);e["default"]=c.exports},e9e1:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=getApp(),r=n("5ae6"),o={data:function(){return{list:[]}},onLoad:function(){if(!t.getStorageSync("uid")||!t.getStorageSync("phone"))return t.navigateTo({url:"/pages/authorization/authorization"}),!1;this.getReportList()},onShow:function(){},methods:{getReportList:function(){var e=this;wx.request({url:a.globalData.doctorHttps+"/getAllForm",method:"GET",data:{templateid:"0e12",mid:"scan_user_basic"},success:function(n){if(n.data.success){var a=[];for(var o in n.data.result.reverse())n.data.result[o].phone==t.getStorageSync("phone")&&(n.data.result[o].create_time=r.formatTimeHms(new Date(n.data.result[o].create_time)),a.push(n.data.result[o]));e.list=a}}})},toH5:function(e){t.navigateTo({url:"/pages/h5/h5?url="+encodeURIComponent(JSON.stringify(e))})},toReport:function(e){t.navigateTo({url:"../report/myReport?id="+e})},dateToString:function(t){var e=t.getFullYear(),n=(t.getMonth()+1).toString(),a=t.getDate().toString();1==n.length&&(n="0"+n),1==a.length&&(a="0"+a);var r=e+"-"+n+"-"+a;return r}}};e.default=o}).call(this,n("543d")["default"])}},[["74dc","common/runtime","common/vendor"]]]);