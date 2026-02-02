<script setup>
import { services } from '@/data/content.js'
</script>

<template>
  <section id="our-services" class="py-20 bg-brand-red text-white relative overflow-hidden">
    <!-- Pattern overlay -->
    <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><circle cx=%2240%22 cy=%2240%22 r=%222%22 fill=%22%23D4AF37%22/></svg>'); background-size: 40px 40px;"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-14" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-white/10 px-4 py-2 rounded-full">Our Services</span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">บริการของเรา</h2>
        <p class="text-white/80 text-lg max-w-2xl mx-auto">
          บริการครบวงจรด้านบัญชี ภาษี และกฎหมาย โดยทีมผู้เชี่ยวชาญมืออาชีพ
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          v-for="(service, index) in services" 
          :key="service.id"
          class="group"
          data-aos="fade-up"
          :data-aos-delay="index * 50"
        >
          <div class="bg-white rounded-2xl overflow-hidden h-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <!-- Image -->
            <div class="relative h-44 overflow-hidden">
              <img 
                :src="service.image" 
                :alt="service.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              
              <!-- Service Number -->
              <div class="absolute top-3 left-3 w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {{ service.id }}
              </div>
            </div>
            
            <!-- Content -->
            <div class="p-5">
              <h4 class="text-base font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors leading-tight">
                {{ service.title }}
              </h4>
              <p class="text-gray-500 text-sm">{{ service.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
