// ข้อมูลบริษัท
export const companyInfo = {
    name: 'บริษัท คชรักษ์การบัญชีและกฎหมาย จำกัด',
    nameEn: 'KHOTCHARAK ACCOUNTING & LAW',
    phone: '035-951-545',
    line: 'Khotcharak824',
    lineUrl: 'https://line.me/ti/p/~Khotcharak824',
    email: 'contact@khotcharakacc.co.th',
    facebook: 'https://www.facebook.com/61565948142812',
    tiktok: 'https://www.tiktok.com/@khotcharakaccounting',
    address: '155/53 หมู่ที่ 3 อ.พระนครศรีอยุธยา จ.พระนครศรีอยุธยา 13000',
    googleMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3865.534875400162!2d100.59975879999999!3d14.3384289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e275ce0f35c1af%3A0x62ddc5ca457f21fd!2z4Lia4Lij4Li04Lip4Lix4LiXIOC4hOC4iuC4o-C4seC4geC4qeC5jOC4geC4suC4o-C4muC4seC4jeC4iuC4teC5geC4peC4sOC4geC4juC4q-C4oeC4suC4oiDguIjguLPguIHguLHguJQ!5e0!3m2!1sen!2sth!4v1764130138027!5m2!1sen!2sth',
    googleSheetUrl: 'https://script.google.com/macros/s/AKfycbwg_cYeXLq3wA5okSP_AZFm_xmq2qRf5Gm3eOMDmw0OoPqAJCc3YVzczU-DPx9At0FK/exec'
}

// สถิติ
export const stats = [
    { value: '100+', label: 'ลูกค้าที่ไว้วางใจ' },
    { value: '100%', label: 'ความถูกต้องแม่นยำ' },
    { value: '12+', label: 'จังหวัดที่ให้บริการ' }
]

// พันธกิจและวิสัยทัศน์
export const missionVision = {
    mission: {
        title: 'พันธกิจ (Mission)',
        icon: 'fa-solid fa-bullseye',
        content: '"ยกระดับการบริการด้านบัญชีและกฎหมายให้เป็นมาตรฐานสากล โดยมุ่งเน้นการปรับปรุงกระบวนการให้เหมาะสมกับความต้องการเฉพาะของธุรกิจ เพื่อสร้างรากฐานที่มั่นคงให้กับลูกค้า"'
    },
    vision: {
        title: 'วิสัยทัศน์ (Vision)',
        icon: 'fa-solid fa-eye',
        content: '"เป็นผู้ให้บริการด้านบัญชีและกฎหมาย โดยผู้เชี่ยวชาญมืออาชีพ และมุ่นมั่นพัฒนาองค์กรให้ขับเคลื่อนด้วยองค์ความรู้และนวัตกรรม เพื่อเป็นคู่คิดที่ไว้ใจได้ที่สุดของธุรกิจคุณ"'
    }
}

// บริการ 8 รายการ
export const services = [
    { id: 1, title: 'ทำบัญชี ปิดงบ รายเดือน/รายปี', desc: 'บันทึกบัญชี จัดทำงบการเงินครบถ้วน', image: '/pic/service/ทำบัญชี.webp' },
    { id: 2, title: 'รับยื่นและวางแผนภาษีอากร', desc: 'ทั้งภาษีบุคคลธรรมดาและนิติบุคคล', image: '/pic/service/ภาษี.webp' },
    { id: 3, title: 'วางระบบและแนะนำโปรแกรมบัญชี', desc: 'ให้เหมาะสมกับธุรกิจของคุณ', image: '/pic/service/วางระบบบัญชี.webp' },
    { id: 4, title: 'รับตรวจสอบบัญชี (CPA/TA)', desc: 'โดยผู้สอบบัญชีรับอนุญาต', image: '/pic/service/ปิดงบ.webp' },
    { id: 5, title: 'ทำบัญชีร้านค้าออนไลน์', desc: 'รองรับทุก Platform อีคอมเมิร์ซ', image: '/pic/service/ecom.webp' },
    { id: 6, title: 'ให้คำปรึกษาบัญชี/ภาษี/กฎหมาย', desc: 'พร้อมเป็นที่ปรึกษาด้านกฎหมายและร่วมว่าความ', image: '/pic/service/cons.webp' },
    { id: 7, title: 'จดทะเบียนจัดตั้ง/จดเลิกกิจการ', desc: 'บริษัท หจก. และจดทะเบียนพาณิชย์', image: '/pic/service/จดเลิก.webp' },
    { id: 8, title: 'บริการยื่น Visa/Work Permit/BOI', desc: 'และขึ้นทะเบียนประกันสังคมนายจ้าง/ลูกจ้าง', image: '/pic/service/visa.webp' }
]

// ตารางราคาทำบัญชี
export const accountingPrices = [
    { docs: '1 - 20', price: '2,500' },
    { docs: '21 - 40', price: '3,000' },
    { docs: '41 - 80', price: '3,500' },
    { docs: '81 - 120', price: '4,000' },
    { docs: '121 - 170', price: '4,500' },
    { docs: '171 - 300', price: '5,000' },
    { docs: '301 - 450', price: '5,500' },
    { docs: '451 - 500', price: '6,000' },
    { docs: '501 - 550', price: '6,500' },
    { docs: '551 - 600', price: '7,000' },
    { docs: '601 - 650', price: '7,500' },
    { docs: '651 - 700', price: '8,000' },
    { docs: '701 - 750', price: '8,500' }
]

// ขอบเขตงานบริการ
export const serviceScope = [
    'ทำบัญชี ปิดงบ รายเดือน/รายปี',
    'ยื่นภาษีบุคคล/นิติบุคคล (VAT, WHT)',
    'วางระบบบัญชีและแนะนำโปรแกรม',
    'ตรวจสอบบัญชีโดย CPA/TA',
    'บัญชีร้านค้าออนไลน์ทุก Platform',
    'ที่ปรึกษากฎหมายและภาษีอากร'
]

// ค่าทนายความ
export const lawyerFees = [
    { type: 'คดีแพ่ง (ศาลชั้นต้น)', rate: '10% - 15%', note: 'ของทุนทรัพย์ (ประเมินตามความซับซ้อน)' },
    { type: 'คดีอาญา (ศาลชั้นต้น)', rate: 'เริ่มต้น 30,000.-', note: 'ขึ้นอยู่กับอัตราโทษและความยากง่าย' }
]

// แพ็คเกจจดทะเบียน
export const registrationPackages = [
    {
        id: 1,
        type: 'หจก.',
        method: 'จดออนไลน์',
        price: '5,900',
        featured: false,
        features: ['ฟรี ตราประทับ', 'ฟรี กระเป๋าเอกสาร', 'ฟรี เปิดบัญชีธนาคาร', 'ฟรี เอกสาร 41 รายการ', 'ฟรี เทรนนิ่งภาษี'],
        note: '*ไม่ผูกมัดการทำบัญชี'
    },
    {
        id: 2,
        type: 'บริษัท',
        method: 'จดออนไลน์',
        price: '10,900',
        featured: true,
        features: ['ฟรี ตราประทับ + บัญชี', 'ฟรี กระเป๋าเอกสาร', 'ฟรี เอกสาร 41 รายการ', 'ฟรี เทรนนิ่งภาษี'],
        note: '*ไม่ผูกมัดการทำบัญชี'
    },
    {
        id: 3,
        type: 'หจก.',
        method: 'ยื่นเอกสาร',
        price: '8,900',
        featured: false,
        features: ['รวมของแถมครบชุด', 'เหมาะสำหรับยื่นแบบกระดาษ'],
        note: '*ไม่ผูกมัดการทำบัญชี'
    },
    {
        id: 4,
        type: 'บริษัท',
        method: 'ยื่นเอกสาร',
        price: '12,900',
        featured: false,
        features: ['รวมของแถมครบชุด', 'เหมาะสำหรับยื่นแบบกระดาษ'],
        note: '*ไม่ผูกมัดการทำบัญชี'
    }
]

// พื้นที่ให้บริการ
export const serviceAreas = [
    'กรุงเทพฯ', 'นนทบุรี', 'ปทุมธานี', 'อยุธยา', 'สิงห์บุรี', 'ชัยนาท',
    'อ่างทอง', 'ลพบุรี', 'สระบุรี', 'นครนายก', 'สุพรรณบุรี', 'สมุทรปราการ'
]

// Hero Slide Images
export const heroImages = [
    '/pic/head/office 1.webp',
    '/pic/head/office 2.webp',
    '/pic/head/office 3.webp',
    '/pic/head/office 7.webp'
]

// Activity Gallery Images
export const activityImages = [
    '/pic/head/office 1.webp',
    '/pic/head/office 2.webp',
    '/pic/head/office 8.webp',
    '/pic/head/office 4.webp',
    '/pic/head/office 5.webp',
    '/pic/head/office 6.webp'
]
