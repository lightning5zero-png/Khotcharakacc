<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'
import { articleContentToHtml } from '../../utils/articleContent'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const route = useRoute()
const router = useRouter()
const article = ref(null)
const isLoading = ref(true)

const renderedBody = computed(() => {
  if (!article.value) return ''
  const content = locale.value === 'en' && article.value.content_en ? article.value.content_en : article.value.content
  return content ? articleContentToHtml(content) : ''
})

const pdfEmbedUrl = computed(() => {
  if (!article.value?.pdf_url) return ''
  const url = article.value.pdf_url.trim()

  const driveFileId = url.match(/drive\.google\.com\/file\/d\/([^\/]+)\//)
  if (driveFileId) {
    return `https://drive.google.com/file/d/${driveFileId[1]}/preview`
  }

  const driveOpenId = url.match(/drive\.google\.com\/open\?id=([^&]+)/)
  if (driveOpenId) {
    return `https://drive.google.com/file/d/${driveOpenId[1]}/preview`
  }

  const driveUcId = url.match(/drive\.google\.com\/uc\?id=([^&]+)/)
  if (driveUcId) {
    return `https://drive.google.com/file/d/${driveUcId[1]}/preview`
  }

  const docsPreview = url.match(/docs\.google\.com\/document\/d\/([^\/]+)\//)
  if (docsPreview) {
    return url.replace(/\/edit.*$/, '/preview')
  }

  return url
})

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
    const title = locale.value === 'en' && data.title_en ? data.title_en : data.title
    document.title = `${title} - Khotcharak Accounting`
    
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
                        <i class="fa-solid fa-arrow-left mr-2"></i> {{ t('articles.back_to_list') }}
                    </router-link>
                    
                    <div class="flex items-center gap-4 mb-4">
                        <span class="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                            {{ article.category || t('articles.general') }}
                        </span>
                        <span class="text-xs text-gray-400 flex items-center">
                             <i class="fa-regular fa-calendar-alt mr-2"></i>
                            {{ new Date(article.created_at).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                        </span>
                    </div>
                    
                    <h1 class="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                        {{ locale === 'en' && article.title_en ? article.title_en : article.title }}
                    </h1>

                    <div class="flex items-center">
                         <div class="w-10 h-10 rounded-full bg-brand-gold text-white flex items-center justify-center text-lg font-bold shadow-lg">
                            {{ (article.author || 'Admin').charAt(0) }}
                         </div>
                         <div class="ml-3">
                             <p class="text-sm font-bold text-gray-900">{{ t('articles.written_by') }} {{ article.author || 'Admin' }}</p>
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
                      prose-blockquote:border-l-brand-gold prose-blockquote:text-gray-600 prose-blockquote:not-italic
                      whitespace-pre-wrap"
                    v-html="renderedBody"
                />

                <section v-if="article.pdf_url" class="mt-12 bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-sm">
                    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900">เอกสารตัวอย่าง</h2>
                            <p class="mt-2 text-sm text-gray-500">ดูตัวอย่าง PDF ด้านล่าง หรือดาวน์โหลดเก็บไว้ใช้อ้างอิง</p>
                        </div>
                        <a
                            :href="article.pdf_url"
                            target="_blank"
                            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold text-white font-semibold hover:bg-yellow-500 transition-colors"
                        >
                            <i class="fa-solid fa-file-pdf"></i>
                            ดู / ดาวน์โหลด PDF
                        </a>
                    </div>

                    <div class="overflow-hidden rounded-3xl border border-gray-200 bg-white">
                        <iframe
                            :src="pdfEmbedUrl"
                            class="w-full min-h-[520px]"
                            frameborder="0"
                        ></iframe>
                    </div>
                </section>
            </div>
        </article>
    </div>
  </div>
</template>

