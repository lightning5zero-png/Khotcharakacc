import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import router from './router'

// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.use(router)

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
})

app.mount('#app')
