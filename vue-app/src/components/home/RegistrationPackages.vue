<script setup>
import { registrationPackages, serviceAreas } from '@/data/content.js'
</script>

<template>
  <section id="pricing" class="py-20 bg-gradient-to-b from-gray-50 to-white relative">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-14" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-brand-gold/10 px-4 py-2 rounded-full">Registration</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">อัตราค่าบริการจดทะเบียน</h2>
        <p class="text-gray-500 text-lg">ราคารวมทุกอย่าง ไม่มีค่าใช้จ่ายซ่อนเร้น</p>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
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
                ? 'bg-gradient-to-b from-brand-gold/20 to-brand-gold/5 border-2 border-brand-gold shadow-xl transform lg:-translate-y-4 hover:-translate-y-6' 
                : 'bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2'
            ]"
          >
            <!-- Featured Badge -->
            <div 
              v-if="pkg.featured"
              class="absolute -top-0 left-1/2 -translate-x-1/2 bg-brand-gold text-white px-5 py-1.5 rounded-b-xl text-xs font-bold tracking-wide uppercase shadow-lg"
            >
              ยอดนิยม
            </div>

            <!-- Method Badge -->
            <div class="text-center mb-4" :class="pkg.featured ? 'mt-6' : ''">
              <span 
                class="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                :class="[
                  pkg.featured 
                    ? 'bg-brand-gold text-white' 
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
              <span class="text-gray-500 text-sm ml-1">บาท</span>
            </div>
            
            <!-- Features -->
            <ul class="space-y-3 flex-1 mb-6 text-sm">
              <li 
                v-for="(feature, fIndex) in pkg.features" 
                :key="fIndex"
                class="flex items-center gap-2 text-gray-600"
              >
                <i :class="feature.includes('เหมาะสำหรับ') ? 'fa-solid fa-info-circle text-blue-500' : 'fa-solid fa-check-circle text-green-500'"></i>
                <span :class="{ 'font-bold text-gray-800': feature.includes('+ บัญชี') }">{{ feature }}</span>
              </li>
            </ul>

            <!-- CTA Button -->
            <a 
              v-if="pkg.featured"
              href="#contact"
              class="block w-full py-3 text-center rounded-xl bg-brand-gold text-white font-bold hover:bg-yellow-600 transition shadow-lg"
            >
              ติดต่อเลย
            </a>
            
            <div class="text-center text-xs text-gray-500 mt-3">
              {{ pkg.note }}
            </div>
          </div>
        </div>
      </div>

      <!-- Service Areas -->
      <div 
        class="bg-white rounded-2xl p-6 max-w-4xl mx-auto shadow-md border border-gray-100"
        data-aos="fade-up"
      >
        <div class="flex items-center justify-center gap-3 mb-5">
          <i class="fa-solid fa-car text-brand-red text-lg"></i>
          <span class="font-bold text-gray-900">พื้นที่ให้บริการ 12 จังหวัด</span>
          <span class="text-brand-gold font-medium">(ไม่มีค่าเดินทาง)</span>
        </div>
        <div class="flex flex-wrap justify-center gap-2">
          <span 
            v-for="(area, index) in serviceAreas" 
            :key="index"
            class="px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 text-sm hover:border-brand-gold hover:text-brand-gold transition-all"
          >
            {{ area }}
          </span>
        </div>
        <div class="mt-4 text-center text-xs text-gray-500">
          * นอกพื้นที่ดังกล่าวมีค่าเดินทางเพิ่มเติม 1,000 - 2,000 บาท
        </div>
      </div>
    </div>
  </section>
</template>
