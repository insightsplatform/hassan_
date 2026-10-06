document.addEventListener('DOMContentLoaded', () => {
    // تمرير سلس عند الضغط على الروابط
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;

            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    });

    // آلية زر الحجز على الباقات والذهاب للحقول
    const bookButtons = document.querySelectorAll('.btn-book');
    const packageSelect = document.getElementById('packageType');
    const contactSection = document.getElementById('contact');
    const headerHeight = document.querySelector('header').offsetHeight;

    bookButtons.forEach(button => {
        button.addEventListener('click', function () {
            // جلب قيمة الباقة المرفقة مع الزر
            const selectedPackage = this.getAttribute('data-package');
            
            // اختيار الباقة المناسبة في حقول النموذج تلقائياً
            if (packageSelect) {
                packageSelect.value = selectedPackage;
            }

            // تمرير سلس ومريح لنموذج الحجز
            window.scrollTo({
                top: contactSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });

            // تركيز (Focus) على أول حقل بالنموذج
            setTimeout(() => {
                const nameInput = document.getElementById('custName');
                if (nameInput) nameInput.focus();
            }, 800);
        });
    });

    // معالجة إرسال طلب الحجز وتحويله لرسالة واتساب تلقائية
    const bookingForm = document.getElementById('whatsappBookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault(); // إيقاف إرسال الصفحة التقليدي

            // جلب المدخلات من المستخدم
            const name = document.getElementById('custName').value;
            const phone = document.getElementById('custPhone').value;
            const packageChoice = document.getElementById('packageType').value;
            const date = document.getElementById('eventDate').value;
            const details = document.getElementById('moreDetails').value;

            // صياغة رسالة واتساب منسقة ومقروءة للشركة
            const baseMessage = `مرحباً شركة الرؤى للتصوير، أرغب في تأكيد حجز مناسبة تفاصيلها كالتالي:\n\n` +
                                `👤 الاسم: ${name}\n` +
                                `📞 الجوال: ${phone}\n` +
                                `📸 الباقة: ${packageChoice}\n` +
                                `📅 التاريخ: ${date}\n` +
                                `💬 تفاصيل إضافية: ${details || "لا توجد تفاصيل إضافية"}`;

            // ترميز الرسالة لتعمل بشكل صحيح في روابط الإنترنت
            const encodedMessage = encodeURIComponent(baseMessage);

            // الرابط المباشر لواتساب برقمك والرسالة
            const whatsappURL = `https://wa.me/9647747309173?text=${encodedMessage}`;

            // فتح واتساب في علامة تبويب جديدة
            window.open(whatsappURL, '_blank');

            // إعادة ضبط النموذج بعد إتمام العملية
            bookingForm.reset();
        });
    }
});