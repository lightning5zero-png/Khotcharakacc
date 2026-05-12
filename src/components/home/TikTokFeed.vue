<script setup>
import { onMounted } from 'vue'

const tiktokHandle = 'khotcharakaccounting'

onMounted(() => {
  // โหลดสคริปต์ TikTok
  if (!document.getElementById('tiktok-embed-script')) {
    const script = document.createElement('script')
    script.id = 'tiktok-embed-script'
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    document.body.appendChild(script)
  } else {
    if (window.tiktok && typeof window.tiktok.render === 'function') {
      window.tiktok.render()
    }
  }
})
</script>

<template>
  <section class="py-24 bg-brand-red text-white relative overflow-hidden">
    <!-- Pattern overlay (Same as Service Grid) -->
    <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><circle cx=%2240%22 cy=%2240%22 r=%222%22 fill=%22%23D4AF37%22/></svg>'); background-size: 40px 40px;"></div>
    
    <!-- Gradient orbs (Same as Service Grid) -->
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
          
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            ใกล้ชิดกับเรามากขึ้น<br>
            ผ่าน <span class="text-brand-gold drop-shadow-lg">TikTok</span>
          </h2>
          
          <p class="text-white/80 text-xl mb-10 leading-relaxed max-w-xl font-light">
            พบกับสาระความรู้ด้านบัญชีและภาษีในรูปแบบวิดีโอสั้น เข้าใจง่าย และสนุกสนาน พร้อมเบื้องหลังการทำงานที่คชรักษ์
          </p>

          <!-- Social Stats/Features -->
          <div class="grid grid-cols-2 gap-8 mb-12">
            <div class="border-l-4 border-brand-gold pl-5 py-1">
              <div class="text-2xl font-bold text-white mb-1">Update</div>
              <div class="text-white/60 text-sm tracking-wider uppercase">คลิปใหม่ทุกวัน</div>
            </div>
            <div class="border-l-4 border-brand-gold pl-5 py-1">
              <div class="text-2xl font-bold text-white mb-1">Easy</div>
              <div class="text-white/60 text-sm tracking-wider uppercase">สาระที่เข้าใจง่าย</div>
            </div>
          </div>

          <a 
            :href="`https://www.tiktok.com/@${tiktokHandle}`" 
            target="_blank" 
            class="inline-flex items-center gap-5 bg-white text-brand-red hover:bg-brand-gold hover:text-black font-bold py-4 px-12 rounded-2xl transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group text-lg"
          >
            <span>กดติดตามที่นี่</span>
            <div class="w-10 h-10 rounded-xl bg-brand-red text-white flex items-center justify-center group-hover:bg-black transition-colors shadow-lg">
              <i class="fa-solid fa-plus group-hover:rotate-90 transition-transform"></i>
            </div>
          </a>
        </div>

        <!-- Right Side: TikTok Widget -->
        <div class="lg:w-1/2 w-full" data-aos="fade-left">
          <div class="relative px-4">
            <!-- Decorative Elements -->
            <div class="absolute -top-10 -right-4 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute -bottom-10 -left-4 w-40 h-40 bg-black/40 rounded-full blur-3xl"></div>
            
            <!-- The Widget Card -->
            <div class="relative bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden border-8 border-white/5 group hover:border-brand-gold/30 transition-all duration-700">
              <blockquote 
                class="tiktok-embed" 
                :cite="`https://www.tiktok.com/@${tiktokHandle}`" 
                :data-unique-id="tiktokHandle" 
                data-embed-type="creator" 
                style="max-width: 100%; min-width: 288px;"
              >
                <section>
                  <a target="_blank" :href="`https://www.tiktok.com/@${tiktokHandle}?refer=creator_embed`">
                    กำลังดึงข้อมูล @{{ tiktokHandle }}...
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
/* ปรับแต่งให้ TikTok Embed กลมกลืน */
:deep(.tiktok-embed) {
  margin: 0 !important;
  width: 100% !important;
  border: none !important;
}

/* ซ่อนพวก scrollbar ที่อาจจะโผล่มา */
.tiktok-embed::-webkit-scrollbar {
  display: none;
}
</style>
