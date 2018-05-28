//引入第三方插件及其css
import '../../../static/swiper.min.css'
import '@/assets/css/map.css';
import '@/assets/css/index.css';
import '../../../static/swiper.min.js'
import AMap from 'AMap';
import mapData from '../../vuex/store.js';
import axios from '../../axios.js';
//图片：轮播图片
import imgZero from '@/assets/img/Carousel/0.png';
import imgOne from '@/assets/img/Carousel/1.jpg';
import imgTwo from '@/assets/img/Carousel/2.jpg';
import imgThree from '@/assets/img/Carousel/3.jpg';
import imgFour from '@/assets/img/Carousel/4.png';
import imgFive from '@/assets/img/Carousel/5.jpg';
import details from '@/assets/img/details/details.png';
//视频：轮播图片及其视频
import imgSix from '@/assets/img/Carousel/videoImg1.png';
import imgSeven from '@/assets/img/Carousel/videoImg2.png';
import imgEight from '@/assets/img/Carousel/videoImg3.png';
//实时监控图片
import ssImg from '@/assets/img/shoppro.png'
export default {
  data() {
    return {
      //视频轮播or图片轮播
      lunboimg: true,
      //分页页码器长度及其当前下标
      activeindex: 1,
      indextotal: 0,
      //产品简介图片
      details: details,
      //轮播数据
      Carousel: [],
      //图片
      CarouselImg: [{
        url: imgZero
      }, {
        url: imgOne
      }, {
        url: imgTwo
      }, {
        url: imgThree
      }, {
        url: imgFour
      }, {
        url: imgFive
      }],
      //视频
      CarouselVideo: [{
        playerOptions: {
          // autoplay: true,
          muted: true,
          language: 'zh-CN',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: 'http://116.10.197.134:8990/video/hiv00031.mp4'
          }, {
            type: "video/ogg",
            src: 'http://116.10.197.134:8990/video/hiv00031.Ogg'
          }, {
            type: "video/webm",
            src: 'http://116.10.197.134:8990/video/hiv00031.webm'
          }],
          poster: imgSix,
        },
        img: imgSix,
        videoPlayShow: true,
      }, {
        playerOptions: {
          // autoplay: true,
          muted: true,
          language: 'zh-CN',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: 'http://116.10.197.134:8990/video/hiv2.mp4'
          }, {
            type: "video/ogg",
            src: 'http://116.10.197.134:8990/video/hiv2.Ogg'
          }, {
            type: "video/webm",
            src: 'http://116.10.197.134:8990/video/hiv2.webm'
          }],
          poster: imgSeven,
        },
        img: imgSeven,
        videoPlayShow: true,
      }, {
        playerOptions: {
          // autoplay: true,
          muted: true,
          language: 'zh-CN',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: 'http://116.10.197.134:8990/video/hiv3.mp4'
          }, {
            type: "video/ogg",
            src: 'http://116.10.197.134:8990/video/hiv3.Ogg'
          }, {
            type: "video/webm",
            src: 'http://116.10.197.134:8990/video/hiv3.webm'
          }],
          poster: imgEight,
        },
        img: imgEight,
        videoPlayShow: true,
      }],
      //实时监控
      playerOptions: {
        // autoplay: true,
        controls: true,
        muted: true,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: 'http://116.10.197.134:8990/video/hiv00031.mp4'
        }, {
          type: "video/ogg",
          src: 'http://116.10.197.134:8990/video/hiv00031.Ogg'
        }, {
          type: "video/webm",
          src: 'http://116.10.197.134:8990/video/hiv00031.webm'
        }],
        poster: ssImg,
      },
      //实时监控图片
      ssImg: ssImg,
      //实时监控显示图片or视频
      isshow: true,
    }
  },
  computed: {
    //计算视频播放
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  mounted() {
    //初始化轮播
    this.Carousel = this.CarouselImg;
    this.indextotal = this.Carousel.length;
    this.setswiper();
    //溯源报告轮播
    this.setswiperTwo();
    //地图初始渲染  
    mapData.commit('renderMap');
    mapData.state.selindex = '/huiYun/listMap';
    //农业描点
    axios
      .get('/huiYun/listMap')
      .then(res => {
        var data = res.data.data;
        mapData.commit('renderMapDatasel', data);
      })
      .catch(err => {
        console.log(err);
      });
    //淡水描点
    axios
      .get('/freshwater/listFreshwater')
      .then(res => {
        var data = res.data.data;
        mapData.commit('renderMapDatasel1', data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    //立即购买
    goPay() {
      window.location.href = 'http://semall.scn.weilian.cn/static/NJ/H5/index.html#/main/detail?code=1900004';
    },
    //视频
    videoSwiper() {
      if (this.lunboimg) {
        //判断当前轮播下标值
        if (this.activeindex >= 3) {
          this.activeindex = 3;
        } else {
          this.activeindex
        }
        this.lunboimg = false;
        this.Carousel = this.CarouselVideo;
        this.indextotal = this.Carousel.length;
        this.setswiper();
      }
    },
    //图片
    imageSwiper() {
      if (this.lunboimg == false) {
        this.lunboimg = true;
        this.videoPlayShow = true;
        this.Carousel = this.CarouselImg;
        this.indextotal = this.Carousel.length;
        this.setswiper();
      }
    },
    //轮播配置
    setswiper() {
      let that = this;
      var swiper = new Swiper('.swiper-containerOne', {
        initialSlide: 0,
        paginationClickable: true,
        observer: true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        onSlideChangeEnd: function (swiper) {
          that.activeindex = swiper.activeIndex + 1;
        },
        freeModeMomentumBounceRatio: 5,
      });
      swiper.slideTo(0, 1000, false);
    },
    //溯源报告录播配置
    setswiperTwo() {
      var mySwiper = new Swiper('.swiper-containerTwo', {
        direction: 'horizontal',
        // 如果需要分页器
        pagination: '.swiper-pagination',
        // 如果需要滚动条
        scrollbar: '.swiper-scrollbar',
        paginationClickable: true,
      })
    },
    // listen event
    onPlayerPlay(player) {
      // console.log('player play!', player)
    },
    //视频暂停
    onPlayerPause(player) {
      // console.log('player pause!', player);
      this.Carousel.forEach(function (val, key) {
        val.videoPlayShow = true
      });
      this.isshow = true;
    },
    //播放完毕
    onPlayerEnded(player) {
      // console.log('player ended!', player, "播放完毕");
      this.Carousel.forEach(function (val, key) {
        val.videoPlayShow = true
      });
      this.isshow = true;
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      // console.log('player current update state', playerCurrentState);
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      player.currentTime(0);
    },
  }
}
