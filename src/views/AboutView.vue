<script setup>
import { onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 1000,
    once: true
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#f8f9fa] pt-24 pb-20 overflow-hidden">
    <div class="container mx-auto px-6 max-w-7xl">
      <!-- Top Decorative Label -->
      <div class="flex justify-between items-center mb-12" data-aos="fade-down">
        <span class="text-[10px] md:text-xs font-bold tracking-[0.2em] text-brand-red uppercase">
          KHOTCHARAK ACCOUNTING AND LAW CO., LTD.
        </span>
        <div class="flex gap-2">
          <div class="w-8 h-8 rounded-full border border-brand-red/20"></div>
          <div class="w-8 h-8 rounded-full border border-brand-red/20"></div>
        </div>
      </div>

      <div class="relative grid grid-cols-1 lg:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden bg-white">
        <!-- Row 1 Left: About Content (Dark Red) -->
        <div class="bg-brand-red text-white p-8 md:p-16" data-aos="fade-right">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 tracking-tight">เกี่ยวกับบริษัท</h1>
          <div class="w-16 h-1 bg-white/20 mb-10"></div>
          
          <div class="space-y-6 text-lg font-light leading-relaxed opacity-90">
            <p class="font-bold text-brand-gold text-xl">บริษัท คชรักษ์การบัญชีและกฎหมาย จำกัด</p>
            <p>
              ก่อตั้งขึ้นเมื่อปี 2567 บริษัทเป็นผู้ดำเนินธุรกิจให้คำปรึกษา
              และวางแผนด้านระบบบัญชี ตรวจสอบบัญชี 
              และให้บริการด้านทะเบียนธุรกิจ
            </p>
          </div>
        </div>

        <!-- Row 1 Right: Main Image -->
        <div class="h-[350px] lg:h-auto relative overflow-hidden" data-aos="zoom-in">
          <img 
            src="/pic/head/about-puzzle.png" 
            alt="Khotcharak Teamwork" 
            class="w-full h-full object-cover"
          >
        </div>

        <!-- Row 2 Left: Motto Section (Dark Black) -->
        <div 
          class="bg-[#1a1a1a] p-8 md:p-12 border-t-4 border-brand-gold flex flex-col justify-center"
          data-aos="fade-up"
        >
          <h3 class="text-xl font-bold text-brand-gold mb-4 tracking-wider uppercase">คติพจน์</h3>
          <p class="text-white leading-relaxed text-base italic opacity-90">
            " บริษัทคชรักษ์การบัญชีและกฎหมาย มุ่งมั่นให้บริการด้วยความซื่อสัตย์ โปร่งใส และเข้าใจง่าย เพื่อยกระดับความรู้ทางบัญชี กฎหมาย และการบริหารธุรกิจของผู้ประกอบการให้เติบโตอย่างมั่นคง ยั่งยืน และมีศรัทธาในระบบ "
          </p>
        </div>

        <!-- Row 2 Right: Quote Box (White/Light Grey) -->
        <div 
          class="bg-gray-100 p-8 md:p-12 relative flex flex-col justify-center"
          data-aos="fade-left"
        >
          <div class="text-brand-red text-4xl mb-4 opacity-20">
            <i class="fas fa-quote-left"></i>
          </div>
          <blockquote class="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-6 relative z-10">
            “ เราจะไม่เป็นเพียงบริษัทบัญชีและกฎหมาย แต่เราเป็นที่พึ่งแห่งความเข้าใจ เป็นแสงที่ส่องในความซับซ้อนของกฎหมาย และเป็นร่มไม้แห่งความศรัทธาให้ผู้คนพักพิง ”
          </blockquote>
          <div class="flex flex-col items-end">
            <span class="text-sm font-bold text-brand-red tracking-widest uppercase text-right">Khotcharak Culture & Community</span>
            <span class="text-[10px] text-gray-500">Legacy Declaration, 2026</span>
          </div>
          
          <!-- Decorative line -->
          <div class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-red/10 to-transparent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1400px;
}
</style>
