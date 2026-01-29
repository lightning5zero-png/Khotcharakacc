---
description: ขั้นตอนการรันโปรเจคในแต่ละวัน (Morning Routine)
---

# ขั้นตอนการเริ่มทำงานในแต่ละวัน

เพื่อให้โปรเจคทำงานได้ถูกต้องและเป็นเวอร์ชันล่าสุดเสมอ แนะนำให้ทำตามขั้นตอนดังนี้ครับ:

1. **เปิด Terminal** ในโฟลเดอร์หลักของโปรเจค `Web KLACC RED`

2. **ดึงข้อมูลล่าสุดจาก Git (ถ้ามีทีมทำงานร่วมกัน)**
   // turbo
   ```bash
   git pull
   ```

3. **เข้าไปที่โฟลเดอร์ vue-app**
   ```bash
   cd vue-app
   ```

4. **ติดตั้งหรืออัปเดต Library (ถ้ามีการเพิ่มไฟล์ใหม่ใน package.json)**
   // turbo
   ```bash
   npm install
   ```

5. **รันโปรเจค (Development Server)**
   // turbo
   ```bash
   npm run dev
   ```

6. **เปิด Browser** ตาม URL ที่แสดงขึ้นมา (ปกติคือ `http://localhost:5173`)
