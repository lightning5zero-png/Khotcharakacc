import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import router from './router'
import i18n from './i18n'

// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)
app.use(i18n)

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
})

app.mount('#app')
