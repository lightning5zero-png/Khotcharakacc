<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { services as staticServices, companyInfo } from '@/data/content.js'
import { serviceDetails } from '@/data/serviceDetails.js'
import AOS from 'aos'

const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

const serviceId = ref(parseInt(route.params.id))

// Find the base service from general services list
const serviceBase = computed(() => {
  return staticServices.find(s => s.id === serviceId.value)
})

// Find the detailed specifications of the service
const details = computed(() => {
  const sDetails = serviceDetails[serviceId.value]
  if (!sDetails) return null
  return sDetails[locale.value] || sDetails['th'] // fallback to th
})

const hasSubSections = computed(() => {
  return !!(details.value && details.value.subSections && details.value.subSections.length)
})

const hasAdditionalSections = computed(() => {
  return !hasSubSections.value && !!(details.value?.additionalSections?.length)
})

/** Wider grid when many steps so cards do not overflow one row */
const stepGridClass = computed(() => {
  const n = details.value?.steps?.length ?? 0
  return n > 5 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'
})

const getAgencyBadgeText = (name) => {
  if (!name || typeof name !== 'string') return ''

  const parenthesized = name.match(/\(([A-Z0-9&\- ]+)\)/)
  if (parenthesized && parenthesized[1]) {
    return parenthesized[1].replace(/\s+/g, '')
  }

  const uppercaseAcronym = name.match(/[A-Z]{2,}/g)
  if (uppercaseAcronym && uppercaseAcronym.length > 0) {
    return uppercaseAcronym[0]
  }

  const words = name.split(/\s+/).filter(Boolean)
  const initials = words
    .filter(word => !['of', 'and', 'the', 'for', 'with', 'to', 'by', 'from', 'on', 'in', 'at'].includes(word.toLowerCase()))
    .map(word => word[0].toUpperCase())
    .join('')

  return initials.slice(0, 3) || name.substring(0, 2).toUpperCase()
}

// Verify service exists
const checkServiceValidity = () => {
  if (!serviceBase.value) {
    router.push('/')
  } else {
    // Set document title for SEO
    const title = t(`services.items.${serviceId.value}.title`)
    document.title = `${title} - ${companyInfo.nameEn}`
    // Re-init AOS for animations
    setTimeout(() => {
      AOS.refresh()
    }, 100)
  }
}

// Watch for route changes to update service ID
watch(() => route.params.id, (newId) => {
  serviceId.value = parseInt(newId)
  checkServiceValidity()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

onMounted(() => {
  checkServiceValidity()
  window.scrollTo(0, 0)
})
</script>

<template>
  <div v-if="serviceBase" class="bg-gradient-to-b from-gray-50 to-white min-h-screen pt-24 pb-20 overflow-hidden">
    <!-- Hero Banner Section -->
    <section class="relative py-20 bg-brand-red text-white overflow-hidden">
      <!-- Background SVG patterns and glows -->
      <div class="absolute inset-0 opacity-10" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><circle cx=%2240%22 cy=%2240%22 r=%222%22 fill=%22%23D4AF37%22/></svg>'); background-size: 40px 40px;"></div>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
      <div class="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-black/30 rounded-full blur-3xl"></div>

      <div class="container mx-auto px-6 relative z-10">
        <!-- Breadcrumbs -->
        <div class="flex items-center gap-2 text-white/60 text-sm mb-6" data-aos="fade-down">
          <router-link to="/" class="hover:text-brand-gold transition-colors">{{ t('nav.home') }}</router-link>
          <i class="fa-solid fa-chevron-right text-xs"></i>
          <router-link to="/#our-services" class="hover:text-brand-gold transition-colors">{{ t('nav.services') }}</router-link>
          <i class="fa-solid fa-chevron-right text-xs"></i>
          <span class="text-brand-gold font-medium truncate max-w-[200px] sm:max-w-none">
            {{ t(`services.items.${serviceId}.title`) }}
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div class="lg:col-span-7" data-aos="fade-right">
            <span class="inline-block text-brand-gold text-xs font-bold tracking-[0.2em] uppercase mb-4 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              Service Details #0{{ serviceId }}
            </span>
            <h1 class="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-md">
              {{ t(`services.items.${serviceId}.title`) }}
            </h1>
            <p class="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl font-light mb-8">
              {{ t(`services.items.${serviceId}.desc`) }}
            </p>
            <div class="flex flex-wrap gap-4">
              <a :href="companyInfo.lineUrl" target="_blank" class="btn-gold flex items-center gap-2 !py-4 !px-8 shadow-lg shadow-brand-gold/20">
                <i class="fa-brands fa-line text-xl"></i>
                <span>{{ t('common.consult_now') }} (LINE)</span>
              </a>
              <a :href="'tel:' + companyInfo.phone" class="btn-outline-gold !text-white !border-white/30 hover:!border-brand-gold hover:!bg-brand-gold hover:text-black flex items-center gap-2 !py-4 !px-8">
                <i class="fa-solid fa-phone"></i>
                <span>{{ companyInfo.phone }}</span>
              </a>
            </div>
          </div>
          
          <div class="lg:col-span-5 relative" data-aos="fade-left">
            <div class="relative rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl aspect-[4/3] glow-gold group">
              <img 
                :src="serviceBase.image" 
                :alt="t(`services.items.${serviceId}.title`)" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Section -->
    <div class="container mx-auto px-6 -mt-10 relative z-20">
      <div class="bg-white rounded-3xl shadow-xl shadow-black/5 border border-gray-100 p-8 md:p-12">
        
        <!-- Grouped service sections (for services with subSections) -->
        <div v-if="hasSubSections" class="mb-16 space-y-16">
          <section
            v-for="(section, sIdx) in details.subSections"
            :key="section.id || sIdx"
            class="border border-gray-100 rounded-3xl p-6 md:p-8 bg-gradient-to-b from-white to-gray-50/30"
          >
            <div class="flex items-center gap-3 mb-8">
              <div class="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                <i class="fa-solid fa-layer-group text-lg"></i>
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
                {{ section.title }}
              </h2>
            </div>

            <div v-if="section.importance && section.importance.length" class="mb-12">
              <h3 class="text-xl font-bold text-gray-900 mb-6">
                {{ locale === 'th' ? 'ความสำคัญ' : 'Importance' }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  v-for="(item, idx) in section.importance"
                  :key="idx"
                  class="card-light p-6 md:p-8 flex flex-col items-start hover:-translate-y-2 transition-all duration-300"
                >
                  <div class="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 shadow-inner">
                    <i :class="item.icon || 'fa-solid fa-circle-check'" class="text-2xl"></i>
                  </div>
                  <h4 class="text-lg font-bold text-gray-900 mb-3 leading-tight">{{ item.title }}</h4>
                  <p class="text-gray-600 text-sm leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
            </div>

            <div v-if="section.steps && section.steps.length" class="mb-12">
              <h3 class="text-xl font-bold text-gray-900 mb-6">
                {{ locale === 'th' ? 'ขั้นตอนการดำเนินงาน' : 'Workflow & Execution Steps' }}
              </h3>
              <div class="relative">
                <div class="hidden lg:block absolute top-8 -translate-y-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-gold/20 via-brand-gold to-brand-gold/20"></div>
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
                  <div
                    v-for="(step, idx) in section.steps"
                    :key="idx"
                    class="flex flex-col items-center text-center lg:items-center group"
                  >
                    <div class="relative mb-6">
                      <div class="w-16 h-16 rounded-full bg-white border-2 border-brand-gold flex items-center justify-center shadow-lg group-hover:bg-brand-gold group-hover:text-white transition-all duration-300 relative z-20">
                        <i :class="step.icon || 'fa-solid fa-arrow-right'" class="text-xl text-brand-gold group-hover:text-white transition-colors"></i>
                      </div>
                      <div class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow">
                        {{ idx + 1 }}
                      </div>
                    </div>
                    <div class="bg-gray-50/50 group-hover:bg-brand-gold/5 border border-gray-100 group-hover:border-brand-gold/20 rounded-2xl p-5 w-full transition-all duration-300">
                      <h4 class="text-base font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors">{{ step.title }}</h4>
                      <p class="text-gray-500 text-xs leading-relaxed">{{ step.desc }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="section.documents" class="mb-2">
              <h3 class="text-xl font-bold text-gray-900 mb-6">
                {{ locale === 'th' ? 'เอกสารที่ต้องใช้' : 'Required Documents' }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-6 md:p-8">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                      <i class="fa-solid fa-file-invoice-dollar text-xl"></i>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-gray-900">{{ locale === 'th' ? 'เอกสารด้านรายได้' : 'Income Documents' }}</h4>
                    </div>
                  </div>
                  <ul class="space-y-3.5">
                    <li v-for="(doc, i) in section.documents.income" :key="i" class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mt-0.5 shrink-0">
                        <i class="fa-solid fa-check text-2xs"></i>
                      </div>
                      <span class="text-sm text-gray-700 leading-relaxed">{{ doc }}</span>
                    </li>
                  </ul>
                </div>

                <div class="bg-rose-50/30 border border-rose-100/50 rounded-2xl p-6 md:p-8">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                      <i class="fa-solid fa-receipt text-xl"></i>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-gray-900">{{ locale === 'th' ? 'เอกสารด้านรายจ่าย' : 'Expense Documents' }}</h4>
                    </div>
                  </div>
                  <ul class="space-y-3.5">
                    <li v-for="(doc, i) in section.documents.expense" :key="i" class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mt-0.5 shrink-0">
                        <i class="fa-solid fa-check text-2xs"></i>
                      </div>
                      <span class="text-sm text-gray-700 leading-relaxed">{{ doc }}</span>
                    </li>
                  </ul>
                </div>

                <div class="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-6 md:p-8">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                      <i class="fa-solid fa-building-columns text-xl"></i>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-gray-900">{{ locale === 'th' ? 'เอกสารด้านธนาคาร' : 'Bank Statements & Accounts' }}</h4>
                    </div>
                  </div>
                  <ul class="space-y-3.5">
                    <li v-for="(doc, i) in section.documents.bank" :key="i" class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mt-0.5 shrink-0">
                        <i class="fa-solid fa-check text-2xs"></i>
                      </div>
                      <span class="text-sm text-gray-700 leading-relaxed">{{ doc }}</span>
                    </li>
                  </ul>
                </div>

                <div class="bg-amber-50/30 border border-amber-100/50 rounded-2xl p-6 md:p-8">
                  <div class="flex items-center gap-3 mb-6">
                    <div class="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <i class="fa-solid fa-file-shield text-xl"></i>
                    </div>
                    <div>
                      <h4 class="text-lg font-bold text-gray-900">{{ locale === 'th' ? 'เอกสารอื่นๆ ที่เกี่ยวข้อง' : 'Other Relevant Documents' }}</h4>
                    </div>
                  </div>
                  <ul class="space-y-3.5">
                    <li v-for="(doc, i) in section.documents.other" :key="i" class="flex items-start gap-3">
                      <div class="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mt-0.5 shrink-0">
                        <i class="fa-solid fa-check text-2xs"></i>
                      </div>
                      <span class="text-sm text-gray-700 leading-relaxed">{{ doc }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- 1. ความสำคัญ (Importance) -->
        <div v-if="!hasSubSections && details && details.importance && details.importance.length" class="mb-16">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
              <i class="fa-solid fa-star text-lg"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
              {{ locale === 'th' ? 'ความสำคัญของบริการ' : 'Importance of Service' }}
            </h2>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="(item, idx) in details.importance" 
              :key="idx" 
              class="card-light p-6 md:p-8 flex flex-col items-start hover:-translate-y-2 transition-all duration-300"
              data-aos="fade-up"
              :data-aos-delay="idx * 100"
            >
              <div class="w-14 h-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-6 shadow-inner group-hover:scale-110 transition-transform">
                <i :class="item.icon || 'fa-solid fa-circle-check'" class="text-2xl"></i>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-3 leading-tight">{{ item.title }}</h3>
              <p class="text-gray-600 text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <!-- 2. ขั้นตอนการดำเนินงาน (Workflow / Timeline) -->
        <div v-if="!hasSubSections && details && details.steps && details.steps.length" class="mb-16">
          <div class="flex items-center gap-3 mb-10">
            <div class="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
              <i class="fa-solid fa-route text-lg"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
              {{ locale === 'th' ? 'ขั้นตอนการดำเนินงาน' : 'Workflow & Execution Steps' }}
            </h2>
          </div>

          <!-- Stepper for Desktop, vertical list for mobile -->
          <div class="relative">
            <!-- Central Line (Desktop) -->
            <div class="hidden lg:block absolute top-8 -translate-y-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-gold/20 via-brand-gold to-brand-gold/20"></div>
            
            <div :class="['grid grid-cols-1 gap-8 relative z-10', stepGridClass]">
              <div 
                v-for="(step, idx) in details.steps" 
                :key="idx"
                class="flex flex-col items-center text-center lg:items-center group"
                data-aos="zoom-in"
                :data-aos-delay="idx * 100"
              >
                <!-- Number Circle / Icon -->
                <div class="relative mb-6">
                  <div class="w-16 h-16 rounded-full bg-white border-2 border-brand-gold flex items-center justify-center shadow-lg group-hover:bg-brand-gold group-hover:text-white transition-all duration-300 relative z-20">
                    <i :class="step.icon || 'fa-solid fa-arrow-right'" class="text-xl text-brand-gold group-hover:text-white transition-colors"></i>
                  </div>
                  <div class="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow">
                    {{ idx + 1 }}
                  </div>
                </div>
                
                <!-- Content -->
                <div class="bg-gray-50/50 group-hover:bg-brand-gold/5 border border-gray-100 group-hover:border-brand-gold/20 rounded-2xl p-5 w-full transition-all duration-300">
                  <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors">{{ step.title }}</h3>
                  <p class="text-gray-500 text-xs leading-relaxed">{{ step.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. เอกสารที่ต้องใช้ (Documents Required) -->
        <div v-if="!hasSubSections && details && details.documents" class="mb-16">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
              <i class="fa-solid fa-file-invoice text-lg"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
              {{ locale === 'th' ? 'เอกสารที่ต้องใช้' : 'Required Documents' }}
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Column 1: Income Documents -->
            <div class="bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-6 md:p-8" data-aos="fade-right">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                  <i class="fa-solid fa-file-invoice-dollar text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">
                    {{ locale === 'th' ? 'เอกสารด้านรายได้' : 'Income Documents' }}
                  </h3>
                  <p class="text-xs text-gray-500">Sales, invoices, receipts</p>
                </div>
              </div>
              
              <ul class="space-y-3.5">
                <li v-for="(doc, i) in details.documents.income" :key="i" class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mt-0.5 shrink-0">
                    <i class="fa-solid fa-check text-2xs"></i>
                  </div>
                  <span class="text-sm text-gray-700 leading-relaxed">{{ doc }}</span>
                </li>
              </ul>
            </div>

            <!-- Column 2: Expense Documents -->
            <div class="bg-rose-50/30 border border-rose-100/50 rounded-2xl p-6 md:p-8" data-aos="fade-left">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                  <i class="fa-solid fa-receipt text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">
                    {{ locale === 'th' ? 'เอกสารด้านรายจ่าย' : 'Expense Documents' }}
                  </h3>
                  <p class="text-xs text-gray-500">Purchases, bills, payroll</p>
                </div>
              </div>
              
              <ul class="space-y-3.5">
                <li v-for="(doc, i) in details.documents.expense" :key="i" class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mt-0.5 shrink-0">
                    <i class="fa-solid fa-check text-2xs"></i>
                  </div>
                  <span class="text-sm text-gray-700 leading-relaxed">{{ doc }}</span>
                </li>
              </ul>
            </div>

            <!-- Column 3: Bank Documents -->
            <div class="bg-blue-50/30 border border-blue-100/50 rounded-2xl p-6 md:p-8" data-aos="fade-right">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <i class="fa-solid fa-building-columns text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">
                    {{ locale === 'th' ? 'เอกสารด้านธนาคาร' : 'Bank Statements & Accounts' }}
                  </h3>
                  <p class="text-xs text-gray-500">Statements, transfers, logs</p>
                </div>
              </div>
              
              <ul class="space-y-3.5">
                <li v-for="(doc, i) in details.documents.bank" :key="i" class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center mt-0.5 shrink-0">
                    <i class="fa-solid fa-check text-2xs"></i>
                  </div>
                  <span class="text-sm text-gray-700 leading-relaxed">{{ doc }}</span>
                </li>
              </ul>
            </div>

            <!-- Column 4: Other Documents -->
            <div class="bg-amber-50/30 border border-amber-100/50 rounded-2xl p-6 md:p-8" data-aos="fade-left">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <i class="fa-solid fa-file-shield text-xl"></i>
                </div>
                <div>
                  <h3 class="text-lg font-bold text-gray-900">
                    {{ locale === 'th' ? 'เอกสารอื่นๆ ที่เกี่ยวข้อง' : 'Other Relevant Documents' }}
                  </h3>
                  <p class="text-xs text-gray-500">Agreements, assets, logs</p>
                </div>
              </div>
              
              <ul class="space-y-3.5">
                <li v-for="(doc, i) in details.documents.other" :key="i" class="flex items-start gap-3">
                  <div class="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mt-0.5 shrink-0">
                    <i class="fa-solid fa-check text-2xs"></i>
                  </div>
                  <span class="text-sm text-gray-700 leading-relaxed">{{ doc }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 4. หน่วยงานที่ประสานงาน (Coordinating Agencies) -->
        <div v-if="details && details.agencies && details.agencies.length" class="mb-16">
          <div class="flex items-center gap-3 mb-8">
            <div class="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
              <i class="fa-solid fa-building text-lg"></i>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900">
              {{ locale === 'th' ? 'หน่วยงานที่ประสานงาน' : 'Coordinating Agencies' }}
            </h2>
          </div>

          <div class="flex flex-wrap gap-6">
            <div 
              v-for="(agency, idx) in details.agencies" 
              :key="idx"
              class="flex-1 min-w-[280px] bg-white border border-gray-100 rounded-2xl p-6 flex items-start gap-5 hover:border-brand-gold/30 hover:shadow-lg transition-all duration-300 group"
              data-aos="fade-up"
            >
              <!-- Icon Container -->
              <div class="w-12 h-12 rounded-xl bg-brand-red/5 flex items-center justify-center text-brand-red font-bold text-lg border border-brand-red/10 shrink-0">
                {{ getAgencyBadgeText(agency.name) }}
              </div>
              <!-- Text details -->
              <div class="space-y-1">
                <h3 class="font-bold text-gray-900 text-base leading-snug group-hover:text-brand-red transition-colors">{{ agency.name }}</h3>
                <p class="text-xs text-gray-500 leading-relaxed">{{ agency.role }}</p>
                <a 
                  v-if="agency.url && agency.url !== '#'" 
                  :href="agency.url" 
                  target="_blank" 
                  class="inline-flex items-center gap-1.5 text-xs text-brand-gold font-semibold pt-2 hover:underline"
                >
                  <span>{{ locale === 'th' ? 'ไปที่เว็บไซต์หน่วยงาน' : 'Visit Agency Website' }}</span>
                  <i class="fa-solid fa-up-right-from-square text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Extra sections: recommended software, lists, etc. (from serviceDetails) -->
        <div v-if="hasAdditionalSections" class="mb-16 space-y-14">
          <template v-for="(block, bi) in details.additionalSections" :key="bi">
            <section
              v-if="block.type === 'software-grid'"
              class="rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/40 p-8 md:p-10"
              data-aos="fade-up"
            >
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <i class="fa-solid fa-laptop-code text-lg"></i>
                </div>
                <h2 class="text-2xl md:text-3xl font-bold text-gray-900">{{ block.title }}</h2>
              </div>
              <p v-if="block.subtitle" class="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-4xl">
                {{ block.subtitle }}
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div
                  v-for="(it, ii) in block.items"
                  :key="ii"
                  class="card-light p-6 flex flex-col border border-gray-100 hover:border-brand-gold/25 transition-colors"
                >
                  <div class="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-4">
                    <i :class="it.logo || 'fa-solid fa-calculator'" class="text-xl"></i>
                  </div>
                  <h3 class="text-lg font-bold text-gray-900 mb-2">{{ it.name }}</h3>
                  <p class="text-gray-600 text-sm leading-relaxed flex-1">{{ it.desc }}</p>
                </div>
              </div>
            </section>

            <section
              v-else-if="block.type === 'list-card'"
              class="rounded-3xl border border-gray-100 bg-white p-8 md:p-10 shadow-sm"
              data-aos="fade-up"
            >
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center text-brand-gold">
                  <i class="fa-solid fa-list-check text-lg"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">{{ block.title }}</h2>
              </div>
              <ul class="space-y-4">
                <li v-for="(it, ii) in block.items" :key="ii" class="flex items-start gap-3">
                  <div class="w-9 h-9 rounded-lg bg-brand-red/5 flex items-center justify-center shrink-0 mt-0.5 text-brand-red">
                    <i :class="it.icon || 'fa-solid fa-circle-check'" class="text-sm"></i>
                  </div>
                  <span class="text-gray-700 text-sm md:text-base leading-relaxed">{{ it.text }}</span>
                </li>
              </ul>
            </section>

            <section v-else-if="block.type === 'icon-cards'" class="rounded-3xl border border-gray-100 p-8 md:p-10 bg-white" data-aos="fade-up">
              <div class="flex items-center gap-3 mb-8">
                <div class="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <i class="fa-solid fa-id-badge text-lg"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">{{ block.title }}</h2>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  v-for="(it, ii) in block.items"
                  :key="ii"
                  class="flex gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50/50"
                >
                  <div class="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0">
                    <i :class="it.icon || 'fa-solid fa-star'" class="text-xl"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 mb-1">{{ it.title }}</h3>
                    <p v-if="it.desc" class="text-sm text-gray-600 leading-relaxed">{{ it.desc }}</p>
                  </div>
                </div>
              </div>
            </section>

            <section v-else-if="block.type === 'two-columns'" class="space-y-8" data-aos="fade-up">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center text-brand-red">
                  <i class="fa-solid fa-scale-balanced text-lg"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900">{{ block.title }}</h2>
              </div>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <template v-for="colKey in ['col1', 'col2']" :key="colKey">
                  <div
                    v-if="block[colKey]"
                    :class="['rounded-3xl border p-8', block[colKey].color]"
                  >
                    <div class="flex items-center gap-2 mb-4">
                      <i :class="block[colKey].icon"></i>
                      <h3 class="font-bold">{{ block[colKey].title }}</h3>
                    </div>
                    <ul class="space-y-3">
                      <li v-for="(ln, li) in block[colKey].items" :key="li" class="text-sm leading-relaxed flex gap-2">
                        <span class="text-brand-gold shrink-0">•</span>
                        <span>{{ ln }}</span>
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </section>
          </template>
        </div>

        <!-- 5. CTA Footer Section inside Card -->
        <div class="bg-gradient-to-br from-brand-red to-brand-darkred text-white rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-xl" data-aos="fade-up">
          <!-- Background SVG pattern -->
          <div class="absolute inset-0 opacity-5" style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22><circle cx=%2240%22 cy=%2240%22 r=%222%22 fill=%22%23FFF%22/></svg>'); background-size: 40px 40px;"></div>
          <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-brand-gold/10 rounded-full blur-2xl"></div>

          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-center lg:text-left">
            <div class="lg:col-span-8 space-y-4">
              <h3 class="text-xl md:text-3xl font-bold">
                {{ locale === 'th' ? 'สนใจใช้บริการหรือต้องการคำปรึกษาเพิ่มเติม?' : 'Interested in our services or need advice?' }}
              </h3>
              <p class="text-white/80 text-sm md:text-base leading-relaxed font-light max-w-2xl">
                {{ locale === 'th' 
                  ? 'ทีมผู้เชี่ยวชาญด้านบัญชี ภาษี และกฎหมายของเรา พร้อมดูแลและให้คำแนะนำที่มีประสิทธิภาพสูงสุดแก่ธุรกิจของคุณโดยเฉพาะ' 
                  : 'Our team of accounting, tax, and legal experts is ready to assist you and provide custom-tailored solutions for your business.' 
                }}
              </p>
            </div>
            <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-stretch lg:items-end">
              <a :href="companyInfo.lineUrl" target="_blank" class="btn-gold !bg-white !text-brand-red hover:!bg-brand-gold hover:!text-white flex items-center justify-center gap-2 shadow-lg shadow-black/10">
                <i class="fa-brands fa-line text-lg"></i>
                <span>LINE: @{{ companyInfo.line }}</span>
              </a>
              <a :href="'tel:' + companyInfo.phone" class="btn-outline-gold !border-white/50 !text-white hover:!bg-white/10 flex items-center justify-center gap-2">
                <i class="fa-solid fa-phone"></i>
                <span>{{ locale === 'th' ? 'โทรสอบถามทันที' : 'Call Office' }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 6. Back Button Area -->
        <div class="flex justify-center mt-12">
          <router-link 
            to="/#our-services" 
            class="inline-flex items-center gap-2.5 text-gray-500 hover:text-brand-red font-medium text-sm transition-all duration-300 border border-gray-200 hover:border-brand-red/30 px-6 py-3 rounded-full hover:shadow-md"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>{{ locale === 'th' ? 'กลับสู่หน้าหลัก / บริการทั้งหมด' : 'Back to Home / Services' }}</span>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.text-2xs {
  font-size: 0.65rem;
}
</style>
