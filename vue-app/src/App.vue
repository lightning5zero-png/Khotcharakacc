<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheNavbar from './components/layout/TheNavbar.vue'
import HeroSection from './components/home/HeroSection.vue'
import StatsSection from './components/home/StatsSection.vue'
import MissionVision from './components/home/MissionVision.vue'
import ServicesGrid from './components/home/ServicesGrid.vue'
import PricingTable from './components/home/PricingTable.vue'
import RegistrationPackages from './components/home/RegistrationPackages.vue'
import ActivityGallery from './components/home/ActivityGallery.vue'
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
    <main class="relative">
      <HeroSection />
      <StatsSection />
      <MissionVision />
      <ServicesGrid />
      <PricingTable />
      <RegistrationPackages />
      <ActivityGallery />
    </main>
    
    <!-- Footer -->
    <TheFooter />
  </div>
</template>
