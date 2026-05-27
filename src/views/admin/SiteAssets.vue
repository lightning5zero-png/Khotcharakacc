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
const newAlbumTitleTH = ref('')
const newAlbumTitleEN = ref('')
const newAlbumDescTH = ref('')
const newAlbumDescEN = ref('')
const isAddingNewAlbum = ref(false)
const editingAlbumId = ref(null)
const editingAlbumTitleTH = ref('')
const editingAlbumTitleEN = ref('')
const editingAlbumDescTH = ref('')
const editingAlbumDescEN = ref('')

const parseGalleryType = (type) => {
    const result = { albumId: 'General', metadata: {} }
    if (!type || !type.startsWith('gallery')) return result

    const [base, ...metaParts] = type.split('||')
    const [prefix, rawAlbumId = 'General'] = base.split(':')
    result.albumId = rawAlbumId || 'General'

    metaParts.forEach(part => {
        const idx = part.indexOf('=')
        if (idx > 0) {
            const key = part.slice(0, idx)
            const value = decodeURIComponent(part.slice(idx + 1))
            result.metadata[key] = value
        }
    })

    return result
}

const buildGalleryType = (albumId, metadata) => {
    const parts = [`gallery:${albumId}`]
    if (metadata.title_th) parts.push(`title_th=${encodeURIComponent(metadata.title_th)}`)
    if (metadata.title_en) parts.push(`title_en=${encodeURIComponent(metadata.title_en)}`)
    if (metadata.desc_th) parts.push(`desc_th=${encodeURIComponent(metadata.desc_th)}`)
    if (metadata.desc_en) parts.push(`desc_en=${encodeURIComponent(metadata.desc_en)}`)
    return parts.join('||')
}

const startEditAlbum = (albumId, metadata) => {
    editingAlbumId.value = albumId
    editingAlbumTitleTH.value = metadata?.title_th || ''
    editingAlbumTitleEN.value = metadata?.title_en || ''
    editingAlbumDescTH.value = metadata?.desc_th || ''
    editingAlbumDescEN.value = metadata?.desc_en || ''
}

const cancelEditAlbum = () => {
    editingAlbumId.value = null
    editingAlbumTitleTH.value = ''
    editingAlbumTitleEN.value = ''
    editingAlbumDescTH.value = ''
    editingAlbumDescEN.value = ''
}

const updateAlbumMetadata = async (albumId) => {
    const group = galleryAlbums.value[albumId]
    if (!group) return

    const newType = buildGalleryType(albumId, {
        title_th: editingAlbumTitleTH.value,
        title_en: editingAlbumTitleEN.value,
        desc_th: editingAlbumDescTH.value,
        desc_en: editingAlbumDescEN.value
    })

    const ids = group.images.map(img => img.id).filter(Boolean)
    if (ids.length === 0) return

    try {
        const { error } = await supabase
            .from('site_assets')
            .update({ type: newType })
            .in('id', ids)
        if (error) throw error
        await fetchAssets()
        cancelEditAlbum()
    } catch (err) {
        console.error('Update album metadata error:', err)
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูลอัลบั้ม')
    }
}

const safeAlbumKey = (name) => {
    return name.trim().replace(/[:|]/g, '').replace(/\s+/g, '_')
}

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
        
        // Group gallery images by album and collect optional translation metadata
        const groups = {}
        galleryAssets.value.forEach(asset => {
            const { albumId, metadata } = parseGalleryType(asset.type)
            if (!groups[albumId]) groups[albumId] = { metadata: {}, images: [] }
            if (Object.keys(groups[albumId].metadata).length === 0 && Object.keys(metadata).length > 0) {
                groups[albumId].metadata = metadata
            }
            groups[albumId].images.push(asset)
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
        let finalType = type === 'gallery'
            ? `gallery:${isAddingNewAlbum.value ? safeAlbumKey(newAlbumName.value) : selectedAlbum.value}`
            : 'hero'

        if (type === 'gallery' && isAddingNewAlbum.value) {
            const metadata = []
            if (newAlbumTitleTH.value) metadata.push(`title_th=${encodeURIComponent(newAlbumTitleTH.value)}`)
            if (newAlbumTitleEN.value) metadata.push(`title_en=${encodeURIComponent(newAlbumTitleEN.value)}`)
            if (newAlbumDescTH.value) metadata.push(`desc_th=${encodeURIComponent(newAlbumDescTH.value)}`)
            if (newAlbumDescEN.value) metadata.push(`desc_en=${encodeURIComponent(newAlbumDescEN.value)}`)
            if (metadata.length > 0) {
                finalType += `||${metadata.join('||')}`
            }
        }

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
                <i class="fa-solid fa-arrow-left mr-2"></i> กลับหน้าจัดการบทความ
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
                        <i class="fa-solid fa-images mr-2 text-brand-gold"></i> รูปภาพ Hero (หน้าแรก)
                    </h2>
                    <label class="bg-brand-gold hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold cursor-pointer transition-all shadow-md hover:shadow-lg">
                        <input type="file" accept="image/*" @change="e => handleFileUpload(e, 'hero')" class="hidden" :disabled="isUploading">
                        <i :class="isUploading ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-plus'" class="mr-2"></i> เพิ่มรูป Hero
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
                                <i class="fa-solid fa-trash-alt"></i>
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
                                <i class="fa-solid fa-camera-retro mr-3 text-brand-red"></i> จัดการอัลบั้มกิจกรรม
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
                                    <i class="fa-solid fa-plus-circle mr-1"></i> อัลบั้มใหม่
                                </button>
                            </div>
                            
                            <!-- New Album Input -->
                            <div v-else class="flex flex-col gap-3 w-full">
                                <input v-model="newAlbumName" type="text" placeholder="คีย์อัลบั้มใหม่ เช่น album_5" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input v-model="newAlbumTitleTH" type="text" placeholder="ชื่ออัลบั้ม (ไทย)" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                    <input v-model="newAlbumTitleEN" type="text" placeholder="Album title (English)" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input v-model="newAlbumDescTH" type="text" placeholder="คำอธิบายอัลบั้ม (ไทย)" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                    <input v-model="newAlbumDescEN" type="text" placeholder="Album description (English)" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                </div>
                                <button @click="isAddingNewAlbum = false" class="text-gray-400 hover:text-gray-600 self-end">
                                    <i class="fa-solid fa-times"></i>
                                </button>
                            </div>

                            <label class="bg-brand-red hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-bold cursor-pointer transition-all shadow-md hover:shadow-lg flex items-center">
                                <input type="file" accept="image/*" @change="e => handleFileUpload(e, 'gallery')" class="hidden" :disabled="isUploading">
                                <i :class="isUploading ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-upload'" class="mr-2"></i> 
                                {{ isAddingNewAlbum ? 'อัปโหลดลงอัลบั้มใหม่' : `เพิ่มรูปลง ${selectedAlbum}` }}
                            </label>
                        </div>
                    </div>
                    
                    <div v-if="galleryAssets.length === 0" class="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center">
                        <i class="fa-solid fa-images text-4xl text-gray-200 mb-3"></i>
                        <p class="text-gray-400">ยังไม่มีรูปภาพกิจกรรม เริ่มอัปโหลดรูปแรกของคุณเลย</p>
                    </div>

                    <div v-else class="space-y-10">
                        <div v-for="(group, albumId) in galleryAlbums" :key="albumId" class="border-t border-gray-100 pt-6 first:border-0 first:pt-0">
                            <div class="flex flex-col gap-2 mb-4">
                                <div class="flex flex-wrap items-center justify-between gap-3">
                                    <div class="flex items-center gap-3">
                                        <h3 class="font-bold text-gray-700">{{ group.metadata.th || group.metadata.en || albumId }}</h3>
                                        <span class="bg-gray-100 text-gray-500 text-[10px] px-2 py-0.5 rounded-full uppercase">{{ group.images.length }} รูป</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button
                                            v-if="editingAlbumId !== albumId"
                                            @click="startEditAlbum(albumId, group.metadata)"
                                            class="text-brand-gold hover:text-yellow-700 text-sm font-bold"
                                        >
                                            <i class="fa-solid fa-edit mr-1"></i> แก้ไขคำแปล
                                        </button>
                                        <button
                                            v-else
                                            @click="cancelEditAlbum"
                                            class="text-gray-400 hover:text-gray-700 text-sm font-bold"
                                        >
                                            <i class="fa-solid fa-times mr-1"></i> ยกเลิก
                                        </button>
                                    </div>
                                </div>
                                <p v-if="group.metadata.desc_th || group.metadata.desc_en" class="text-gray-500 text-sm">
                                    {{ group.metadata.desc_th }} <span v-if="group.metadata.desc_en" class="text-gray-400">/ {{ group.metadata.desc_en }}</span>
                                </p>
                            </div>
                            <div v-if="editingAlbumId === albumId" class="grid gap-3 md:grid-cols-2 mb-4">
                                <input v-model="editingAlbumTitleTH" type="text" placeholder="ชื่ออัลบั้ม (ไทย)" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                <input v-model="editingAlbumTitleEN" type="text" placeholder="Album title (English)" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                <input v-model="editingAlbumDescTH" type="text" placeholder="คำอธิบายอัลบั้ม (ไทย)" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                <input v-model="editingAlbumDescEN" type="text" placeholder="Album description (English)" class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-gold outline-none">
                                <div class="md:col-span-2 flex items-center gap-3">
                                    <button @click="updateAlbumMetadata(albumId)" class="bg-brand-gold hover:bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg">
                                        บันทึกคำแปล
                                    </button>
                                    <button @click="cancelEditAlbum" class="text-gray-600 hover:text-gray-900 text-sm font-bold">
                                        ยกเลิก
                                    </button>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                <div v-for="asset in group.images" :key="asset.id" class="relative group aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                                    <img :src="asset.url" class="w-full h-full object-cover">
                                    <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                        <button @click="deleteAsset(asset)" class="w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors flex items-center justify-center">
                                            <i class="fa-solid fa-trash-alt text-xs"></i>
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
            <i class="fa-solid fa-info-circle text-blue-500 mt-1"></i>
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

