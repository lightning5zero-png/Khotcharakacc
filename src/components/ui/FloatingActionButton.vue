<script setup>
import { companyInfo } from '@/data/content.js'

const fabItems = [
  { href: `tel:${companyInfo.phone.replace(/-/g, '')}`, icon: 'fa-solid fa-phone', bg: 'bg-brand-red', title: 'โทรเลย' },
  { href: companyInfo.lineUrl, icon: 'fa-brands fa-line', bg: 'bg-[#06C755]', title: 'Line', external: true },
  { href: companyInfo.facebook, icon: 'fa-brands fa-facebook-f', bg: 'bg-[#1877F2]', title: 'Facebook', external: true }
]
</script>

<template>
  <div class="fixed bottom-8 right-8 z-50 flex flex-col-reverse items-center gap-3 group">
    <!-- Main FAB -->
    <button class="w-16 h-16 bg-gradient-to-br from-brand-gold to-yellow-600 text-black rounded-full flex items-center justify-center text-2xl shadow-2xl cursor-pointer transition-all duration-500 group-hover:rotate-45 group-hover:scale-110 animate-pulse-glow">
      <i class="fa-solid fa-plus"></i>
    </button>
    
    <!-- FAB Items -->
    <a 
      v-for="(item, index) in fabItems" 
      :key="index"
      :href="item.href"
      :target="item.external ? '_blank' : undefined"
      :title="item.title"
      class="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg shadow-xl opacity-0 translate-y-4 scale-0 transition-all duration-300 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 group-hover:pointer-events-auto hover:scale-110"
      :class="item.bg"
      :style="{ transitionDelay: `${(fabItems.length - index) * 50}ms` }"
    >
      <i :class="item.icon"></i>
    </a>
  </div>
</template>
