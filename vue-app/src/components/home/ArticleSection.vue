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
  <section class="py-20 bg-gray-50 bg-[url('/bg-texture.png')] bg-repeat bg-opacity-5">
    <div class="container mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          บทความและเกร็ดความรู้
        </h2>
        <div class="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
        <p class="text-gray-600 text-lg">
          อัปเดตข่าวสารภาษี กฎหมาย และทริคการบริหารธุรกิจจากทีมงานมืออาชีพ
        </p>
      </div>

      <!-- Articles Grid -->
      <div v-if="isLoading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-gold"></div>
      </div>
      
      <div v-else-if="articles.length === 0" class="text-center py-12 text-gray-500">
        ยังไม่มีบทความในขณะนี้
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <article 
          v-for="(article, index) in articles" 
          :key="article.id"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
          class="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
        >
          <!-- Image -->
          <div class="h-48 overflow-hidden relative">
            <img 
              :src="article.cover_image || 'https://placehold.co/600x400?text=No+Image'" 
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            >
            <div class="absolute top-4 left-4 bg-brand-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              {{ article.category || 'ความรู้ทั่วไป' }}
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-brand-gold transition-colors">
              <router-link :to="{ name: 'article-detail', params: { slug: article.slug } }">
                {{ article.title }}
              </router-link>
            </h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-3">
              {{ article.excerpt }}
            </p>
            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
              <span class="text-xs text-gray-400">
                <i class="far fa-calendar-alt mr-1"></i>
                {{ new Date(article.created_at).toLocaleDateString('th-TH') }}
              </span>
              <router-link 
                :to="{ name: 'article-detail', params: { slug: article.slug } }"
                class="text-brand-gold text-sm font-semibold hover:text-brand-red transition-colors"
              >
                อ่านเพิ่มเติม <i class="fas fa-arrow-right ml-1"></i>
              </router-link>
            </div>
          </div>
        </article>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-8" data-aos="fade-up">
        <router-link 
          to="/articles"
          class="inline-flex items-center justify-center px-8 py-3 border-2 border-brand-gold text-brand-gold bg-transparent rounded-full hover:bg-brand-gold hover:text-white transition-all duration-300 font-semibold"
        >
          ดูบทความทั้งหมด
          <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>
