(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/study/study"],{"0523":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=getApp(),a={data:function(){return{list:[]}},onLoad:function(){this.getList()},methods:{getList:function(){var n=this;wx.request({url:e.globalData.https+"/miniapi/articleList",method:"POST",data:{sjkids:t.getStorageSync("sjkids")?t.getStorageSync("sjkids"):"0e12"},success:function(t){1==t.data.code&&(n.list=t.data.data)}})},toDetail:function(n){t.navigateTo({url:"/pages/study/studyDetail?id="+n})}}};n.default=a}).call(this,e("543d")["default"])},"1db8":function(t,n,e){"use strict";e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return a}));var a={uIcon:function(){return e.e("node-modules/uview-ui/components/u-icon/u-icon").then(e.bind(null,"f2a6"))}},u=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.list,(function(n,e){var a=t.__get_orig(n),u=t._f("timeFrom")(n.createTime);return{$orig:a,f0:u}})));t.$mp.data=Object.assign({},{$root:{l0:e}})},i=[]},"1dcd":function(t,n,e){},"3c48":function(t,n,e){"use strict";var a=e("1dcd"),u=e.n(a);u.a},a556:function(t,n,e){"use strict";e.r(n);var a=e("1db8"),u=e("a7a4");for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);e("3c48");var o,c=e("f0c5"),r=Object(c["a"])(u["default"],a["b"],a["c"],!1,null,"5df902a0",null,!1,a["a"],o);n["default"]=r.exports},a7a4:function(t,n,e){"use strict";e.r(n);var a=e("0523"),u=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,(function(){return a[t]}))}(i);n["default"]=u.a},b055:function(t,n,e){"use strict";(function(t){e("4766");a(e("66fd"));var n=a(e("a556"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["b055","common/runtime","common/vendor"]]]);