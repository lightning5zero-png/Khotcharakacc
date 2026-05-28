<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const tiktokHandle = 'khotcharakaccounting'

onMounted(() => {
  // TikTok script injection (Vue doesn't execute <script> tags inside templates)
  if (!document.getElementById('tiktok-embed-script')) {
    const script = document.createElement('script')
    script.id = 'tiktok-embed-script'
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  } else if (window.tiktok && typeof window.tiktok.render === 'function') {
    window.tiktok.render()
  }
})
</script>

<template>
  <section class="py-24 bg-brand-red text-white relative overflow-hidden">
    <!-- Pattern overlay -->
    <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><circle cx=%2240%22 cy=%2240%22 r=%222%22 fill=%22%23D4AF37%22/></svg>'); background-size: 40px 40px;"></div>
    
    <!-- Gradient orbs -->
    <div class="absolute top-0 left-0 w-80 h-80 bg-brand-gold/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-black/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <!-- Left Side: Content -->
        <div class="lg:w-1/2 text-left" data-aos="fade-right">
          <div class="inline-flex items-center gap-3 mb-6 bg-white/10 px-6 py-2 rounded-full border border-white/20 backdrop-blur-sm">
            <i class="fa-brands fa-tiktok text-brand-gold"></i>
            <span class="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase">Social Community</span>
          </div>
          
          <h2 class="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {{ t('tiktok.title_1') }}<br>
            {{ t('tiktok.title_2') }} <span class="text-brand-gold drop-shadow-lg">TikTok</span>
          </h2>
          
          <p class="text-white/80 text-lg mb-8 max-w-xl leading-relaxed">
            {{ t('tiktok.description') }}
          </p>

          <div class="space-y-4 mb-12">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <i class="fa-solid fa-video text-brand-gold"></i>
              </div>
              <div class="text-white/80 font-medium tracking-wide">{{ t('tiktok.feature_1') }}</div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <i class="fa-solid fa-lightbulb text-brand-gold"></i>
              </div>
              <div class="text-white/80 font-medium tracking-wide">{{ t('tiktok.feature_2') }}</div>
            </div>
          </div>

          <a 
            :href="`https://www.tiktok.com/@${tiktokHandle}`" 
            target="_blank" 
            class="inline-flex items-center gap-4 bg-white text-brand-red hover:bg-brand-gold hover:text-black font-bold py-4 px-10 rounded-2xl transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group text-lg"
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
            <div class="absolute -top-10 -right-10 w-32 h-32 bg-brand-gold/30 rounded-full blur-2xl animate-pulse"></div>
            <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-black/40 rounded-full blur-2xl"></div>
            
            <!-- Widget Container -->
            <div class="relative bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] overflow-hidden border-8 border-white/5 flex items-center justify-center min-h-[500px]">
              <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@khotcharakaccounting" data-unique-id="khotcharakaccounting" data-embed-type="creator" style="max-width: 780px; min-width: 288px; margin: 0;" > 
                <section> 
                  <a target="_blank" href="https://www.tiktok.com/@khotcharakaccounting?refer=creator_embed">@khotcharakaccounting</a> 
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
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.group:hover .fa-heart {
  animation: float 2s ease-in-out infinite;
}
</style>

