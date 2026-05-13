<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'
import Swal from 'sweetalert2'

const announcements = ref([])
const isLoading = ref(true)
const isSaving = ref(false)
const showModal = ref(false)

const currentItem = ref({
    title: '',
    description: '',
    image_url: '',
    link_url: '',
    active: true,
    type: 'promo'
})

const fetchAnnouncements = async () => {
    try {
        const { data, error } = await supabase
            .from('announcements')
            .select('*')
            .order('created_at', { ascending: false })
        
        if (error) throw error
        announcements.value = data
    } catch (error) {
        console.error('Error:', error)
        Swal.fire('Error', 'ไม่สามารถโหลดข้อมูลได้', 'error')
    } finally {
        isLoading.value = false
    }
}

const openCreateModal = () => {
    currentItem.value = {
        title: '',
        description: '',
        image_url: '',
        link_url: '',
        active: true,
        type: 'promo'
    }
    showModal.value = true
}

const openEditModal = (item) => {
    currentItem.value = { ...item }
    showModal.value = true
}

const saveAnnouncement = async () => {
    isSaving.value = true
    try {
        if (currentItem.value.id) {
            // Update
            const { error } = await supabase
                .from('announcements')
                .update({
                    title: currentItem.value.title,
                    description: currentItem.value.description,
                    image_url: currentItem.value.image_url,
                    link_url: currentItem.value.link_url,
                    active: currentItem.value.active,
                    type: currentItem.value.type
                })
                .eq('id', currentItem.value.id)
            
            if (error) throw error
        } else {
            // Create
            const { error } = await supabase
                .from('announcements')
                .insert([currentItem.value])
            
            if (error) throw error
        }

        Swal.fire('Success', 'บันทึกข้อมูลเรียบร้อยแล้ว', 'success')
        showModal.value = false
        fetchAnnouncements()
    } catch (error) {
        console.error('Error:', error)
        Swal.fire('Error', 'ไม่สามารถบันทึกข้อมูลได้: ' + (error.message || 'Unknown error'), 'error')
    } finally {
        isSaving.value = false
    }
}

const toggleActive = async (item) => {
    try {
        const { error } = await supabase
            .from('announcements')
            .update({ active: !item.active })
            .eq('id', item.id)
        
        if (error) throw error
        item.active = !item.active
    } catch (error) {
        console.error('Error:', error)
        Swal.fire('Error', 'ไม่สามารถเปลี่ยนสถานะได้', 'error')
    }
}

const deleteAnnouncement = async (id) => {
    const result = await Swal.fire({
        title: 'คุณต้องการลบประกาศนี้ใช่หรือไม่?',
        text: "การกระทำนี้ไม่สามารถกู้คืนได้",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'ใช่, ลบเลย!',
        cancelButtonText: 'ยกเลิก'
    })

    if (result.isConfirmed) {
        try {
            const { error } = await supabase
                .from('announcements')
                .delete()
                .eq('id', id)
            
            if (error) throw error
            announcements.value = announcements.value.filter(a => a.id !== id)
            Swal.fire('Deleted!', 'ลบประกาศเรียบร้อยแล้ว', 'success')
        } catch (error) {
            console.error('Error:', error)
            Swal.fire('Error', 'ไม่สามารถลบข้อมูลได้', 'error')
        }
    }
}

onMounted(() => {
    fetchAnnouncements()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="container mx-auto px-4">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div class="flex items-center gap-4">
                <router-link to="/admin" class="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                    <i class="fas fa-arrow-left"></i>
                </router-link>
                <div>
                    <h1 class="text-3xl font-bold text-gray-900">จัดการป็อปอัพประกาศ</h1>
                    <p class="text-gray-500">รายงานป็อปอัพทั้งหมดในระบบ</p>
                </div>
            </div>
            
            <button 
                @click="openCreateModal"
                class="bg-brand-gold hover:bg-yellow-600 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
                <i class="fas fa-plus"></i> เพิ่มประกาศใหม่
            </button>
        </div>

        <!-- Content -->
        <div v-if="isLoading" class="flex justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-gold"></div>
        </div>
        
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-if="announcements.length === 0" class="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <i class="fas fa-bullhorn text-4xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">ยังไม่มีข้อมูลประกาศ สร้างอันแรกของคุณเลย!</p>
            </div>

            <div 
                v-for="item in announcements" 
                :key="item.id"
                class="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
                <!-- Thumbnail -->
                <div class="h-48 bg-gray-100 relative">
                    <img 
                        v-if="item.image_url" 
                        :src="item.image_url" 
                        class="w-full h-full object-cover"
                    >
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-300">
                        <i class="fas fa-image text-4xl"></i>
                    </div>
                    
                    <!-- Status Badge -->
                    <div class="absolute top-4 left-4">
                        <span 
                            class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg"
                            :class="item.active ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'"
                        >
                            {{ item.active ? 'Active' : 'Inactive' }}
                        </span>
                    </div>
                </div>

                <div class="p-6">
                    <h3 class="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{{ item.title }}</h3>
                    <p class="text-gray-500 text-sm mb-6 line-clamp-2">{{ item.description }}</p>
                    
                    <div class="flex items-center justify-between border-t border-gray-50 pt-4">
                        <div class="flex gap-2">
                            <button 
                                @click="openEditModal(item)"
                                class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                            >
                                <i class="fas fa-edit"></i>
                            </button>
                            <button 
                                @click="deleteAnnouncement(item.id)"
                                class="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors"
                            >
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                        
                        <button 
                            @click="toggleActive(item)"
                            class="px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                            :class="item.active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'"
                        >
                            {{ item.active ? 'ปิดการแสดงผล' : 'เปิดการแสดงผล' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Edit/Create Modal -->
    <Teleport to="body">
        <div v-if="showModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showModal = false"></div>
            
            <div class="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                <div class="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 class="text-xl font-bold text-gray-900">{{ currentItem.id ? 'แก้ไขประกาศ' : 'เพิ่มประกาศใหม่' }}</h3>
                    <button @click="showModal = false" class="text-gray-400 hover:text-gray-600">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="p-8 max-h-[70vh] overflow-y-auto">
                    <div class="space-y-6">
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">หัวข้อประกาศ <span class="text-red-500">*</span></label>
                            <input 
                                v-model="currentItem.title" 
                                type="text" 
                                class="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 outline-none transition-all"
                                placeholder="เช่น โปรโมชั่นต้อนรับปีใหม่"
                            >
                        </div>
                        
                        <div>
                            <label class="block text-sm font-bold text-gray-700 mb-2">รายละเอียด</label>
                            <textarea 
                                v-model="currentItem.description" 
                                rows="3"
                                class="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 outline-none transition-all resize-none"
                                placeholder="รายละเอียดที่ต้องการแจ้งให้ลูกค้าทราบ..."
                            ></textarea>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">ลิงก์รูปภาพ (URL)</label>
                                <input 
                                    v-model="currentItem.image_url" 
                                    type="text" 
                                    class="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 outline-none transition-all"
                                    placeholder="https://..."
                                >
                            </div>
                            <div>
                                <label class="block text-sm font-bold text-gray-700 mb-2">ลิงก์เมื่อคลิกปุ่ม</label>
                                <input 
                                    v-model="currentItem.link_url" 
                                    type="text" 
                                    class="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/10 outline-none transition-all"
                                    placeholder="https://... หรือ /services"
                                >
                            </div>
                        </div>

                        <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                            <input 
                                v-model="currentItem.active" 
                                type="checkbox" 
                                id="active_check"
                                class="w-5 h-5 rounded text-brand-gold focus:ring-brand-gold"
                            >
                            <label for="active_check" class="text-sm font-bold text-gray-700">เปิดใช้งานทันที</label>
                        </div>
                    </div>
                </div>
                
                <div class="p-8 bg-gray-50 border-t border-gray-100 flex gap-4">
                    <button 
                        @click="saveAnnouncement"
                        :disabled="isSaving || !currentItem.title"
                        class="flex-1 bg-brand-gold text-white font-bold py-4 rounded-xl hover:bg-yellow-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {{ isSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
                    </button>
                    <button 
                        @click="showModal = false"
                        class="px-8 py-4 bg-white border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all"
                    >
                        ยกเลิก
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
  </div>
</template>

<style scoped>
@keyframes scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
    animation: scale-in 0.3s ease-out forwards;
}
</style>
