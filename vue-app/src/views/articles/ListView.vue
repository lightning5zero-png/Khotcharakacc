<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'

const articles = ref([])
const isLoading = ref(true)

const fetchArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    articles.value = data
  } catch (error) {
    console.error('Error fetching articles:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchArticles()
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="bg-gradient-to-r from-[#0a2342] to-[#14532d] py-24 text-white text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('/bg-texture.png')] opacity-10"></div>
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-4xl md:text-5xl font-bold mb-4 font-heading">
          บทความและความรู้
        </h1>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto">
          รวมบทความสาระน่ารู้เกี่ยวกับบัญชี ภาษี และกฎหมาย เพื่อผู้ประกอบการยุคใหม่
        </p>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-4 py-16">
      <div v-if="isLoading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-gold"></div>
      </div>

      <div v-else-if="articles.length === 0" class="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
        <i class="fas fa-book-open text-gray-300 text-6xl mb-4 block"></i>
        <p class="text-gray-500 text-lg">ยังไม่มีบทความในขณะนี้</p>
        <router-link to="/" class="mt-4 inline-block text-brand-gold hover:underline">
          กลับสู่หน้าหลัก
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="article in articles" 
          :key="article.id"
          class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col h-full"
        >
          <!-- Image -->
          <router-link :to="{ name: 'article-detail', params: { slug: article.slug } }" class="block h-56 overflow-hidden relative">
            <img 
              :src="article.cover_image || 'https://placehold.co/600x400?text=No+Image'" 
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            >
            <div class="absolute top-4 left-4 bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-sm">
              {{ article.category || 'ความรู้ทั่วไป' }}
            </div>
          </router-link>
          
          <!-- Body -->
          <div class="p-6 flex-grow flex flex-col">
            <div class="mb-4">
               <span class="text-xs text-gray-400 flex items-center mb-2">
                <i class="far fa-calendar-alt mr-2 text-brand-gold"></i>
                {{ new Date(article.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </span>
              <h2 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-brand-gold transition-colors">
                <router-link :to="{ name: 'article-detail', params: { slug: article.slug } }">
                  {{ article.title }}
                </router-link>
              </h2>
              <p class="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                {{ article.excerpt }}
              </p>
            </div>
            
            <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
               <div class="flex items-center">
                 <!-- Author placeholder -->
                 <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    {{ (article.author || 'A').charAt(0) }}
                 </div>
                 <span class="ml-2 text-xs text-gray-500 font-medium">By Admin</span>
               </div>
               <router-link 
                :to="{ name: 'article-detail', params: { slug: article.slug } }"
                class="text-brand-gold text-sm font-semibold hover:text-brand-red transition-colors flex items-center"
              >
                อ่านต่อ <i class="fas fa-arrow-right ml-1 transform group-hover:translate-x-1 transition-transform"></i>
              </router-link>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
