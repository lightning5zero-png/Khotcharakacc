<script setup>
import { useI18n } from 'vue-i18n'
import { missionVision } from '@/data/content.js'

const { t } = useI18n()
</script>

<template>
  <section id="vision" class="py-24 bg-white relative overflow-hidden">
    <!-- Decorative background -->
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-red via-brand-gold to-brand-red"></div>
    
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Mission -->
        <div 
          class="group bg-gray-50 p-10 rounded-[2rem] border border-gray-100 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-500"
          data-aos="fade-right"
        >
          <div class="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            <i :class="missionVision.mission.icon" class="text-3xl text-brand-red"></i>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            {{ t('mission_vision.mission_title') }}
            <div class="h-1 w-12 bg-brand-gold rounded-full"></div>
          </h3>
          <p class="text-gray-600 text-lg leading-relaxed italic">
            {{ t('mission_vision.mission_content') }}
          </p>
        </div>

        <!-- Vision -->
        <div 
          class="group bg-[#1a1a1a] p-10 rounded-[2rem] border border-white/5 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/10 transition-all duration-500"
          data-aos="fade-left"
        >
          <div class="w-16 h-16 bg-brand-gold/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
            <i :class="missionVision.vision.icon" class="text-3xl text-brand-gold"></i>
          </div>
          <h3 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            {{ t('mission_vision.vision_title') }}
            <div class="h-1 w-12 bg-brand-red rounded-full"></div>
          </h3>
          <p class="text-gray-300 text-lg leading-relaxed italic">
            {{ t('mission_vision.vision_content') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
