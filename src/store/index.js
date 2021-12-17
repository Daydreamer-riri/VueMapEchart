import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		isLoginAsAdmin: false,
		isLoginAsUploader: false,
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
