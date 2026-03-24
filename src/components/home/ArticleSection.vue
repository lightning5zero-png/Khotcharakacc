<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'

const articles = ref([])
const isLoading = ref(true)

const fetchLatestArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3)
    
    if (error) throw error
    articles.value = data
  } catch (error) {
    console.error('Error fetching articles:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchLatestArticles()
})
</script>

<template>
  <section class="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
    <!-- Background decoration -->
    <div class="absolute top-0 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl -translate-x-1/3"></div>
    
    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
        <span class="inline-block text-brand-gold text-sm font-bold tracking-[0.2em] uppercase mb-4 bg-brand-gold/10 px-5 py-2.5 rounded-full">Articles</span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          บทความและเกร็ดความรู้
        </h2>
        <p class="text-gray-500 text-lg">
          อัปเดตข่าวสารภาษี กฎหมาย และทริคการบริหารธุรกิจจากทีมงานมืออาชีพ
        </p>
        <div class="w-20 h-1 bg-gradient-to-r from-brand-red to-brand-gold mx-auto mt-6 rounded-full"></div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-16">
        <div class="relative w-16 h-16">
          <div class="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div class="absolute inset-0 rounded-full border-4 border-brand-gold border-t-transparent animate-spin"></div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="articles.length === 0" class="text-center py-16" data-aos="fade-up">
        <div class="max-w-md mx-auto">
          <div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-brand-gold/10 flex items-center justify-center">
            <i class="fa-solid fa-newspaper text-4xl text-brand-gold"></i>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">เร็วๆ นี้!</h3>
          <p class="text-gray-500 leading-relaxed mb-6">
            กำลังเตรียมบทความความรู้ด้านบัญชี ภาษี และกฎหมาย<br>
            จากทีมงานมืออาชีพ ติดตามได้เร็วๆ นี้
          </p>
          <div class="flex items-center justify-center gap-2 text-brand-gold">
            <div class="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></div>
            <div class="w-2 h-2 rounded-full bg-brand-gold animate-pulse" style="animation-delay: 0.2s"></div>
            <div class="w-2 h-2 rounded-full bg-brand-gold animate-pulse" style="animation-delay: 0.4s"></div>
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <article 
          v-for="(article, index) in articles" 
          :key="article.id"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
          <!-- Image -->
          <div class="h-52 overflow-hidden relative">
            <img 
              :src="article.cover_image || 'https://placehold.co/600x400?text=No+Image'" 
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div class="absolute top-4 left-4 bg-brand-gold text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-lg">
              {{ article.category || 'ความรู้ทั่วไป' }}
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <h3 class="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-gold transition-colors leading-snug">
              <router-link :to="{ name: 'article-detail', params: { slug: article.slug } }">
                {{ article.title }}
              </router-link>
            </h3>
            <p class="text-gray-500 text-sm mb-4 line-clamp-3 leading-relaxed">
              {{ article.excerpt }}
            </p>
            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
              <span class="text-xs text-gray-400 flex items-center gap-1.5">
                <i class="far fa-calendar-alt"></i>
                {{ new Date(article.created_at).toLocaleDateString('th-TH') }}
              </span>
              <router-link 
                :to="{ name: 'article-detail', params: { slug: article.slug } }"
                class="text-brand-gold text-sm font-semibold hover:text-brand-red transition-colors flex items-center gap-1.5"
              >
                อ่านเพิ่มเติม <i class="fas fa-arrow-right text-xs group-hover:translate-x-0.5 transition-transform"></i>
              </router-link>
            </div>
          </div>
        </article>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-8" data-aos="fade-up">
        <router-link 
          to="/articles"
          class="inline-flex items-center justify-center px-8 py-3.5 border-2 border-brand-gold text-brand-gold bg-transparent rounded-full hover:bg-brand-gold hover:text-white transition-all duration-300 font-semibold shadow-sm hover:shadow-lg"
        >
          ดูบทความทั้งหมด
          <i class="fas fa-arrow-right ml-2"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>
