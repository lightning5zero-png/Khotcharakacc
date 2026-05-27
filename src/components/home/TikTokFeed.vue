<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const tiktokHandle = 'khotcharakaccounting'
const isLoaded = ref(false)
const isError = ref(false)
const sectionRef = ref(null)

const loadTikTokScript = () => {
  if (isLoaded.value || isError.value) return

  // Timeout if TikTok takes too long (8 seconds)
  const timeout = setTimeout(() => {
    const embed = document.querySelector('.tiktok-embed')
    // If TikTok haven't injected their iframe yet
    if (embed && !embed.querySelector('iframe')) {
      isError.value = true
    }
  }, 8000)

  if (!document.getElementById('tiktok-embed-script')) {
    const script = document.createElement('script')
    script.id = 'tiktok-embed-script'
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    script.onload = () => {
      clearTimeout(timeout)
      isLoaded.value = true
    }
    document.body.appendChild(script)
  } else {
    if (window.tiktok && typeof window.tiktok.render === 'function') {
      window.tiktok.render()
      clearTimeout(timeout)
      isLoaded.value = true
    }
  }
}

onMounted(() => {
  // Use intersection observer to load only when visible
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadTikTokScript()
      observer.disconnect()
    }
  }, { threshold: 0.1 })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<template>
  <section ref="sectionRef" class="py-24 bg-brand-red text-white relative overflow-hidden">
    <!-- Pattern overlay -->
    <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><circle cx=%2240%22 cy=%2240%22 r=%222%22 fill=%22%23D4AF37%22/></svg>'); background-size: 40px 40px;"></div>
    
    <!-- Gradient orbs -->
    <div class="absolute top-0 left-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-black/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <!-- Left Side: Content -->
        <div class="lg:w-1/2 text-left" data-aos="fade-right">
          <div class="inline-flex items-center gap-3 mb-6 bg-white/10 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm">
            <i class="fa-brands fa-tiktok text-brand-gold"></i>
            <span class="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase font-medium">Social Community</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {{ t('tiktok.title_1') }}<br>
            {{ t('tiktok.title_2') }} <span class="text-brand-gold drop-shadow-lg">TikTok</span>
          </h2>
          
          <p class="text-white/80 text-lg mb-8 max-w-xl">
            {{ t('tiktok.description') }}
          </p>

          <div class="space-y-4 mb-12">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <i class="fa-solid fa-video text-brand-gold"></i>
              </div>
              <div class="text-white/60 text-sm tracking-wider uppercase">{{ t('tiktok.feature_1') }}</div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <i class="fa-solid fa-lightbulb text-brand-gold"></i>
              </div>
              <div class="text-white/60 text-sm tracking-wider uppercase">{{ t('tiktok.feature_2') }}</div>
            </div>
          </div>

          <a 
            :href="`https://www.tiktok.com/@${tiktokHandle}`" 
            target="_blank" 
            class="inline-flex items-center gap-5 bg-white text-brand-red hover:bg-brand-gold hover:text-black font-bold py-4 px-12 rounded-2xl transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group text-lg"
          >
            <div class="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center group-hover:bg-black transition-colors shadow-lg">
              <i class="fa-brands fa-tiktok text-xl group-hover:scale-110 transition-transform"></i>
            </div>
            <span>{{ t('tiktok.follow_btn') }}</span>
          </a>
        </div>

        <!-- Right Side: TikTok Widget -->
        <div class="lg:w-1/2 w-full" data-aos="fade-left">
          <div class="relative px-4">
            <!-- Decorative Elements -->
            <div class="absolute -top-10 -right-4 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute -bottom-10 -left-4 w-40 h-40 bg-black/40 rounded-full blur-3xl"></div>
            
            <!-- The Widget Card -->
            <div class="relative min-h-[500px] bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden border-8 border-white/5 group hover:border-brand-gold/30 transition-all duration-700 flex items-center justify-center">
              
              <!-- Fallback CTA (Show if error or taking too long) -->
              <div v-if="isError" class="p-8 text-center animate-fade-in">
                <div class="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i class="fa-brands fa-tiktok text-brand-red text-4xl"></i>
                </div>
                <h3 class="text-gray-900 text-2xl font-bold mb-4">{{ t('tiktok.app_title') }}</h3>
                <p class="text-gray-500 mb-8">{{ t('tiktok.app_desc') }}</p>
                <a 
                  :href="`https://www.tiktok.com/@${tiktokHandle}`"
                  target="_blank"
                  class="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-900 transition-all hover:scale-[1.02] shadow-xl shadow-black/20"
                >
                  <i class="fa-brands fa-tiktok"></i>
                  {{ t('tiktok.open_app') }}{{ tiktokHandle }}
                </a>
              </div>

              <!-- Skeleton Loader (Show while not loaded and no error) -->
              <div v-if="!isLoaded && !isError" class="absolute inset-0 bg-gray-50 p-6 flex flex-col gap-4">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                  <div class="flex-1">
                    <div class="w-32 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div class="w-20 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div class="flex-1 bg-gray-200 rounded-2xl animate-pulse"></div>
                <div class="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>

              <!-- Real Embed (Hidden until loaded, or shown and script will handle visibility) -->
              <blockquote 
                v-show="!isError"
                class="tiktok-embed" 
                :cite="`https://www.tiktok.com/@${tiktokHandle}`" 
                :data-unique-id="tiktokHandle" 
                data-embed-type="creator" 
                style="max-width: 100%; min-width: 288px; margin: 0;"
              >
                <section>
                  <a target="_blank" :href="`https://www.tiktok.com/@${tiktokHandle}?refer=creator_embed`">
                    {{ t('tiktok.loading') }}{{ tiktokHandle }}...
                  </a>
                </section>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(.tiktok-embed) {
  margin: 0 !important;
  width: 100% !important;
  border: none !important;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>

