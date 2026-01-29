import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/main.css'

// Import AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
})

app.mount('#app')
