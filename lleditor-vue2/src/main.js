import Vue from 'vue'
import App from './App.vue'
import LLEditor from "../dist/llveditor";

// import LLEditor from "../src/plugin";

Vue.use(LLEditor);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
