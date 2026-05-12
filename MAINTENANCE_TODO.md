# 🛠️ Maintenance & Optimization Checklist
บันทึกประเด็นที่ต้องตรวจสอบและปรับปรุงในเซสชันถัดไป

## 1. 🚀 Performance & Stability (High Priority)
- [x] **Memory Leak Cleanup**: เพิ่ม `onUnmounted` ใน `HeroSection.vue` และ `ActivityGallery.vue` เพื่อเคลียร์ `setInterval` (News Ticker และ Album Preview)
- [x] **Data Fetching Safety**: ตรวจสอบการจัดการ Error ในทุกๆ API call ของ Supabase เพื่อไม่ให้หน้าจอขาวหากระบบขัดข้อง

## 2. ✨ User Experience (UX)
- [x] **Loading States**: เพิ่ม Skeleton Screen หรือ Loading Spinner ในส่วน Gallery และ News Ticker ระหว่างรอข้อมูลจากฐานข้อมูล
- [x] **Broken Link Handling**: ปรับเงื่อนไขของข่าวในหน้า Hero กรณีที่ยังไม่มีข้อมูลจริง (Mock Data) ไม่ให้กดแล้ว Error

## 3. 🔍 SEO & Accessibility
- [x] **Image Alt Text**: เพิ่ม `alt_text` ใน data model ของ Gallery Albums และนำมาใส่ในแท็ก `<img>` ทุกจุด + รองรับ `alt_text` column จาก Supabase
- [x] **Semantic HTML**: ตรวจสอบการใช้ Heading (H1, H2, H3) ให้ถูกต้องตามลำดับความสำคัญ (แก้ ServicesGrid h4→h3)

## 4. 🎨 UI Polish
- [x] **Animation Refinement**: News Ticker bar มี AOS animation ที่เสถียรแล้ว (data-aos="fade-up")
- [x] **Responsive Check**: เพิ่ม max-width containment และ breakpoint สำหรับ Ultra Wide (1536px+)

---
*อัพเดทล่าสุด: 12-05-2026*
*ดำเนินการเสร็จสิ้นทุกรายการ ✅*
