<script setup>
import { useI18n } from 'vue-i18n'
import { registrationPackages as staticPackages, serviceAreas } from '@/data/content.js'

const { t } = useI18n()

// Map features to translation keys
const getFeatureKey = (feature) => {
  if (feature.includes('ตราประทับ + บัญชี')) return 'features.stamp_acc'
  if (feature.includes('ตราประทับ')) return 'features.stamp'
  if (feature.includes('กระเป๋าเอกสาร')) return 'features.bag'
  if (feature.includes('เปิดบัญชีธนาคาร')) return 'features.bank'
  if (feature.includes('เอกสาร 41 รายการ')) return 'features.docs'
  if (feature.includes('เทรนนิ่งภาษี')) return 'features.training'
  if (feature.includes('รวมของแถมครบชุด')) return 'features.full_set'
  if (feature.includes('เหมาะสำหรับยื่นแบบกระดา')) return 'features.paper_desc'
  return feature
}
</script>

<template>
  <section id="pricing" class="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-3xl"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-brand-gold/10 px-5 py-2.5 rounded-full">Registration</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{{ t('registration.title') }}</h2>
        <p class="text-gray-500 text-lg">{{ t('registration.subtitle') }}</p>
        <div class="w-20 h-1 bg-gradient-to-r from-brand-red to-brand-gold mx-auto mt-6 rounded-full"></div>
      </div>

      <!-- Pricing Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        <div 
          v-for="(pkg, index) in staticPackages" 
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
              ⭐ {{ t('hero.pro') }}
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
                {{ pkg.method === 'จดออนไลน์' ? t('registration.method_online') : t('registration.method_paper') }}
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
              <span class="text-gray-400 text-sm ml-1">{{ t('common.baht') }}</span>
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
                <span :class="{ 'font-bold text-gray-800': feature.includes('+ บัญชี') }">
                  {{ t('registration.' + getFeatureKey(feature)) }}
                </span>
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
              {{ pkg.featured ? '🔥 ' + t('common.consult_now') : t('common.consult_now') }}
            </a>
            
            <div class="text-center text-xs text-gray-400 mt-3">
              {{ t('registration.note_no_binding') }}
            </div>
          </div>
        </div>
      </div>

      <!-- Service Areas -->
      <div 
        class="bg-white rounded-3xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-100"
        data-aos="fade-up"
      >
        <div class="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-brand-red/10 flex items-center justify-center">
              <i class="fa-solid fa-car text-brand-red text-xl"></i>
            </div>
            <h3 class="font-bold text-gray-900 text-xl tracking-tight">{{ t('registration.service_areas') }}</h3>
          </div>
          <span class="px-4 py-1.5 bg-brand-gold/10 text-brand-gold text-sm font-bold rounded-full border border-brand-gold/20">
            {{ t('registration.no_travel_fee') }}
          </span>
        </div>

        <div class="flex flex-wrap justify-center gap-2.5 mb-8">
          <span 
            v-for="(area, index) in serviceAreas" 
            :key="index"
            class="px-5 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:border-brand-gold hover:text-brand-gold hover:bg-brand-gold/5 transition-all duration-300 cursor-default"
          >
            {{ area }}
          </span>
        </div>

        <div class="text-center">
          <p class="text-sm text-gray-400 italic">
            {{ t('registration.travel_fee_note') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
