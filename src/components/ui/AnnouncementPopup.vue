<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'

const showPopup = ref(false)
const isVisible = ref(false)
const announcement = ref(null)

const fetchAnnouncement = async () => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      return
    }

    if (data && data.image_url) {
      announcement.value = data
      const seenId = localStorage.getItem('last_seen_announcement_id')
      if (seenId !== data.id.toString()) {
        setTimeout(() => {
          showPopup.value = true
          setTimeout(() => { isVisible.value = true }, 50)
        }, 1500)
      }
    }
  } catch (err) {
    console.error('Announcement Error:', err)
  }
}

const closePopup = () => {
  isVisible.value = false
  setTimeout(() => {
    showPopup.value = false
    if (announcement.value) {
      localStorage.setItem('last_seen_announcement_id', announcement.value.id.toString())
    }
  }, 300)
}

const handleAction = () => {
  if (announcement.value?.link_url) {
    window.open(announcement.value.link_url, '_blank')
    closePopup()
  }
}

onMounted(() => {
  fetchAnnouncement()
})
</script>

<template>
  <Teleport to="body">
    <div 
      v-if="showPopup" 
      class="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 transition-all duration-300"
      :class="isVisible ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/80 backdrop-blur-md"
        @click="closePopup"
      ></div>

      <!-- Popup Container (Image Only) -->
      <div 
        class="relative w-full max-w-xl transition-all duration-500 transform"
        :class="isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-12'"
      >
        <!-- Close Button (X) -->
        <button 
          @click="closePopup"
          class="absolute -top-12 right-0 sm:-top-4 sm:-right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all z-20 backdrop-blur-md shadow-2xl group"
        >
          <i class="fa-solid fa-xmark text-xl group-hover:rotate-90 transition-transform"></i>
        </button>

        <!-- The Image (Clickable) -->
        <div 
          class="relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] cursor-pointer group"
          @click="handleAction"
        >
          <img 
            :src="announcement.image_url" 
            :alt="announcement.title"
            class="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
          >
          
          <!-- Hover Hint (Only if link exists) -->
          <div v-if="announcement.link_url" class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
             <div class="bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <span>คลิกดูรายละเอียด</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Ensure the popup doesn't exceed screen height */
.max-w-xl {
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  max-height: 85vh;
  object-fit: contain;
}
</style>
