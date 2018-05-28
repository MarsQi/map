<template>
  <div class="jp-teletext">
		<!--返回按钮-->
		<div class="title">
			<a @click="routerback" class="callBack">返回</a><span v-html="title"></span>
		</div>
		<!--tips（刷新，时间轴，图文数据切换-->
		<div class="tips">
			<div class="tips-choose">
				<span class="choose-tuwen" :class="{chooseActive: teletextORdata}" @click="tuwen">图文 </span>
				<span class="choose-data" :class="{chooseActive: !teletextORdata}" @click="dataBase">数据</span>
			</div>
			<div class="tips-object">
				<div class="weidu-choose">
					<i class="iconfont icon-ziyuan-copy"></i>
					<select v-model="weiduListIndex">
						<option disabled="disabled">维度选择</option>
						<option :value="index" v-bind:class='{valueSel:index==weiduListIndex}' v-for="(item,index) in weiduList" :key="index">{{item.title}}</option>
					</select>
				</div>
				<div class="object">
					<!-- 省份对象选择 -->
				</div>
			</div>
		</div>
		<!--详情数据-->
		<div class="details">
			<!--基本数据-->
			<v-scroll :on-refresh="onRefresh" v-show="detailsCon" :class='{zIndex: !detailsCon}'>
				<div class="details-con">
					<!--经纬度-->
					<div class="detals-tips">
						<div class="city-icon"><img :src="icon" alt="icon图标"/></div>
						<div class="city-jingwei">
							<span class="location">地理位置：</span>
							<span class="lon">经度 {{lon}}</span>
							<span class="lat">纬度 {{lat}}</span>
						</div>
					</div>
					<!--维度测量值-->
					<div class="details-content">
						<div class="city">
							<p class="city-title">
								<span class="city-name">{{cityName}}</span>
							</p>
							<p class="city-img">
								<img :src="detailsImg" alt="详情图片" id="city-img"/>
							</p>
						</div>
						<ul class="measurements">
							<li><span>项目</span><span class="measured-value">测量值</span></li>
							<li v-for="(item,index) in weiduList" v-bind:class='{valueSel:index==weiduListIndex}' :key="index"><span>{{item.title}}</span><span class="measured-value">{{item.value}}</span></li>
						</ul>
					</div>
					<!--采集时间，在线时长-->
					<div class="online-state">
						<div class="content-total">
							<span>在线总时长:</span>
							<span></span>
							<span>{{onLineTime}}</span>
						</div>
						<div class="content-status">
							<span class="normal setanniu">正常</span>
							<span class="innormal">故障</span>
						</div>
						<div class="content-time">
							<span>采集时间:</span>
							<span>{{collectionTime}}</span>
						</div>
					</div>
				</div>
			</v-scroll>
			<!--数据echart图-->
			<div class="details-echarts" :class='{zIndex: detailsCon}'>
				<div id="myChart" ref="myEchart"></div>
				<p class="waiting" v-if="ecahrtState">正在加载，请稍等...</p>
			</div>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped src="./index.css"></style>