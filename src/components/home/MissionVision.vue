<script setup>
import { missionVision } from '@/data/content.js'
</script>

<template>
  <section id="vision" class="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 1px 1px, #850406 1px, transparent 0); background-size: 30px 30px;"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-14" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-brand-gold/10 px-4 py-2 rounded-full">Our Vision</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">พันธกิจและวิสัยทัศน์</h2>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Mission -->
        <div 
          class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          data-aos="fade-right"
        >
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red to-brand-red/50 rounded-t-3xl"></div>
          
          <div class="flex items-start gap-6">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-red to-brand-darkred flex items-center justify-center text-xl text-white flex-shrink-0 shadow-lg shadow-brand-red/20 group-hover:scale-110 transition-transform">
              <i :class="missionVision.mission.icon"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                {{ missionVision.mission.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ missionVision.mission.content }}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Vision -->
        <div 
          class="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 relative group hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
          data-aos="fade-left"
        >
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-gold to-brand-gold/50 rounded-t-3xl"></div>
          
          <div class="flex items-start gap-6">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-gold to-yellow-600 flex items-center justify-center text-xl text-white flex-shrink-0 shadow-lg shadow-brand-gold/20 group-hover:scale-110 transition-transform">
              <i :class="missionVision.vision.icon"></i>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                {{ missionVision.vision.title }}
              </h3>
              <p class="text-gray-600 leading-relaxed">
                {{ missionVision.vision.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
