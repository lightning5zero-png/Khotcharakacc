<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { supabase } from '../../lib/supabase'
import { articleContentToHtml } from '../../utils/articleContent'

const router = useRouter()
const route = useRoute()
const isEditing = computed(() => route.params.id)

const form = ref({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'ความรู้ทั่วไป',
    cover_image: '',
    pdf_url: '',
    title_en: '',
    excerpt_en: '',
    content_en: ''
})

const activeLang = ref('th')

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

    const normalized = form.value.title
        .toLowerCase()
        .replace(/\s+/g, '-')

    form.value.slug = [...normalized]
        .map((ch) => {
            const code = ch.charCodeAt(0)
            if (
                (code >= 97 && code <= 122) ||
                (code >= 48 && code <= 57) ||
                (code >= 0x0E00 && code <= 0x0E7F) ||
                ch === '-'
            ) {
                return ch
            }
            return ''
        })
        .join('')
        + '-' + Math.floor(Math.random() * 1000)
}

const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
        imageFile.value = file
        imagePreview.value = URL.createObjectURL(file)
    }
}

const handlePdfUrlChange = (event) => {
    form.value.pdf_url = event.target.value.trim()
}

const uploadImage = async () => {
    if (!imageFile.value) return form.value.cover_image

    const fileName = `${Date.now()}-${imageFile.value.name}`
    const { data, error } = await supabase.storage
        .from('article-images')
        .upload(fileName, imageFile.value)
        
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(fileName)
        
    return publicUrl
}

const wrapParagraphsFromBlankLines = () => {
    const c = activeLang.value === 'th' ? form.value.content.trim() : form.value.content_en.trim()
    if (!c) return
    if (/<\/?[a-z][a-z0-9]*[\s/>]/i.test(c)) {
        alert(
            'เนื้อหามีแท็ก HTML อยู่แล้ว — ปุ่มนี้ใช้กับข้อความล้วนๆ ที่คั่นย่อหน้าด้วยบรรทัดว่างเท่านั้น'
        )
        return
    }
    if (activeLang.value === 'th') {
        form.value.content = articleContentToHtml(c)
    } else {
        form.value.content_en = articleContentToHtml(c)
    }
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
        
        // 4. Insert or Update
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
                    <i class="fa-solid fa-times"></i> ยกเลิก
                </router-link>
            </div>

            <div v-if="isLoading" class="text-center py-12">
                Loading...
            </div>
            
            <form v-else @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Language Tabs -->
                <div class="flex space-x-2 border-b border-gray-100 pb-4">
                    <button 
                        type="button" 
                        @click="activeLang = 'th'"
                        class="px-4 py-2 rounded-t-lg font-bold transition-colors"
                        :class="activeLang === 'th' ? 'bg-brand-gold text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                    >
                        🇹🇭 ภาษาไทย
                    </button>
                    <button 
                        type="button" 
                        @click="activeLang = 'en'"
                        class="px-4 py-2 rounded-t-lg font-bold transition-colors"
                        :class="activeLang === 'en' ? 'bg-brand-gold text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'"
                    >
                        🇬🇧 English
                    </button>
                </div>

                <!-- Title -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">หัวข้อบทความ <span class="text-xs text-brand-gold ml-2">({{ activeLang === 'th' ? 'TH' : 'EN' }})</span></label>
                    <input 
                        v-if="activeLang === 'th'"
                        v-model="form.title" 
                        @change="!isEditing && !form.slug && generateSlug()"
                        type="text" 
                        required
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        placeholder="เช่น 5 เทคนิคยื่นภาษีปี 2567"
                    >
                    <input 
                        v-else
                        v-model="form.title_en" 
                        type="text" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        placeholder="e.g. 5 Tax Tips for 2024"
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
                            <i class="fa-solid fa-cloud-upload-alt text-4xl text-gray-300 mb-3"></i>
                            <p class="text-gray-500">คลิกเพื่ออัปโหลดรูปภาพ</p>
                            <p class="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                        </div>
                    </div>
                </div>

                <!-- PDF Attachment -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">เอกสารตัวอย่าง (PDF)</label>
                    <div class="border border-gray-200 rounded-2xl bg-gray-50 p-4">
                                <input
                            type="text"
                            v-model="form.pdf_url"
                            @input="handlePdfUrlChange"
                            placeholder="วางลิงก์ Google Drive หรือ PDF URL ที่นี่"
                            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        />
                        <div class="mt-3 text-sm text-gray-600 space-y-1">
                            <p v-if="form.pdf_url" class="text-gray-900 break-words">ลิงก์ปัจจุบัน: <a :href="form.pdf_url" target="_blank" class="text-brand-gold hover:underline">ดูลิงก์ PDF</a></p>
                            <p class="text-gray-500">แนะนำใช้ลิงก์ Google Drive เช่น <span class="font-mono">https://drive.google.com/file/d/FILE_ID/view?usp=sharing</span> หรือ URL PDF ตรง</p>
                            <p class="text-gray-400">ระบบจะแสดงตัวอย่าง PDF จากลิงก์นี้บนหน้าบทความ</p>
                        </div>
                    </div>
                </div>

                <!-- Excerpt -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">เกริ่นนำ (Excerpt) <span class="text-xs text-brand-gold ml-2">({{ activeLang === 'th' ? 'TH' : 'EN' }})</span></label>
                    <textarea 
                        v-if="activeLang === 'th'"
                        v-model="form.excerpt" 
                        rows="3" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        placeholder="ข้อความสั้นๆ ที่จะแสดงในหน้าแรก..."
                    ></textarea>
                    <textarea 
                        v-else
                        v-model="form.excerpt_en" 
                        rows="3" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                        placeholder="Short summary for the home page..."
                    ></textarea>
                </div>

                <!-- Content (Simple Textarea for now) -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">เนื้อหาบทความ <span class="text-xs text-brand-gold ml-2">({{ activeLang === 'th' ? 'TH' : 'EN' }})</span></label>
                    <div class="text-xs text-gray-500 mb-2 space-y-1">
                        <p>
                            พิมพ์ธรรมดาได้เลย — <strong>เว้นบรรทัดว่าง</strong> ระหว่างย่อหน้า ระบบจะจัดระยะให้อ่านง่ายบนหน้าเว็บโดยอัตโนมัติ
                        </p>
                        <p>
                            หรือใช้ HTML เช่น &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt; ถ้าต้องการควบคุมโครงสร้างเอง
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-2">
                        <button
                            type="button"
                            class="text-xs px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 hover:bg-brand-gold/10 hover:border-brand-gold/40 transition-colors"
                            @click="wrapParagraphsFromBlankLines"
                        >
                            แปลงบรรทัดว่างเป็น &lt;p&gt; (ข้อความล้วน)
                        </button>
                    </div>
                    <textarea 
                        v-if="activeLang === 'th'"
                        v-model="form.content" 
                        rows="15" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-mono text-sm"
                        placeholder="ย่อหนึ่ง&#10;&#10;ย่อสอง — เว้นบรรทัดว่างระหว่างย่อหน้า&#10;&#10;หรือใช้ &lt;h2&gt;หัวข้อย่อย&lt;/h2&gt;&lt;p&gt;เนื้อหา&lt;/p&gt;"
                    ></textarea>
                    <textarea 
                        v-else
                        v-model="form.content_en" 
                        rows="15" 
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all font-mono text-sm"
                        placeholder="Paragraph one&#10;&#10;Paragraph two..."
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
                        <i v-if="isSubmitting" class="fa-solid fa-spinner fa-spin mr-2"></i>
                        {{ isSubmitting ? 'กำลังบันทึก...' : 'บันทึกบทความ' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
  </div>
</template>

