<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const toggleLanguage = () => {
  locale.value = locale.value === 'th' ? 'en' : 'th'
  localStorage.setItem('locale', locale.value)
}

// Force scrolled state if not on home page
const isScrolledForce = computed(() => {
  return route.path !== '/' || isScrolled.value
})

const navLinks = computed(() => [
  { to: '/about', label: t('nav.about') },
  { href: '/#vision', label: t('nav.vision') },
  { href: '/#our-services', label: t('nav.services') },
  { href: '/#services', label: t('nav.accounting_price') },
  { href: '/#pricing', label: t('nav.registration') },
  { to: '/articles', label: t('nav.articles') }
])

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

const handleNavClick = (link) => {
  closeMenu()
  if (link.href && link.href.startsWith('/#')) {
    // If it's an anchor link, check if we are on home page
    if (router.currentRoute.value.path !== '/') {
      router.push('/').then(() => {
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.querySelector(link.href.replace('/', ''))
          if (element) element.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      })
    } else {
       // Just scroll
       const element = document.querySelector(link.href.replace('/', ''))
       if (element) element.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <header 
    class="fixed top-0 w-full z-50 transition-all duration-500" 
    :class="isScrolledForce ? 'glass-light shadow-lg shadow-black/10' : 'bg-transparent'"
  >
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-4 group">
        <div class="h-14 w-14 rounded-2xl flex items-center justify-center overflow-hidden border-2 transition-all duration-300 group-hover:scale-105"
             :class="isScrolledForce ? 'bg-white border-brand-gold/30 shadow-lg' : 'bg-white/10 border-brand-gold/50 backdrop-blur-sm'">
          <img src="/pic/Head_EP_Gold.webp" alt="โลโก้ บริษัท คชรักษ์การบัญชีและกฎหมาย จำกัด" class="h-10 w-10 object-contain">
        </div>
        <div class="hidden sm:block">
          <span class="block font-bold text-lg leading-tight tracking-wide transition-colors"
                :class="isScrolledForce ? 'text-brand-red' : 'text-white'">
            {{ t('hero.badge') }}
          </span>
          <span class="block text-xs tracking-widest uppercase"
                :class="isScrolledForce ? 'text-brand-gold' : 'text-brand-gold'">
            Khotcharak Accounting & Law
          </span>
        </div>
      </router-link>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center gap-2">
        <template v-for="link in navLinks" :key="link.label">
          <router-link 
            v-if="link.to"
            :to="link.to"
            class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-brand-gold/10"
            :class="isScrolledForce ? 'text-gray-700 hover:text-brand-red' : 'text-white/80 hover:text-white'"
            active-class="!text-brand-red font-bold"
          >
            {{ link.label }}
          </router-link>
          <a 
            v-else
            :href="link.href"
            class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:bg-brand-gold/10"
            :class="isScrolledForce ? 'text-gray-700 hover:text-brand-red' : 'text-white/80 hover:text-white'"
          >
            {{ link.label }}
          </a>
        </template>
        
        <!-- Language Switcher -->
        <button 
          @click="toggleLanguage"
          class="flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105"
          :class="isScrolledForce 
            ? 'border-brand-gold/30 text-gray-700 bg-brand-gold/5' 
            : 'border-white/20 text-white bg-white/10 backdrop-blur-md'"
        >
          <span :class="locale === 'th' ? 'font-bold text-brand-red' : 'opacity-50'">TH</span>
          <span class="w-[1px] h-3 bg-gray-400 opacity-30"></span>
          <span :class="locale === 'en' ? 'font-bold text-brand-red' : 'opacity-50'">EN</span>
        </button>

        <a 
          href="#contact"
          class="ml-4 btn-gold text-sm !py-3 !px-6"
        >
          <i class="fa-solid fa-phone mr-2" aria-hidden="true"></i>
          {{ t('nav.contact') }}
        </a>
      </nav>

      <!-- Mobile Menu Button -->
      <button 
        @click="toggleMenu" 
        class="lg:hidden text-2xl focus:outline-none transition-colors"
        :class="isScrolledForce ? 'text-brand-red' : 'text-white'"
        :aria-label="isMenuOpen ? t('common.close_menu') : t('common.open_menu')"
        :aria-expanded="isMenuOpen"
      >
        <i :class="isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" aria-hidden="true"></i>
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
          <template v-for="link in navLinks" :key="link.label">
            <router-link 
              v-if="link.to"
              :to="link.to"
              @click="closeMenu"
              class="p-4 hover:bg-brand-gold/10 rounded-xl text-white font-medium border border-transparent hover:border-brand-gold/30 transition-all"
              active-class="text-brand-gold bg-brand-gold/5 border-brand-gold/50"
            >
              {{ link.label }}
            </router-link>
            <a 
              v-else
              :href="link.href"
              @click="handleNavClick(link)"
              class="p-4 hover:bg-brand-gold/10 rounded-xl text-white font-medium border border-transparent hover:border-brand-gold/30 transition-all"
            >
              {{ link.label }}
            </a>
          </template>
          
          <div class="flex items-center justify-between px-4 mt-2">
            <span class="text-white/60 text-xs font-bold uppercase tracking-widest">Language</span>
            <div class="flex gap-2">
              <button 
                @click="locale = 'th'; localStorage.setItem('locale', 'th')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                :class="locale === 'th' ? 'bg-brand-gold text-black' : 'bg-white/5 text-white/50'"
              >TH</button>
              <button 
                @click="locale = 'en'; localStorage.setItem('locale', 'en')"
                class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
                :class="locale === 'en' ? 'bg-brand-gold text-black' : 'bg-white/5 text-white/50'"
              >EN</button>
            </div>
          </div>

          <a 
            href="#contact" 
            @click="closeMenu"
            class="p-4 bg-gradient-to-r from-brand-gold to-yellow-600 text-black rounded-xl text-center font-bold mt-4"
          >
            <i class="fa-solid fa-phone mr-2" aria-hidden="true"></i>
            {{ t('nav.contact') }}
          </a>
        </div>
      </div>
    </transition>
  </header>
</template>
