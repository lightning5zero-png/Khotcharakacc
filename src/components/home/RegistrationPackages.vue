<script setup>
import { registrationPackages, serviceAreas } from '@/data/content.js'
</script>

<template>
  <section id="pricing" class="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-3xl"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-brand-gold/10 px-5 py-2.5 rounded-full">Registration</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">อัตราค่าบริการจดทะเบียน</h2>
        <p class="text-gray-500 text-lg">ราคารวมทุกอย่าง ไม่มีค่าใช้จ่ายซ่อนเร้น</p>
        <div class="w-20 h-1 bg-gradient-to-r from-brand-red to-brand-gold mx-auto mt-6 rounded-full"></div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        <div 
          v-for="(pkg, index) in registrationPackages" 
          :key="pkg.id"
          class="relative"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div 
            class="h-full rounded-2xl p-6 flex flex-col transition-all duration-500 relative overflow-hidden"
            :class="[
              pkg.featured 
                ? 'bg-gradient-to-b from-brand-gold/20 via-brand-gold/10 to-white border-2 border-brand-gold shadow-xl shadow-brand-gold/15 transform lg:-translate-y-4 hover:-translate-y-6' 
                : 'bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 hover:border-brand-gold/30'
            ]"
          >
            <!-- Featured Badge with shimmer -->
            <div 
              v-if="pkg.featured"
              class="absolute -top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-gold via-yellow-400 to-brand-gold text-white px-6 py-2 rounded-b-xl text-xs font-bold tracking-wider uppercase shadow-lg shimmer-badge"
            >
              ⭐ ยอดนิยม
            </div>

            <!-- Method Badge -->
            <div class="text-center mb-4" :class="pkg.featured ? 'mt-8' : ''">
              <span 
                class="inline-block px-4 py-1.5 rounded-full text-xs font-semibold"
                :class="[
                  pkg.featured 
                    ? 'bg-brand-gold text-white shadow-sm' 
                    : pkg.method === 'จดออนไลน์' 
                      ? 'bg-gray-100 text-gray-600' 
                      : 'bg-brand-red/10 text-brand-red'
                ]"
              >
                {{ pkg.method }}
              </span>
            </div>
            
            <h3 class="text-xl font-bold text-center text-gray-900 mb-3">{{ pkg.type }}</h3>
            
            <!-- Price -->
            <div class="text-center mb-6">
              <span 
                class="text-4xl font-bold"
                :class="pkg.featured ? 'text-brand-gold' : 'text-brand-red'"
              >
                {{ pkg.price }}
              </span>
              <span class="text-gray-400 text-sm ml-1">บาท</span>
            </div>
            
            <!-- Features -->
            <ul class="space-y-3 flex-1 mb-6 text-sm">
              <li 
                v-for="(feature, fIndex) in pkg.features" 
                :key="fIndex"
                class="flex items-center gap-3 text-gray-600"
              >
                <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                     :class="feature.includes('เหมาะสำหรับ') ? 'bg-blue-50' : 'bg-green-50'">
                  <i :class="feature.includes('เหมาะสำหรับ') ? 'fa-solid fa-info text-blue-500' : 'fa-solid fa-check text-green-500'" class="text-[10px]"></i>
                </div>
                <span :class="{ 'font-bold text-gray-800': feature.includes('+ บัญชี') }">{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA Button - all packages -->
            <a 
              href="#contact"
              class="block w-full py-3.5 text-center rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              :class="pkg.featured 
                ? 'bg-gradient-to-r from-brand-gold to-yellow-500 text-white hover:from-yellow-500 hover:to-brand-gold' 
                : 'bg-gray-100 text-gray-700 hover:bg-brand-red hover:text-white'"
            >
              {{ pkg.featured ? '🔥 ติดต่อเลย' : 'สนใจแพ็กเกจนี้' }}
            </a>
            
            <div class="text-center text-xs text-gray-400 mt-3">
              {{ pkg.note }}
            </div>
          </div>
        </div>
      </div>

      <!-- Service Areas -->
      <div 
        class="bg-white rounded-3xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-100"
        data-aos="fade-up"
      >
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center">
            <i class="fa-solid fa-car text-brand-red"></i>
          </div>
          <span class="font-bold text-gray-900 text-lg">พื้นที่ให้บริการ 12 จังหวัด</span>
          <span class="text-brand-gold font-semibold bg-brand-gold/10 px-3 py-1 rounded-full text-sm">(ไม่มีค่าเดินทาง)</span>
        </div>
        <div class="flex flex-wrap justify-center gap-2.5">
          <span 
            v-for="(area, index) in serviceAreas" 
            :key="index"
            class="px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/5 transition-all duration-300 cursor-default"
          >
            {{ area }}
          </span>
        </div>
        <div class="mt-5 text-center text-xs text-gray-400">
          * นอกพื้นที่ดังกล่าวมีค่าเดินทางเพิ่มเติม 1,000 - 2,000 บาท
        </div>
      </div>
    </div>
  </section>
</template>
