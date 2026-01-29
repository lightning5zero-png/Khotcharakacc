<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheNavbar from './components/layout/TheNavbar.vue'
import TheFooter from './components/layout/TheFooter.vue'
import FloatingActionButton from './components/ui/FloatingActionButton.vue'

import AOS from 'aos'
import 'aos/dist/aos.css'

const scrollProgress = ref(0)

const updateScrollProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic'
  })
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <div class="font-sans text-gray-800 bg-white selection:bg-brand-gold selection:text-white relative min-h-screen">
    <!-- Scroll Progress Bar -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>
    
    <!-- Floating Action Button -->
    <FloatingActionButton />
    
    <!-- Navbar -->
    <TheNavbar />
    
    <!-- Main Content -->
    <router-view v-slot="{ Component }">
      <transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 transform translate-y-4"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform translate-y-4"
        mode="out-in"
      >
        <component :is="Component" />
      </transition>
    </router-view>
    
    <!-- Footer -->
    <TheFooter />
  </div>
</template>
