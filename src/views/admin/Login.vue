<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
    isLoading.value = true
    errorMessage.value = ''
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
        
        if (error) throw error
        
        // Login successful, redirect to dashboard
        router.push({ name: 'admin-dashboard' })
        
    } catch (error) {
        console.error('Login error:', error)
        errorMessage.value = 'อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่'
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-[url('/bg-texture.png')]">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-brand-gold/10 rounded-full flex items-center justify-center mb-4 text-brand-gold text-2xl border border-brand-gold/20">
             <i class="fas fa-user-shield"></i>
        </div>
        <h2 class="mt-2 text-3xl font-extrabold text-gray-900">
          Admin Login
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          เข้าสู่ระบบจัดการหลังบ้าน
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input 
                id="email-address" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                v-model="email"
                class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm" 
                placeholder="Email address"
            >
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input 
                id="password" 
                name="password" 
                type="password" 
                autocomplete="current-password" 
                required 
                v-model="password"
                class="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-gold focus:border-brand-gold focus:z-10 sm:text-sm" 
                placeholder="Password"
            >
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {{ errorMessage }}
        </div>

        <div>
          <button 
            type="submit" 
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-brand-gold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <i class="fas fa-lock text-brand-gold-light group-hover:text-white transition-colors"></i>
            </span>
            <span v-if="isLoading">
                <i class="fas fa-spinner fa-spin mr-2"></i> กำลังเข้าสู่ระบบ...
            </span>
            <span v-else>เข้าสู่ระบบ</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
