<script setup>
import { ref, onMounted } from 'vue'
import { stats } from '@/data/content.js'

const icons = ['fa-solid fa-users', 'fa-solid fa-check-double', 'fa-solid fa-map-location-dot']
const colors = ['text-brand-red', 'text-green-600', 'text-brand-gold']
const bgColors = ['bg-brand-red/10', 'bg-green-600/10', 'bg-brand-gold/10']
const glowColors = ['shadow-brand-red/20', 'shadow-green-600/20', 'shadow-brand-gold/20']

const displayValues = ref(stats.map(() => '0'))
const isVisible = ref(false)

const animateCounter = (index, target, suffix) => {
  const duration = 2000
  const start = performance.now()
  const numericTarget = parseInt(target)
  
  const update = (now) => {
    const elapsed = now - start
    const progress = Math.min(elapsed / duration, 1)
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3)
    const current = Math.round(numericTarget * eased)
    displayValues.value[index] = current + suffix
    
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }
  requestAnimationFrame(update)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisible.value) {
          isVisible.value = true
          stats.forEach((stat, index) => {
            const match = stat.value.match(/(\d+)(.*)/)
            if (match) {
              setTimeout(() => {
                animateCounter(index, match[1], match[2])
              }, index * 200)
            }
          })
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )
  
  const section = document.getElementById('stats-section')
  if (section) observer.observe(section)
})
</script>

<template>
  <section id="stats-section" class="py-20 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
    <!-- Decorative background -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0); background-size: 40px 40px;"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="text-center group relative"
          data-aos="zoom-in"
          :data-aos-delay="index * 150"
        >
          <!-- Card wrapper -->
          <div class="relative p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
               :class="{ 'hover:border-brand-red/20': index === 0, 'hover:border-green-500/20': index === 1, 'hover:border-brand-gold/20': index === 2 }">
            
            <!-- Decorative top line -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-b-full transition-all duration-500 group-hover:w-24"
                 :class="{ 'bg-brand-red': index === 0, 'bg-green-500': index === 1, 'bg-brand-gold': index === 2 }">
            </div>
            
            <!-- Icon -->
            <div class="relative inline-block mb-5">
              <div class="w-18 h-18 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-xl w-[72px] h-[72px]"
                   :class="[bgColors[index], `group-hover:${glowColors[index]}`]">
                <i :class="[icons[index], colors[index]]" class="text-2xl transition-transform duration-500 group-hover:scale-110"></i>
              </div>
            </div>
            
            <!-- Counter -->
            <div class="text-4xl md:text-5xl font-bold mb-3 tracking-tight transition-all duration-300" :class="colors[index]">
              {{ displayValues[index] }}
            </div>
            
            <!-- Label -->
            <div class="text-gray-500 font-medium text-sm uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
