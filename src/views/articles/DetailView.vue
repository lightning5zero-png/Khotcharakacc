<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'
import { articleContentToHtml } from '../../utils/articleContent'

const route = useRoute()
const router = useRouter()
const article = ref(null)
const isLoading = ref(true)

const renderedBody = computed(() =>
  article.value ? articleContentToHtml(article.value.content) : ''
)

const fetchArticle = async () => {
  try {
    const slug = route.params.slug
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single()
    
    if (error) throw error
    if (!data) {
        // Handle 404 - Article not found
        router.push('/articles')
        return
    }
    
    article.value = data
    
    // Update Document Title for SEO
    document.title = `${data.title} - Khotcharak Accounting`
    
  } catch (error) {
    console.error('Error fetching article:', error)
    // router.push('/articles') // Optional: Redirect on error
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchArticle()
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="bg-gray-50 min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-4xl">
        <!-- Loading State -->
        <div v-if="isLoading" class="animate-pulse bg-white p-8 rounded-2xl shadow-sm">
            <div class="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div class="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div class="h-64 bg-gray-200 rounded-xl mb-8"></div>
            <div class="space-y-4">
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
        </div>
        
        <!-- Article Content -->
        <article v-else-if="article" class="bg-white rounded-2xl shadow-sm overflow-hidden pb-8">
            <!-- Cover Image -->
            <div class="w-full h-[400px] overflow-hidden relative" v-if="article.cover_image">
                <img 
                    :src="article.cover_image" 
                    :alt="article.title"
                    class="w-full h-full object-cover"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            <div class="px-6 md:px-12 py-8 relative -mt-6 bg-white rounded-t-3xl mx-4 md:mx-12 shadow-md">
                 <!-- Header -->
                <div class="mb-8 border-b border-gray-100 pb-8">
                    <router-link to="/articles" class="inline-flex items-center text-sm text-gray-400 hover:text-brand-gold mb-4 transition-colors">
                        <i class="fas fa-arrow-left mr-2"></i> กลับหน้ารวมบทความ
                    </router-link>
                    
                    <div class="flex items-center gap-4 mb-4">
                        <span class="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            {{ article.category || 'ความรู้ทั่วไป' }}
                        </span>
                        <span class="text-xs text-gray-400 flex items-center">
                             <i class="far fa-calendar-alt mr-2"></i>
                            {{ new Date(article.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                        </span>
                    </div>
                    
                    <h1 class="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        {{ article.title }}
                    </h1>

                    <div class="flex items-center">
                         <div class="w-10 h-10 rounded-full bg-brand-gold text-white flex items-center justify-center text-lg font-bold shadow-lg">
                            {{ (article.author || 'Admin').charAt(0) }}
                         </div>
                         <div class="ml-3">
                             <p class="text-sm font-bold text-gray-900">เขียนโดย {{ article.author || 'Admin' }}</p>
                             <p class="text-xs text-gray-500">Khotcharak Editorial Team</p>
                         </div>
                    </div>
                </div>

                <!-- Content body: typography plugin + plain-text paragraphs auto-wrapped -->
                <div
                    class="article-body prose prose-lg max-w-none text-gray-700
                      prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-gray-900 prose-headings:tracking-tight
                      prose-p:leading-relaxed prose-p:my-4 prose-p:text-gray-700
                      prose-li:my-1 prose-li:leading-relaxed
                      prose-strong:text-gray-900
                      prose-a:font-medium prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
                      prose-img:rounded-xl prose-img:shadow-md prose-img:mx-auto
                      prose-blockquote:border-l-brand-gold prose-blockquote:text-gray-600 prose-blockquote:not-italic"
                    v-html="renderedBody"
                />
            </div>
        </article>
    </div>
  </div>
</template>
