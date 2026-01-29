<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { href: '#vision', label: 'วิสัยทัศน์' },
  { href: '#our-services', label: 'บริการ' },
  { href: '#services', label: 'ราคาบัญชี' },
  { href: '#pricing', label: 'จดทะเบียน' }
]

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header 
    class="fixed top-0 w-full z-50 transition-all duration-500" 
    :class="isScrolled ? 'glass-light shadow-lg shadow-black/10' : 'bg-transparent'"
  >
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <a href="#" class="flex items-center gap-4 group">
        <div class="h-14 w-14 rounded-2xl flex items-center justify-center overflow-hidden border-2 transition-all duration-300 group-hover:scale-105"
             :class="isScrolled ? 'bg-white border-brand-gold/30 shadow-lg' : 'bg-white/10 border-brand-gold/50 backdrop-blur-sm'">
          <img src="/pic/Head_EP_Gold.webp" alt="Khotcharak" class="h-10 w-10 object-contain">
        </div>
        <div class="hidden sm:block">
          <span class="block font-bold text-lg leading-tight tracking-wide transition-colors"
                :class="isScrolled ? 'text-brand-red' : 'text-white'">
            คชรักษ์การบัญชีและกฎหมาย
          </span>
          <span class="block text-xs tracking-widest uppercase"
                :class="isScrolled ? 'text-brand-gold' : 'text-brand-gold'">
            Khotcharak Accounting & Law
          </span>
        </div>
      </a>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-2">
        <a 
          v-for="link in navLinks" 
          :key="link.href"
          :href="link.href"
          class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-brand-gold/10"
          :class="isScrolled ? 'text-gray-700 hover:text-brand-red' : 'text-white/80 hover:text-white'"
        >
          {{ link.label }}
        </a>
        <a 
          href="#contact"
          class="ml-4 btn-gold text-sm !py-3 !px-6"
        >
          <i class="fa-solid fa-phone mr-2"></i>
          ติดต่อเรา
        </a>
      </nav>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="lg:hidden text-2xl focus:outline-none transition-colors"
              :class="isScrolled ? 'text-brand-red' : 'text-white'">
        <i :class="isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-show="isMenuOpen"
        class="lg:hidden bg-[#0a0a0a] border-t border-brand-gold/20 absolute w-full"
      >
        <div class="flex flex-col p-6 space-y-2">
          <a 
            v-for="link in navLinks" 
            :key="link.href"
            :href="link.href"
            @click="closeMenu"
            class="p-4 hover:bg-brand-gold/10 rounded-xl text-white font-medium border border-transparent hover:border-brand-gold/30 transition-all"
          >
            {{ link.label }}
          </a>
          <a 
            href="#contact" 
            @click="closeMenu"
            class="p-4 bg-gradient-to-r from-brand-gold to-yellow-600 text-black rounded-xl text-center font-bold mt-4"
          >
            <i class="fa-solid fa-phone mr-2"></i>
            ติดต่อเรา
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
