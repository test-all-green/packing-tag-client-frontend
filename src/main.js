import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Mint);
// Vue.use(axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
