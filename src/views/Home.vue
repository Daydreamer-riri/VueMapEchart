<template>
	<div class="home">
		<el-card
			id="upload-card"
			shadow="hover"
			v-if="this.$store.state.isLoginAsUploader"
		>
			<div slot="header">
				<span>upload</span>
			</div>
			<input
				id="file"
				type="file"
				accept=".xls, .xlsx"
				class="outputlist_upload"
				@change="readExcel($event)"
			/>
			<el-button id="file-btn" size="small" type="primary" @click="upload"
				>点击上传</el-button
			>
			<el-input
				type="text"
				name="userdefinedFile"
				readonly
				id="File-text"
				v-model="filename"
			/>
		</el-card>
		<el-card class="box-card" shadow="hover">
			<div slot="header">
				<span>{{ datePicker }}</span>
			</div>
			<EchartMap :Date="datePicker" v-if="!mapswitch" />
			<baidu-map
				class="map"
				center="开封"
				:scroll-wheel-zoom="true"
				:min-zoom="12"
				v-if="mapswitch"
			>
				<bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
				<bm-circle
					v-for="circle in this.circleInfo"
					:key="circle.placeName"
					:center="circle.position"
					:radius="getRadius(circle.patientCount)"
					:stroke-color="circleStyle.strokeColor"
					:stroke-opacity="circleStyle.strokeOpacity"
					:fill-color="getColor(circle.patientCount)"
					:fill-opacity="circleStyle.fillOpacity"
					:stroke-weight="circleStyle.strokeWeight"
					:editing="false"
					@click="circleShowInfo($event, circle.placeName)"
				>
				</bm-circle>
				<bm-info-window
					:show="circleWindowInfo.windowShow"
					:position="circleWindowInfo.windowPosition"
					@close="circleWindowClose"
					:offset="{ width: 0, height: -20 }"
				>
					<p>{{ this.circleWindowInfo.windowMessage }}</p>
				</bm-info-window>
			</baidu-map>
			<el-row>
				<el-col :span="22">
					<div class="divDate">
						<span class="demonstration">选择日期：</span>
						<el-date-picker
							v-model="datePicker"
							type="date"
							placeholder="选择日期"
							value-format="yyyy-MM-dd"
						>
						</el-date-picker>
					</div>
				</el-col>
				<el-col :span="2">
					<div id="mapswitch">
						<span class="demonstration">切换地图</span>
						<el-switch
							v-model="mapswitch"
							active-color="#67C23A"
							inactive-color="#409EFF"
						>
						</el-switch>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<el-row :gutter="24">
			<el-col :span="12">
				<el-card class="after-card" shadow="hover">
					<div slot="header">
						<span>堆积折线图</span>
					</div>
					<div id="chart1">
						<Echart1 />
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="after-card" shadow="hover">
					<div slot="header">
						<span>柱状图</span>
					</div>
					<div id="chart2">
						<Echart2 />
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import Echart1 from "@/components/Echart1.vue";
import XLSX from "xlsx";
import Echart2 from "@/components/Echart2.vue";
import EchartMap from "@/components/Echart.vue";

Date.prototype.Format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds(), //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
	return fmt;
};

export default {
	name: "Home",
	components: { Echart1, Echart2, EchartMap },
	data() {
		var markersData = JSON.parse(localStorage.getItem("data"));
		var windowInfo = {
			windowShow: false,
			windowMessage: "",
			windowPosition: {
				lng: 0,
				lat: 0,
			},
		};
		var circleWindowInfo = {
			windowShow: false,
			windowMessage: "",
			windowPosition: {
				lng: 0,
				lat: 0,
			},
		};
		var loginInfo = {
			loginName: "",
			loginPassword: "",
		};
		var circleStyle = {
			strokeColor: "black",
			strokeOpacity: 0.1,
			strokeWeight: 1,
			fillOpacity: 0.5,
		};
		var circleInfo = [
			{
				position: { lat: 34.813814, lng: 114.376273 },
				placeName: "龙亭区",
				patientCount: 0,
			},
			{
				position: { lng: 114.430161, lat: 34.78703 },
				placeName: "顺和回族区",
				patientCount: 0,
			},
			{
				position: { lng: 114.348824, lat: 34.787787 },
				placeName: "鼓楼区",
				patientCount: 0,
			},
			{
				position: { lng: 114.459355, lat: 34.763355 },
				placeName: "祥符区",
				patientCount: 0,
			},
			{
				position: { lng: 114.339916, lat: 34.799949 },
				placeName: "其他",
				patientCount: 0,
			},
		];
		console.log(markersData);
		const date = new Date();
		return {
			markersData,
			windowInfo,
			loginInfo,
			circleStyle,
			circleInfo,
			circleWindowInfo,
			datePicker: date.Format("yyyy-MM-dd"),
			filename: "未选择任何文件",
			mapswitch: false,
		};
	},
	methods: {
		upload() {
			document.getElementById("file").click();
		},
		circleShowInfo(event, placeName) {
			if (
				this.$store.state.isLoginAsAdmin === true ||
				this.$store.state.isLoginAsUploader === true
			) {
				this.circleInfo.forEach((circle) => {
					if (circle.placeName === placeName) {
						this.circleWindowInfo.windowMessage =
							"患者人数:" + circle.patientCount;
						this.circleWindowInfo.placeMessage = "区名:" + circle.placeName;
						let lng = circle.position.lng;
						let lat = circle.position.lat;
						this.circleWindowInfo.windowPosition = { lng, lat };
						this.circleWindowInfo.windowShow = true;
					}
				});
			}
		},

		circleWindowClose() {
			this.windowInfo.windowShow = false;
		},

		readExcel(e) {
			//表格导入
			const files = e.target.files;
			const filename = files[0].name.split(".")[0];
			const fileReader = new FileReader();
			fileReader.onload = (ev) => {
				try {
					const data = ev.target.result;
					const workbook = XLSX.read(data, {
						type: "binary",
					});
					const wsname = workbook.SheetNames[0]; //取第一张表
					console.log(workbook);
					const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
					console.log(ws);
					localStorage.setItem(filename, JSON.stringify(ws)); // 转化成功的json
				} catch (e) {
					console.log(e);
					alert("数据导入失败！请检查数据！");
					return false;
				}
			};
			fileReader.readAsBinaryString(files[0]);
			this.datePicker = filename;
			this.changeDay();
			this.filename = document.getElementById("file").value;
		},
		//圆的半径和颜色
		getRadius(num) {
			return num === 0 ? 100 : num * 300;
		},

		getColor(num) {
			if (num <= 2) {
				return "yellow";
			} else if (num <= 5) {
				return "orange";
			} else {
				return "red";
			}
		},

		changeDay() {
			var dataOfTheDay = JSON.parse(localStorage.getItem(this.datePicker));
			this.markersData = dataOfTheDay;
			this.generateCircleData();
		},

		generateCircleData() {
			this.circleInfo.forEach((place) => {
				place.patientCount = 0;
			});
			if (this.markersData !== null) {
				this.markersData.forEach((person) => {
					this.circleInfo.forEach((place) => {
						if (place.placeName == person.placeName) {
							place.patientCount++;
						}
					});
				});
			}
		},
	},
	watch: {
		datePicker: function(newVal) {
			var dataOfTheDay = JSON.parse(localStorage.getItem(newVal));
			this.markersData = dataOfTheDay;
			this.generateCircleData();
		},
	},
	mounted() {
		if (this.markersData !== null) {
			this.markersData.forEach((person) => {
				this.circleInfo.forEach((place) => {
					if (place.placeName == person.placeName) {
						place.patientCount++;
					}
				});
			});
		} //生成圆的数据
		this.changeDay();
	},
};
</script>
<style>
.box-card {
	position: relative;
}
.map {
	width: 100%;
	height: 600px;
	position: relative;
}
.divDate {
	margin-top: 20px;
}
.demonstration {
	font-size: small;
	margin-right: 8px;
}
#file {
	position: absolute;
	width: 80px;
	height: 32px;
	opacity: 0;
	z-index: -1;
}
#upload-card {
	margin-bottom: 24px;
}
.after-card {
	margin-top: 24px;
}
#mapswitch {
	margin-top: 30px;
}
</style>
