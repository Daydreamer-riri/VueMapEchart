<template>
	<div class="Echart1">
		<div id="e1" style="width: 100% ;height:400px;"></div>
	</div>
</template>

<script>
var dataTime = [];
var longting = [0, 0, 0, 0, 0, 0, 0];
var shunhe = [0, 0, 0, 0, 0, 0, 0];
var gulou = [0, 0, 0, 0, 0, 0, 0];
var xiangfu = [0, 0, 0, 0, 0, 0, 0];
var el = [0, 0, 0, 0, 0, 0, 0];

export default {
	name: "Echart1",
	data() {
		var option;
		return {
			option,
		};
	},
	methods: {
		myEcharts() {
			// 基于准备好的dom，初始化echarts实例
			let echarts = require("echarts");
			var myChart = echarts.init(document.getElementById("e1"));

			// 指定图表的配置项和数据
			this.option = {
				title: {},
				tooltip: {
					trigger: "axis",
				},
				legend: {
					data: ["龙亭区", "顺和回族区", "鼓楼区", "祥符区", "其他"],
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true,
				},
				xAxis: {
					type: "category",
					boundaryGap: false,
					data: dataTime,
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						name: "龙亭区",
						type: "line",
						stack: "总量",
						data: longting,
					},
					{
						name: "顺和回族区",
						type: "line",
						stack: "总量",
						data: shunhe,
					},
					{
						name: "鼓楼区",
						type: "line",
						stack: "总量",
						data: gulou,
					},
					{
						name: "祥符区",
						type: "line",
						stack: "总量",
						data: xiangfu,
					},
					{
						name: "其他",
						type: "line",
						stack: "总量",
						data: el,
					},
				],
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(this.option);
		},
		getData() {
			dataTime = [];
			longting = [0, 0, 0, 0, 0, 0, 0];
			shunhe = [0, 0, 0, 0, 0, 0, 0];
			gulou = [0, 0, 0, 0, 0, 0, 0];
			xiangfu = [0, 0, 0, 0, 0, 0, 0];
			el = [0, 0, 0, 0, 0, 0, 0];
			var date = new Date();
			for (let index = 0; index < 7; index++) {
				var dataOfTheDay = this.$store.state.datas.find(
					(data) => data.date == date.Format("yyyy-MM-dd")
				);
				if (dataOfTheDay != null) {
					dataOfTheDay.data.forEach((e) => {
						if (e.placeName == "龙亭区") {
							longting[index] += 1;
						}
						if (e.placeName == "顺和回族区") {
							shunhe[index] += 1;
						}
						if (e.placeName == "鼓楼区") {
							gulou[index] += 1;
						}
						if (e.placeName == "祥符区") {
							xiangfu[index] += 1;
						}
						if (e.placeName == "其他") {
							el[index] += 1;
						}
					});
				}
				dataTime.push(date.Format("MM-dd"));
				date = date.setDate(date.getDate() - 1);
				date = new Date(date);
			}
			dataTime = dataTime.reverse();
			longting = longting.reverse();
			shunhe = shunhe.reverse();
			gulou = gulou.reverse();
			xiangfu = xiangfu.reverse();
			el = el.reverse();
		},
	},
	mounted() {
		this.getData();
		this.myEcharts();
	},
};
</script>
