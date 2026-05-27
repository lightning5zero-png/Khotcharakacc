export const serviceDetails = {
  1: {
    th: {
      importance: [
        { title: 'หน้าที่ตามกฎหมาย', desc: 'พระราชบัญญัติการบัญชีบังคับให้จัดทำและยื่นงบการเงินประจำปีภายในระยะเวลาที่กำหนด', icon: 'fa-solid fa-balance-scale' },
        { title: 'การบริหารจัดการ', desc: 'เพื่อให้ผู้บริหารทราบฐานะการเงิน ผลการดำเนินการ และกระแสเงินสดของกิจการที่แท้จริง', icon: 'fa-solid fa-chart-line' },
        { title: 'การเข้าถึงแหล่งเงินทุนและเพิ่มความน่าเชื่อถือ', desc: 'ใช้งบการเงินเป็นหลักฐานแสดงความน่าเชื่อถือเมื่อขอสินเชื่อจากสถาบันการเงินหรือหาผู้ร่วมลงทุน', icon: 'fa-solid fa-building-columns' }
      ],
      steps: [
        { title: 'จัดเก็บ', desc: 'รวบรวมเอกสารทางการเงินทั้งหมดจากหน้างานในแต่ละรอบเดือน', icon: 'fa-solid fa-folder-open' },
        { title: 'ตรวจสอบ', desc: 'ตรวจสอบความถูกต้องและความครบถ้วนของเอกสาร รายรับ-รายจ่ายตามหลักการบัญชี', icon: 'fa-solid fa-clipboard-check' },
        { title: 'บันทึก', desc: 'บันทึกรายการบัญชีลงในโปรแกรมสำเร็จรูป', icon: 'fa-solid fa-keyboard' },
        { title: 'ปรับปรุง', desc: 'ปรับปรุงรายการบัญชี ค้างรับ – ค้างจ่าย ค่าเสื่อมราคา และกระทบยอดธนาคารทุกสิ้นเดือน', icon: 'fa-solid fa-sliders' },
        { title: 'ปิดงบ', desc: 'สรุปงบการเงินประจำปี และส่งให้ผู้สอบบัญชีตรวจสอบ แสดงความคิดเห็นและนำงบการเงินยื่นกรมพัฒนาธุรกิจการค้าต่อไป', icon: 'fa-solid fa-file-signature' }
      ],
      documents: {
        income: ['ใบเสร็จรับเงิน, ใบกำกับภาษีขาย, ใบวางบิล/แจ้งหนี้'],
        expense: ['ใบเสร็จรับเงิน, ใบกำกับภาษีซื้อ, ใบสำคัญจ่าย, บิลเงินสด'],
        bank: ['รายการเดินบัญชีธนาคารทุกบัญชีของกิจการ (Statement)'],
        other: ['สัญญาเช่า, สัญญาซื้อขายสินทรัพย์, ทะเบียนสินทรัพย์']
      },
      agencies: [
        { name: 'กรมพัฒนาธุรกิจการค้า (DBD)', role: 'ยื่นงบการเงินและรายงานงบการเงินประจำปี', url: 'https://www.dbd.go.th' },
        { name: 'สภาวิชาชีพบัญชี', role: 'ขึ้นทะเบียนผู้ทำบัญชีและผู้สอบบัญชี', url: 'https://www.tfac.or.th' }
      ]
    },
    en: {
      importance: [
        { title: 'Legal Obligation', desc: 'The Accounting Act requires companies to prepare and submit annual financial statements within specified periods.', icon: 'fa-solid fa-balance-scale' },
        { title: 'Business Management', desc: 'To provide executives with accurate information about the company\'s financial position, performance, and cash flows.', icon: 'fa-solid fa-chart-line' },
        { title: 'Funding Access & Credibility', desc: 'Using financial statements to demonstrate credibility when applying for bank loans or seeking joint investors.', icon: 'fa-solid fa-building-columns' }
      ],
      steps: [
        { title: 'Collect', desc: 'Gather all financial and transaction documents on a monthly basis.', icon: 'fa-solid fa-folder-open' },
        { title: 'Verify', desc: 'Inspect correctness and completeness of income/expense records according to accounting standards.', icon: 'fa-solid fa-clipboard-check' },
        { title: 'Record', desc: 'Record financial transactions into professional accounting software packages.', icon: 'fa-solid fa-keyboard' },
        { title: 'Adjust', desc: 'Adjust accruals, prepayments, depreciation, and reconcile bank accounts at month-end.', icon: 'fa-solid fa-sliders' },
        { title: 'Close Books', desc: 'Summarize annual financial statements, present to auditor for review/opinion, and file with the Department of Business Development.', icon: 'fa-solid fa-file-signature' }
      ],
      documents: {
        income: ['Receipts, Sales Tax Invoices, Billing Invoices / Debit Notes'],
        expense: ['Receipts, Purchase Tax Invoices, Payment Vouchers, Cash Bills'],
        bank: ['Bank statements for all active business bank accounts'],
        other: ['Lease Agreements, Asset Purchase Contracts, Asset Registers']
      },
      agencies: [
        { name: 'Department of Business Development (DBD)', role: 'Filing annual financial statements', url: 'https://www.dbd.go.th' },
        { name: 'Federation of Accounting Professions (TFAC)', role: 'Registration of accountants and auditors', url: 'https://www.tfac.or.th' }
      ]
    }
  },
  2: {
    th: {
      importance: [
        { title: 'ลดความเสี่ยงทางกฎหมาย', desc: 'ป้องกันการยื่นภาษีผิดพลาด คลาดเคลื่อน หรือล่าช้า ซึ่งมีโทษต้องจ่ายค่าปรับและเงินเพิ่ม', icon: 'fa-solid fa-shield-halved' },
        { title: 'ประหยัดต้นทุน', desc: 'ใช้สิทธิประโยชน์ทางภาษีและการยกเว้นต่างๆ ตามที่กฎหมายกำหนดอย่างสูงสุด', icon: 'fa-solid fa-piggy-bank' },
        { title: 'เตรียมความพร้อม', desc: 'ช่วยจัดโครงสร้างรายได้ และค่าใช้จ่ายให้สอดคล้องกับแนวทางการตรวจสอบของสรรพากร', icon: 'fa-solid fa-chart-pie' }
      ],
      steps: [
        { title: 'วิเคราะห์', desc: 'ตรวจสอบโครงสร้างรายได้ และประเภทเงินได้พึงประเมินของบุคคลธรรมดา หรือนิติบุคคล', icon: 'fa-solid fa-magnifying-glass-chart' },
        { title: 'จำแนก', desc: 'จัดกลุ่มค่าใช้จ่ายที่หักภาษีได้ และปรับปรุงกำไรสุทธิทางบัญชีให้เป็นกำไรสุทธิทางภาษี', icon: 'fa-solid fa-filter' },
        { title: 'ยื่นแบบ', desc: 'ดำเนินการยื่นแบบและชำระภาษีผ่านระบบอินเตอร์เน็ตของกรมสรรพากรตามกำหนดเวลา', icon: 'fa-solid fa-paper-plane' },
        { title: 'ติดตาม', desc: 'วางแผนภาษีล่วงหน้าสำหรับรอบปีถัดไปเพื่อรองรับเกณฑ์กฎหมายใหม่ๆ', icon: 'fa-solid fa-calendar-days' }
      ],
      documents: {
        income: ['ใบเสร็จและใบกำกับภาษี (ใบกำกับภาษีสำหรับผู้จดทะเบียนภาษีมูลค่าเพิ่ม ภ.พ.30)'],
        expense: ['หนังสือรับรองการหักภาษี ณ ที่จ่าย (50ทวิ) และแบบยื่นรายเดือน (ภ.ง.ด. 1, 3, 53)'],
        bank: ['หลักฐานการลดหย่อนภาษีส่วนบุคคล หรือเอกสารรายจ่ายลดหย่อนได้เพิ่มขึ้นของนิติบุคคล'],
        other: ['งบการเงินและรายงานทางการบัญชีที่เกี่ยวข้องสำหรับการยื่นภาษี']
      },
      agencies: [
        { name: 'กรมสรรพากร (RD)', role: 'ยื่นแบบและชำระภาษีอากร ตรวจสอบและให้คำปรึกษาทางภาษี', url: 'https://www.rd.go.th' }
      ]
    },
    en: {
      importance: [
        { title: 'Reduce Legal Risks', desc: 'Prevent incorrect, inaccurate, or delayed tax filings which incur penalties and surcharges.', icon: 'fa-solid fa-shield-halved' },
        { title: 'Cost Savings', desc: 'Maximize legitimate tax deductions, allowances, and exemptions according to tax laws.', icon: 'fa-solid fa-piggy-bank' },
        { title: 'Preparedness', desc: 'Restructure revenues and expenses to align with the Revenue Department\'s audit guidelines.', icon: 'fa-solid fa-chart-pie' }
      ],
      steps: [
        { title: 'Analyze', desc: 'Inspect income structures and assessable income types of individuals or juristic persons.', icon: 'fa-solid fa-magnifying-glass-chart' },
        { title: 'Categorize', desc: 'Group deductible expenses and reconcile accounting net profit to taxable net profit.', icon: 'fa-solid fa-filter' },
        { title: 'Submit', desc: 'File tax returns and pay taxes via the Revenue Department\'s e-filing system within deadlines.', icon: 'fa-solid fa-paper-plane' },
        { title: 'Follow Up', desc: 'Plan tax strategies in advance for the upcoming fiscal years in light of new tax regulations.', icon: 'fa-solid fa-calendar-days' }
      ],
      documents: {
        income: ['Receipts & Tax Invoices (VAT PP.30 filings)'],
        expense: ['Withholding Tax Certificates (50 Tawi) and monthly filings (PND. 1, 3, 53)'],
        bank: ['Personal tax deduction proofs or additional juristic tax deductions'],
        other: ['Annual financial statements or tax reconciliation ledger reports']
      },
      agencies: [
        { name: 'The Revenue Department (RD)', role: 'E-filing submissions and tax guidelines / audits', url: 'https://www.rd.go.th' }
      ]
    }
  },
  3: {
    th: {
      importance: [
        { title: 'บัญชีเป็นระบบ ถูกต้อง ตรวจสอบได้', desc: 'ช่วยให้การจัดทำบัญชีเป็นระบบ ถูกต้อง และสามารถตรวจสอบย้อนหลังได้', icon: 'fa-solid fa-shield' },
        { title: 'ลดความผิดพลาดจากงานด้วยมือ', desc: 'ลดความผิดพลาดจากการทำงานเอกสารและบันทึกข้อมูลด้วยมือ', icon: 'fa-solid fa-circle-check' },
        { title: 'รายงานทางการเงินสำหรับผู้บริหาร', desc: 'ช่วยให้ผู้บริหารดูรายงานทางการเงินได้รวดเร็ว', icon: 'fa-solid fa-gauge-high' },
        { title: 'รองรับการยื่นภาษีอย่างมีประสิทธิภาพ', desc: 'รองรับการยื่นภาษีและเอกสารทางบัญชีให้เป็นไปตามกำหนด', icon: 'fa-solid fa-file-invoice' },
        { title: 'วางแผนธุรกิจและควบคุมต้นทุน', desc: 'ช่วยวางแผนธุรกิจและควบคุมต้นทุนได้ง่ายขึ้นด้วยข้อมูลที่เป็นระบบ', icon: 'fa-solid fa-chart-pie' }
      ],
      steps: [
        { title: 'ศึกษาลักษณะธุรกิจและกระบวนการทำงาน', desc: 'สอบถามและทำความเข้าใจลักษณะธุรกิจ พร้อมกระบวนการทำงานของลูกค้า', icon: 'fa-solid fa-search' },
        { title: 'วิเคราะห์ระบบเอกสารและการควบคุมภายใน', desc: 'วิเคราะห์ระบบเอกสาร รายรับ รายจ่าย และการควบคุมภายใน', icon: 'fa-solid fa-chart-pie' },
        { title: 'เลือกโปรแกรมบัญชีที่เหมาะสม', desc: 'เลือกโปรแกรมบัญชีให้เหมาะกับประเภทธุรกิจและขนาดกิจการ', icon: 'fa-solid fa-laptop-code' },
        { title: 'ติดตั้งและตั้งค่าระบบบัญชี', desc: 'ติดตั้งและตั้งค่าระบบให้พร้อมใช้งาน', icon: 'fa-solid fa-screwdriver-wrench' },
        { title: 'กำหนดผังบัญชีและรูปแบบเอกสาร', desc: 'กำหนดผังบัญชี และรูปแบบเอกสารที่ใช้ในองค์กร', icon: 'fa-solid fa-sitemap' },
        { title: 'ทดลองใช้งานและตรวจสอบความถูกต้อง', desc: 'ทดลองประมวลผลและตรวจสอบความถูกต้องก่อนใช้งานจริง', icon: 'fa-solid fa-clipboard-check' },
        { title: 'อบรมพนักงานที่เกี่ยวข้อง', desc: 'อบรมการใช้งานและแนวทางปฏิบัติให้ทีมงานที่เกี่ยวข้อง', icon: 'fa-solid fa-chalkboard-user' },
        { title: 'ติดตามผลและให้คำปรึกษาหลังเริ่มใช้งาน', desc: 'ติดตามผลการใช้งานและให้คำปรึกษาเมื่อเกิดข้อถามหรือปัญหา', icon: 'fa-solid fa-headset' }
      ],
      documents: {
        income: ['หนังสือรับรองบริษัท', 'ใบทะเบียนภาษีมูลค่าเพิ่ม (ภ.พ.20) (ถ้ามี)'],
        expense: ['ตัวอย่างเอกสารซื้อ-ขาย / ใบกำกับภาษี / ใบเสร็จ'],
        bank: ['สำเนาบัตรประชาชนกรรมการ', 'รายละเอียดบัญชีธนาคารของบริษัท'],
        other: ['ข้อมูลรายรับ รายจ่าย และสต็อกสินค้า', 'รายการทรัพย์สินและหนี้สินเบื้องต้น']
      },
      agencies: [
        { name: 'กรมสรรพากร', role: 'ดูแลการยื่นแบบภาษีและความถูกต้องของเอกสารทางบัญชีตามประมวลรัษฎากร', url: 'https://www.rd.go.th' },
        { name: 'สำนักงานประกันสังคม', role: 'ประสานงานขึ้นทะเบียนนายจ้างและนำส่งเงินสมทบเมื่อมีลูกจ้างเข้าข่ายตามกฎหมาย', url: 'https://www.sso.go.th' },
        { name: 'ธนาคารที่บริษัทใช้บริการ', role: 'ประสานงานเกี่ยวกับบัญชีธนาคารและการเชื่อมโยงข้อมูลกับระบบบัญชีตามความเหมาะสม', url: '#' },
        { name: 'ผู้ให้บริการโปรแกรมบัญชี', role: 'ติดตั้ง ซอฟต์แวร์ การต่ออายุ และซัพพอร์ทางเทคนิค', url: '#' },
        { name: 'สำนักงานบัญชีหรือผู้ตรวจสอบบัญชี', role: 'ประสานงานด้านบัญชี ความเห็นตรวจสอบ หรือการส่งมอบงบเมื่อธุรกิจเข้าข่าย', url: '#' }
      ],
      additionalSections: [
        {
          type: 'software-grid',
          title: 'โปรแกรมบัญชีที่แนะนำ',
          subtitle: 'โปรแกรมบัญชีเป็นเครื่องมือที่ช่วยจัดการข้อมูลทางการเงิน รายรับ รายจ่าย ภาษี และรายงานต่าง ๆ ของธุรกิจ ช่วยลดความผิดพลาด ประหยัดเวลา และทำให้การทำงานด้านบัญชีมีประสิทธิภาพมากขึ้น ปัจจุบันมีทั้งแบบติดตั้งในเครื่องและแบบออนไลน์ (Cloud Accounting)',
          items: [
            { name: 'FlowAccount', desc: 'เหมาะสำหรับธุรกิจ SME ร้านค้าออนไลน์ และผู้เริ่มต้นใช้งาน จุดเด่นคือใช้งานง่าย ออกใบเสนอราคา ใบกำกับภาษี และจัดการภาษีได้สะดวก รองรับการทำงานผ่านมือถือและระบบ Cloud', logo: 'fa-solid fa-cloud' },
            { name: 'PEAK', desc: 'เหมาะสำหรับธุรกิจที่ต้องการระบบจัดการครบวงจร มีระบบเอกสารบัญชี ภาษี เงินเดือน และ Dashboard สรุปข้อมูลธุรกิจแบบ Real-time รวมถึงรองรับการเชื่อมต่อระบบอื่น เช่น POS และ e-Commerce', logo: 'fa-solid fa-chart-bar' },
            { name: 'Express', desc: 'เป็นโปรแกรมบัญชีที่นิยมใช้ในประเทศไทยมานาน เหมาะกับธุรกิจที่ต้องการระบบบัญชีแบบครบถ้วน ใช้งานบนคอมพิวเตอร์ และมีสำนักงานบัญชีรองรับจำนวนมาก', logo: 'fa-solid fa-desktop' },
            { name: 'Xero', desc: 'เหมาะกับธุรกิจที่มีลูกค้าหรือคู่ค้าต่างประเทศ รองรับการทำงานออนไลน์ เชื่อมต่อธนาคาร และรองรับหลายสกุลเงิน', logo: 'fa-solid fa-globe' },
            { name: 'QuickBooks', desc: 'โปรแกรมบัญชีระดับสากลที่ได้รับความนิยมทั่วโลก เหมาะกับธุรกิจที่ต้องการระบบบัญชีมาตรฐานสากลและรายงานทางการเงินหลากหลายรูปแบบ', logo: 'fa-solid fa-book-bookmark' }
          ]
        },
        {
          type: 'list-card',
          title: 'วิธีเลือกโปรแกรมบัญชี',
          items: [
            { text: 'เลือกให้เหมาะกับขนาดธุรกิจ', icon: 'fa-solid fa-maximize' },
            { text: 'รองรับภาษีและเอกสารตามกฎหมายไทย', icon: 'fa-solid fa-file-invoice-dollar' },
            { text: 'ใช้งานง่าย มีทีม Support', icon: 'fa-solid fa-headset' },
            { text: 'รองรับการขยายตัวของธุรกิจ', icon: 'fa-solid fa-chart-line' },
            { text: 'มีระบบสำรองข้อมูลและความปลอดภัย', icon: 'fa-solid fa-lock' }
          ]
        },
        {
          type: 'list-card',
          title: 'อื่น ๆ — การใช้งานระบบบัญชี',
          items: [
            { text: 'ควรสำรองข้อมูลบัญชีเป็นประจำ', icon: 'fa-solid fa-floppy-disk' },
            { text: 'ควรกำหนดสิทธิ์การเข้าถึงข้อมูลของพนักงาน', icon: 'fa-solid fa-user-lock' },
            { text: 'เลือกโปรแกรมบัญชีที่รองรับการขยายตัวของธุรกิจ', icon: 'fa-solid fa-chart-line' },
            { text: 'ควรอัปเดตโปรแกรมและระบบความปลอดภัยสม่ำเสมอ', icon: 'fa-solid fa-shield-halved' }
          ]
        }
      ]
    },
    en: {
      importance: [
        { title: 'Structured & auditable books', desc: 'Accounting stays organized, correct, and easy to audit.', icon: 'fa-solid fa-shield' },
        { title: 'Fewer manual errors', desc: 'Reduces mistakes from handwritten forms and spreadsheets.', icon: 'fa-solid fa-circle-check' },
        { title: 'Faster insights for executives', desc: 'Management can pull financial snapshots quickly.', icon: 'fa-solid fa-gauge-high' },
        { title: 'Tax-ready workflows', desc: 'Helps filings and bookkeeping stay compliant and timely.', icon: 'fa-solid fa-file-invoice' },
        { title: 'Better planning & cost control', desc: 'Cleaner data feeds forecasting and budgeting.', icon: 'fa-solid fa-chart-pie' }
      ],
      steps: [
        { title: 'Understand the business', desc: 'Interview stakeholders and study day-to-day operations.', icon: 'fa-solid fa-search' },
        { title: 'Assess docs & controls', desc: 'Review invoicing flows, incomes/expenses, and internal checkpoints.', icon: 'fa-solid fa-chart-pie' },
        { title: 'Recommend software stack', desc: 'Match SaaS/on-prem accounting tools with your industry/size.', icon: 'fa-solid fa-laptop-code' },
        { title: 'Install & configure', desc: 'Implement the ledger, numbering, approvals, users, backups.', icon: 'fa-solid fa-screwdriver-wrench' },
        { title: 'Chart of accounts & templates', desc: 'Define charts, forms, numbering, VAT codes, approvals.', icon: 'fa-solid fa-sitemap' },
        { title: 'Pilot testing', desc: 'Run parallel entries and validations before launch.', icon: 'fa-solid fa-clipboard-check' },
        { title: 'User training', desc: 'Coach finance and operations teams.', icon: 'fa-solid fa-chalkboard-user' },
        { title: 'Hypercare follow-up', desc: 'Provide post-go-live tweaks and consultations.', icon: 'fa-solid fa-headset' }
      ],
      documents: {
        income: ['Corporate affidavit', 'VAT registration (PP.20) if registered'],
        expense: ['Samples of invoices, tax invoices, receipts for AP/AR'],
        bank: ["Director ID copy", "Corporate bank-account details"],
        other: ['Revenue/expense summaries and stock snapshots', 'Preliminary lists of assets/liabilities']
      },
      agencies: [
        { name: 'Revenue Department', role: 'Tax filings and conformity of bookkeeping evidence', url: 'https://www.rd.go.th' },
        { name: 'Social Security Office', role: 'Employer registration and contributions once applicable', url: 'https://www.sso.go.th' },
        { name: 'Relationship banks', role: 'Bank feeds/statements integrations', url: '#' },
        { name: 'Software vendors', role: 'Licensing, hosting, patching, ticketing', url: '#' },
        { name: 'Accounting / audit firms', role: 'Monthly close help or statutory audits where required', url: '#' }
      ],
      additionalSections: [
        {
          type: 'software-grid',
          title: 'Recommended accounting software',
          subtitle: 'Accounting platforms centralize financial data, incomes, taxes, and reports—on desktop or cloud (Cloud Accounting)—cutting mistakes and speeding up compliance.',
          items: [
            { name: 'FlowAccount', desc: 'SMEs & online merchants: quotations, VAT invoices, tax workflows, mobile + cloud.', logo: 'fa-solid fa-cloud' },
            { name: 'PEAK', desc: 'End-to-end Thai cloud: bookkeeping, VAT, payroll, real-time dashboards, POS/e-commerce hooks.', logo: 'fa-solid fa-chart-bar' },
            { name: 'Express', desc: 'Thailand classic desktop suite with widespread accountant ecosystem support.', logo: 'fa-solid fa-desktop' },
            { name: 'Xero', desc: 'Global trade: SaaS ledger, multi-currency, bank feeds.', logo: 'fa-solid fa-globe' },
            { name: 'QuickBooks', desc: 'Global standards with expansive financial reporting toolbox.', logo: 'fa-solid fa-book-bookmark' }
          ]
        },
        {
          type: 'list-card',
          title: 'How to choose software',
          items: [
            { text: 'Match your company size & complexity.', icon: 'fa-solid fa-maximize' },
            { text: 'Validate Thai-tax document coverage.', icon: 'fa-solid fa-file-invoice-dollar' },
            { text: 'Easy UX plus responsive support.', icon: 'fa-solid fa-headset' },
            { text: 'Roadmap scalability for expansions.', icon: 'fa-solid fa-chart-line' },
            { text: 'Backups plus hardened security posture.', icon: 'fa-solid fa-lock' }
          ]
        },
        {
          type: 'list-card',
          title: 'Operational best practices',
          items: [
            { text: 'Schedule disciplined accounting backups.', icon: 'fa-solid fa-floppy-disk' },
            { text: 'Enforce granular user permissions.', icon: 'fa-solid fa-user-lock' },
            { text: 'Pick platforms that scale with revenue.', icon: 'fa-solid fa-chart-line' },
            { text: 'Patch software & security tooling regularly.', icon: 'fa-solid fa-shield-halved' }
          ]
        }
      ]
    }
  },
  4: {
    th: {
      importance: [
        { title: 'ความถูกต้องตามกฎหมาย', desc: 'เพื่อให้เป็นไปตามพระราชบัญญัติการบัญชีที่กำหนดให้นิติบุคคลต้องมีผู้สอบบัญชีรับรองงบการเงิน', icon: 'fa-solid fa-file-contract' },
        { title: 'สร้างความเชื่อมั่นสากล', desc: 'เพิ่มความน่าเชื่อถือต่อกรมสรรพากร ธนาคารเพื่อยื่นขอสินเชื่อ และกลุ่มผู้ร่วมลงทุน', icon: 'fa-solid fa-medal' },
        { title: 'ลดความเสี่ยงข้อผิดพลาด', desc: 'ช่วยตรวจพบข้อผิดพลาด รอยรั่ว หรือช่องโหว่ในการควบคุมภายในของบริษัทได้อย่างรวดเร็ว', icon: 'fa-solid fa-shield-halved' }
      ],
      steps: [
        { title: 'เสนอราคาและข้อตกลง', desc: 'ติดต่อสอบถามรายละเอียด และเสนอราคาค่าบริการตามระดับความซับซ้อนของธุรกิจ', icon: 'fa-solid fa-comments' },
        { title: 'วางแผนงานสอบบัญชี', desc: 'วางแผนงานสอบบัญชี ประเมินความเสี่ยง และจัดเตรียมแนวทางการตรวจสอบ', icon: 'fa-solid fa-route' },
        { title: 'ตรวจสอบเอกสารหน้างาน', desc: 'ลงพื้นที่สุ่มตรวจสอบเอกสารประกอบการลงบัญชี และร่วมสังเกตการณ์ตรวจนับสต็อกสินค้าสิ้นปี', icon: 'fa-solid fa-magnifying-glass' },
        { title: 'ยืนยันยอดและปิดงบ', desc: 'ขอหนังสือยืนยันยอดธนาคาร ยอดหนี้ ยอดเจ้าหนี้ และส่งรายการปรับปรุงบัญชีให้ตรงความเป็นจริง', icon: 'fa-solid fa-check-double' },
        { title: 'ออกรายงานการสอบบัญชี', desc: 'สรุปผลการตรวจสอบ และออกรายงานผลการสอบบัญชี (Audit Report) โดยผู้สอบบัญชีรับอนุญาต (CPA หรือ TA)', icon: 'fa-solid fa-stamp' }
      ],
      documents: {
        income: ['งบการเงิน และ งบทดลองประจำปี (Trial Balance)'],
        expense: ['สมุดรายวันต่างๆ (รายวันซื้อ, ขาย, รับ, จ่าย, ทั่วไป) และบัญชีแยกประเภท'],
        bank: ['หนังสือยืนยันยอดธนาคาร (Bank Confirmation) และงบกระทบยอดธนาคารทุกบัญชี'],
        other: ['รายงานสินค้าคงเหลือ ณ วันสิ้นปี และ ทะเบียนสินทรัพย์ถาวรของบริษัท']
      },
      agencies: [
        { name: 'สภาวิชาชีพบัญชี', role: 'สภาวิชาชีพควบคุมผู้ประกอบการและตรวจสอบสถานะผู้สอบบัญชีรับอนุญาต', url: 'https://www.tfac.or.th' },
        { name: 'กรมพัฒนาธุรกิจการค้า (DBD)', role: 'รับยื่นงบการเงินที่ได้รับความเห็นชอบจากผู้สอบบัญชีผ่านทางระบบ e-Filing', url: 'https://www.dbd.go.th' },
        { name: 'กรมสรรพากร (RD)', role: 'ยื่นงบการเงินพร้อมกับแบบแสดงรายการเสียภาษีเงินได้นิติบุคคลประจำปี (ภ.ง.ด.50)', url: 'https://www.rd.go.th' }
      ]
    },
    en: {
      importance: [
        { title: 'Regulatory Compliance', desc: 'Fulfills the Accounting Act requirements demanding all juristic entities to be audited by a certified accountant.', icon: 'fa-solid fa-file-contract' },
        { title: 'Global Credibility', desc: 'Builds financial trust with the Revenue Department, commercial banks (for loans), and investors.', icon: 'fa-solid fa-medal' },
        { title: 'Mitigate Internal Risks', desc: 'Discovers accounting errors and highlights vulnerabilities in the company\'s internal controls.', icon: 'fa-solid fa-shield-halved' }
      ],
      steps: [
        { title: 'Quotation & Contract', desc: 'Consult on business scope and provide audit fees quotation based on transaction complexity.', icon: 'fa-solid fa-comments' },
        { title: 'Audit Planning', desc: 'Formulate audit strategy, plan timelines, and evaluate key business risk points.', icon: 'fa-solid fa-route' },
        { title: 'Fieldwork Auditing', desc: 'Inspect physical documentation on-site through sample testing and join the year-end inventory stock count.', icon: 'fa-solid fa-magnifying-glass' },
        { title: 'Balance Verification', desc: 'Send bank confirmation requests, verify accounts payable/receivable, and propose ledger adjustments.', icon: 'fa-solid fa-check-double' },
        { title: 'Issue Audit Report', desc: 'Deliver the official financial statements and Audit Report signed by a licensed CPA or TA.', icon: 'fa-solid fa-stamp' }
      ],
      documents: {
        income: ['Draft financial statements and year-end Trial Balance'],
        expense: ['Ledger journals (purchase, sales, cash receipt, payment) and General Ledger (GL)'],
        bank: ['Bank Confirmation letter responses and bank reconciliation statements'],
        other: ['Year-end physical inventory list / stock card, and Fixed Assets Register']
      },
      agencies: [
        { name: 'Federation of Accounting Professions (TFAC)', role: 'Regulatory body verifying auditor licenses and professional standards', url: 'https://www.tfac.or.th' },
        { name: 'Department of Business Development (DBD)', role: 'Receiver of audited annual financial statements via e-Filing system', url: 'https://www.dbd.go.th' },
        { name: 'The Revenue Department (RD)', role: 'Submission point for juristic tax returns (PND.50) along with audited financials', url: 'https://www.rd.go.th' }
      ]
    }
  },
  5: {
    th: {
      importance: [
        { title: 'วิเคราะห์กำไรที่แท้จริง', desc: 'ช่วยแยกต้นทุนสินค้า ค่าธรรมเนียมแพลตฟอร์ม (GP) และค่าโฆษณาออกจากยอดขาย เพื่อมองเห็นผลประกอบการได้ชัดเจน', icon: 'fa-solid fa-percent' },
        { title: 'จัดการภาษี E-Service', desc: 'ป้องกันการถูกตรวจสอบย้อนหลังจากรายงานบัญชีธนาคารและข้อมูลจากแพลตฟอร์ม เช่น Shopee, Lazada และ TikTok', icon: 'fa-solid fa-shield-virus' },
        { title: 'ระบบบัญชีที่เป็นระเบียบ', desc: 'ช่วยให้ขยายธุรกิจหรือจดทะเบียนภาษีมูลค่าเพิ่ม (VAT) ได้อย่างไร้กังวลด้วยเอกสารที่ตรวจสอบย้อนหลังได้', icon: 'fa-solid fa-cart-shopping' }
      ],
      steps: [
        { title: 'ดึงรายงานจากแพลตฟอร์ม', desc: 'ดึงรายงานสรุปยอดขาย (Sales Report) และค่าธรรมเนียมจากแพลตฟอร์มต่างๆ ในแต่ละรอบรายงาน', icon: 'fa-solid fa-download' },
        { title: 'บันทึกรายได้และค่าใช้จ่าย', desc: 'บันทึกรายรับจากการขายและค่าใช้จ่ายที่เกี่ยวข้อง เช่น ค่าธรรมเนียมและค่าโฆษณาให้ครบถ้วนและสอดคล้องกับหลักฐาน', icon: 'fa-solid fa-pen-to-square' },
        { title: 'กระทบยอดเงินเข้าบัญชีธนาคาร', desc: 'ดำเนินการ Reconciliation ให้ยอดเงินที่เข้าบัญชีธนาคารสัมพันธ์กับยอดขายจริงหลังหักค่าธรรมเนียมแพลตฟอร์ม', icon: 'fa-solid fa-receipt' },
        { title: 'จัดทำและยื่นภาษีประจำเดือน', desc: 'จัดทำรายงานภาษีซื้อ-ภาษีขาย และยื่นแบบภาษีประจำเดือนตามกำหนด', icon: 'fa-solid fa-calculator' }
      ],
      documents: {
        income: ['รายงานสรุปการขายจากหลังบ้าน (สามารถ Export เป็น Excel/CSV)', 'รายงานหรือสรุปค่าธรรมเนียมจากแพลตฟอร์ม (ถ้ามีแยกไฟล์)'],
        expense: ['ใบกำกับภาษีค่าโฆษณา เช่น Facebook Ads, Google Ads, Shopee/Lazada Ads'],
        bank: ['Statement บัญชีธนาคารที่ใช้รับเงินจากการขายทั้งหมด'],
        other: ['เอกสารหัก ณ ที่จ่าย หรือหลักฐานจากแพลตฟอร์มเพิ่มเติม (ประสานกับผู้ให้บริการเมื่อมีคำขอจากหน่วยงานภาครัฐ)']
      },
      agencies: [
        { name: 'กรมสรรพากร', role: 'ยื่นภาษีมูลค่าเพิ่ม (VAT) และภาษีเงินได้ตามความเหมาะสมของรูปแบบกิจการ', url: 'https://www.rd.go.th' },
        { name: 'ธนาคารพาณิชย์', role: 'กรณีขอข้อมูลหรือรายการเคลื่อนไหวทางบัญชีเพิ่มเติมเพื่อประกอบการตรวจสอบ', url: '#' },
        { name: 'แพลตฟอร์มขายสินค้า', role: 'ประสานงานเรื่องเอกสารหัก ณ ที่จ่าย และใบกำกับภาษี / ข้อมูลจากผู้ให้บริการแพลตฟอร์ม', url: '#' }
      ]
    },
    en: {
      importance: [
        { title: 'True profit insight', desc: 'Separates product cost, marketplace fees (GP), and ads from gross sales.', icon: 'fa-solid fa-percent' },
        { title: 'E-Service tax readiness', desc: 'Helps mitigate back-tax risk from bank data and marketplace records (Shopee, Lazada, TikTok, etc.).', icon: 'fa-solid fa-shield-virus' },
        { title: 'Organized bookkeeping', desc: 'Scales cleanly and supports VAT registration when your shop grows.', icon: 'fa-solid fa-cart-shopping' }
      ],
      steps: [
        { title: 'Pull marketplace reports', desc: 'Collect sales summaries (Sales Reports) and platform fee statements.', icon: 'fa-solid fa-download' },
        { title: 'Book income & expenses', desc: 'Record revenue and related costs including fees and ad spend.', icon: 'fa-solid fa-pen-to-square' },
        { title: 'Bank reconciliation', desc: 'Match payouts in your bank to net sales after platform deductions.', icon: 'fa-solid fa-receipt' },
        { title: 'VAT filings', desc: 'Prepare purchase/sales tax records and submit monthly filings on time.', icon: 'fa-solid fa-calculator' }
      ],
      documents: {
        income: ['Backend sales exports (Excel/CSV) and optional separate fee summaries'],
        expense: ['Tax invoices for ads (Facebook, Google, Shopee/Lazada ads, etc.)'],
        bank: ['Bank statements for all accounts receiving sales payouts'],
        other: ['Withholding documents or supplementary platform proofs when regulators request them']
      },
      agencies: [
        { name: 'The Revenue Department (RD)', role: 'VAT and income tax filings for your entity type', url: 'https://www.rd.go.th' },
        { name: 'Commercial banks', role: 'Transaction data when supporting documentation is needed', url: '#' },
        { name: 'E-commerce platforms', role: 'WHT certificates / tax invoices and official statements from operators', url: '#' }
      ]
    }
  },
  6: {
    th: {
      importance: [
        { title: 'จัดทำบัญชีถูกต้องและเป็นระบบ', desc: 'ช่วยให้กิจการจัดทำบัญชีได้อย่างถูกต้อง สอดคล้องกับหลักเกณฑ์ และตรวจสอบย้อนหลังได้', icon: 'fa-solid fa-book' },
        { title: 'ลดความผิดพลาดด้านภาษีและค่าปรับ', desc: 'ลดความเสี่ยงการยื่นภาษีผิดพลาด ป้องกันค่าปรับและเบี้ยปรับจากหน่วยงานราชการ', icon: 'fa-solid fa-file-invoice-dollar' },
        { title: 'วางแผนธุรกิจได้อย่างมั่นใจ', desc: 'ช่วยวางแผนภาษี บริหารต้นทุน และใช้ข้อมูลทางบัญชีเพื่อการตัดสินใจ พร้อมเสริมความน่าเชื่อถือของธุรกิจ', icon: 'fa-solid fa-chart-line' }
      ],
      steps: [
        { title: 'ศึกษาข้อมูลกิจการ', desc: 'สอบถามลักษณะธุรกิจ ตรวจสอบรูปแบบกิจการ เช่น บุคคลธรรมดาหรือบริษัท และศึกษารายรับ รายจ่าย รวมถึงระบบเอกสาร', icon: 'fa-solid fa-search' },
        { title: 'ตรวจสอบเอกสาร', desc: 'ตรวจสอบใบกำกับภาษี รายรับ-รายจ่าย และเอกสารบัญชี/ภาษีที่ผ่านมาเพื่อประเมินความถูกต้องเบื้องต้น', icon: 'fa-solid fa-clipboard-check' },
        { title: 'วิเคราะห์ปัญหา', desc: 'วิเคราะห์ข้อผิดพลาดทางบัญชี ตรวจสอบภาระภาษี และประเมินความถูกต้องตามกฎหมายที่เกี่ยวข้อง', icon: 'fa-solid fa-chart-pie' },
        { title: 'ให้คำแนะนำ', desc: 'แนะนำวิธีจัดทำบัญชี วางแผนภาษี ให้คำแนะนำด้านแรงงานและกฎหมายธุรกิจ พร้อมเสนอแนวทางแก้ไขปัญหา', icon: 'fa-solid fa-lightbulb' },
        { title: 'ดำเนินการและติดตามผล', desc: 'ยื่นแบบภาษี ปรับปรุงระบบบัญชี ติดตามผลการดำเนินงาน และให้คำปรึกษาเพิ่มเติมเมื่อมีปัญหา', icon: 'fa-solid fa-clock-rotate-left' }
      ],
      documents: {
        income: ['ใบเสร็จรับเงิน', 'ใบกำกับภาษี', 'ใบสำคัญจ่าย', 'รายงานรายรับ-รายจ่าย', 'Statement ธนาคาร'],
        expense: ['แบบ ภ.พ.30', 'แบบ ภ.ง.ด.1', 'แบบ ภ.ง.ด.3', 'แบบ ภ.ง.ด.53', 'แบบ ภ.ง.ด.50 และ ภ.ง.ด.51'],
        bank: ['หนังสือรับรองบริษัท', 'บัญชีรายชื่อผู้ถือหุ้น', 'หนังสือบริคณห์สนธิ'],
        other: ['สัญญาจ้างงาน', 'สัญญาทางธุรกิจต่าง ๆ']
      },
      agencies: [
        { name: 'กรมสรรพากร', role: 'หน่วยงานที่ดูแลด้านภาษี เช่น ภาษีมูลค่าเพิ่ม ภาษีเงินได้ และภาษีหัก ณ ที่จ่าย', url: 'https://www.rd.go.th' },
        { name: 'สำนักงานประกันสังคม', role: 'ดูแลเรื่องประกันสังคม การขึ้นทะเบียนนายจ้างและลูกจ้าง', url: 'https://www.sso.go.th' },
        { name: 'กรมพัฒนาธุรกิจการค้า', role: 'ดูแลการจดทะเบียนบริษัท การแก้ไขข้อมูลบริษัท และงบการเงิน', url: 'https://www.dbd.go.th' },
        { name: 'กรมสวัสดิการและคุ้มครองแรงงาน', role: 'ดูแลกฎหมายแรงงาน สิทธิของลูกจ้าง และสัญญาจ้างงาน', url: 'https://www.labour.go.th' },
        { name: 'สำนักงานการตรวจเงินแผ่นดิน', role: 'เกี่ยวข้องกับการตรวจสอบด้านการเงินในบางกรณี', url: 'https://www.oag.go.th' }
      ],
      additionalSections: [
        {
          type: 'icon-cards',
          title: 'คุณสมบัติของผู้ให้คำปรึกษา',
          items: [
            { title: 'มีความรู้ด้านบัญชี ภาษี และกฎหมาย', icon: 'fa-solid fa-graduation-cap' },
            { title: 'มีความละเอียดรอบคอบ', icon: 'fa-solid fa-magnifying-glass' },
            { title: 'สามารถวิเคราะห์ปัญหาได้ดี', icon: 'fa-solid fa-chart-line' },
            { title: 'มีจรรยาบรรณวิชาชีพ', icon: 'fa-solid fa-gavel' }
          ]
        },
        {
          type: 'two-columns',
          title: 'ปัญหาที่พบบ่อย & ประโยชน์ที่ได้รับ',
          col1: {
            title: 'ปัญหาที่พบบ่อย (Common Problems)',
            color: 'bg-rose-50 border-rose-100 text-rose-800',
            icon: 'fa-solid fa-circle-exclamation text-rose-500',
            items: [
              'เอกสารไม่ครบ',
              'ยื่นภาษีล่าช้า',
              'บันทึกบัญชีผิดประเภท',
              'ไม่เข้าใจกฎหมายภาษี'
            ]
          },
          col2: {
            title: 'ประโยชน์ที่ได้รับ (Benefits)',
            color: 'bg-emerald-50 border-emerald-100 text-emerald-800',
            icon: 'fa-solid fa-circle-check text-emerald-500',
            items: [
              'ลดความเสี่ยงทางกฎหมาย',
              'ประหยัดเวลาในการจัดการเอกสาร',
              'ช่วยวางแผนธุรกิจได้ดีขึ้น',
              'เพิ่มประสิทธิภาพในการบริหารงาน',
              'ช่วยลดปัญหาและเพิ่มโอกาสในการเติบโตของกิจการในระยะยาว'
            ]
          }
        }
      ]
    },
    en: {
      importance: [
        { title: 'Prevent Legal Discrepancy', desc: 'Ensures books and tax submissions are fully compliant, avoiding penalties, surcharges, and lawsuits.', icon: 'fa-solid fa-user-shield' },
        { title: 'Boost Trust & Strategic Growth', desc: 'Facilitates sound financial planning, supporting corporate fundraising, loan applications, and investment.', icon: 'fa-solid fa-chart-line' },
        { title: 'Defend Interests in Disputes', desc: 'Grants access to expert attorneys and accountants to handle tax mediation, negotiations, or lawsuits.', icon: 'fa-solid fa-gavel' }
      ],
      steps: [
        { title: 'Understand Client\'s Business', desc: 'Analyze client\'s business operations, transactional models, and current document management workflow.', icon: 'fa-solid fa-search' },
        { title: 'Verify & Audit Documentation', desc: 'Inspect current and historical accounting files, tax filings, and valid business contracts.', icon: 'fa-solid fa-clipboard-check' },
        { title: 'Analyze Issues & Exposures', desc: 'Evaluate accounting errors, determine tax exposures, and identify legal constraints.', icon: 'fa-solid fa-chart-pie' },
        { title: 'Formulate Solutions & Plans', desc: 'Draft legal opinion letters, map tax mitigation plans, and provide compliant corporate steps.', icon: 'fa-solid fa-lightbulb' },
        { title: 'Execute & Follow Up', desc: 'Submit tax modifications, restructure internal accounting, execute legal actions, and offer ongoing advisory.', icon: 'fa-solid fa-clock-rotate-left' }
      ],
      documents: {
        income: ['Accounting: Receipts, Tax Invoices, Payment Vouchers, Cash Book, Bank Statements'],
        expense: ['Tax Filings: VAT forms (PP.30), Withholding tax (PND.1, 3, 53), Corporate tax (PND.50, 51)'],
        bank: ['Corporate Docs: Company affidavit, List of Shareholders (BOJ.5), Memorandum of Association'],
        other: ['Contracts: Commercial agreements, lease deeds, employment contracts, dispute letters']
      },
      agencies: [
        { name: 'The Revenue Department (RD)', role: 'Filing official inquiries, negotiating tax compromises, and handling audits', url: 'https://www.rd.go.th' },
        { name: 'Department of Business Development (DBD)', role: 'Verifying corporate registration files, shareholder records, and legal records', url: 'https://www.dbd.go.th' },
        { name: 'Courts of Justice / Royal Thai Police', role: 'Liaising for lawsuits, representing client in court hearings, and case settlements', url: 'https://www.coj.go.th' },
        { name: 'Social Security Office / Labour Department', role: 'Resolving employee compensation claims, disputes, and social security guidelines', url: '#' }
      ],
      additionalSections: [
        {
          type: 'icon-cards',
          title: 'Consultant Qualifications',
          items: [
            { title: 'Deep understanding of accounting, tax systems, and corporate laws', icon: 'fa-solid fa-graduation-cap' },
            { title: 'Meticulous accuracy when analyzing complex legal agreements', icon: 'fa-solid fa-magnifying-glass' },
            { title: 'Guaranteed confidentiality regarding client cases and sensitive data', icon: 'fa-solid fa-user-shield' },
            { title: 'Strict compliance with code of professional and legal ethics', icon: 'fa-solid fa-gavel' }
          ]
        },
        {
          type: 'two-columns',
          title: 'Common Problems & Benefits of Consulting',
          col1: {
            title: 'Common Problems',
            color: 'bg-rose-50 border-rose-100 text-rose-800',
            icon: 'fa-solid fa-circle-exclamation text-rose-500',
            items: [
              'Incomplete documents leading to delayed bookkeeping and reporting errors.',
              'Delayed tax submissions causing substantial penalty fines and interest rates.',
              'Incorrect bookkeeping entries violating local and international standards.',
              'Failure to understand complex local tax codes and Revenue Department rulings.'
            ]
          },
          col2: {
            title: 'Benefits of Consulting',
            color: 'bg-emerald-50 border-emerald-100 text-emerald-800',
            icon: 'fa-solid fa-circle-check text-emerald-500',
            items: [
              'Minimizes legal liabilities and retrospective audit/penalty exposures.',
              'Saves valuable business hours and administrative costs for the company.',
              'Supplies accurate reports and assessments to back up key business decisions.',
              'Builds reliable credit and transparency for banks, stakeholders, and partners.'
            ]
          }
        }
      ]
    }
  },
  7: {
    th: {
      subSections: [
        {
          id: 'setup',
          title: 'จดทะเบียนจัดตั้งบริษัท',
          importance: [
            { title: 'มีสถานะนิติบุคคลอย่างเป็นทางการ', desc: 'เมื่อจดทะเบียนแล้ว ธุรกิจสามารถทำสัญญา ถือครองทรัพย์สิน และติดต่อหน่วยงานต่าง ๆ ในนามบริษัทได้อย่างถูกต้องตามกฎหมาย', icon: 'fa-solid fa-id-card' },
            { title: 'เสริมความน่าเชื่อถือทางธุรกิจ', desc: 'ช่วยให้ลูกค้า คู่ค้า และสถาบันการเงินมั่นใจในการร่วมธุรกิจมากขึ้น และสนับสนุนการเติบโตในระยะยาว', icon: 'fa-solid fa-medal' },
            { title: 'จำกัดความรับผิดของผู้ถือหุ้น', desc: 'ผู้ถือหุ้นมีความรับผิดจำกัดตามจำนวนเงินลงทุน ช่วยลดความเสี่ยงต่อทรัพย์สินส่วนบุคคลเมื่อเทียบกับธุรกิจบุคคลธรรมดา', icon: 'fa-solid fa-shield-halved' }
          ],
          steps: [
            { title: 'เข้าสู่ระบบ DBD Biz Regist และยืนยันตัวตน', desc: 'ผู้ประกอบการเข้าใช้งานระบบออนไลน์ของกรมพัฒนาธุรกิจการค้าและยืนยันตัวตนตามช่องทางที่กำหนด', icon: 'fa-solid fa-user-check' },
            { title: 'จองชื่อและกรอกข้อมูลบริษัท', desc: 'กรอกชื่อบริษัท ที่ตั้ง วัตถุประสงค์ ทุนจดทะเบียน และรายชื่อผู้ถือหุ้นในระบบ', icon: 'fa-solid fa-pen-nib' },
            { title: 'อัปโหลดเอกสารประกอบผ่านระบบ', desc: 'แนบเอกสารที่เกี่ยวข้องทั้งหมดเพื่อประกอบคำขอจดทะเบียนจัดตั้งบริษัท', icon: 'fa-solid fa-cloud-arrow-up' },
            { title: 'ตรวจสอบข้อมูลและลงลายมือชื่ออิเล็กทรอนิกส์', desc: 'ทวนความถูกต้องของข้อมูลก่อนยืนยันคำขออย่างเป็นทางการ', icon: 'fa-solid fa-signature' },
            { title: 'ชำระค่าธรรมเนียมและรออนุมัติ', desc: 'ชำระค่าธรรมเนียมตามที่กำหนด จากนั้นรอเจ้าหน้าที่พิจารณา และดาวน์โหลดเอกสารรับรองบริษัทเมื่ออนุมัติ', icon: 'fa-solid fa-file-circle-check' }
          ],
          documents: {
            income: ['สำเนาบัตรกรรมการทุกท่าน (อย่างน้อย 2 คนขึ้นไป)', 'สำเนาบัตรผู้ถือหุ้น (กรรมการสามารถถือหุ้นได้)'],
            expense: ['สำเนาทะเบียนบ้านของสถานที่ตั้งบริษัท', 'แผนที่ตั้งสถานประกอบการ'],
            bank: ['ข้อมูลส่วนตัวของกรรมการและผู้ถือหุ้น เช่น เบอร์โทร และอีเมล', 'รายละเอียดวัตถุประสงค์ในการจัดตั้งบริษัท'],
            other: ['ชื่อบริษัทภาษาไทยและภาษาอังกฤษ (ควรเตรียมอย่างน้อย 2-3 ชื่อ)', 'กำหนดรูปแบบตราประทับของบริษัท (ถ้ามี)']
          }
        },
        {
          id: 'change',
          title: 'จดทะเบียนเปลี่ยนแปลงบริษัท',
          importance: [
            { title: 'ทำให้ข้อมูลบริษัทเป็นปัจจุบัน', desc: 'เมื่อมีการเปลี่ยนชื่อบริษัท ที่ตั้ง กรรมการ วัตถุประสงค์ หรือทุนจดทะเบียน ต้องจดเปลี่ยนแปลงให้ถูกต้องตามกฎหมาย', icon: 'fa-solid fa-arrows-rotate' },
            { title: 'ลดความเสี่ยงทางกฎหมายและความคลาดเคลื่อน', desc: 'ช่วยให้ข้อมูลที่แสดงต่อหน่วยงานราชการ ลูกค้า และคู่ค้าตรงกับข้อเท็จจริงในการดำเนินธุรกิจ', icon: 'fa-solid fa-scale-balanced' },
            { title: 'เพิ่มความน่าเชื่อถือธุรกิจ', desc: 'บริษัทที่มีข้อมูลอัปเดตและตรวจสอบได้ ช่วยสร้างความมั่นใจต่อสถาบันการเงินและคู่ค้า', icon: 'fa-solid fa-medal' }
          ],
          steps: [
            { title: 'เข้าสู่ระบบและยืนยันตัวตน', desc: 'เข้าสู่ระบบ DBD Biz Regist ด้วยข้อมูลผู้ยื่นคำขอและยืนยันตัวตนตามขั้นตอน', icon: 'fa-solid fa-user-check' },
            { title: 'เลือกรายการเปลี่ยนแปลงที่ต้องการจดทะเบียน', desc: 'เลือกประเภทการเปลี่ยนแปลง เช่น ที่ตั้ง กรรมการ ทุน หรือข้อมูลสำคัญอื่น ๆ', icon: 'fa-solid fa-list-check' },
            { title: 'กรอกข้อมูลใหม่ของบริษัท', desc: 'บันทึกข้อมูลใหม่ให้ครบถ้วนและตรงตามเอกสารประกอบ', icon: 'fa-solid fa-keyboard' },
            { title: 'อัปโหลดเอกสารและลงลายมือชื่ออิเล็กทรอนิกส์', desc: 'แนบเอกสารที่เกี่ยวข้อง (ถ้ามี) จากนั้นตรวจสอบข้อมูลและลงลายมือชื่ออิเล็กทรอนิกส์', icon: 'fa-solid fa-file-signature' },
            { title: 'ชำระค่าธรรมเนียมและรออนุมัติ', desc: 'ชำระค่าธรรมเนียมตามรายการที่ยื่น และรอผลการตรวจสอบจากเจ้าหน้าที่', icon: 'fa-solid fa-file-circle-check' }
          ],
          documents: {
            income: ['รายงานการประชุม/มติที่เกี่ยวข้องกับรายการเปลี่ยนแปลงของบริษัท'],
            expense: ['เอกสารเฉพาะตามรายการเปลี่ยน เช่น ทะเบียนบ้านที่ตั้งใหม่ หรือสำเนาบัตรกรรมการใหม่'],
            bank: ['แบบคำขอจดทะเบียนเปลี่ยนแปลงผ่านระบบ DBD Biz Regist พร้อมข้อมูลอัปเดตของบริษัท'],
            other: ['เอกสารประกอบอื่น ๆ ตามที่นายทะเบียนกำหนดในแต่ละกรณี']
          }
        },
        {
          id: 'liquidation',
          title: 'จดทะเบียนเลิกบริษัท',
          importance: [
            { title: 'สิ้นสุดสถานะบริษัทตามกฎหมาย', desc: 'เมื่อจดทะเบียนเลิกบริษัทเรียบร้อย บริษัทจะเข้าสู่กระบวนการชำระบัญชีและยุติสภาพนิติบุคคลอย่างถูกต้อง', icon: 'fa-solid fa-circle-minus' },
            { title: 'ป้องกันภาระหนี้สินและความเสี่ยงในอนาคต', desc: 'ลดความเสี่ยงเรื่องภาษี ค่าปรับ หรือภาระทางกฎหมายที่อาจเกิดขึ้นหากหยุดกิจการโดยไม่จดเลิกอย่างถูกต้อง', icon: 'fa-solid fa-shield-halved' },
            { title: 'ปิดกิจการอย่างเป็นระบบ', desc: 'ทำให้การปิดกิจการด้านบัญชี ภาษี และเอกสารดำเนินไปอย่างเรียบร้อย ตรวจสอบย้อนหลังได้', icon: 'fa-solid fa-calculator' }
          ],
          steps: [
            { title: 'จัดประชุมผู้ถือหุ้นเพื่อมีมติเลิกบริษัท', desc: 'ดำเนินการประชุมและบันทึกมติให้เลิกกิจการอย่างเป็นทางการ', icon: 'fa-solid fa-users' },
            { title: 'แต่งตั้งผู้ชำระบัญชีของบริษัท', desc: 'กำหนดผู้รับผิดชอบการชำระบัญชีและติดตามการปิดกิจการตามขั้นตอนกฎหมาย', icon: 'fa-solid fa-user-tie' },
            { title: 'ยื่นจดทะเบียนเลิกบริษัทต่อกรมพัฒนาธุรกิจการค้า', desc: 'ยื่นภายในระยะเวลาที่กฎหมายกำหนดผ่านระบบ DBD Biz Regist', icon: 'fa-solid fa-file-excel' },
            { title: 'ประกาศเลิกบริษัทและแจ้งเจ้าหนี้', desc: 'ลงประกาศในหนังสือพิมพ์และแจ้งเจ้าหนี้เพื่อเข้าสู่กระบวนการชำระหนี้', icon: 'fa-solid fa-newspaper' },
            { title: 'ชำระหนี้สิน ปิดบัญชี ยื่นงบและภาษี', desc: 'ดำเนินการชำระบัญชี ยื่นงบการเงินและภาษีกับกรมสรรพากรให้ครบถ้วน', icon: 'fa-solid fa-clipboard-check' },
            { title: 'ยื่นจดทะเบียนเสร็จการชำระบัญชี', desc: 'เมื่อชำระบัญชีแล้วเสร็จ ให้ยื่นจดทะเบียนเพื่อสิ้นสภาพบริษัทโดยสมบูรณ์', icon: 'fa-solid fa-stamp' }
          ],
          documents: {
            income: ['รายงานการประชุมผู้ถือหุ้น ใช้แสดงมติอนุมัติให้เลิกบริษัทและแต่งตั้งผู้ชำระบัญชี'],
            expense: ['รายชื่อผู้ถือหุ้น ใช้ประกอบการตรวจสอบข้อมูลของบริษัทและผู้มีส่วนเกี่ยวข้อง'],
            bank: ['สำเนาบัตรประชาชนของกรรมการและผู้ชำระบัญชี ใช้ยืนยันตัวตนของผู้ดำเนินการ'],
            other: ['งบการเงินและเอกสารบัญชี ใช้ประกอบการชำระบัญชีและตรวจสอบภาระทางการเงินของบริษัท']
          }
        }
      ],
      agencies: [
        { name: 'กรมพัฒนาธุรกิจการค้า (DBD)', role: 'หน่วยงานหลักในการรับจดทะเบียนจัดตั้งบริษัท จดทะเบียนเปลี่ยนแปลงบริษัท จดทะเบียนเลิกบริษัท และออกเอกสารทางทะเบียนผ่านระบบ DBD Biz Regist', url: 'https://www.dbd.go.th' },
        { name: 'กรมสรรพากร (RD)', role: 'กรณีมีภาษีมูลค่าเพิ่มหรือภาระภาษีที่เกี่ยวข้อง ต้องประสานเพื่อแจ้งเปลี่ยนแปลง ปิดทะเบียนภาษี และตรวจสอบภาระภาษีของบริษัท', url: 'https://www.rd.go.th' },
        { name: 'สำนักงานประกันสังคม (SSO)', role: 'กรณีมีลูกจ้างตั้งแต่ 5 คนขึ้นไป หรือมีการเลิกกิจการ ต้องขึ้นทะเบียน/ยกเลิกสถานะนายจ้างและดำเนินการด้านประกันสังคมให้ครบถ้วน', url: '#' },
        { name: 'สำนักงานเขต / องค์กรปกครองส่วนท้องถิ่น', role: 'ประสานงานกรณีต้องขออนุญาตเพิ่มเติมเฉพาะประเภทกิจการหรือเงื่อนไขท้องถิ่น', url: '#' },
        { name: 'ธนาคารหรือสถาบันการเงิน และผู้สอบบัญชี/สำนักงานบัญชี', role: 'ใช้สำหรับปิดบัญชีธนาคารของบริษัท และดำเนินการด้านบัญชี งบการเงิน เอกสารประกอบการชำระบัญชี', url: '#' }
      ]
    },
    en: {
      subSections: [
        {
          id: 'setup',
          title: 'Company Registration',
          importance: [
            { title: 'Establish Juristic Status', desc: 'Creates a legal entity distinct from its shareholders, allowing legitimate tax filings and commercial structures.', icon: 'fa-solid fa-id-card' },
            { title: 'Boost Business Trust', desc: 'Builds institutional credibility to secure large-scale commercial contracts, joint ventures, or state contracts.', icon: 'fa-solid fa-medal' },
            { title: 'Limit Shareholder Liability', desc: 'Limits shareholder exposure to the unpaid value of their shares, reducing personal financial risk.', icon: 'fa-solid fa-shield-halved' }
          ],
          steps: [
            { title: 'Name Reservation', desc: 'Check name availability and reserve the corporate name online via the DBD portal.', icon: 'fa-solid fa-pen-nib' },
            { title: 'Prepare Statutory Documents', desc: 'Draft the Memorandum of Association (MOA), hold statutory meeting, and prepare registration packets.', icon: 'fa-solid fa-file-contract' },
            { title: 'Submit Incorporation', desc: 'File application forms with the Department of Business Development (DBD) and pay state fees.', icon: 'fa-solid fa-file-import' },
            { title: 'VAT Registration', desc: 'Register for Tax ID and Value Added Tax (PP.20) if annual revenue exceeds 1.8M THB or voluntarily.', icon: 'fa-solid fa-file-invoice' },
            { title: 'Bank Setup & Handover', desc: 'Prepare introduction letters for corporate bank accounts and hand over stamp and certificates.', icon: 'fa-solid fa-truck-ramp-box' }
          ],
          documents: {
            income: ['Juristic registration forms (BOJ.1 - BOJ.5)'],
            expense: ['Copies of ID cards / Passports of all promoters and shareholders'],
            bank: ['Registered office address house registration, map, and consent letter from the property owner (if rented)'],
            other: ['ID/Passport copies and house registration of property owners or landlords']
          }
        },
        {
          id: 'change',
          title: 'Change Registration',
          importance: [
            { title: 'Keep Corporate Records Current', desc: 'Update company information when directors, registered capital, address, or business objectives change.', icon: 'fa-solid fa-arrows-rotate' },
            { title: 'Reduce Legal Risk', desc: 'Ensure filings match actual company operations to avoid discrepancies with government and business partners.', icon: 'fa-solid fa-scale-balanced' },
            { title: 'Maintain Business Credibility', desc: 'Accurate business records increase confidence with banks, partners, and regulators.', icon: 'fa-solid fa-medal' }
          ],
          steps: [
            { title: 'Authenticate Identity', desc: 'Log into DBD Biz Regist and verify the credentials of the authorized filer.', icon: 'fa-solid fa-user-check' },
            { title: 'Select Change Type', desc: 'Choose the type of amendment such as address, directors, capital, or company details.', icon: 'fa-solid fa-list-check' },
            { title: 'Update Company Information', desc: 'Enter the new company details and supporting information accurately.', icon: 'fa-solid fa-keyboard' },
            { title: 'Upload Documents & Sign Electronically', desc: 'Attach required supporting documents, review the entries, and sign electronically.', icon: 'fa-solid fa-file-signature' },
            { title: 'Pay Fees & Await Approval', desc: 'Pay the filing fee and wait for confirmation from the registrar.', icon: 'fa-solid fa-file-circle-check' }
          ],
          documents: {
            income: ['Meeting minutes/resolutions related to the proposed amendment.'],
            expense: ['Updated supporting documents such as new address proof or new director ID copies.'],
            bank: ['The DBD Biz Regist submission package with the updated company data.'],
            other: ['Additional documents required by the registrar for the specific change.']
          }
        },
        {
          id: 'liquidation',
          title: 'Company Liquidation',
          importance: [
            { title: 'Dissolve Juristic Status', desc: 'Formally terminates the business entity under the law, preventing potential legal issues.', icon: 'fa-solid fa-circle-minus' },
            { title: 'Audit Final Accounts', desc: 'Compiles final financial statements as of the dissolution date for independent auditor approval.', icon: 'fa-solid fa-calculator' },
            { title: 'Clear Tax Obligations', desc: 'Cancels VAT registration and files final corporate income tax returns (PND.50) for the closing period.', icon: 'fa-solid fa-shield-halved' }
          ],
          steps: [
            { title: 'Shareholders\' Resolution', desc: 'Hold extraordinary meeting of shareholders to pass special resolution for dissolution and appoint liquidator.', icon: 'fa-solid fa-users' },
            { title: 'Register Dissolution', desc: 'File dissolution application with the DBD within 14 days of the shareholders\' resolution.', icon: 'fa-solid fa-file-excel' },
            { title: 'Public Notice', desc: 'Publish dissolution in local newspaper and send registered notice letters to all creditors.', icon: 'fa-solid fa-newspaper' },
            { title: 'Audit Accounts', desc: 'Prepare final financial statements as of the closing date and have them audited by a licensed Thai auditor.', icon: 'fa-solid fa-clipboard-check' },
            { title: 'File Tax & Finish', desc: 'Clear remaining tax debts, distribute remaining assets, and register completed liquidation with DBD.', icon: 'fa-solid fa-stamp' }
          ],
          documents: {
            income: ['Dissolution application forms (LACH.1 - LACH.5) and original VAT certificate (PP.20)'],
            expense: ['Final financial statements as of the dissolution date audited by a licensed CPA/TA'],
            bank: ['Minutes of shareholders\' meeting approving completed liquidation and liquidator accounts'],
            other: ['Latest DBD corporate affidavit and final corporate income tax filing copy (PND.50)']
          }
        }
      ],
      agencies: [
        { name: 'Department of Business Development (DBD)', role: 'Government registrar auditing incorporation setups and dissolution filings', url: 'https://www.dbd.go.th' },
        { name: 'The Revenue Department (RD)', role: 'Approves Tax ID setups, handles VAT status changes, and reviews final dissolution accounts', url: 'https://www.rd.go.th' },
        { name: 'Social Security Office (SSO)', role: 'Liaises for employer registration setups or de-registration upon closure', url: '#' },
        { name: 'Commercial Banks', role: 'Assists with opening business bank accounts or closing accounts during liquidation processes', url: '#' }
      ]
    }
  },
  8: {
    th: {
      subSections: [
        {
          id: 'visa',
          title: 'วีซ่า (Visa)',
          importance: [
            { title: 'เอกสารถูกต้องตามกฎหมาย', desc: 'วีซ่าเป็นเอกสารอนุญาตให้ชาวต่างชาติเดินทางเข้ามาและพำนักอยู่ในประเทศไทยได้อย่างถูกต้องตามกฎหมาย', icon: 'fa-solid fa-passport' },
            { title: 'เลือกประเภทวีซ่าให้ตรงวัตถุประสงค์', desc: 'ประเภทของวีซ่ามีความแตกต่างตามวัตถุประสงค์ เช่น ทำงาน ลงทุน หรือศึกษาต่อ การเลือกให้ถูกต้องช่วยลดความเสี่ยงด้านกฎหมาย', icon: 'fa-solid fa-circle-nodes' },
            { title: 'ป้องกันการเพิกถอนสิทธิ์พำนัก', desc: 'การมีวีซ่าที่ถูกต้องช่วยป้องกันปัญหาด้านกฎหมายและลดโอกาสถูกเพิกถอนสิทธิ์การพำนักในประเทศ', icon: 'fa-solid fa-shield-halved' }
          ],
          steps: [
            { title: 'เตรียมเอกสารประกอบการขอวีซ่า', desc: 'จัดเตรียมเอกสารส่วนบุคคลและเอกสารสนับสนุนให้ครบถ้วนก่อนยื่นคำร้อง', icon: 'fa-solid fa-file-signature' },
            { title: 'ยื่นคำร้องผ่านสถานทูตหรือสถานกงสุลไทยในต่างประเทศ', desc: 'ดำเนินการยื่นตามช่องทางที่หน่วยงานกำหนดในประเทศต้นทางของผู้ขอ', icon: 'fa-solid fa-file-import' },
            { title: 'รอการพิจารณาอนุมัติ', desc: 'ติดตามสถานะคำร้องและประสานงานเพิ่มเติมหากมีการขอเอกสารเสริม', icon: 'fa-solid fa-hourglass-half' },
            { title: 'เมื่อได้รับวีซ่าแล้ว สามารถเดินทางเข้าประเทศไทยได้', desc: 'ดำเนินการเดินทางเข้าประเทศไทยภายในระยะเวลาที่วีซ่ากำหนด', icon: 'fa-solid fa-plane-arrival' },
            { title: 'ดำเนินการต่ออายุวีซ่าหรือแจ้งที่พักตามระยะเวลาที่กฎหมายกำหนด', desc: 'ดูแลขั้นตอนหลังเข้าประเทศ เช่น การต่ออายุวีซ่าและการแจ้งที่พักให้ถูกต้องตามกฎหมาย', icon: 'fa-solid fa-calendar-check' }
          ],
          documents: {
            income: ['หนังสือเดินทาง (Passport) ใช้ยืนยันตัวตนและข้อมูลการเดินทางของชาวต่างชาติ', 'แบบคำขอวีซ่า ใช้สำหรับกรอกรายละเอียดส่วนบุคคลและวัตถุประสงค์ในการเดินทาง'],
            expense: ['รูปถ่ายตามที่กำหนด ใช้ประกอบเอกสารทางราชการ'],
            bank: ['หนังสือเชิญหรือเอกสารจากบริษัท ใช้ยืนยันเหตุผลในการเข้าประเทศ เช่น เพื่อทำงานหรือลงทุน'],
            other: ['เอกสารการเงิน ใช้แสดงความสามารถในการใช้จ่ายระหว่างพำนักในประเทศไทย']
          }
        },
        {
          id: 'workpermit',
          title: 'ใบอนุญาตทำงาน (Work Permit)',
          importance: [
            { title: 'เอกสารสำคัญสำหรับการทำงานในไทย', desc: 'ใบอนุญาตทำงานเป็นเอกสารสำคัญสำหรับชาวต่างชาติที่ต้องการทำงานในประเทศไทย', icon: 'fa-solid fa-briefcase' },
            { title: 'แสดงการประกอบอาชีพอย่างถูกต้อง', desc: 'ใช้แสดงว่าสามารถประกอบอาชีพได้อย่างถูกต้องตามกฎหมายแรงงานไทย', icon: 'fa-solid fa-shield-halved' },
            { title: 'ลดความเสี่ยงโทษทางกฎหมาย', desc: 'หากทำงานโดยไม่มี Work Permit อาจมีโทษทั้งต่อลูกจ้างและนายจ้าง', icon: 'fa-solid fa-triangle-exclamation' }
          ],
          steps: [
            { title: 'บริษัทจัดเตรียมเอกสารของนายจ้างและลูกจ้างต่างชาติ', desc: 'รวบรวมเอกสารที่เกี่ยวข้องจากทั้งฝั่งบริษัทและผู้ขอใบอนุญาตทำงาน', icon: 'fa-solid fa-folder-open' },
            { title: 'ยื่นคำขอใบอนุญาตทำงานต่อหน่วยงานที่เกี่ยวข้อง', desc: 'ดำเนินการยื่นคำขอต่อหน่วยงานรัฐตามขั้นตอนที่กำหนด', icon: 'fa-solid fa-file-export' },
            { title: 'เจ้าหน้าที่ตรวจสอบคุณสมบัติและเอกสาร', desc: 'รอการตรวจสอบข้อมูล ความครบถ้วน และความถูกต้องของเอกสาร', icon: 'fa-solid fa-clipboard-check' },
            { title: 'ชำระค่าธรรมเนียม', desc: 'ดำเนินการชำระค่าธรรมเนียมตามอัตราที่ทางราชการกำหนด', icon: 'fa-solid fa-receipt' },
            { title: 'รับใบอนุญาตทำงานและเริ่มทำงานได้อย่างถูกต้องตามกฎหมาย', desc: 'เมื่อได้รับอนุมัติแล้วสามารถทำงานได้ตามเงื่อนไขที่ระบุในใบอนุญาต', icon: 'fa-solid fa-id-card' }
          ],
          documents: {
            income: ['หนังสือเดินทางพร้อมวีซ่าที่ถูกต้อง ใช้ยืนยันสถานะการพำนักของชาวต่างชาติ', 'เอกสารบริษัท เช่น หนังสือรับรองบริษัท รายชื่อผู้ถือหุ้น และทะเบียนภาษี เพื่อแสดงสถานะของนายจ้าง'],
            expense: ['สัญญาจ้างงาน ใช้ยืนยันตำแหน่ง หน้าที่ และค่าตอบแทนของลูกจ้างต่างชาติ'],
            bank: ['วุฒิการศึกษาและประวัติการทำงาน ใช้ประกอบการพิจารณาความเหมาะสมของตำแหน่งงาน'],
            other: ['รูปถ่ายของผู้ขออนุญาต ใช้ประกอบเอกสารราชการ']
          }
        },
        {
          id: 'boi',
          title: 'BOI (Board of Investment)',
          importance: [
            { title: 'หน่วยงานส่งเสริมการลงทุนของไทย', desc: 'สำนักงานคณะกรรมการส่งเสริมการลงทุน หรือ BOI เป็นหน่วยงานที่ส่งเสริมการลงทุนในประเทศไทย', icon: 'fa-solid fa-building-columns' },
            { title: 'ได้รับสิทธิประโยชน์สำคัญ', desc: 'บริษัทที่ได้รับการส่งเสริมจาก BOI จะได้รับสิทธิประโยชน์ เช่น สิทธิด้านภาษี และการถือครองที่ดิน', icon: 'fa-solid fa-percent' },
            { title: 'อำนวยความสะดวกด้านแรงงานต่างชาติ', desc: 'ช่วยอำนวยความสะดวกด้าน Visa และ Work Permit สำหรับผู้บริหารหรือผู้เชี่ยวชาญชาวต่างชาติ', icon: 'fa-solid fa-earth-americas' }
          ],
          steps: [
            { title: 'ยื่นคำขอรับการส่งเสริมการลงทุนต่อ BOI', desc: 'เริ่มต้นด้วยการยื่นคำขอและข้อมูลพื้นฐานของโครงการลงทุน', icon: 'fa-solid fa-file-import' },
            { title: 'เสนอรายละเอียดโครงการลงทุนและแผนธุรกิจ', desc: 'นำเสนอรูปแบบการลงทุน เป้าหมาย และแผนดำเนินงานของโครงการ', icon: 'fa-solid fa-pen-to-square' },
            { title: 'เจ้าหน้าที่พิจารณาคุณสมบัติของโครงการ', desc: 'หน่วยงานพิจารณาความเหมาะสมและความสอดคล้องกับเกณฑ์ส่งเสริมการลงทุน', icon: 'fa-solid fa-magnifying-glass-chart' },
            { title: 'เมื่อได้รับอนุมัติ บริษัทต้องดำเนินการตามเงื่อนไขที่กำหนด', desc: 'ปฏิบัติตามข้อกำหนดและกรอบเวลาที่ BOI กำหนดไว้', icon: 'fa-solid fa-clipboard-check' },
            { title: 'ใช้สิทธิประโยชน์ต่าง ๆ ที่ได้รับจาก BOI เช่น ภาษี หรือการอำนวยความสะดวกด้านแรงงานต่างชาติ', desc: 'นำสิทธิประโยชน์ที่ได้รับมาใช้ให้เกิดประโยชน์สูงสุดต่อธุรกิจ', icon: 'fa-solid fa-award' }
          ],
          documents: {
            income: ['แบบคำขอรับการส่งเสริมการลงทุน ใช้แจ้งรายละเอียดโครงการต่อ BOI', 'แผนธุรกิจและรายละเอียดโครงการ ใช้แสดงรูปแบบการลงทุน เงินลงทุน และประโยชน์ทางเศรษฐกิจ'],
            expense: ['เอกสารบริษัท ใช้แสดงข้อมูลนิติบุคคลและโครงสร้างธุรกิจ'],
            bank: ['งบการเงินหรือหลักฐานทางการเงิน ใช้ยืนยันศักยภาพในการลงทุน'],
            other: ['เอกสารเกี่ยวกับเทคโนโลยีหรือการดำเนินงาน กรณีเป็นโครงการเฉพาะทางหรือใช้เทคโนโลยีขั้นสูง']
          }
        }
      ],
      agencies: [
        { name: 'สำนักงานตรวจคนเข้าเมือง', role: 'เกี่ยวข้องกับการอนุญาตให้อยู่ในราชอาณาจักร การต่อวีซ่า และการแจ้งที่พักของชาวต่างชาติ', url: 'https://www.immigration.go.th' },
        { name: 'กรมการจัดหางาน', role: 'รับผิดชอบการออกใบอนุญาตทำงาน (Work Permit) ให้แก่ชาวต่างชาติ', url: 'https://www.doe.go.th' },
        { name: 'สำนักงานคณะกรรมการส่งเสริมการลงทุน', role: 'พิจารณาและอนุมัติสิทธิประโยชน์ด้านการลงทุนสำหรับโครงการที่เข้าร่วม BOI', url: 'https://www.boi.go.th' },
        { name: 'กรมพัฒนาธุรกิจการค้า', role: 'ใช้ตรวจสอบข้อมูลบริษัทและเอกสารนิติบุคคลที่เกี่ยวข้อง', url: 'https://www.dbd.go.th' },
        { name: 'สถานทูตหรือสถานกงสุลไทยในต่างประเทศ', role: 'รับคำร้องขอวีซ่าจากชาวต่างชาติก่อนเดินทางเข้าประเทศไทย', url: '#' }
      ]
    },
    en: {
      subSections: [
        {
          id: 'visa',
          title: 'Visa Services',
          importance: [
            { title: 'Legal Thai Stay', desc: 'Permits foreigners to reside and travel within Thailand legally, avoiding overstay fines or legal detentions.', icon: 'fa-solid fa-passport' },
            { title: 'Purpose-Driven Visas', desc: 'Assists in securing the correct visa class, such as Business (Non-B), Marriage, or Dependent visas.', icon: 'fa-solid fa-circle-nodes' },
            { title: 'Maintain Good Travel History', desc: 'Organized 90-day reporting and extension procedures build a reliable and clean record with Thai authorities.', icon: 'fa-solid fa-clock' }
          ],
          steps: [
            { title: 'Assess Qualifications', desc: 'Review expat credentials and corporate documents of the employer to choose the correct visa pathway.', icon: 'fa-solid fa-search' },
            { title: 'Compile Applications', desc: 'Fill visa forms, verify documentation layouts, and secure online queue slots at Immigration.', icon: 'fa-solid fa-file-signature' },
            { title: 'Submit Documents', desc: 'Accompany the client to the Immigration Office for physical review of the application and interviews.', icon: 'fa-solid fa-file-import' },
            { title: 'Collect Visa Stamp', desc: 'Handle state fees payment and secure the temporary stay visa stamps in the client\'s passport.', icon: 'fa-solid fa-stamp' }
          ],
          documents: {
            income: ['Original Passport with at least 6 months of validity remaining'],
            expense: ['Standard sized photographs (white background, taken within 6 months)'],
            bank: ['Invitation letter or employment certificate from the sponsoring company in Thailand'],
            other: ['Sponsoring company registration copies (corporate affidavit, list of shareholders, latest audited financials)']
          }
        },
        {
          id: 'workpermit',
          title: 'Work Permit',
          importance: [
            { title: 'Authorized Employment', desc: 'Fulfills Thai statutory rules dictating that all working expats must hold a Work Permit linked to their employer.', icon: 'fa-solid fa-briefcase' },
            { title: 'Expat Rights & Bank Setup', desc: 'Secures rights to local income, social security welfare plans, and facilitates opening local payroll bank accounts.', icon: 'fa-solid fa-shield-halved' },
            { title: 'Prevent Hefty Penalties', desc: 'Shields both employer and expat from massive fines, detention, or deportation under the Alien Work Act.', icon: 'fa-solid fa-triangle-exclamation' }
          ],
          steps: [
            { title: 'Check Quota Ratios', desc: 'Verify local employee-to-foreigner ratios (typically 4:1) and company registered capital limits (2M THB per expat).', icon: 'fa-solid fa-users-rectangle' },
            { title: 'Prepare Work Credentials', desc: 'Gather job contract data, education certificates, former work experience letters, and medical certificate.', icon: 'fa-solid fa-paste' },
            { title: 'Submit to Employment Dept', desc: 'File application forms with the Department of Employment or via their online portal systems.', icon: 'fa-solid fa-file-export' },
            { title: 'Biometrics & Collection', desc: 'Accompany client for biometrics scanning and collect the physical or digital Work Permit.', icon: 'fa-solid fa-id-card' }
          ],
          documents: {
            income: ['Original passport containing a valid Non-Immigrant B (Business) visa stamp'],
            expense: ['Original Thai medical certificate certifying the applicant has no prohibited diseases (issued within 30 days)'],
            bank: ['Expat\'s education degrees, graduation diplomas, or employment reference letters from previous employers'],
            other: ['Employer documentation copies: corporate affidavit, monthly withholding tax (PND.1), and social security returns (SSO 1-10)']
          }
        },
        {
          id: 'boi',
          title: 'BOI Privileges',
          importance: [
            { title: 'Tax Incentives', desc: 'Unlocks corporate income tax exemptions for up to 13 years and import duty waivers on machines and raw materials.', icon: 'fa-solid fa-percent' },
            { title: 'Non-Tax Privileges', desc: 'Permits foreigners to hold land ownership for promoted projects and secures expedited expat quota approvals.', icon: 'fa-solid fa-earth-americas' },
            { title: 'Fast-Track State Process', desc: 'Allows access to rapid visa and Work Permit issuance via the One Start One Stop Service (OSOS) center.', icon: 'fa-solid fa-bolt' }
          ],
          steps: [
            { title: 'Evaluate Industry Scope', desc: 'Analyze the client\'s business operations against the BOI investment promotion criteria.', icon: 'fa-solid fa-magnifying-glass-chart' },
            { title: 'Write Project Proposal', desc: 'Draft the project proposal detailing financial investments, target technology, and local employment plans.', icon: 'fa-solid fa-pen-to-square' },
            { title: 'Submit BOI Application', desc: 'File the investment promotion request online and prepare presentation briefings for the BOI committee.', icon: 'fa-solid fa-cloud-arrow-up' },
            { title: 'Acquire BOI Certificate', desc: 'Receive project approval, submit incorporation paperwork, and obtain the BOI Promotion Certificate.', icon: 'fa-solid fa-award' }
          ],
          documents: {
            income: ['BOI Investment Promotion application forms (tailored to industrial category)'],
            expense: ['Investment roadmap, machinery details, and proposed employee development charts'],
            bank: ['Sponsoring company affidavit, list of shareholders (BOJ.5), and latest audited statements of parent companies'],
            other: ['Map of proposed plant/office location, product catalog, or production process workflow diagrams']
          }
        }
      ],
      agencies: [
        { name: 'Immigration Bureau of Thailand', role: 'Approves visa stays, visa extensions of stay, and handles 90-day residence reporting', url: 'https://www.immigration.go.th' },
        { name: 'Department of Employment (Labour Ministry)', role: 'Approves foreign quotas and issues physical/digital Work Permits', url: 'https://www.doe.go.th' },
        { name: 'Board of Investment (BOI)', role: 'Reviews investment projects and grants tax/non-tax fast-track privileges', url: 'https://www.boi.go.th' },
        { name: 'Ministry of Foreign Affairs (MFA)', role: 'Considers Non-Immigrant B visa codes at Royal Thai Embassies or Consulates General abroad', url: '#' }
      ]
    }
  }
};
