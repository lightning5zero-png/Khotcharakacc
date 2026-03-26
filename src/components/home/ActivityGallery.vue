<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { supabase } from '@/lib/supabase'
import { activityImages as staticActivityImages } from '@/data/content.js'

const modules = [Autoplay]
const activityImages = ref([...staticActivityImages])

const fetchGalleryImages = async () => {
  try {
    const { data, error } = await supabase
      .from('site_assets')
      .select('url')
      .eq('type', 'gallery')
      .eq('active', true)
      .order('order_index', { ascending: true })
    
    if (error) throw error
    if (data && data.length > 0) {
      activityImages.value = data.map(item => item.url)
    }
  } catch (err) {
    console.error('Error fetching gallery images:', err)
  }
}

onMounted(() => {
  fetchGalleryImages()
})
</script>

<template>
  <section class="py-16 relative overflow-hidden bg-gray-900">
    <!-- Section Header -->
    <div class="container mx-auto px-6 mb-10 relative z-10">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <div data-aos="fade-right">
          <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-3 bg-brand-gold/10 px-4 py-2 rounded-full">Gallery</span>
          <h2 class="text-2xl md:text-3xl font-bold text-white">กิจกรรมของเรา</h2>
        </div>
        <p class="text-gray-400 text-sm md:text-base max-w-md text-center md:text-right" data-aos="fade-left">
          ภาพบรรยากาศการทำงานและกิจกรรมต่างๆ ของทีมงานคชรักษ์
        </p>
      </div>
    </div>
    
    <!-- Top gold line -->
    <div class="h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent mb-2"></div>
    
    <div class="py-2">
      <Swiper
        :modules="modules"
        :slidesPerView="1.5"
        :spaceBetween="4"
        :loop="true"
        :speed="5000"
        :autoplay="{
          delay: 0,
          disableOnInteraction: false
        }"
        :breakpoints="{
          640: { slidesPerView: 2.5, spaceBetween: 4 },
          768: { slidesPerView: 3.5, spaceBetween: 6 },
          1024: { slidesPerView: 4.5, spaceBetween: 6 },
          1280: { slidesPerView: 5.5, spaceBetween: 8 }
        }"
        class="w-full"
      >
        <SwiperSlide 
          v-for="(image, index) in [...activityImages, ...activityImages]" 
          :key="index"
          class="!h-[300px] relative group cursor-pointer"
        >
          <img 
            :src="image" 
            :alt="`กิจกรรมคชรักษ์ ${(index % activityImages.length) + 1}`"
            class="h-full w-full object-cover rounded-lg brightness-90 group-hover:brightness-110 transition-all duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          >
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg opacity-60 group-hover:opacity-0 transition-all duration-500"></div>
        </SwiperSlide>
      </Swiper>
    </div>
    
    <!-- Bottom gold line -->
    <div class="h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent mt-2"></div>
  </section>
</template>
