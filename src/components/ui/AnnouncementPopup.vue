<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { supabase } from '@/lib/supabase'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const showPopup = ref(false)
const isVisible = ref(false)
const announcement = ref(null)

// Lock body scroll when popup is visible
watch(showPopup, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const fetchAnnouncement = async () => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Announcement fetch error:', error)
      return
    }

    if (data && data.image_url) {
      announcement.value = data
      // Always show popup on every visit
      setTimeout(() => {
        showPopup.value = true
        setTimeout(() => { isVisible.value = true }, 50)
      }, 1500)
    }
  } catch (err) {
    console.error('Announcement Error:', err)
  }
}

const closePopup = () => {
  isVisible.value = false
  setTimeout(() => {
    showPopup.value = false
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
      class="popup-overlay"
      :class="isVisible ? 'popup-overlay--visible' : ''"
    >
      <!-- Backdrop -->
      <div 
        class="popup-backdrop"
        @click="closePopup"
      ></div>

      <!-- Popup Container -->
      <div 
        class="popup-container"
        :class="isVisible ? 'popup-container--visible' : ''"
      >
        <!-- Close Button - inside the card, top-right corner -->
        <button 
          @click.stop="closePopup"
          class="popup-close-btn"
          aria-label="Close"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

        <!-- The Image (Clickable) -->
        <div 
          class="popup-image-wrapper"
          @click="handleAction"
        >
          <img 
            v-if="announcement"
            :src="announcement.image_url" 
            :alt="announcement.title || 'Announcement'"
            class="popup-image"
          >
          
          <!-- Hover/Tap Hint (Only if link exists) -->
          <div v-if="announcement?.link_url" class="popup-hover-hint">
             <div class="popup-hover-badge">
                <i class="fa-solid fa-arrow-up-right-from-square"></i>
                <span>{{ t('popup.view_details') }}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  padding-top: max(16px, env(safe-area-inset-top));
  padding-bottom: max(16px, env(safe-area-inset-bottom));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.popup-overlay--visible {
  opacity: 1;
}

.popup-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.popup-container {
  position: relative;
  width: 100%;
  max-width: 480px;
  max-height: 80vh;
  max-height: 80dvh;
  transform: scale(0.9) translateY(40px);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.popup-container--visible {
  transform: scale(1) translateY(0);
}

.popup-close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 30;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.popup-close-btn:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: rotate(90deg);
}

.popup-close-btn:active {
  transform: scale(0.9);
  background: rgba(0, 0, 0, 0.8);
}

.popup-image-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

.popup-image {
  width: 100%;
  height: auto;
  max-height: 75vh;
  max-height: 75dvh;
  display: block;
  object-fit: contain;
  transition: transform 0.7s ease;
}

.popup-image-wrapper:hover .popup-image {
  transform: scale(1.02);
}

.popup-hover-hint {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.popup-image-wrapper:hover .popup-hover-hint {
  opacity: 1;
}

.popup-hover-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px 24px;
  border-radius: 999px;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  gap: 8px;
  transform: translateY(12px);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.popup-image-wrapper:hover .popup-hover-badge {
  transform: translateY(0);
}

/* Mobile-specific adjustments */
@media (max-width: 640px) {
  .popup-overlay {
    padding: 12px;
    padding-top: max(12px, env(safe-area-inset-top));
    padding-bottom: max(12px, env(safe-area-inset-bottom));
  }
  
  .popup-container {
    max-width: 100%;
    max-height: 85vh;
    max-height: 85dvh;
  }

  .popup-image {
    max-height: 80vh;
    max-height: 80dvh;
  }

  .popup-image-wrapper {
    border-radius: 12px;
  }

  .popup-close-btn {
    top: 6px;
    right: 6px;
    width: 32px;
    height: 32px;
    font-size: 16px;
  }
}
</style>

