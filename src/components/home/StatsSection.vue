<script setup>
import { stats } from '@/data/content.js'

const icons = ['fa-solid fa-users', 'fa-solid fa-check-double', 'fa-solid fa-map-location-dot']
const colors = ['text-brand-red', 'text-green-600', 'text-brand-gold']
const bgColors = ['bg-brand-red/10', 'bg-green-600/10', 'bg-brand-gold/10']
</script>

<template>
  <section class="py-16 bg-white border-y border-gray-100">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="text-center group pt-8 md:pt-0 first:pt-0"
          data-aos="zoom-in"
          :data-aos-delay="index * 150"
        >
          <div class="relative inline-block mb-4">
            <div class="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                 :class="bgColors[index]">
              <i :class="[icons[index], colors[index]]" class="text-2xl"></i>
            </div>
          </div>
          
          <div class="text-4xl md:text-5xl font-bold mb-2" :class="colors[index]">
            {{ stat.value }}
          </div>
          <div class="text-gray-600 font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
