(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/uview-ui/components/u-row-notice/u-row-notice"],{"6fe2":function(t,e,n){},"7ddb":function(t,e,n){"use strict";n.r(e);var i=n("c93d"),o=n("97bc");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("c6f4");var a,r=n("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,"4042bb6b",null,!1,i["a"],a);e["default"]=c.exports},"97bc":function(t,e,n){"use strict";n.r(e);var i=n("fff0"),o=n.n(i);for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=o.a},c6f4:function(t,e,n){"use strict";var i=n("6fe2"),o=n.n(i);o.a},c93d:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var i={uIcon:function(){return n.e("node-modules/uview-ui/components/u-icon/u-icon").then(n.bind(null,"f2a6"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.show?t.__get_style([t.textStyle]):null);t.$mp.data=Object.assign({},{$root:{s0:n}})},u=[]},fff0:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{list:{type:Array,default:function(){return[]}},type:{type:String,default:"warning"},volumeIcon:{type:Boolean,default:!0},moreIcon:{type:Boolean,default:!1},closeIcon:{type:Boolean,default:!1},autoplay:{type:Boolean,default:!0},color:{type:String,default:""},bgColor:{type:String,default:""},show:{type:Boolean,default:!0},fontSize:{type:[Number,String],default:26},volumeSize:{type:[Number,String],default:34},speed:{type:[Number,String],default:160},playState:{type:String,default:"play"},padding:{type:[Number,String],default:"18rpx 24rpx"}},data:function(){return{textWidth:0,boxWidth:0,animationDuration:"10s",animationPlayState:"paused",showText:""}},watch:{list:{immediate:!0,handler:function(t){var e=this;this.showText=t.join("，"),this.$nextTick((function(){e.initSize()}))}},playState:function(t){this.animationPlayState="play"==t?"running":"paused"},speed:function(t){this.initSize()}},computed:{computeColor:function(){return this.color?this.color:"none"==this.type?"#606266":this.type},textStyle:function(){var t={};return this.color?t.color=this.color:"none"==this.type&&(t.color="#606266"),t.fontSize=this.fontSize+"rpx",t},computeBgColor:function(){return this.bgColor?this.bgColor:"none"==this.type?"transparent":void 0}},mounted:function(){var t=this;this.$nextTick((function(){t.initSize()}))},methods:{initSize:function(){var e=this,n=[],i=new Promise((function(n,i){t.createSelectorQuery().in(e).select("#u-notice-content").boundingClientRect().exec((function(t){e.textWidth=t[0].width,n()}))}));n.push(i),Promise.all(n).then((function(){e.animationDuration="".concat(e.textWidth/t.upx2px(e.speed),"s"),e.animationPlayState="paused",setTimeout((function(){"play"==e.playState&&e.autoplay&&(e.animationPlayState="running")}),10)}))},click:function(t){this.$emit("click")},close:function(){this.$emit("close")},getMore:function(){this.$emit("getMore")}}};e.default=n}).call(this,n("543d")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/uview-ui/components/u-row-notice/u-row-notice-create-component',
    {
        'node-modules/uview-ui/components/u-row-notice/u-row-notice-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7ddb"))
        })
    },
    [['node-modules/uview-ui/components/u-row-notice/u-row-notice-create-component']]
]);
