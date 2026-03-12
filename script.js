function normalizeURL(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }
    return url;
}

function getURLFromPath() {

    let path = window.location.pathname.slice(1);

    if (!path) return null;

    try {
        return normalizeURL(decodeURIComponent(path));
    } catch {
        return null;
    }
}

function loadIframe(url) {
    document.getElementById("frame").src = url;
}

function search() {

    let input = document.getElementById("urlBox").value.trim();
    if (!input) return;

    input = normalizeURL(input);

    // URL変更（検索URL方式）
    window.history.pushState({}, "", "/" + encodeURIComponent(input));

    loadIframe(input);
}

// Enterキー対応
document.addEventListener("keydown", e => {
    if (e.key === "Enter") search();
});

// 初回ロード
window.onload = () => {

    const url = getURLFromPath();

    if (url) {
        document.getElementById("urlBox").value = url;
        loadIframe(url);
    }
};