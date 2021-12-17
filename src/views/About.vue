<template>
	<div class="about">
		<el-table
			:data="tableData"
			style="width: 100%"
			:row-class-name="tableRowClassName"
		>
			<el-table-column prop="date" label="日期" width="180"> </el-table-column>
			<el-table-column prop="name" label="姓名" width="180"> </el-table-column>
			<el-table-column prop="placeName" label="区域"> </el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	data() {
		var dataOfTheDay = JSON.parse(localStorage.getItem(this.datePicker));

		var tableData = [];

		return {
			dataOfTheDay,

			tableData,
		};
	},
	methods: {
		tableInit() {
			var date = new Date();
			for (let index = 0; index < 10; index++) {
				var dataOfTheDay = JSON.parse(
					localStorage.getItem(date.Format("yyyy-MM-dd"))
				);
				if (dataOfTheDay != null) {
					dataOfTheDay.forEach((person) => {
						this.tableData.push({
							date: date.Format("yyyy-MM-dd"),
							name: person.name,
							placeName: person.placeName,
						});
					});
				}
				date = date.setDate(date.getDate() - 1);
				date = new Date(date);
			}
		},
	},

	mounted() {
		this.tableInit();
	},
};

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
</script>
