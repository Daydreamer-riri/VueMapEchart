<template>
	<div class="home">
		<el-card class="box-card" shadow="hover">
			<div slot="header">
				<span>{{ datePicker }}</span>
			</div>
			<EchartMap :Date="datePicker" v-if="!mapswitch" />

			<!-- switch -->
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
// import XLSX from "xlsx";
import Echart2 from "@/components/Echart2.vue";
import EchartMap from "@/components/EchartMap.vue";

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

		var loginInfo = {
			loginName: "",
			loginPassword: "",
		};

		console.log(markersData);
		const date = new Date();
		return {
			markersData,
			windowInfo,
			loginInfo,

			datePicker: date.Format("yyyy-MM-dd"),
			filename: "未选择任何文件",
			mapswitch: false,
		};
	},
	methods: {
		upload() {
			document.getElementById("file").click();
		},

		// readExcel(e) {
		// 	//表格导入
		// 	const files = e.target.files;
		// 	const filename = files[0].name.split(".")[0];
		// 	const fileReader = new FileReader();
		// 	fileReader.onload = (ev) => {
		// 		try {
		// 			const data = ev.target.result;
		// 			const workbook = XLSX.read(data, {
		// 				type: "binary",
		// 			});
		// 			const wsname = workbook.SheetNames[0]; //取第一张表
		// 			console.log(workbook);
		// 			const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
		// 			console.log(ws);
		// 			localStorage.setItem(filename, JSON.stringify(ws)); // 转化成功的json
		// 		} catch (e) {
		// 			console.log(e);
		// 			alert("数据导入失败！请检查数据！");
		// 			return false;
		// 		}
		// 	};
		// 	fileReader.readAsBinaryString(files[0]);
		// 	this.datePicker = filename;
		// 	this.changeDay();
		// 	this.filename = document.getElementById("file").value;
		// },

		// changeDay() {
		// 	var dataOfTheDay = JSON.parse(localStorage.getItem(this.datePicker));
		// 	this.markersData = dataOfTheDay;
		// 	this.generateCircleData();
		// },
	},
	watch: {
		// datePicker: function(newVal) {
		// },
	},
	// mounted() {
	// 	if (this.markersData !== null) {
	// 		this.markersData.forEach((person) => {
	// 			this.circleInfo.forEach((place) => {
	// 				if (place.placeName == person.placeName) {
	// 					place.patientCount++;
	// 				}
	// 			});
	// 		});
	// 	} //生成圆的数据
	// 	this.changeDay();
	// },
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
