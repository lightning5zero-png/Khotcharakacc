<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { heroImages } from '@/data/content.js'

const modules = [Autoplay, EffectFade, Pagination]
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden bg-gray-100">
    <!-- Background Image Carousel -->
    <div class="absolute inset-0 z-0">
      <Swiper
        :modules="modules"
        :loop="true"
        effect="fade"
        :speed="2000"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false
        }"
        :pagination="{
          clickable: true
        }"
        class="w-full h-full"
      >
        <SwiperSlide v-for="(image, index) in heroImages" :key="index">
          <div class="w-full h-full relative">
            <img :src="image" :alt="`Hero ${index + 1}`" class="w-full h-full object-cover">
            <!-- ทำให้ดูรูปได้ชัดขึ้น ลด overlay -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent"></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Gold accent line -->
    <div class="absolute left-0 top-0 w-1.5 h-full bg-gradient-to-b from-brand-gold via-brand-red to-brand-gold z-10"></div>

    <!-- Content -->
    <div class="container mx-auto px-6 relative z-20 pt-24">
      <div class="max-w-2xl">
        <!-- Badge -->
        <div 
          class="inline-flex items-center gap-3 mb-6"
          data-aos="fade-right"
        >
          <div class="w-12 h-[2px] bg-brand-gold"></div>
          <span class="text-brand-gold text-sm font-bold tracking-[0.15em] uppercase">
            คชรักษ์การบัญชีและกฎหมาย
          </span>
        </div>

        <!-- Main Heading -->
        <h1 
          class="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.15] mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span class="!text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">ยกระดับธุรกิจ</span>
          <br>
          <span class="!text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">สู่</span>
          <span class="!text-[#D4AF37] ml-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">มาตรฐานสากล</span>
        </h1>

        <!-- Description -->
        <p 
          class="text-lg text-white/90 leading-relaxed mb-8 max-w-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          บริการบัญชี ภาษี และกฎหมายครบวงจร โดยทีมผู้เชี่ยวชาญมืออาชีพ 
          พร้อมดูแลธุรกิจของคุณอย่างใกล้ชิด
        </p>

        <!-- CTA Buttons -->
        <div 
          class="flex flex-col sm:flex-row gap-4 mb-12"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <a href="#contact" class="btn-gold flex items-center justify-center gap-3 shadow-xl">
            <i class="fa-solid fa-calendar-check"></i>
            นัดปรึกษาฟรี
          </a>
          <a href="tel:035951545" class="btn-red flex items-center justify-center gap-3 shadow-xl">
            <i class="fa-solid fa-phone"></i>
            035-951-545
          </a>
        </div>

        <!-- Trust Badges -->
        <div 
          class="flex flex-wrap gap-6 p-4 bg-black/40 backdrop-blur-sm rounded-2xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
              <i class="fa-solid fa-shield-check text-brand-gold"></i>
            </div>
            <div>
              <div class="text-white font-semibold text-sm">มืออาชีพ</div>
              <div class="text-white/70 text-xs">10+ ปี</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center">
              <i class="fa-solid fa-scale-balanced text-brand-red"></i>
            </div>
            <div>
              <div class="text-white font-semibold text-sm">ถูกกฎหมาย</div>
              <div class="text-white/70 text-xs">100%</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <i class="fa-solid fa-bolt text-green-600"></i>
            </div>
            <div>
              <div class="text-white font-semibold text-sm">รวดเร็ว</div>
              <div class="text-white/70 text-xs">ทันใจ</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 animate-bounce">
      <span class="text-white text-xs tracking-widest uppercase font-medium">Scroll</span>
      <i class="fa-solid fa-chevron-down text-white"></i>
    </div>
  </section>
</template>
