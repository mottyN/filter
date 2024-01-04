function FindProxyForURL(url, host) {
    // בדיקה אם הכתובת מתחילה ב- "https"
    if (url.substring(0, 5) == "https") {
        // החזרת כתובת הפרוקסי עבור HTTPS
        return "PROXY 127.0.0.1:3000";
    } else {
        // החזרת כתובת הפרוקסי עבור HTTP
        return "PROXY " + 1111111111111111111111111111 + ":" + 12 + "@127.0.0.1:3000";    }
}
