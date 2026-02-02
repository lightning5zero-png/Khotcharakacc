<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../../lib/supabase'

const router = useRouter()
const route = useRoute()
const isEditing = computed(() => route.params.id)

const form = ref({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'ความรู้ทั่วไป',
    cover_image: ''
})

const imageFile = ref(null)
const imagePreview = ref('')
const isSubmitting = ref(false)
const isLoading = ref(isEditing.value ? true : false)

// Fetch data if editing
const fetchArticle = async () => {
    if (!isEditing.value) return
    
    try {
        const { data, error } = await supabase
            .from('articles')
            .select('*')
            .eq('id', route.params.id)
            .single()
            
        if (error) throw error
        
        form.value = { ...data }
        imagePreview.value = data.cover_image
        
    } catch (error) {
        console.error('Error:', error)
        alert('ไม่พบข้อมูลบทความ')
        router.push('/admin/dashboard')
    } finally {
        isLoading.value = false
    }
}

// Auto-generate slug from title
const generateSlug = () => {
    if (!form.value.title) return
    // Simple slug generator for Thai/English
    form.value.slug = form.value.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w\u0E00-\u0E7F-]/g, '') // Keep Thai chars
        + '-' + Math.floor(Math.random() * 1000) // Add random number to ensure uniqueness
}

const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        imageFile.value = file
        imagePreview.value = URL.createObjectURL(file)
    }
}

const uploadImage = async () => {
    if (!imageFile.value) return form.value.cover_image
    
    const fileName = `${Date.now()}-${imageFile.value.name}`
    const { data, error } = await supabase.storage
        .from('article-images')
        .upload(fileName, imageFile.value)
        
    if (error) throw error
    
    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName)
        
    return publicUrl
}

const handleSubmit = async () => {
    if (!form.value.title || !form.value.slug) {
        alert('กรุณากรอกหัวข้อและ Slug')
        return
    }

    isSubmitting.value = true
    
    try {
        // 1. Upload Image if changed
        let imageUrl = form.value.cover_image
        if (imageFile.value) {
            imageUrl = await uploadImage()
        }
        
        // 2. Prepare Data
        const articleData = {
            ...form.value,
            cover_image: imageUrl,
            author: 'Admin' // Default author for now
        }
        
        // 3. Insert or Update
        let error
        if (isEditing.value) {
            const { error: updateError } = await supabase
                .from('articles')
                .update(articleData)
                .eq('id', route.params.id)
            error = updateError
        } else {
            const { error: insertError } = await supabase
                .from('articles')
                .insert([articleData])
            error = insertError
        }
        
        if (error) throw error
        
        alert('บันทึกข้อมูลสำเร็จ!')
        router.push('/admin/dashboard')
        
    } catch (error) {
        console.error('Error saving article:', error)
        alert('เกิดข้อผิดพลาด: ' + error.message)
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => {
    fetchArticle()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="container mx-auto px-4 max-w-4xl">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                <h1 class="text-2xl font-bold text-gray-900">
                    {{ isEditing ? 'แก้ไขบทความ' : 'เขียนบทความใหม่' }}
                </h1>
                <router-link to="/admin/dashboard" class="text-gray-500 hover:text-gray-900">
                    <i class="fas fa-times"></i> ยกเลิก
                </router-link>
            </div>

            <div v-if="isLoading" class="text-center py-12">
                Loading...
            </div>
            
            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">หัวข้อบทความ</label>
                    <input 
                        v-model="form.title" 
                        @change="!isEditing && !form.slug && generateSlug()"
                        type="text" 
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        placeholder="เช่น 5 เทคนิคยื่นภาษีปี 2567"
                    >
                </div>
                
                <!-- Slug & Category -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                        <div class="flex">
                            <span class="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                /articles/
                            </span>
                            <input 
                                v-model="form.slug" 
                                type="text" 
                                required
                                class="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                                placeholder="5-tax-tips-2024"
                            >
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">หมวดหมู่</label>
                        <select 
                            v-model="form.category"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        >
                            <option>ความรู้ทั่วไป</option>
                            <option>ความรู้ภาษี</option>
                            <option>เคล็ดลับบัญชี</option>
                            <option>อัพเดทกฎหมาย</option>
                            <option>การจดทะเบียนบริษัท</option>
                        </select>
                    </div>
                </div>

                <!-- Image Upload -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">รูปหน้าปก</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors relative" :class="{'bg-gray-50': imagePreview}">
                        <input 
                            type="file" 
                            accept="image/*" 
                            @change="handleImageChange"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        >
                        <div v-if="imagePreview" class="relative z-10">
                            <img :src="imagePreview" class="h-48 mx-auto object-cover rounded-lg shadow-sm mb-2">
                            <span class="text-sm text-blue-600">คลิกเพื่อเปลี่ยนรูปภาพ</span>
                        </div>
                        <div v-else class="py-8">
                            <i class="fas fa-cloud-upload-alt text-4xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">คลิกเพื่ออัปโหลดรูปภาพ</p>
                            <p class="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                        </div>
                    </div>
                </div>

                <!-- Excerpt -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">เกริ่นนำ (Excerpt)</label>
                    <textarea 
                        v-model="form.excerpt" 
                        rows="3" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        placeholder="ข้อความสั้นๆ ที่จะแสดงในหน้าแรก..."
                    ></textarea>
                </div>

                <!-- Content (Simple Textarea for now) -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">เนื้อหาบทความ (HTML Support)</label>
                    <div class="text-xs text-gray-500 mb-2">
                        * สามารถใช้ HTML tags เช่น &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt; ได้
                    </div>
                    <textarea 
                        v-model="form.content" 
                        rows="15" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-mono text-sm"
                        placeholder="เขียนเนื้อหาบทความของคุณที่นี่..."
                    ></textarea>
                </div>

                <!-- Actions -->
                <div class="flex justify-end gap-4 pt-6 border-t border-gray-100">
                    <router-link 
                        to="/admin/dashboard"
                        class="px-6 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        ยกเลิก
                    </router-link>
                    <button 
                        type="submit" 
                        :disabled="isSubmitting"
                        class="px-8 py-2 rounded-full bg-brand-gold text-white font-bold hover:bg-yellow-600 shadow-md hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
                    >
                        <i v-if="isSubmitting" class="fas fa-spinner fa-spin mr-2"></i>
                        {{ isSubmitting ? 'กำลังบันทึก...' : 'บันทึกบทความ' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>
