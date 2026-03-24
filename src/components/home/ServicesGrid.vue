<script setup>
import { services } from '@/data/content.js'
</script>

<template>
  <section id="our-services" class="py-24 bg-brand-red text-white relative overflow-hidden">
    <!-- Pattern overlay -->
    <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><circle cx=%2240%22 cy=%2240%22 r=%222%22 fill=%22%23D4AF37%22/></svg>'); background-size: 40px 40px;"></div>
    
    <!-- Gradient orbs -->
    <div class="absolute top-0 left-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-sm">Our Services</span>
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">บริการของเรา</h2>
        <p class="text-white/70 text-lg max-w-2xl mx-auto">
          บริการครบวงจรด้านบัญชี ภาษี และกฎหมาย โดยทีมผู้เชี่ยวชาญมืออาชีพ
        </p>
        <div class="w-20 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-6 rounded-full"></div>
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
          <div class="bg-white rounded-2xl overflow-hidden h-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative">
            <!-- Image -->
            <div class="relative h-48 overflow-hidden">
              <img 
                :src="service.image" 
                :alt="service.title"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              >
              <!-- Gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              
              <!-- Service Number -->
              <div class="absolute top-3 left-3 w-10 h-10 rounded-xl bg-brand-gold flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-brand-gold/30 group-hover:scale-110 transition-transform">
                {{ service.id }}
              </div>

              <!-- Hover arrow -->
              <div class="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <i class="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
              </div>

              <!-- Title overlay on image -->
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <h4 class="text-white font-bold text-sm leading-tight drop-shadow-lg">
                  {{ service.title }}
                </h4>
              </div>
            </div>
            
            <!-- Content -->
            <div class="p-5">
              <p class="text-gray-500 text-sm leading-relaxed">{{ service.desc }}</p>
            </div>

            <!-- Bottom accent line -->
            <div class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-gold to-brand-red group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
