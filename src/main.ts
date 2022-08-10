import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import ViewUIPlus from 'view-ui-plus'
import ElementPlus from 'element-plus'
import VConsole from 'vconsole'
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import '@/assets/css/basic.less'
import '@/assets/css/common.less'
import '@/assets/css/iconfont.css'
import '@/assets/css/text.less'
import messageLImit from '@/plugins/message/message-limit'

var app = createApp(App)
app.config.globalProperties.Message = messageLImit
app.use(router).use(store).use(ViewUIPlus).use(ElementPlus)
// .use(vConsole)
app.mount('#app')
