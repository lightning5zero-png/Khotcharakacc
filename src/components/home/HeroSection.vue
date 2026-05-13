<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { supabase } from '@/lib/supabase'
import { heroImages as staticHeroImages } from '@/data/content.js'

const modules = [Autoplay, EffectFade, Pagination]
const heroImages = ref([...staticHeroImages])
const latestNews = ref([
  { id: 1, title: 'คชรักษ์ฯ รับทำบัญชีและภาษีครบวงจร', slug: '#' },
  { id: 2, title: 'บริการจดทะเบียนบริษัท ห้างหุ้นส่วน ทั่วประเทศ', slug: '#' },
  { id: 3, title: 'ให้คำปรึกษาด้านกฎหมายโดยทนายความมืออาชีพ', slug: '#' },
  { id: 4, title: 'รับตรวจสอบบัญชีโดยผู้สอบบัญชีรับอนุญาต (CPA)', slug: '#' },
  { id: 5, title: 'วางแผนภาษีอากร สำหรับธุรกิจ SME', slug: '#' },
  { id: 6, title: 'บริการยื่น Visa และ Work Permit ครบจบในที่เดียว', slug: '#' }
])
const currentNewsIndex = ref(0)
let newsInterval = null

const fetchHeroImages = async () => {
  try {
    const { data, error } = await supabase
      .from('site_assets')
      .select('url')
      .eq('type', 'hero')
      .eq('active', true)
      .order('order_index', { ascending: true })
    
    if (error) throw error
    if (data && data.length > 0) {
      heroImages.value = data.map(item => item.url)
    }
  } catch (err) {
    console.error('Error fetching hero images:', err)
  }
}

const fetchLatestNews = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, title, slug')
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (error) throw error
    if (data && data.length > 0) {
      latestNews.value = data
    }
    startNewsTicker()
  } catch (err) {
    console.error('Error fetching news:', err)
    startNewsTicker() // Ensure ticker starts even if fetch fails
  }
}

const startNewsTicker = () => {
  if (latestNews.value.length <= 1) return
  newsInterval = setInterval(() => {
    currentNewsIndex.value = (currentNewsIndex.value + 1) % latestNews.value.length
  }, 5000)
}

onMounted(() => {
  fetchHeroImages()
  fetchLatestNews()
})

onUnmounted(() => {
  if (newsInterval) {
    clearInterval(newsInterval)
    newsInterval = null
  }
})
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
            <img :src="image" :alt="`บรรยากาศบริษัท คชรักษ์การบัญชีและกฎหมาย จำกัด - ภาพที่ ${index + 1}`" class="w-full h-full object-cover" :loading="index === 0 ? 'eager' : 'lazy'" :fetchpriority="index === 0 ? 'high' : 'auto'">
            <!-- Gradients for readability -->
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-[1]"></div>
            <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-transparent h-1/2 z-[2]"></div>
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
            {{ t('hero.badge') }}
          </span>
        </div>

        <!-- Main Heading -->
        <h1 
          class="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.15] mb-6"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <span class="!text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">{{ t('hero.title_part1') }}</span>
          <br>
          <span class="!text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">{{ t('hero.title_part2') }}</span>
          <span class="!text-[#D4AF37] ml-2 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">{{ t('hero.title_part3') }}</span>
        </h1>

        <!-- Description -->
        <p 
          class="text-lg text-white/90 leading-relaxed mb-8 max-w-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {{ t('hero.description') }}
        </p>

        <!-- CTA Buttons -->
        <div 
          class="flex flex-col sm:flex-row gap-4 mb-12"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <a href="#contact" class="btn-gold flex items-center justify-center gap-3 shadow-xl">
            <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
            {{ t('hero.consult_free') }}
          </a>
          <a href="tel:035951545" class="btn-red flex items-center justify-center gap-3 shadow-xl">
            <i class="fa-solid fa-phone" aria-hidden="true"></i>
            035-951-545
          </a>
        </div>

        <!-- Trust Badges -->
        <div 
          class="inline-flex flex-wrap gap-6 p-4 bg-black/40 backdrop-blur-sm rounded-2xl"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
              <i class="fa-solid fa-shield-check text-brand-gold" aria-hidden="true"></i>
            </div>
            <div>
              <div class="text-white font-semibold text-sm">{{ t('hero.pro') }}</div>
              <div class="text-white/70 text-xs">{{ t('hero.years') }}</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center">
              <i class="fa-solid fa-scale-balanced text-brand-red" aria-hidden="true"></i>
            </div>
            <div>
              <div class="text-white font-semibold text-sm">{{ t('hero.legal') }}</div>
              <div class="text-white/70 text-xs">100%</div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <i class="fa-solid fa-bolt text-green-600" aria-hidden="true"></i>
            </div>
            <div>
              <div class="text-white font-semibold text-sm">{{ t('hero.fast') }}</div>
              <div class="text-white/70 text-xs">{{ t('hero.instant') }}</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <!-- Horizontal News Ticker Bar -->
    <div 
      v-if="latestNews.length > 0"
      class="absolute bottom-0 left-0 right-0 z-40 bg-white/5 backdrop-blur-xl border-t border-white/10"
      data-aos="fade-up"
      data-aos-offset="0"
    >
      <div class="container mx-auto">
        <div class="flex items-center h-14 md:h-16">
          <!-- Label -->
          <div class="flex-shrink-0 bg-brand-gold px-4 md:px-8 h-full flex items-center gap-2 skew-x-[-15deg] -ml-4 md:-ml-6 relative z-10 shadow-[5px_0_15px_rgba(0,0,0,0.3)]">
            <div class="skew-x-[15deg] flex items-center gap-2">
              <i class="fa-solid fa-bullhorn text-white"></i>
              <span class="text-white font-black text-xs md:text-sm uppercase tracking-tighter">{{ t('hero.latest_updates') }}</span>
            </div>
          </div>

          <!-- News Slider -->
          <div class="flex-1 overflow-hidden px-4 md:px-10">
            <Swiper
              :modules="[Autoplay]"
              :slidesPerView="1"
              :spaceBetween="30"
              :loop="true"
              :speed="1000"
              :autoplay="{
                delay: 6000,
                disableOnInteraction: false
              }"
              class="w-full"
            >
              <!-- Slide Group (Show 3 items on Desktop) -->
              <SwiperSlide v-for="i in Math.ceil(latestNews.length / 3)" :key="i">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 py-1">
                  <div 
                    v-for="(news, idx) in latestNews.slice((i-1)*3, i*3)" 
                    :key="news.id"
                    class="flex items-center gap-3 group/item cursor-pointer w-full md:w-auto"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-brand-gold group-hover/item:scale-150 transition-transform"></span>
                    <component 
                      :is="news.slug && news.slug !== '#' ? 'router-link' : 'span'"
                      :to="news.slug && news.slug !== '#' ? `/articles/${news.slug}` : undefined"
                      class="text-white/80 group-hover/item:text-brand-gold text-xs md:text-sm font-medium transition-colors truncate max-w-[250px]"
                      :class="{ 'cursor-default': !news.slug || news.slug === '#' }"
                    >
                      {{ news.title }}
                    </component>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <!-- All News Link -->
          <router-link 
            to="/articles" 
            class="flex-shrink-0 hidden md:flex items-center gap-2 text-white/50 hover:text-brand-gold px-6 text-xs transition-colors group"
          >
            <span>{{ t('hero.view_all') }}</span>
            <i class="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform"></i>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

@keyframes pulse-gold {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
