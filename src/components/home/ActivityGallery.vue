<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { supabase } from '@/lib/supabase'
import { activityImages as staticActivityImages } from '@/data/content.js'

const modules = [Autoplay]

// จัดกลุ่มอัลบั้ม (Mock data for now based on available images)
const albums = ref([
  {
    id: 1,
    title: 'บรรยากาศสำนักงาน',
    description: 'ความพร้อมในการให้บริการและทีมงานมืออาชีพ',
    cover: '/pic/head/office 1.webp',
    images: [
      { url: '/pic/head/office 1.webp', alt: 'บรรยากาศภายในสำนักงานคชรักษ์การบัญชีและกฎหมาย' },
      { url: '/pic/head/office 2.webp', alt: 'พื้นที่ทำงานของทีมบัญชี' },
      { url: '/pic/head/office 3.webp', alt: 'ห้องประชุมให้คำปรึกษาลูกค้า' }
    ]
  },
  {
    id: 2,
    title: 'งานบริการด้านบัญชี',
    description: 'การทำงานที่ละเอียดแม่นยำทุกขั้นตอน',
    cover: '/pic/head/office 8.webp',
    images: [
      { url: '/pic/head/office 8.webp', alt: 'ทีมงานกำลังตรวจสอบเอกสารบัญชี' },
      { url: '/pic/head/office 4.webp', alt: 'การจัดทำงบการเงินรายเดือน' },
      { url: '/pic/head/office 5.webp', alt: 'การวางระบบบัญชีให้ลูกค้า' }
    ]
  },
  {
    id: 3,
    title: 'กิจกรรมคชรักษ์',
    description: 'ภาพความประทับใจจากการทำงานและกิจกรรมต่างๆ',
    cover: '/pic/head/office 7.webp',
    images: [
      { url: '/pic/head/office 7.webp', alt: 'กิจกรรมทีมบิลดิ้งของคชรักษ์' },
      { url: '/pic/head/office 6.webp', alt: 'งานสัมมนาความรู้ด้านภาษี' },
      { url: '/pic/head/office 2.webp', alt: 'บรรยากาศการทำงานร่วมกัน' }
    ]
  },
  {
    id: 4,
    title: 'ทีมงานที่ปรึกษา',
    description: 'พร้อมให้คำปรึกษาด้านกฎหมายและบัญชี',
    cover: '/pic/head/office 3.webp',
    images: [
      { url: '/pic/head/office 3.webp', alt: 'ทีมที่ปรึกษาด้านกฎหมาย' },
      { url: '/pic/head/office 1.webp', alt: 'การประชุมทีมงาน' },
      { url: '/pic/head/office 5.webp', alt: 'ที่ปรึกษาให้คำแนะนำลูกค้า' }
    ]
  }
])

const activeAlbum = ref(null)
const isLightboxOpen = ref(false)
const currentImageIndex = ref(0)
const hoveredAlbumId = ref(null)
const previewImageIndex = ref(0)
const isLoading = ref(true)
let previewInterval = null

const fetchGalleryImages = async () => {
  try {
    const { data, error } = await supabase
      .from('site_assets')
      .select('*')
      .or('type.eq.gallery,type.like.gallery:%')
      .order('order_index', { ascending: true })
    
    if (error) throw error
    
    if (data && data.length > 0) {
      const groups = {}
      data.forEach(item => {
        let albumName = 'บรรยากาศทั่วไป'
        if (item.type.includes(':')) {
          albumName = item.type.split(':')[1]
        }
        
        if (!groups[albumName]) {
          groups[albumName] = {
            title: albumName,
            images: [],
            cover: item.url
          }
        }
        groups[albumName].images.push({
          url: item.url,
          alt: item.alt_text || `ภาพจากอัลบั้ม ${albumName}`
        })
      })

      const dynamicAlbums = Object.values(groups).map((group, index) => ({
        id: index + 1,
        title: group.title,
        description: `รวมภาพกิจกรรมในอัลบั้ม ${group.title}`,
        cover: group.cover,
        images: group.images
      }))

      albums.value = dynamicAlbums
    }
  } catch (err) {
    console.error('Error fetching gallery images:', err)
    // Fallback: ใช้ static data ที่มีอยู่แล้ว
  } finally {
    isLoading.value = false
  }
}

const handleMouseEnter = (albumId) => {
  hoveredAlbumId.value = albumId
  previewImageIndex.value = 0
  const album = albums.value.find(a => a.id === albumId)
  if (album && album.images.length > 1) {
    previewInterval = setInterval(() => {
      previewImageIndex.value = (previewImageIndex.value + 1) % album.images.length
    }, 1200)
  }
}

const handleMouseLeave = () => {
  hoveredAlbumId.value = null
  if (previewInterval) {
    clearInterval(previewInterval)
    previewInterval = null
  }
}

const openAlbum = (album) => {
  activeAlbum.value = album
  currentImageIndex.value = 0
  isLightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isLightboxOpen.value = false
  activeAlbum.value = null
  document.body.style.overflow = 'auto'
}

const nextImage = () => {
  if (!activeAlbum.value) return
  currentImageIndex.value = (currentImageIndex.value + 1) % activeAlbum.value.images.length
}

const prevImage = () => {
  if (!activeAlbum.value) return
  currentImageIndex.value = (currentImageIndex.value - 1 + activeAlbum.value.images.length) % activeAlbum.value.images.length
}

onMounted(() => {
  fetchGalleryImages()
})

onUnmounted(() => {
  if (previewInterval) {
    clearInterval(previewInterval)
    previewInterval = null
  }
  // Restore body overflow in case lightbox was open
  document.body.style.overflow = 'auto'
})

// Helper to get image URL (supports both old string[] and new {url, alt}[] format)
const getImageUrl = (img) => typeof img === 'string' ? img : img.url
const getImageAlt = (img, fallback = '') => typeof img === 'string' ? fallback : (img.alt || fallback)
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
          ภาพบรรยากาศการทำงานและกิจกรรมต่างๆ ของทีมงานคชรักษ์ฯ
        </p>
      </div>
    </div>
    
    <!-- Top gold line -->
    <div class="h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent mb-2"></div>
    
    <div class="py-2 max-w-[2000px] mx-auto">
      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="flex gap-6 px-6 md:px-12 overflow-hidden">
        <div v-for="n in 4" :key="n" class="flex-shrink-0 w-[280px] md:w-[320px] h-[400px] rounded-2xl bg-gray-800 overflow-hidden relative">
          <div class="absolute inset-0 skeleton-shimmer"></div>
          <div class="absolute bottom-0 left-0 right-0 p-6">
            <div class="w-20 h-5 bg-gray-700 rounded-full mb-3 skeleton-shimmer"></div>
            <div class="w-40 h-6 bg-gray-700 rounded mb-2 skeleton-shimmer"></div>
            <div class="w-32 h-4 bg-gray-700 rounded skeleton-shimmer"></div>
          </div>
        </div>
      </div>

      <!-- Albums Swiper -->
      <Swiper
        v-else
        :modules="modules"
        :slidesPerView="1.2"
        :spaceBetween="12"
        :loop="true"
        :breakpoints="{
          640: { slidesPerView: 2.2, spaceBetween: 16 },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: { slidesPerView: 3.5, spaceBetween: 24 },
          1280: { slidesPerView: 4, spaceBetween: 30 },
          1536: { slidesPerView: 4.5, spaceBetween: 32 }
        }"
        class="w-full !px-6 md:!px-12"
      >
        <SwiperSlide 
          v-for="album in albums" 
          :key="album.id"
          class="!h-[400px] py-4"
        >
          <div 
            class="h-full w-full relative group cursor-pointer rounded-2xl overflow-hidden bg-gray-800 shadow-xl transition-all duration-500 hover:-translate-y-2"
            @mouseenter="handleMouseEnter(album.id)"
            @mouseleave="handleMouseLeave"
            @click="openAlbum(album)"
          >
            <!-- Album Images (Hover Swap) -->
            <div class="absolute inset-0 w-full h-full">
              <transition-group name="fade">
                <img 
                  v-for="(img, idx) in album.images"
                  v-show="hoveredAlbumId === album.id ? previewImageIndex === idx : idx === 0"
                  :key="getImageUrl(img)"
                  :src="getImageUrl(img)" 
                  :alt="getImageAlt(img, `${album.title} - ภาพที่ ${idx + 1}`)"
                  class="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                  :class="hoveredAlbumId === album.id ? 'scale-110' : 'scale-100'"
                  loading="lazy"
                >
              </transition-group>
            </div>

            <!-- Overlay Gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            
            <!-- Album Info -->
            <div class="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <div class="flex items-center gap-2 mb-2">
                <span class="bg-brand-gold/90 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {{ album.images.length }} Photos
                </span>
              </div>
              <h3 class="text-xl font-bold text-white mb-1 group-hover:text-brand-gold transition-colors">{{ album.title }}</h3>
              <p class="text-gray-300 text-xs line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {{ album.description }}
              </p>
            </div>

            <!-- Hover Icon -->
            <div class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
              <i class="fas fa-expand-alt text-white"></i>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- Custom Lightbox Modal -->
    <Transition name="modal">
      <div v-if="isLightboxOpen" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10" @click.self="closeLightbox">
        <!-- Close Button -->
        <button @click="closeLightbox" class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-3xl z-[110]" aria-label="ปิดหน้าต่างดูรูปภาพ">
          <i class="fas fa-times"></i>
        </button>

        <!-- Navigation Buttons -->
        <button @click="prevImage" class="absolute left-4 md:left-10 text-white/30 hover:text-white transition-colors text-4xl z-[110]" aria-label="รูปภาพก่อนหน้า">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button @click="nextImage" class="absolute right-4 md:right-10 text-white/30 hover:text-white transition-colors text-4xl z-[110]" aria-label="รูปภาพถัดไป">
          <i class="fas fa-chevron-right"></i>
        </button>

        <!-- Main Content -->
        <div class="relative w-full max-w-5xl h-full flex flex-col items-center justify-center gap-6">
          <!-- Album Header -->
          <div class="text-center animate-fade-in-down">
            <h4 class="text-brand-gold font-bold tracking-widest uppercase text-sm mb-1">{{ activeAlbum?.title }}</h4>
            <p class="text-white/60 text-xs">{{ currentImageIndex + 1 }} / {{ activeAlbum?.images.length }}</p>
          </div>

          <!-- Image Display -->
          <div class="relative w-full flex-1 flex items-center justify-center overflow-hidden rounded-xl">
            <Transition name="slide-fade" mode="out-in">
              <img 
                :key="currentImageIndex"
                :src="getImageUrl(activeAlbum?.images[currentImageIndex])" 
                :alt="getImageAlt(activeAlbum?.images[currentImageIndex], `${activeAlbum?.title} - ภาพที่ ${currentImageIndex + 1}`)"
                class="max-w-full max-h-full object-contain shadow-2xl rounded-lg"
              >
            </Transition>
          </div>

          <!-- Thumbnail Strip -->
          <div class="flex gap-2 overflow-x-auto py-2 max-w-full no-scrollbar">
            <button 
              v-for="(img, idx) in activeAlbum?.images" 
              :key="idx"
              @click="currentImageIndex = idx"
              class="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all"
              :class="currentImageIndex === idx ? 'border-brand-gold scale-110' : 'border-transparent opacity-50 hover:opacity-100'"
              :aria-label="`ดูภาพที่ ${idx + 1}`"
            >
              <img :src="getImageUrl(img)" :alt="getImageAlt(img, `thumbnail ${idx + 1}`)" class="w-full h-full object-cover">
            </button>
          </div>
        </div>
      </div>
    </Transition>
    
    <!-- Bottom gold line -->
    <div class="h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent mt-2"></div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

/* Image Slide Transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in-down {
  animation: fade-in-down 0.5s ease-out;
}

/* Skeleton Loading Shimmer */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton-shimmer {
  background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.08) 50%, transparent 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
}
</style>
