// رابط تطبيق الويب الخاص بـ Google Apps Script
// هذا هو الرابط الذي قدمته لي للتو:
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzZoMm1ziWaSRZRBx6qK0ygJZaNrbiPlwB94C2-AfpiSWbGImRSegOvCbPDQkxeIK_h/exec';

document.addEventListener('DOMContentLoaded', () => {
    const dataEntryForm = document.getElementById('data-entry-form');
    const responseMessageDiv = document.getElementById('response-message');

    if (dataEntryForm) {
        dataEntryForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // منع الإرسال الافتراضي للنموذج

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;

            // مسح أي رسائل سابقة
            responseMessageDiv.textContent = '';
            responseMessageDiv.classList.remove('error');

            try {
                const response = await fetch(WEB_APP_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'addData', // تحديد نوع العملية للسكريبت
                        name: name,
                        phone: phone
                    })
                });

                const data = await response.json();
                console.log('Apps Script response:', data);

                if (data.success) {
                    responseMessageDiv.textContent = 'تم إرسال البيانات بنجاح: ' + data.message;
                    responseMessageDiv.style.color = 'green';
                    dataEntryForm.reset(); // مسح حقول النموذج بعد النجاح
                } else {
                    responseMessageDiv.textContent = 'فشل الإرسال: ' + data.message;
                    responseMessageDiv.style.color = 'red';
                }
            } catch (error) {
                console.error('حدث خطأ أثناء الاتصال بـ Google Apps Script:', error);
                responseMessageDiv.textContent = 'حدث خطأ غير متوقع. الرجاء المحاولة لاحقًا.';
                responseMessageDiv.style.color = 'red';
            }
        });
    }
});
