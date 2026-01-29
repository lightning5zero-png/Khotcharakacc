<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'

const router = useRouter()
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
        alert('เกิดข้อผิดพลาดในการดึงข้อมูล')
    } finally {
        isLoading.value = false
    }
}

const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
}

const deleteArticle = async (id) => {
    if (!confirm('คุณต้องการลบบทความนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถกู้คืนได้')) return
    
    try {
        const { error } = await supabase
            .from('articles')
            .delete()
            .eq('id', id)
            
        if (error) throw error
        
        // Remove from list
        articles.value = articles.value.filter(a => a.id !== id)
        
    } catch (error) {
        console.error('Error deleting article:', error)
        alert('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
}

onMounted(() => {
    fetchArticles()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">จัดการบทความ</h1>
                <p class="text-gray-500">รายงานบทความทั้งหมดในระบบ</p>
            </div>
            
            <div class="flex gap-3">
                 <router-link 
                    to="/admin/create" 
                    class="bg-brand-gold hover:bg-yellow-600 text-white px-6 py-2 rounded-full font-medium transition-colors flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
                >
                    <i class="fas fa-plus mr-2"></i> เขียนบทความใหม่
                </router-link>
                
                <button 
                    @click="handleLogout"
                    class="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-full font-medium transition-colors flex items-center"
                >
                    <i class="fas fa-sign-out-alt mr-2"></i> ออกจากระบบ
                </button>
            </div>
        </div>

        <!-- Content -->
        <div v-if="isLoading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-gold"></div>
        </div>
        
        <div v-else class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead class="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
                            <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">หัวข้อบทความ</th>
                            <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">หมวดหมู่</th>
                            <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">วันที่สร้าง</th>
                            <th class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr v-if="articles.length === 0">
                            <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                                ยังไม่มีบทความ สร้างบทความแรกของคุณเลย!
                            </td>
                        </tr>
                        
                        <tr v-for="article in articles" :key="article.id" class="hover:bg-gray-50 transition-colors group">
                            <td class="px-6 py-4 whitespace-nowrap w-20">
                                <img 
                                    :src="article.cover_image || 'https://placehold.co/100x100?text=No+Img'" 
                                    class="h-10 w-16 object-cover rounded-md"
                                >
                            </td>
                            <td class="px-6 py-4">
                                <div class="text-sm font-bold text-gray-900 line-clamp-1">{{ article.title }}</div>
                                <div class="text-xs text-gray-500 line-clamp-1">/articles/{{ article.slug }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 py-1 text-xs font-semibold rounded-full bg-brand-gold/10 text-brand-gold">
                                    {{ article.category || 'General' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {{ new Date(article.created_at).toLocaleDateString('th-TH') }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                <router-link 
                                    :to="`/admin/edit/${article.id}`" 
                                    class="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition-colors inline-block"
                                    title="แก้ไข"
                                >
                                    <i class="fas fa-edit"></i>
                                </router-link>
                                <button 
                                    @click="deleteArticle(article.id)"
                                    class="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full hover:bg-red-100 transition-colors"
                                    title="ลบ"
                                >
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>
</template>
