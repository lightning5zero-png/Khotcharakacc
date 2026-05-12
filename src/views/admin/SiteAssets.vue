<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'

const router = useRouter()
const heroAssets = ref([])
const galleryAssets = ref([])
const galleryAlbums = ref({}) // Grouped gallery images
const isLoading = ref(true)
const isUploading = ref(false)
const uploadType = ref('hero') // 'hero' or 'gallery'
const selectedAlbum = ref('General')
const newAlbumName = ref('')
const isAddingNewAlbum = ref(false)

const fetchAssets = async () => {
    isLoading.value = true
    try {
        const { data, error } = await supabase
            .from('site_assets')
            .select('*')
            .order('order_index', { ascending: true })
        
        if (error) throw error
        
        heroAssets.value = data.filter(a => a.type === 'hero')
        galleryAssets.value = data.filter(a => a.type === 'gallery' || a.type.startsWith('gallery:'))
        
        // Group gallery images by album
        const groups = {}
        galleryAssets.value.forEach(asset => {
            let albumName = 'General'
            if (asset.type.includes(':')) {
                albumName = asset.type.split(':')[1]
            }
            if (!groups[albumName]) groups[albumName] = []
            groups[albumName].push(asset)
        })
        galleryAlbums.value = groups
    } catch (error) {
        console.error('Error fetching assets:', error)
    } finally {
        isLoading.value = false
    }
}

const albumList = computed(() => {
    const list = Object.keys(galleryAlbums.value)
    if (!list.includes('General')) list.unshift('General')
    return list
})

const handleFileUpload = async (event, type) => {
    const file = event.target.files[0]
    if (!file) return

    isUploading.value = true
    try {
        const finalType = type === 'gallery' 
            ? `gallery:${isAddingNewAlbum.value ? newAlbumName.value : selectedAlbum.value}` 
            : 'hero'

        const fileName = `${type}-${Date.now()}-${file.name}`
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('site-assets')
            .upload(fileName, file)
        
        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('site-assets')
            .getPublicUrl(fileName)

        const { error: dbError } = await supabase
            .from('site_assets')
            .insert([{
                url: publicUrl,
                type: finalType,
                order_index: (type === 'hero' ? heroAssets.value.length : galleryAssets.value.length)
            }])
        
        if (dbError) throw dbError

        // Reset states
        newAlbumName.value = ''
        isAddingNewAlbum.value = false
        await fetchAssets()
    } catch (error) {
        console.error('Upload error:', error)
        alert('เกิดข้อผิดพลาดในการอัปโหลด: ' + error.message)
    } finally {
        isUploading.value = false
        event.target.value = ''
    }
}

const deleteAsset = async (asset) => {
    if (!confirm('ยืนยันการลบรูปภาพนี้?')) return

    try {
        // 1. Delete from DB
        const { error: dbError } = await supabase
            .from('site_assets')
            .delete()
            .eq('id', asset.id)
        
        if (dbError) throw dbError

        // 2. Delete from storage if it's our storage
        if (asset.url.includes('supabase.co')) {
            const path = asset.url.split('/').pop()
            await supabase.storage
                .from('site-assets')
                .remove([path])
        }

        await fetchAssets()
    } catch (error) {
        console.error('Delete error:', error)
        alert('เกิดข้อผิดพลาดในการลบ')
    }
}

onMounted(() => {
    fetchAssets()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="container mx-auto px-4 max-w-6xl">
        <div class="flex items-center justify-between mb-8">
            <div>
                <h1 class="text-3xl font-bold text-gray-900">จัดการรูปภาพเว็บไซต์</h1>
                <p class="text-gray-500">จัดการรูปภาพ Hero และ Gallery กิจกรรม</p>
            </div>
            <router-link to="/admin/dashboard" class="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                <i class="fas fa-arrow-left mr-2"></i> กลับหน้าจัดการบทความ
            </router-link>
        </div>

        <div v-if="isLoading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-gold"></div>
        </div>

        <div v-else class="space-y-12">
            <!-- Hero Images Section -->
            <section>
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-bold text-gray-800 flex items-center">
                        <i class="fas fa-images mr-2 text-brand-gold"></i> รูปภาพ Hero (หน้าแรก)
                    </h2>
                    <label class="bg-brand-gold hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all shadow-md hover:shadow-lg">
                        <input type="file" accept="image/*" @change="e => handleFileUpload(e, 'hero')" class="hidden" :disabled="isUploading">
                        <i :class="isUploading ? 'fas fa-spinner fa-spin' : 'fas fa-plus'" class="mr-2"></i> เพิ่มรูป Hero
                    </label>
                </div>
                
                <div v-if="heroAssets.length === 0" class="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center text-gray-400">
                    ยังไม่มีรูปภาพ Hero (จะใช้เซ็ตเริ่มต้นจากระบบ)
                </div>
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div v-for="asset in heroAssets" :key="asset.id" class="relative group aspect-video rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all">
                        <img :src="asset.url" class="w-full h-full object-cover">
                        <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button @click="deleteAsset(asset)" class="w-10 h-10 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Gallery Images Section -->
            <section>
                <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-800 flex items-center">
                                <i class="fas fa-camera-retro mr-3 text-brand-red"></i> จัดการอัลบั้มกิจกรรม
                            </h2>
                            <p class="text-gray-500 text-sm mt-1">อัปโหลดรูปภาพแยกตามอัลบั้มเพื่อแสดงผลที่หน้าแรก</p>
                        </div>
                        
                        <div class="flex flex-wrap items-center gap-3">
                            <!-- Album Selector -->
                            <div v-if="!isAddingNewAlbum" class="flex items-center gap-2">
                                <select v-model="selectedAlbum" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                    <option v-for="album in albumList" :key="album" :value="album">{{ album }}</option>
                                </select>
                                <button @click="isAddingNewAlbum = true" class="text-brand-gold hover:text-yellow-700 text-sm font-bold">
                                    <i class="fas fa-plus-circle mr-1"></i> อัลบั้มใหม่
                                </button>
                            </div>
                            
                            <!-- New Album Input -->
                            <div v-else class="flex items-center gap-2">
                                <input v-model="newAlbumName" type="text" placeholder="ชื่ออัลบั้มใหม่..." class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                <button @click="isAddingNewAlbum = false" class="text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>

                            <label class="bg-brand-red hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-bold cursor-pointer transition-all shadow-md hover:shadow-lg flex items-center">
                                <input type="file" accept="image/*" @change="e => handleFileUpload(e, 'gallery')" class="hidden" :disabled="isUploading">
                                <i :class="isUploading ? 'fas fa-spinner fa-spin' : 'fas fa-upload'" class="mr-2"></i> 
                                {{ isAddingNewAlbum ? 'อัปโหลดลงอัลบั้มใหม่' : `เพิ่มรูปลง ${selectedAlbum}` }}
                            </label>
                        </div>
                    </div>
                    
                    <div v-if="galleryAssets.length === 0" class="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                        <i class="fas fa-images text-4xl text-gray-200 mb-3"></i>
                        <p class="text-gray-400">ยังไม่มีรูปภาพกิจกรรม เริ่มอัปโหลดรูปแรกของคุณเลย</p>
                    </div>

                    <div v-else class="space-y-10">
                        <div v-for="(images, albumName) in galleryAlbums" :key="albumName" class="border-t border-gray-100 pt-6 first:border-0 first:pt-0">
                            <div class="flex items-center gap-3 mb-4">
                                <h3 class="font-bold text-gray-700">{{ albumName }}</h3>
                                <span class="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full uppercase">{{ images.length }} รูป</span>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                <div v-for="asset in images" :key="asset.id" class="relative group aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <img :src="asset.url" class="w-full h-full object-cover">
                                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button @click="deleteAsset(asset)" class="w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center">
                                            <i class="fas fa-trash-alt text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div class="mt-12 bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-start gap-4">
            <i class="fas fa-info-circle text-blue-500 mt-1"></i>
            <div class="text-sm text-blue-800">
                <p class="font-bold mb-1">คำแนะนำการอัปโหลด:</p>
                <ul class="list-disc ml-4 space-y-1">
                    <li>รูปภาพ Hero ควรเป็นแนวนอน (Landscape) ขนาดประมาณ 1920x1080px</li>
                    <li>รูปภาพกิจกรรมควรมีสัดส่วนที่ชัดเจน และเป็นไฟล์ภาพที่มีขนาดไม่เกิน 5MB</li>
                    <li>หากลบรูปจนหมด ระบบจะแสดงรูปเริ่มต้นที่ตั้งไว้ในโค้ดให้โดยอัตโนมัติ</li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>
