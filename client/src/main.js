import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles/style.css'

import App from './app.vue'
import router from './router.js'

const app = createApp(App)

app.use(router)
app.use(createPinia())
