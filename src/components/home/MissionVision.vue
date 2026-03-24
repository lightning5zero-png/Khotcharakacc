<script setup>
import { missionVision } from '@/data/content.js'
</script>

<template>
  <section id="vision" class="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
    <!-- Background patterns -->
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 1px 1px, #850406 1px, transparent 0); background-size: 30px 30px;"></div>
    <div class="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-brand-gold/10 px-5 py-2.5 rounded-full">Our Vision</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-3">พันธกิจและวิสัยทัศน์</h2>
        <div class="w-20 h-1 bg-gradient-to-r from-brand-red to-brand-gold mx-auto rounded-full"></div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Mission -->
        <div 
          class="relative group"
          data-aos="fade-right"
        >
          <div class="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <!-- Animated gradient top bar -->
            <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-red via-brand-darkred to-brand-red rounded-t-3xl"></div>
            
            <!-- Decorative quote -->
            <div class="absolute top-6 right-6 text-8xl font-serif text-brand-red/5 leading-none select-none pointer-events-none">"</div>
            
            <div class="flex items-start gap-6 relative">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-red to-brand-darkred flex items-center justify-center text-xl text-white flex-shrink-0 shadow-lg shadow-brand-red/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <i :class="missionVision.mission.icon"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                  {{ missionVision.mission.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed italic">
                  {{ missionVision.mission.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Vision -->
        <div 
          class="relative group"
          data-aos="fade-left"
        >
          <div class="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 relative overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <!-- Animated gradient top bar -->
            <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-gold via-yellow-500 to-brand-gold rounded-t-3xl"></div>
            
            <!-- Decorative quote -->
            <div class="absolute top-6 right-6 text-8xl font-serif text-brand-gold/5 leading-none select-none pointer-events-none">"</div>
            
            <div class="flex items-start gap-6 relative">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-gold to-yellow-600 flex items-center justify-center text-xl text-white flex-shrink-0 shadow-lg shadow-brand-gold/25 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
                <i :class="missionVision.vision.icon"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-4">
                  {{ missionVision.vision.title }}
                </h3>
                <p class="text-gray-600 leading-relaxed italic">
                  {{ missionVision.vision.content }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
