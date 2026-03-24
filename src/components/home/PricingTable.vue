<script setup>
import { accountingPrices, serviceScope, lawyerFees } from '@/data/content.js'

const popularRange = [1, 2, 3] // indices of popular price ranges (21-40 to 81-120)
</script>

<template>
  <section id="services" class="py-24 bg-white relative overflow-hidden">
    <!-- Subtle background -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/4"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-brand-gold/10 px-5 py-2.5 rounded-full">Pricing</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">อัตราค่าบริการทำบัญชี</h2>
        <p class="text-gray-500 text-lg">รายละเอียดค่าบริการที่โปร่งใสและยุติธรรม</p>
        <div class="w-20 h-1 bg-gradient-to-r from-brand-red to-brand-gold mx-auto mt-6 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <!-- Left Column: Price Table -->
        <div data-aos="fade-right">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-gold to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-brand-gold/25">
              <i class="fa-solid fa-calculator text-lg"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900">อัตราค่าทำบัญชีรายเดือน</h3>
          </div>
          
          <div class="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
            <div class="overflow-x-auto max-h-[480px] overflow-y-auto">
              <table class="w-full text-left">
                <thead class="sticky top-0 z-10 bg-gradient-to-r from-brand-red to-brand-darkred text-white">
                  <tr>
                    <th class="px-6 py-4 text-sm font-semibold">จำนวนเอกสาร (ชุด/เดือน)</th>
                    <th class="px-6 py-4 text-sm font-semibold text-right">ค่าบริการ</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-sm">
                  <tr 
                    v-for="(item, index) in accountingPrices" 
                    :key="index"
                    class="transition-colors group/row"
                    :class="popularRange.includes(index) ? 'bg-brand-gold/5 hover:bg-brand-gold/10' : 'hover:bg-gray-50'"
                  >
                    <td class="px-6 py-3.5 text-gray-700 flex items-center gap-2">
                      <span v-if="index === 0" class="inline-block bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">เริ่มต้น</span>
                      <span v-if="popularRange.includes(index) && index === 1" class="inline-block bg-brand-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">ยอดนิยม</span>
                      {{ item.docs }}
                    </td>
                    <td class="px-6 py-3.5 text-right">
                      <span class="text-brand-red font-bold text-base">{{ item.price }}</span>
                      <span class="text-gray-400 text-xs ml-1">บาท</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-8">
          <!-- Service Scope -->
          <div data-aos="fade-left">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-red to-brand-darkred flex items-center justify-center text-white shadow-lg shadow-brand-red/25">
                <i class="fa-solid fa-briefcase text-lg"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">ขอบเขตงานบริการ</h3>
            </div>
            
            <div class="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <ul class="space-y-3.5">
                <li 
                  v-for="(item, index) in serviceScope" 
                  :key="index"
                  class="flex items-center gap-3 text-gray-700 group/item"
                >
                  <div class="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover/item:bg-green-500/20 transition-colors">
                    <i class="fa-solid fa-check text-green-500 text-xs"></i>
                  </div>
                  <span class="group-hover/item:text-gray-900 transition-colors">{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Lawyer Fees -->
          <div data-aos="fade-left" data-aos-delay="100">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white shadow-lg">
                <i class="fa-solid fa-scale-balanced text-lg"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">ค่าวิชาชีพทนายความ</h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="(fee, index) in lawyerFees" 
                :key="index"
                class="bg-white p-6 rounded-2xl shadow-md border-l-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group/fee"
                :class="index === 0 ? 'border-l-brand-gold' : 'border-l-brand-red'"
              >
                <div class="flex items-center gap-3 mb-3">
                  <i :class="index === 0 ? 'fa-solid fa-gavel text-brand-gold' : 'fa-solid fa-handcuffs text-brand-red'" class="text-lg"></i>
                  <h4 class="font-bold text-gray-800 text-sm">{{ fee.type }}</h4>
                </div>
                <div class="text-2xl font-bold mb-1.5" :class="index === 0 ? 'text-brand-gold' : 'text-brand-red'">
                  {{ fee.rate }}
                </div>
                <p class="text-xs text-gray-500 leading-relaxed">{{ fee.note }}</p>
              </div>
            </div>
            <p class="text-xs text-gray-400 mt-4 text-center">*ราคายังไม่รวมค่าใช้จ่ายอื่นๆ ในการดำเนินคดี</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
