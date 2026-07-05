function showNotification(message, type = "info") {
    const notif = document.createElement("div");
    notif.textContent = message;

    notif.style.position = "fixed";
    notif.style.bottom = "20px";
    notif.style.right = "20px";
    notif.style.padding = "12px 16px";
    notif.style.borderRadius = "8px";
    notif.style.color = "white";
    notif.style.zIndex = "9999";
    notif.style.background = type === "success" ? "green"
                       : type === "error" ? "red"
                       : "gray";

    document.body.appendChild(notif);

    setTimeout(() => notif.remove(), 3000);
}