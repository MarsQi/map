<template>
  <div class="home">
    <div class="headmain">
      <div class="banner">

        <!-- Swiper -->
        <div class="swiper-container swiper-containerOne">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in Carousel">
              <img class="lunboimg" :src="item.url" v-if="lunboimg" alt="图片轮播">
              <div class="video" v-if="!lunboimg">
                <video-player class="vjs-custom-skin" ref="videoPlayer" :options="item.playerOptions" :playsinline="true"
                  @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @ready="playerReadied"
                  @statechanged="playerStateChanged($event)">
                </video-player>
              </div>
            </div>
          </div>
        </div>

        <!-- 视频与轮播切换 -->
        <div class="auto">
          <div class="left" @click="videoSwiper" :class="{lbAct: !lunboimg}">
            <span>
              <i class="iconfont icon-xiala2"></i>
            </span>视频
          </div>
          <div class="right" @click="imageSwiper" :class="{lbAct: lunboimg}">
            图片
          </div>
        </div>

        <!-- 页码器 -->
        <div class="rig">
          <!--2/5-->
          <span>{{activeindex}}</span>
          <span>/</span>
          <span>{{indextotal}}</span>
        </div>

      </div>

      <!-- 商品概要 -->
      <div class="desc1">
        <div class="inner">
          <h1>太湖米 · 太湖原米</h1>
          <div class="div1">
            <span>样品数量1kg </span>
            <span class="spansel"> | </span>
            <span> 样品状态符合检验要求 </span>
            <span class="spansel"> | </span>
            <span> 大米生产区江苏省</span>
          </div>
        </div>
      </div>
    </div>

    <!--产品简介-->
    <div class="proctdesc">
      <div class="inner">
        <img src="../../assets/img/details/details-01.png" alt="产品简介">
        <img :src="details" alt="产品简介详请" />
      </div>
    </div>

    <!--立即购买-->
    <!--<button id="purchaseNow" @click="goPay">立即购买</button>-->

    <!--产品信息-->
    <div class="proctshow">
      <div class="inner">
        <div class="title">
          <img src="../../assets/img/details/cp-title.png" alt="产品信息标题">
        </div>
        <div class="con">
          <img src="../../assets/img/details/details1.png" alt="">
        </div>
        <div class="details-img">
          <img src="../../assets/img/details/cp-details-01.png" alt="">
        </div>
      </div>
    </div>

    <!--产品生产基地-->
    <div class="proctplace">
      <div class="inner">
        <div class="title">
          <img src="../../assets/img/details/sc-title.png" alt="产品生产基地标题">
        </div>
      </div>
      <div class="main">
        <div class="jd-message">
          <img src="../../assets/img/details/details2.png" alt="">
        </div>
        <div class="cs-message">
          <img src="../../assets/img/details/details3.png" alt="">
        </div>
        <div class="details-img">
          <ul>
            <li>
              <img src="../../assets/img/details/images_09.png" alt="">
            </li>
            <li>
              <img src="../../assets/img/details/images_11.png" alt="">
            </li>
          </ul>
          <div style="clear:both"></div>
          <ul>
            <li>
              <img src="../../assets/img/details/images_15.png" alt="">
            </li>
            <li>
              <img src="../../assets/img/details/images_16.png" alt="">
            </li>
          </ul>
          <div style="clear:both"></div>
        </div>
      </div>
    </div>

    <!--产品环境监测地图-->
    <div class="monitor-message">
      <div class="title">
        <img src="../../assets/img/details/aggs_22.png" alt="">
      </div>
      <div class="con">
        <img src="../../assets/img/details/aggs_65.png" alt="">
        <img src="../../assets/img/details/aggs_26.png" alt="" class="con-name">
      </div>
      <div class="map">
        <div id="container">

        </div>
      </div>
    </div>

    <!--产品水质监测地图-->
    <div class="fresh-message">
      <div class="con">
        <img src="../../assets/img/details/img_02.png" alt="">
      </div>
      <div class="map">
        <div id="fresh-container"></div>
      </div>
    </div>

    <!--产品视频监控-->
    <div class="proctfvideo">
      <div class="con">
        <img src="../../assets/img/details/aggs_66.png" alt="">
      </div>
      <div class="video">
        <div class="hide">
          <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions" :playsinline="true" @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @ready="playerReadied" @statechanged="playerStateChanged($event)">
          </video-player>
        </div>
      </div>
    </div>

    <!-- 机房图片信息 -->
    <div class="video-img">
      <ul>
        <li>
          <img src="../../assets/img/details/90_03.png" alt="">
        </li>
        <li>
          <img src="../../assets/img/details/aggs_43.png" alt="">
        </li>
      </ul>
      <div style="clear:both"></div>
    </div>
    <div class="guige">
      <img src="../../assets/img/details/jiance.png" alt="">
    </div>

    <!-- 检测报告轮播 -->
    <div class="monitor-report">
      <div class="swiper-container swiper-containerTwo">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0001.jpg" alt="溯源报告图片1">
          </div>
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0002.jpg" alt="溯源报告图片2">
          </div>
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0003.jpg" alt="溯源报告图片3">
          </div>
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0004.jpg" alt="溯源报告图片4">
          </div>
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0005.jpg" alt="溯源报告图片5">
          </div>
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0006.jpg" alt="溯源报告图片6">
          </div>
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0007.jpg" alt="溯源报告图片7">
          </div>
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0008.jpg" alt="溯源报告图片8">
          </div>
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0009.jpg" alt="溯源报告图片9">
          </div>
          <div class="swiper-slide">
            <img width="100%" src="../../assets/img/details/0010.jpg" alt="溯源报告图片10">
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less" scoped src="./index.css"></style>
