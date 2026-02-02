<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { activityImages } from '@/data/content.js'

const modules = [Autoplay]
</script>

<template>
  <section class="py-0 relative overflow-hidden">
    <!-- Top gold line -->
    <div class="h-1 bg-gradient-to-r from-brand-red via-brand-gold to-brand-red"></div>
    
    <div class="bg-gray-900 py-2">
      <Swiper
        :modules="modules"
        :slidesPerView="1.5"
        :spaceBetween="0"
        :loop="true"
        :speed="5000"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false
        }"
        :breakpoints="{
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3.5 },
          1024: { slidesPerView: 4.5 },
          1280: { slidesPerView: 5.5 }
        }"
        class="w-full"
      >
        <SwiperSlide 
          v-for="(image, index) in [...activityImages, ...activityImages]" 
          :key="index"
          class="!h-[280px] relative group"
        >
          <img 
            :src="image" 
            :alt="`Activity ${index + 1}`"
            class="h-full w-full object-cover brightness-90 group-hover:brightness-100 transition-all duration-500"
          >
          <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500"></div>
        </SwiperSlide>
      </Swiper>
    </div>
    
    <!-- Bottom gold line -->
    <div class="h-1 bg-gradient-to-r from-brand-red via-brand-gold to-brand-red"></div>
  </section>
</template>
