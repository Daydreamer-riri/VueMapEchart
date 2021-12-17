import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import "./plugins/element.js";
import router from "./router";
import BaiduMap from "vue-baidu-map";
import { BmlMarkerClusterer } from "vue-baidu-map";
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.use(BaiduMap, {
	ak: "lvhSNmKqnBKk6w9m0K0MsI5aY07LB72P",
});
Vue.component("bml-marker-clusterer", BmlMarkerClusterer);

new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount("#app");
