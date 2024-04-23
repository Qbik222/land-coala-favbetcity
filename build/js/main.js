var playBtn = document.querySelector(".bonus__main-wheel-btn"), main = document.querySelector(".bonus__main"),
    wheel = document.querySelector(".bonus__main-wheel-reel"), overlay = document.querySelector(".bonus__overlay"),
    popupFirst = document.querySelector(".bonus__firstWin"), overflow = document.querySelector("body"),
    wrapper = document.querySelector(".bonus"), bonusStart = document.querySelector(".bonus__start"),
    bonusText = document.querySelector(".bonus__text"), audioCoin = document.querySelector(".audio-coins"),
    audioFirework = document.querySelector(".audio-firework"), audioMain = document.querySelector(".audio-main"),
    audioWheel = document.querySelector(".audio-wheel"), btnVolume = document.querySelector(".bonus__music"),
    btnVolumeImg = document.querySelector(".bonus__music-img"), body = document.querySelector("body"),
    allLink = document.querySelector(".all-link"), popupText = document.querySelector(".bonus__firstWin-text");

function scrollToTop() {
    var e = document.documentElement.scrollTop || document.body.scrollTop;
    0 < e && (window.requestAnimationFrame(scrollToTop), window.scrollTo(0, e - e / 8))
}

function runFirstRotation() {
    scrollToTop(), btnVolume.classList.remove("off"), btnVolume.classList.add("on"), btnVolumeImg.setAttribute("src", "img/sound-on.svg"), audioMain.play(), audioFirework.play(), audioWheel.play(), wheel.classList.add("reel-rotation-first"), playBtn.classList.remove("pulse-btn"), playBtn.style.cursor = "default", wrapper.style.pointerEvents = "none", wrapper.style.overflow = "hidden", body.style.overflow = "hidden", setTimeout(function () {
        doAfterFirstRotation()
    }, 6e3)
}

function doAfterFirstRotation() {
    popupText.classList.add("_visible"), allLink.style.display = "block", audioCoin.play(), wheel.style.transform = "rotate(992deg)", wheel.classList.remove("reel-rotation-first"), displayPopup(popupFirst), wrapper.style.pointerEvents = "auto", overflow.style.overflow = "hidden"
}

function displayPopup(e) {
    overlay.classList.remove("opacity-overlay"), e.classList.remove("hide")
}

audioMain.volume = .35, audioFirework.volume = .6, audioCoin.volume = .6, btnVolume.addEventListener("click", function () {
    btnVolume.classList.contains("off") ? (btnVolume.classList.remove("off"), btnVolume.classList.add("on"), audioMain.play(), audioFirework.play(), btnVolumeImg.setAttribute("src", "img/sound-on.svg")) : (btnVolume.classList.remove("on"), btnVolume.classList.add("off"), audioMain.pause(), audioMain.currentTime = 0, audioFirework.pause(), audioFirework.currentTime = 0, audioWheel.pause(), audioWheel.currentTime = 0, audioCoin.pause(), audioCoin.currentTime = 0, btnVolumeImg.setAttribute("src", "img/sound-off.svg"))
}), setTimeout(function () {
    bonusStart.classList.add("_active"), main.classList.add("_active"), setTimeout(function () {
        bonusText.classList.add("_visible")
    }, 1200)
}, 3500), playBtn.addEventListener("click", function () {
    runFirstRotation()
}), window.addEventListener("orientationchange", function () {
    window.location.reload()
}), function () {
    var e, a = new URL(window.location.href),
        n = ["l", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "param1", "param2", "param3", "param4", "creative_type", "creative_id"];
    a.searchParams.has("redirectUrl") && 4 === (e = new URL(a.searchParams.get("redirectUrl"))).href.match(/\//g).length && e.searchParams.get("l") && localStorage.setItem("redirectUrl", e.href), n.forEach(function (e) {
        a.searchParams.has(e) && localStorage.setItem(e, a.searchParams.get(e))
    }), ["affid", "cpaid"].forEach(function (e) {
        a.searchParams.has(e) && localStorage.setItem(e, a.searchParams.get(e))
    }), window.addEventListener("click", function (e) {
        var t, o, r = e.target.closest("a");
        "https://tds.favbet.partners" === r.getAttribute("href") && r && (e.preventDefault(), e = localStorage.getItem("affid"), o = localStorage.getItem("cpaid"), localStorage.getItem("redirectUrl") ? t = new URL(localStorage.getItem("redirectUrl")) : (t = new URL(r.href), e && o && (t.pathname = "/" + e + "/" + o)), n.forEach(function (e) {
            a.searchParams.has(e) && t.searchParams.set(e, localStorage.getItem(e))
        }), document.location.href = t)
    })
}();
