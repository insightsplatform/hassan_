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

    // معالجة إرسال طلب الحجز وتحويله لرسالة واتساب تلقائية
    const bookingForm = document.getElementById('whatsappBookingForm');
    
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault(); // إيقاف إرسال الصفحة التقليدي

        // جلب المدخلات من المستخدم
        const name = document.getElementById('custName').value;
        const phone = document.getElementById('custPhone').value;
        const packageChoice = document.getElementById('packageType').value;
        const date = document.getElementById('eventDate').value;
        const details = document.getElementById('moreDetails').value;

        // صياغة رسالة واتساب منسقة ومقروءة
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
});