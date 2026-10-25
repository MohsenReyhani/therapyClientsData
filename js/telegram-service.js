// js/telegram-service.js
    
// Submit PDF to Telegram
async function submitPdfToTelegram() {

    const data = getFormData();
    const { pdf, opt } = await generatePDF();
    const blob = pdf.output("blob");
    const base64 = await blobToBase64(blob);
    const messageText = buildTelegramTextMessage(data);

    // Use URLSearchParams instead of FormData
    const payload = new URLSearchParams();
    payload.append("filename", opt.filename);
    payload.append("caption", opt.caption);
    payload.append("pdf", base64);
    payload.append("message", messageText);

    const response = await fetch(CONFIG.WEB_APP_URL_TELEGRAM, {
        method: "POST",
        body: payload,
        redirect: "follow" // Explicitly tell fetch to follow redirects
    });

    const result = await response.text();

    try {
        return JSON.parse(result);
    } catch (e) {
        throw new Error("Server response was not JSON: " + result);
    }
}
