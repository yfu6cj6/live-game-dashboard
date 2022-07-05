import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

import { i18n } from "./lang/lang"

Vue.use(ElementUI)

Vue.config.productionTip = false;
Vue.prototype.$stringFormat = function stringFormat(formatted, args) {
  for (let i = 0; i < args.length; i++) {
    const regexp = new RegExp('\\{' + i + '\\}', 'gi')
    formatted = formatted.replace(regexp, args[i])
  }
  return formatted
}

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App)
});
