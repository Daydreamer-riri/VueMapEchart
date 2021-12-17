/*eslint-disable*/
<template>
	<div class="EchartMap">
		<div id="emap" style="width: 100% ;height:600px;"></div>
	</div>
</template>
<script>
//import { loadBMap } from "../map.js";
// import { mapGetters } from "vuex";

var geoCoordMap = {
	其他: [114.339916, 34.799949],
	龙亭区: [114.376273, 34.813814],
	顺和回族区: [114.430161, 34.78703],
	鼓楼区: [114.348824, 34.787787],
	祥符区: [114.459355, 34.763355],
};

var convertData = function(data) {
	var res = [];
	for (var i = 0; i < data.length; i++) {
		var geoCoord = geoCoordMap[data[i].name];
		if (geoCoord) {
			res.push({
				name: data[i].name,
				value: geoCoord.concat(data[i].value),
			});
		}
	}
	return res;
};

export default {
	name: "EchartMap",
	data() {
		var data = [];
		var option;
		var dataCount = [];
		return {
			option,
			data,
			dataCount,
		};
	},
	props: {
		Date: String,
	},
	methods: {
		// eslint-disable-next-line
		getDataCount(date) {
			this.dataCount = this.$store.getters.dataCount(date);
		},

		myEcharts() {
			// 基于准备好的dom，初始化echarts实例
			require("echarts/extension/bmap/bmap");
			let echarts = require("echarts");
			var myChart = echarts.init(document.getElementById("emap"));

			this.option = {
				// title: {
				// 	text: "疫情风险等级",
				// 	subtext: "",
				// 	left: "center",
				// },
				tooltip: {
					trigger: "item",
				},
				bmap: {
					center: [114.430161, 34.78703],
					zoom: 13,
					roam: true,
					mapStyle: {
						styleJson: [
							{
								featureType: "water",
								elementType: "all",
								stylers: {
									color: "#d1d1d1",
								},
							},
							{
								featureType: "land",
								elementType: "all",
								stylers: {
									color: "#f3f3f3",
								},
							},
							{
								featureType: "railway",
								elementType: "all",
								stylers: {
									visibility: "off",
								},
							},
							{
								featureType: "highway",
								elementType: "all",
								stylers: {
									color: "#fdfdfd",
								},
							},
							{
								featureType: "highway",
								elementType: "labels",
								stylers: {
									visibility: "off",
								},
							},
							{
								featureType: "arterial",
								elementType: "geometry",
								stylers: {
									color: "#fefefe",
								},
							},
							{
								featureType: "arterial",
								elementType: "geometry.fill",
								stylers: {
									color: "#fefefe",
								},
							},
							{
								featureType: "poi",
								elementType: "all",
								stylers: {
									visibility: "off",
								},
							},
							{
								featureType: "green",
								elementType: "all",
								stylers: {
									visibility: "off",
								},
							},
							{
								featureType: "subway",
								elementType: "all",
								stylers: {
									visibility: "off",
								},
							},
							{
								featureType: "manmade",
								elementType: "all",
								stylers: {
									color: "#d1d1d1",
								},
							},
							{
								featureType: "local",
								elementType: "all",
								stylers: {
									color: "#d1d1d1",
								},
							},
							{
								featureType: "arterial",
								elementType: "labels",
								stylers: {
									visibility: "off",
								},
							},
							{
								featureType: "boundary",
								elementType: "all",
								stylers: {
									color: "#fefefe",
								},
							},
							{
								featureType: "building",
								elementType: "all",
								stylers: {
									color: "#d1d1d1",
								},
							},
							{
								featureType: "label",
								elementType: "labels.text.fill",
								stylers: {
									color: "#999999",
								},
							},
						],
					},
				},
				series: [
					{
						name: "else",
						type: "scatter",
						coordinateSystem: "bmap",
						data: convertData(this.dataCount),
						symbolSize: function(val) {
							return val[2] * 15;
						},
						encode: {
							value: 2,
						},
						label: {
							formatter: "{b}",
							position: "right",
							show: false,
						},
						emphasis: {
							label: {
								show: true,
							},
						},
					},
					{
						name: "Top 3",
						type: "effectScatter",
						coordinateSystem: "bmap",
						color: "rgba(245, 108, 108, 0.8)",
						data: convertData(
							this.dataCount
								.sort(function(a, b) {
									return b.value - a.value;
								})
								.slice(0, 3)
						),
						symbolSize: function(val) {
							return val[2] * 15;
						},
						encode: {
							value: 2,
						},
						showEffectOn: "render",
						rippleEffect: {
							brushType: "stroke",
						},
						hoverAnimation: true,
						label: {
							formatter: "{b}",
							position: "right",
							show: true,
						},
						itemStyle: {
							shadowBlur: 10,
							shadowColor: "#333",
						},
						zlevel: 1,
					},
				],
			};
			myChart.setOption(this.option);
		},
	},
	mounted() {
		this.getDataCount(this.Date);
		this.myEcharts();
	},
	watch: {
		Date: function(newVal) {
			this.getDataCount(newVal);
			this.myEcharts();
		},
	},
	computed: {},
};
</script>
