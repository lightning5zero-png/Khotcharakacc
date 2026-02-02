<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { companyInfo } from '@/data/content.js'

const form = ref({
  name: '',
  phone: '',
  line: '',
  message: '',
  honeypot: ''
})

const isSubmitting = ref(false)

const socialLinks = [
  { href: companyInfo.facebook, icon: 'fa-brands fa-facebook-f', color: 'hover:bg-[#1877F2]' },
  { href: companyInfo.tiktok, icon: 'fa-brands fa-tiktok', color: 'hover:bg-gray-800' },
  { href: companyInfo.lineUrl, icon: 'fa-brands fa-line', color: 'hover:bg-[#06C755]' }
]

const contactCards = [
  { 
    href: `tel:${companyInfo.phone.replace(/-/g, '')}`, 
    icon: 'fa-solid fa-phone', 
    iconBg: 'bg-brand-gold', 
    label: 'โทรศัพท์', 
    value: companyInfo.phone 
  },
  { 
    href: companyInfo.lineUrl, 
    icon: 'fa-brands fa-line', 
    iconBg: 'bg-[#06C755]', 
    label: 'LINE Official', 
    value: '@' + companyInfo.line,
    external: true
  },
  { 
    href: `mailto:${companyInfo.email}`, 
    icon: 'fa-solid fa-envelope', 
    iconBg: 'bg-blue-500', 
    label: 'อีเมล', 
    value: companyInfo.email 
  }
]

const submitForm = async () => {
  if (form.value.honeypot) return
  
  isSubmitting.value = true
  
  try {
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('phone', form.value.phone)
    formData.append('line', form.value.line)
    formData.append('message', form.value.message)
    
    await fetch(companyInfo.googleSheetUrl, {
      method: 'POST',
      body: formData
    })
    
    Swal.fire({
      title: 'ส่งข้อมูลสำเร็จ!',
      text: 'เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุดครับ',
      icon: 'success',
      confirmButtonColor: '#D4AF37',
      confirmButtonText: 'ตกลง'
    })
    
    form.value = { name: '', phone: '', line: '', message: '', honeypot: '' }
    
  } catch (error) {
    Swal.fire({
      title: 'เกิดข้อผิดพลาด',
      text: 'กรุณาลองใหม่อีกครั้ง',
      icon: 'error',
      confirmButtonColor: '#850406',
      confirmButtonText: 'ตกลง'
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <footer id="contact" class="relative overflow-hidden bg-gray-900">
    <div class="container mx-auto px-6 pt-20 pb-12 relative z-10">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16 pb-8 border-b border-white/10">
        <div class="flex items-center gap-6" data-aos="fade-right">
          <div class="w-20 h-20 rounded-2xl bg-white p-3 shadow-xl border-2 border-brand-gold">
            <img src="/pic/Head_EP_Gold.webp" alt="Logo" class="w-full h-full object-contain">
          </div>
          <div>
            <h3 class="text-2xl font-bold text-white tracking-wide">คชรักษ์การบัญชีและกฎหมาย</h3>
            <p class="text-brand-gold text-sm tracking-[0.3em] uppercase">Khotcharak Accounting & Law</p>
          </div>
        </div>

        <!-- Social Links -->
        <div class="flex gap-4" data-aos="fade-left">
          <a 
            v-for="(social, index) in socialLinks" 
            :key="index"
            :href="social.href"
            target="_blank"
            class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:border-transparent"
            :class="social.color"
          >
            <i :class="social.icon" class="text-lg"></i>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Contact Cards -->
        <div class="lg:col-span-5 space-y-4" data-aos="fade-right">
          <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div class="w-8 h-[2px] bg-brand-gold"></div>
            ช่องทางติดต่อ
          </h3>

          <a 
            v-for="(card, index) in contactCards" 
            :key="index"
            :href="card.href"
            :target="card.external ? '_blank' : undefined"
            class="bg-white/5 p-5 rounded-2xl flex items-center gap-4 group hover:bg-white/10 border border-white/5 hover:border-brand-gold/30 transition-all duration-300"
          >
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg" :class="card.iconBg">
              <i :class="card.icon" class="text-xl"></i>
            </div>
            <div>
              <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">{{ card.label }}</div>
              <div class="font-bold text-white group-hover:text-brand-gold transition-colors">{{ card.value }}</div>
            </div>
          </a>

          <!-- Address -->
          <div class="bg-white/5 p-5 rounded-2xl flex items-center gap-4 border border-white/5">
            <div class="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center text-white shadow-lg">
              <i class="fa-solid fa-location-dot text-xl"></i>
            </div>
            <div>
              <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">ที่อยู่สำนักงาน</div>
              <div class="text-gray-300 text-sm leading-relaxed">
                155/53 หมู่ที่ 3 อ.พระนครศรีอยุธยา<br>
                จ.พระนครศรีอยุธยา 13000
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-7" data-aos="fade-left">
          <div class="bg-white p-8 rounded-3xl shadow-2xl">
            <h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div class="w-8 h-[2px] bg-brand-gold"></div>
              กรอกข้อมูลติดต่อกลับ
            </h3>

            <form @submit.prevent="submitForm" class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label class="text-sm text-gray-600 mb-2 block font-medium">ชื่อ-นามสกุล <span class="text-brand-red">*</span></label>
                  <input 
                    v-model="form.name"
                    type="text" 
                    placeholder="ชื่อ-นามสกุล" 
                    required
                    class="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all"
                  >
                </div>
                <div>
                  <label class="text-sm text-gray-600 mb-2 block font-medium">เบอร์โทรศัพท์ <span class="text-brand-red">*</span></label>
                  <input 
                    v-model="form.phone"
                    type="tel" 
                    placeholder="0xx-xxx-xxxx" 
                    required
                    class="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all"
                  >
                </div>
              </div>

              <div>
                <label class="text-sm text-gray-600 mb-2 block font-medium">LINE ID</label>
                <input 
                  v-model="form.line"
                  type="text" 
                  placeholder="ระบุ LINE ID เพื่อให้แอดกลับ"
                  class="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all"
                >
              </div>

              <div>
                <label class="text-sm text-gray-600 mb-2 block font-medium">เรื่องที่ติดต่อ</label>
                <textarea 
                  v-model="form.message"
                  rows="4" 
                  placeholder="ระบุเรื่องที่ต้องการติดต่อ..."
                  class="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/20 transition-all resize-none"
                ></textarea>
              </div>
              
              <input v-model="form.honeypot" type="text" style="display:none !important;" tabindex="-1" autocomplete="off">
              
              <button 
                type="submit"
                :disabled="isSubmitting"
                class="w-full btn-gold !py-4 text-lg"
                :class="{ 'opacity-50 cursor-not-allowed': isSubmitting }"
              >
                <template v-if="isSubmitting">
                  <i class="fa-solid fa-circle-notch fa-spin mr-2"></i> กำลังส่ง...
                </template>
                <template v-else>
                  <i class="fa-solid fa-paper-plane mr-2"></i> ส่งข้อมูล
                </template>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Google Map -->
    <div class="w-full h-[300px] relative">
      <iframe
        :src="companyInfo.googleMapEmbed"
        width="100%" 
        height="100%" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy"
      ></iframe>
    </div>

    <!-- Copyright -->
    <div class="bg-black py-6 border-t border-white/5">
      <div class="container mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <p class="text-gray-500 text-sm">© 2024 บริษัท คชรักษ์การบัญชีและกฎหมาย จำกัด. สงวนลิขสิทธิ์.</p>
      </div>
    </div>
  </footer>
</template>
