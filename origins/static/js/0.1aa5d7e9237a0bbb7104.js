webpackJsonp([0],{"9gzG":function(t,e){},VgBk:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i={props:{offset:{type:Number,default:100},enableInfinite:{type:Boolean,default:!0},enableRefresh:{type:Boolean,default:!0},dataList:{default:!1,required:!1},onRefresh:{type:Function,default:void 0,required:!1},onInfinite:{type:Function,default:void 0,require:!1}},data:function(){return{top:0,state:0,startX:0,startY:0,touching:!1,infiniteLoading:!1,downFlag:!1}},methods:{touchStart:function(t){this.startY=t.targetTouches[0].pageY,this.startX=t.targetTouches[0].pageX,this.startScroll=this.$el.scrollTop||0,this.touching=!0},touchMove:function(t){if(this.enableRefresh&&!this.dataList.noFlag&&this.touching){var e=t.targetTouches[0].pageY-this.startY-this.startScroll;e>0&&t.preventDefault(),this.top=Math.pow(e,.8)+(2===this.state?this.offset:0),2!==this.state&&(this.top>=this.offset?this.state=1:this.state=0)}},touchEnd:function(t){if(this.enableRefresh){if(this.touching=!1,2===this.state)return this.state=2,void(this.top=this.offset);this.top>=this.offset?this.refresh():(this.state=0,this.top=0);var e=t.changedTouches[0].pageX,s=t.changedTouches[0].pageY,i=this.startY-s,n=e-this.startX;if(Math.abs(n)<2&&Math.abs(i)<2)console.log("滑动距离太短");else if(this.enableInfinite&&!this.infiniteLoading){var o=this.$el.clientHeight,a=this.$el.querySelector(".inner").clientHeight-o-this.$el.scrollTop-(this.onRefresh?this.$el.querySelector(".pull-refresh").clientHeight:0);console.log(a+" __ "+this.offset),a<=this.offset&&0===this.state&&(this.downFlag=!1,this.infinite())}}},refresh:function(){var t=this;this.state=2,this.top=this.offset,setTimeout(function(){t.onRefresh(t.refreshDone)},300)},refreshDone:function(){this.state=0,this.top=0},infinite:function(){this.infiniteLoading=!0,setTimeout(function(){},2e3)},infiniteDone:function(){this.infiniteLoading=!1}}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"yo-scroll",class:{down:0===t.state,up:1==t.state,refresh:2===t.state,touch:t.touching},on:{touchstart:function(e){t.touchStart(e)},touchmove:function(e){t.touchMove(e)},touchend:function(e){t.touchEnd(e)}}},[s("section",{staticClass:"inner",style:{transform:"translate3d(0, "+t.top+"px, 0)"}},[s("header",{staticClass:"pull-refresh"},[t._t("pull-refresh",[s("span",{staticClass:"down-tip"},[t._v("下拉更新")]),t._v(" "),s("span",{staticClass:"up-tip"},[t._v("松开刷新数据")]),t._v(" "),s("span",{staticClass:"refresh-tip"},[t._v("加载中……")])])],2),t._v(" "),t._t("default")],2)])},staticRenderFns:[]};var o=s("Z0/y")(i,n,!1,function(t){s("9gzG")},null,null);e.default=o.exports}});
//# sourceMappingURL=0.1aa5d7e9237a0bbb7104.js.map