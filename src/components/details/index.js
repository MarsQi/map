//引入图标及其图片信息
import freshIcon from '@/assets/img/details/waterico.png';
import huinongIcon from '@/assets/img/details/agricultureico.png';
import freshImg from '@/assets/img/details/detailWater.png';
import nongyeImg from '@/assets/img/details/nongyeImg.png';
import axios from '@/axios.js';
import timeValue from '@/assets/js/time.js';
import qs from 'qs';
export default {
  data() {
    return {
      //页面标题,ehcart数据状态
      title: '',
      ecahrtState: false,
      //请求接口
      url: '',
      echartURL: '',
      /*图文表格切换显示隐藏*/
      teletextORdata: true,
      detailsCon: true,
      /*详情城市的名称，在线时间，采集时间，经度，纬度，收藏及其模块icon图片，是否选中的图片*/
      cityName: '',
      onLineTime: '',
      collectionTime: '',
      lat: '12.34',
      lon: '34.56',
      icon: '',
      /*对象列表，选择当前对象下标，及其名称*/
      weiduList: [],
      weiduListIndex: 1,
      weiduListCityName: '',
      /*发送请求对象*/
      detailspage: '',
      /*详情图片*/
      detailsImg: nongyeImg,
      /*维度选择显示隐藏及其图片切换*/
      wdShowFlag: true,
      //维度图文JSON
      farming: [{
          "title": "空气温度",
          "value": ""
        },
        {
          "title": "空气湿度",
          "value": ""
        },
        {
          "title": "风速",
          "value": ""
        },
        {
          "title": "光照",
          "value": ""
        },
        {
          "title": "土壤酸碱度",
          "value": ""
        },
        {
          "title": "土壤导电率",
          "value": ""
        },
        {
          "title": "土壤温度",
          "value": ""
        },
        {
          "title": "降雨量",
          "value": ""
        },
        {
          "title": "风向",
          "value": ""
        }
      ],
      //维度数据json
      farmingBase: [{
          "title": "空气温度",
          "value": ""
        },
        {
          "title": "空气湿度",
          "value": ""
        },
        {
          "title": "风速",
          "value": ""
        },
        {
          "title": "光照",
          "value": ""
        },
        {
          "title": "土壤酸碱度",
          "value": ""
        },
        {
          "title": "土壤导电率",
          "value": ""
        },
        {
          "title": "土壤温度",
          "value": ""
        },
        {
          "title": "降雨量",
          "value": ""
        }
      ],
      //淡水水质
      freshWater: [{
          "title": "水质类别",
          "value": ""
        },
        {
          "title": "溶解氧",
          "value": ""
        },
        {
          "title": "氨氮",
          "value": ""
        },
        {
          "title": "氨氮级别",
          "value": ""
        },
        {
          "title": "高锰酸钾",
          "value": ""
        },
        {
          "title": "PH",
          "value": ""
        },
        {
          "title": "总有机碳",
          "value": ""
        }
      ],
      //保存图文维度数据，echart图数据
      farmingOld: [],
      echartList: '',
    }
  },
  components: {
    /*引入下拉刷新组件*/
    'v-scroll': resolve => require(['@/components/scroll/index'], resolve)
  },
  watch: {
    /*监听当前选中维度对象的的下标值,但状态在数据时调取画图函数*/
    weiduListIndex: function () {
      if (this.teletextORdata === false) {
        if (this.detailspage.type === '6') {
          this.drawFarming()
        } else {
          this.freshWaterLine();
        }
      }
    },
    echartList: function(){
      if (this.detailspage.type === '2') { //农业
        if (this.echartList !== '') {
          this.ecahrtState = false;
          this.freshWaterLine();
        } else {
          this.ecahrtState = true;
        }
      }
    }
  },
  mounted() {
    //获取路由参数,
    this.detailspage = this.$route.query;
    if (this.detailspage !== '') {
      //初始化页面数据
      this.ajaxData();
      if (this.detailspage.type === '2') {
        this.ajaxEchartData();
        this.title = '实时水质监测详情'
      } else {
        this.title = '实时环境监测详情'
      }
    }
  },
  methods: {
    //返回
    routerback() {
      this.$router.back(-1)
    },
    /*下拉刷新*/
    onRefresh(done) {
      this.weiduListIndex = '0';
      this.ajaxData();
      done(); // call done
    },
    /*初始化页面数据*/
    ajaxData() {
      if (this.detailspage.type === '6') {
        this.url = '/huiYun/getYunDetailList?yunDeatilId='
      } else {
        this.url = '/freshwater/getFreshwaterList?freshwaterId='
      }
      axios.get(this.url + this.detailspage.cityid)
        .then((res) => {
          //经纬度，小数点后两位
          this.lat = this.toDecimal(res.data.data.lat);
          this.lon = this.toDecimal(res.data.data.lon);
          if (this.detailspage.type === '6') {
            /*农业*/
            this.cityName = res.data.data.orgname;
            this.onLineTime = res.data.data.onlinetime;
            this.collectionTime = res.data.data.lastupdatevaluetime;
            this.detailsImg = nongyeImg;
            this.icon = huinongIcon;
            this.weiduList = this.farming;
            this.weiduList[0].value = this.toDecimal(res.data.data.airtemlastvalue) + '℃'; //空气温度
            this.weiduList[1].value = this.toDecimal(res.data.data.temlastvalue) + '%'; //空气湿度
            this.weiduList[2].value = this.toDecimal(res.data.data.windlastvalue) + 'km/h'; //风速
            this.weiduList[3].value = this.toDecimal(res.data.data.lightlastvalue) + 'lux'; //光照
            this.weiduList[4].value = this.toDecimal(res.data.data.phlastvalue); //ph
            this.weiduList[5].value = this.toDecimal(res.data.data.soilsollastvalue) + 'μs/cm'; //土壤导电率
            this.weiduList[6].value = this.toDecimal(res.data.data.temlastvalue) + '℃'; //土壤温度
            this.weiduList[7].value = this.toDecimal(res.data.data.rainfalllastvalue) + 'mm'; //降雨量
            this.weiduList[8].value = res.data.data.dirlastvalue; //风向
            this.farmingOld = this.weiduList;
          } else {
            /*淡水*/
            this.cityName = res.data.data.place;
            this.onLineTime = timeValue.hms(res.data.data.time, res.data.data.lastUpdateTime);
            this.collectionTime = timeValue.Format(res.data.data.createTime);
            this.detailsImg = freshImg;
            this.icon = freshIcon;
            this.weiduList = this.freshWater;
            this.weiduList[0].value = res.data.data.waterGradesDo; //水质类别
            this.weiduList[1].value = this.toDecimal(res.data.data.do1) + 'mg/L'; //溶解氧
            this.weiduList[2].value = this.toDecimal(res.data.data.nh3N) + 'mg/L'; //氨氮
            this.weiduList[3].value = res.data.data.waterGradesNh3N; //氨氮级别
            this.weiduList[4].value = this.toDecimal(res.data.data.codmn); //高锰酸钾
            this.weiduList[5].value = this.toDecimal(res.data.data.ph); //ph
            this.weiduList[6].value = this.toDecimal(res.data.data.toc); //总有机碳
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取ecahrt数据
    ajaxEchartData() {
      //获取echart图表数据
      this.echartURL = '/freshwater/listDetailPc?place=';
      //本地代理请求
      axios.get(this.echartURL + this.detailspage.cityname)
        .then((res) => {
          if (res.status === 200) {
            this.echartList = res;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    /*点击图文*/
    tuwen() {
      if (this.teletextORdata === false) {
        this.teletextORdata = true;
        this.timeORreload = true;
        this.detailsCon = true;
        if (this.detailspage.type === '6') {
          this.weiduList = this.farmingOld;
        }
      }
    },
    /*点击数据*/
    dataBase() {
      if (this.teletextORdata === true) {
        this.teletextORdata = false;
        this.timeORreload = false;
        this.detailsCon = false;
        if (this.detailspage.type === '6') { //农业
          this.weiduList = this.farmingBase;
          //监听当前维度下标与维度对象长度进行比较
          if (this.weiduListIndex >= this.weiduList.length) {
            this.weiduListIndex = '0';
          }
          //echart画图
          this.drawFarming()
        } else { //淡水
          if (this.echartList !== '') {
            this.ecahrtState = false;
            this.freshWaterLine();
          } else {
            this.ecahrtState = true;
          }
        }
      }
    },
    /*淡水对象选择*/
    freshWaterLine() {
      this.weiduListCityName = this.weiduList[this.weiduListIndex].title;
      let xData = [];
      for (var i = 0; i < this.echartList.data.measuredTime.length; i++) {
        xData.push(timeValue.echartTime(this.echartList.data.measuredTime[i]));
      }
      let yData = '';
      let unit = '';
      //判断当前下标，给y轴数据赋值，及其单位
      if (this.weiduListIndex === 0) {
        yData = this.echartList.data.waterGradesDo;
      } else if (this.weiduListIndex === 1) {
        yData = this.echartList.data.do1;
        unit = 'mg/L';
      } else if (this.weiduListIndex === 2) {
        yData = this.echartList.data.nh3N;
        unit = 'mg/L';
      } else if (this.weiduListIndex === 3) {
        yData = this.echartList.data.waterGradesNh3N;
      } else if (this.weiduListIndex === 4) {
        yData = this.echartList.data.codmn;
      } else if (this.weiduListIndex === 5) {
        yData = this.echartList.data.ph;
      } else if (this.weiduListIndex === 6) {
        yData = this.echartList.data.toc;
      }
      this.drawLine(xData, yData, unit)
    },
    /*智慧农业对象选择*/
    drawFarming() {
      this.weiduListCityName = this.weiduList[this.weiduListIndex].title;
      let xData = [];
      let yData = [];
      var unit = '';
      let chooseName = '';
      //判断当前选择维度对象下标，添加单位
      if (this.weiduListIndex === 0) {
        unit = '℃';
      } else if (this.weiduListIndex === 1) {
        unit = '%';
      } else if (this.weiduListIndex === 2) {
        unit = 'km/h';
      } else if (this.weiduListIndex === 3) {
        unit = 'lux';
      } else if (this.weiduListIndex === 4) {
        unit = 'PH';
      } else if (this.weiduListIndex === 5) {
        unit = 'μs/cm';
      } else if (this.weiduListIndex === 6) {
        unit = '℃';
      } else if (this.weiduListIndex === 7) {
        unit = 'mm';
      }
      //获取echart图数据
      axios.get('/huiYun/listHuiYunByDimension?orgName=' + this.cityName + '&deviceName=' + this.weiduListCityName)
        .then((res) => {
          if (res.status === 200) {
            //x轴数据
            xData = res.data.data.updataTime;
            //y轴数据
            yData = res.data.data.deviceValue;
            //画echart图
            this.drawLine(xData, yData, unit);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /*封装画echart图函数*/
    drawLine(xData, yData, unit) {
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      var option = {
        //echart样式
        textStyle: {
          fontSize: 12,
          color: '#333' // 图例文字颜色
        },
        //echart标题
        title: {
          text: this.cityName + this.weiduListCityName + '关系图',
          subtext: '数据来自象翌微链科技发展有限公司',
          x: 'center',
          top: 60,
          textStyle: {
            fontSize: 14,
            fontWeight: 'bolder',
            color: '#333' // 主标题文字颜色
          }
        },
        //echart工具
        tooltip: {
          trigger: 'axis',
          triggerOn: 'click',
          axisPointer: {
            animation: false
          },
          textStyle: {
            fontSize: 15,
            color: '#fff' // 主标题文字颜色
          },
          formatter: '{b}<br/>' + this.weiduListCityName + ': {c}' + unit
        },
        legend: {
          data: [this.weiduListCityName, '降雨量'],
          left: 20,
          top: 110,
        },
        axisPointer: {
          link: {
            xAxisIndex: 'all'
          }
        },
        dataZoom: [{
            show: true,
            realtime: true,
            start: 80,
            end: 100,
            xAxisIndex: [0, 1],
            top: 20,
            width: '90%',
            left: '5%',
            height: 30,
            filterMode: 'empty'
          },
          {
            type: 'inside',
            realtime: true,
            start: 30,
            end: 70,
            xAxisIndex: [0, 1],
            filterMode: 'empty'
          }
        ],
        //echart表格
        grid: [{
          left: 80,
          right: 60,
          height: '30%',
          top: 165,
        }, {
          left: 0,
          right: 0,
          top: '0%',
          height: '0',
          width: '0'
        }],
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
              onZero: true
            },
            data: xData,
            axisLabel: {
              rotate: 50,
              textStyle: {
                rotate: 60,
                interval: 0,
                fontSize: 12,
                color: '#666', //坐标值得具体的颜色
              }
            },
          },
          {
            gridIndex: 1,
            type: 'category',
            boundaryGap: false,
            axisLine: {
              onZero: true
            },
            data: xData,
            position: 'top'
          }
        ],
        yAxis: [{
            name: this.weiduListCityName + ' ' + unit,
            type: 'value'
          },
          {
            gridIndex: 1,
            name: '',
            type: 'value',
            inverse: true
          }
        ],
        series: [{
            name: this.weiduListCityName,
            type: 'line',
            symbolSize: 8,
            hoverAnimation: false,
            data: yData
          },
          {
            name: '',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: yData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    /*封装保留小数点两位*/
    toDecimal(x) {
      var f = parseFloat(x);
      if (isNaN(f)) {
        return;
      }
      f = Math.round(x * 100) / 100;
      return f;
    },
  }
}
