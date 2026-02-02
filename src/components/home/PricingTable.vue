<script setup>
import { accountingPrices, serviceScope, lawyerFees } from '@/data/content.js'
</script>

<template>
  <section id="services" class="py-20 bg-white relative">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-14" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-brand-gold/10 px-4 py-2 rounded-full">Pricing</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">อัตราค่าบริการทำบัญชี</h2>
        <p class="text-gray-500 text-lg">รายละเอียดค่าบริการที่โปร่งใสและยุติธรรม</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <!-- Left Column: Price Table -->
        <div data-aos="fade-right">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-11 h-11 rounded-xl bg-brand-gold flex items-center justify-center text-white shadow-lg">
              <i class="fa-solid fa-calculator"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900">อัตราค่าทำบัญชีรายเดือน</h3>
          </div>
          
          <div class="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <div class="overflow-x-auto max-h-[480px] overflow-y-auto">
              <table class="w-full text-left">
                <thead class="sticky top-0 z-10 bg-brand-red text-white">
                  <tr>
                    <th class="px-5 py-4 text-sm font-semibold">จำนวนเอกสาร (ชุด/เดือน)</th>
                    <th class="px-5 py-4 text-sm font-semibold text-right">ค่าบริการ</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-sm">
                  <tr 
                    v-for="(item, index) in accountingPrices" 
                    :key="index"
                    class="hover:bg-brand-gold/5 transition-colors"
                  >
                    <td class="px-5 py-3 text-gray-700">{{ item.docs }}</td>
                    <td class="px-5 py-3 text-right">
                      <span class="text-brand-red font-bold">{{ item.price }}</span>
                      <span class="text-gray-500 text-xs ml-1">บาท</span>
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
              <div class="w-11 h-11 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-lg">
                <i class="fa-solid fa-briefcase"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">ขอบเขตงานบริการ</h3>
            </div>
            
            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <ul class="space-y-3">
                <li 
                  v-for="(item, index) in serviceScope" 
                  :key="index"
                  class="flex items-center gap-3 text-gray-700"
                >
                  <i class="fa-solid fa-check-circle text-green-500"></i>
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Lawyer Fees -->
          <div data-aos="fade-left" data-aos-delay="100">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-11 h-11 rounded-xl bg-gray-800 flex items-center justify-center text-white shadow-lg">
                <i class="fa-solid fa-scale-balanced"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900">ค่าวิชาชีพทนายความ</h3>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="(fee, index) in lawyerFees" 
                :key="index"
                class="bg-white p-5 rounded-2xl shadow-md border-l-4 hover:shadow-lg transition-shadow"
                :class="index === 0 ? 'border-l-brand-gold' : 'border-l-brand-red'"
              >
                <h4 class="font-bold text-gray-800 mb-2 text-sm">{{ fee.type }}</h4>
                <div class="text-xl font-bold mb-1" :class="index === 0 ? 'text-brand-gold' : 'text-brand-red'">
                  {{ fee.rate }}
                </div>
                <p class="text-xs text-gray-500">{{ fee.note }}</p>
              </div>
            </div>
            <p class="text-xs text-gray-500 mt-4 text-center">*ราคายังไม่รวมค่าใช้จ่ายอื่นๆ ในการดำเนินคดี</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
