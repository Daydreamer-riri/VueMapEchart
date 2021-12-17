import Vue from "vue";
import Vuex from "vuex";
import staticData from "../data/staticData.js";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoginAsAdmin: false,
		isLoginAsUploader: false,
		//-----------------------------------
		//静态数据
		//-----------------------------------
		datas: staticData.datas,
		//=======================================
	},
	getters: {
		// eslint-disable-next-line
		dataCount: (state) => (date) => {
			var data = state.datas.find((data) => data.date == date);
			var longting = 0;
			var shunhe = 0;
			var gulou = 0;
			var xiangfu = 0;
			var el = 0;
			if (data != null) {
				data.data.forEach((e) => {
					if (e.placeName == "龙亭区") {
						longting += 1;
					}
					if (e.placeName == "顺和回族区") {
						shunhe += 1;
					}
					if (e.placeName == "鼓楼区") {
						gulou += 1;
					}
					if (e.placeName == "祥符区") {
						xiangfu += 1;
					}
					if (e.placeName == "其他") {
						el += 1;
					}
				});
			}
			return [
				{ name: "龙亭区", value: longting },
				{ name: "顺和回族区", value: shunhe },
				{ name: "鼓楼区", value: gulou },
				{ name: "祥符区", value: xiangfu },
				{ name: "其他", value: el },
			];
		},
	},
	mutations: {
		loginAsAdmin(state) {
			state.isLoginAsAdmin = true;
		},
		logout(state) {
			state.isLoginAsAdmin = false;
			state.isLoginAsUploader = false;
		},
		loginAsUploader(state) {
			state.isLoginAsUploader = true;
		},
	},
	actions: {},
	modules: {},
});
