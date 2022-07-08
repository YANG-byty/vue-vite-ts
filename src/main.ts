import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import ViewUIPlus from 'view-ui-plus'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import '@/assets/css/basic.less'
import '@/assets/css/common.less'
import '@/assets/css/iconfont.css'
import '@/assets/css/text.less'

createApp(App)
  .use(router)
  .use(Antd)
  .use(store)
  .use(ViewUIPlus)
  .use(ElementPlus)
  .mount('#app')
