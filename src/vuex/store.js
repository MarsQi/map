import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios.js';
import router from '../router'
import qs from 'qs';
import bus from '../bus.js'
Vue.use(Vuex);
//引入需要的相应img
import Img1 from '@/assets/img/map/shuidi.png'; //淡水
import Img5 from '@/assets/img/map/agriculture_mk.png'; //智慧农业
import liked from '@/assets/img/like/liked.png'; //收藏
import unliked from '@/assets/img/like/unliked.png'; //不收藏
import agriculture from '@/assets/img/like/agriculture.png'; //弹出框农业
//state  ：存储数据、数据 初始化
const state = {
  info: [],
  selindex: '', //path传递    
  changeimg: Img5,
  slectlike: false,
  isliked: unliked,
  type: 'air',
  detailspage: {
    cityname: '',
    cityid: 0,
    type: '',
  }
}
var gmap;
var watermap;

function pd() { //判断用户当前选中 state.selindex是转换的状态值 修改地图小标与调用哪个方法 修改弹窗img没在这里面写  2、pd(i)来操作，让变化的值都在数组里，利用下标来控制代码比较优化
  switch (state.selindex) {
    case '/huiYun/listMap':
      state.changeimg = Img5;
      state.type = 'agriculture';
      break;
    case '/freshwater/listFreshwater':
      state.changeimg = Img1;
      state.type = 'water';
      break;
    default:
      alert('参数有问题')
  }
}

//淡水水质数据获得marker 
function getWater(map, item, marker) {
  AMap.event.addListener(marker, "click", function () {
    //请求当前淡水的数据
    axios
      .get('/freshwater/getFreshwaterList', {
        params: {
          freshwaterId: item.id
        }
      })
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          state.info = res.data.data
          var html = '<div class="hq-card air_jump"><h3 class="title calm">' + state.info.place + '</h3>' + '<h4>' + state.info.date + '</h4>' +
            '<div class="air_con2 clearfix air_jump">' +
            '<ul>' +
            '<li><div class="left"><span>PH值 </span></div>' + '<div class="center"><span>：</span></div>' + '<div class="right">' + (state.info.ph || '--') + '</div></li>' +
            '<li><div class="left"><span>溶解氧</span></div>' + '<div class="center"><span>：</span></div>' + '<div class="right">' + (state.info.do1 || '--') + 'mg/L</div></li>' +
            '<li><div class="left"><span>氨氮</span></div>' + '<div class="center"><span>：</span></div>' + '<div class="right">' + (state.info.nh3N || '--') + 'mg/L</div></li>' +
            '<li><div class="left"><span>氨氮级别 </span></div>' + '<div class="center"><span>：</span></div>' + '<div class="right">' + (state.info.waterGradesNh3N || '--') + '</div></li>' +
            '</ul>' +
            '</div>' +
            '</div>'
          var infoWindow = new AMap.InfoWindow({
            content: html,
            autoMove: true,
            closeWhenClickMap: true,
            offset: {
              x: -0,
              y: -0
            }
          });
          var openInfoWindow = function (e) {
            infoWindow.open(map, marker.getPosition());
            setTimeout(function () {
              $('.air_jump').click(function () {
                state.detailspage.cityname = state.info.place;
                state.detailspage.cityid = state.info.id;
                state.detailspage.type = '2'; //type还可在具体组件的watch中的路由给								
                router.push({
                  path: '/details',
                  query: state.detailspage
                }); //跳转详情页	
              })
            }, 300)
          };
          openInfoWindow();
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};

//智慧农业数据获得marker
function getAgriculture(map, item, marker) {
  AMap.event.addListener(marker, "click", function () {
    //请求当前地区的数据
    axios
      .get('/huiYun/getYunDetailList', {
        params: {
          yunDeatilId: item.yunid
        }
      })
      .then(res => {
        if (res.data.status === 'SUCCESS') {
          state.info = res.data.data;
          collecta(state.info.collected)
          var html = '<div class="hq-card air_jump"><h3 class="title calm">' + state.info.orgname + '</h3>' + '<h4>' + state.info.lastupdatevaluetime + '</h4>' +
            '<div class="air_con1 clearfix air_jump">' +
            '<ul>' +
            '<li><div class="left"><span>空温 </span></div>' + '<div class="center"><span>：</span></div>' + '<div class="right">' + (state.info.airtemlastvalue || '--') + '℃</div></li>' +
            '<li><div class="left"><span>温度 </span></div>' + '<div class="center"><span>：</span></div>' + '<div class="right">' + (state.info.temlastvalue || '--') + '℃</div></li>' +
            '<li><div class="left"><span>风速 </span></div>' + '<div class="center"><span>：</span></div>' + '<div class="right">' + (state.info.windlastvalue || '--') + 'km/h</div></li>' +
            '<li><div class="left"><span>风向 </span></div>' + '<div class="center"><span>：</span></div>' + '<div class="right">' + (state.info.dirlastvalue || '--') + '</div></li>' +
            '</ul>' +
            '</div>' +
            '</div>'
          var infoWindow = new AMap.InfoWindow({
            content: html,
            autoMove: true,
            closeWhenClickMap: true,
            offset: {
              x: -0,
              y: -0
            }
          });
          var openInfoWindow = function (e) {
            infoWindow.open(map, marker.getPosition());
            setTimeout(function () {
              $('.air_jump').click(function () { //跳转详情页								
                state.detailspage.cityname = state.info.orgname;
                state.detailspage.cityid = state.info.id;
                state.detailspage.type = '6'; //type还可在具体组件的watch中的路由给
                router.push({
                  path: '/details',
                  query: state.detailspage
                }); //跳转详情页	
                console.log(state.detailspage)
              })
            }, 300)

          };
          openInfoWindow();
        }
      })
      .catch(err => {
        console.log(err);
      });
  });
};
//封装收藏浏览相关  参数：operation操作名，moduleType模块类型（默认值为0，传0就行），dataType数据类型（空气类，淡水类，海水类。。。，取值为1,2,3.。。。，dataRingId记录的id，dataRingName左侧收藏浏览展示的名称，action：1收藏0浏览
function collectsel(operation, moduleType, dataType, dataRingId, dataRingName, action, successmsg, failmsg, url1, meta) {
  state.iscollection = false;
  var data1 = {
    operation: operation,
    moduleType: moduleType,
    dataType: dataType,
    dataRingId: dataRingId,
    dataRingName: dataRingName,
    action: action,
    url: url1,
    meta: meta
  }
  axios
    .post('/dataService/curd', data1)
    .then(res => {
      if (res.data.status == 'SUCCESS') {
        console.log(successmsg)
        bus.$emit('map')
      } else {
        console.log(failmsg)
      }
    })
    .catch(err => {
      console.log(err);
    });
}
//封装判断是否收藏以及页面渲染
function collecta(isCollected) {
  state.slectlike = isCollected;
  if (state.slectlike) { //收藏走相应接口
    state.isliked = liked;
  } else { //不收藏走相应接口
    state.isliked = unliked;
  }
}
//mutations修改数据
const mutations = {
  renderMap(state) { //地图初始渲染
    var that = this;
    gmap = new AMap.Map('container', {
      resizeEnable: true,
      dragEnable: true,
      touchZoom: true,
      doubleClickZoom: true,
      view: new AMap.View2D({ //二维地图显示视口
        center: new AMap.LngLat(120.1, 31.1),
        zoom: 8
      }),
      topWhenMouseOver: true
    });
    watermap = new AMap.Map('fresh-container', {
      resizeEnable: true,
      dragEnable: true,
      touchZoom: true,
      doubleClickZoom: true,
      view: new AMap.View2D({ //二维地图显示视口
        center: new AMap.LngLat(120.1, 31.1),
        zoom: 8
      }),
      topWhenMouseOver: true
    });
  },
  renderMapDatasel(state, data) { // 数据选择渲染
    gmap.clearMap();
    pd(); //调用选择方法
    data.forEach(function (item, i) {
      if (item.lon && item.lat) {
        var markerPosition = null,
          imageUrl = '',
          curIcon = null;
        markerPosition = new AMap.LngLat(item.lon, item.lat);
        curIcon = new AMap.Icon({
          image: state.changeimg,
          size: new AMap.Size(22, 22)
        });
        var marker = new AMap.Marker({ //设置marker标记点
          icon: curIcon,
          //基点位置
          position: markerPosition,
          //相对于基点的位置
          offset: new AMap.Pixel(-14, -20),
          map: gmap
        });
      } else {
        return false; //如果当前marker不存在则返回继续下一个点
      }
      state.type === 'agriculture' && getAgriculture(gmap, item, marker);
    })
    //      gmap.setFitView();
  },
  renderMapDatasel1(state, data) { // 淡水
    watermap.clearMap();
    data.forEach(function (item, i) {
      if (item.lon && item.lat) {
        var markerPosition = null,
          imageUrl = '',
          curIcon = null;
        markerPosition = new AMap.LngLat(item.lon, item.lat);
        curIcon = new AMap.Icon({
          image: Img1,
          size: new AMap.Size(22, 22)
        });
        var marker = new AMap.Marker({ //设置marker标记点
          icon: curIcon,
          //基点位置
          position: markerPosition,
          //相对于基点的位置
          offset: new AMap.Pixel(-14, -20),
          map: watermap
        });
      } else {
        return false; //如果当前marker不存在则返回继续下一个点
      }
      getWater(watermap, item, marker)
    })
  }
}
export default new Vuex.Store({
  state,
  mutations
})
