
const playBtn = document.querySelector('.bonus__main-wheel-btn'),
      main = document.querySelector('.bonus__main'),
      wheel = document.querySelector('.bonus__main-wheel-reel'),
      overlay = document.querySelector('.bonus__overlay'),
      popupFirst = document.querySelector('.bonus__firstWin'),
      overflow = document.querySelector('body'),
      wrapper = document.querySelector('.bonus'),
      bonusStart = document.querySelector('.bonus__start'),
      bonusText = document.querySelector('.bonus__text'),
      audioCoin = document.querySelector('.audio-coins'),
      audioFirework = document.querySelector('.audio-firework'),
      audioMain = document.querySelector('.audio-main'),
      audioWheel = document.querySelector('.audio-wheel'),
      btnVolume = document.querySelector('.bonus__music'),
      btnVolumeImg = document.querySelector('.bonus__music-img'),
      body = document.querySelector('body'),
      allLink = document.querySelector('.all-link'),
      popupText = document.querySelector('.bonus__firstWin-text')

audioMain.volume = 0.35
audioFirework.volume = 0.6
audioCoin.volume = 0.6

// audioMain.volume = 0
// audioFirework.volume = 0
// audioCoin.volume = 0

function scrollToTop() {
    const currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 8);
    }
}

btnVolume.addEventListener('click', () => {
    if(btnVolume.classList.contains('off')){
        btnVolume.classList.remove('off')
        btnVolume.classList.add('on')
        audioMain.play()
        audioFirework.play()
        btnVolumeImg.setAttribute('src', 'img/sound-on.svg')

    } else {
        btnVolume.classList.remove('on')
        btnVolume.classList.add('off')
        audioMain.pause()
        audioMain.currentTime = 0;
        audioFirework.pause()
        audioFirework.currentTime = 0;
        audioWheel.pause()
        audioWheel.currentTime = 0;
        audioCoin.pause()
        audioCoin.currentTime = 0;
        btnVolumeImg.setAttribute('src', 'img/sound-off.svg')
    }
})

setTimeout(function (){
    bonusStart.classList.add('_active')
    main.classList.add('_active')
    setTimeout(function (){
        bonusText.classList.add('_visible')
    }, 1200)

}, 3500);


playBtn.addEventListener('click', () => {
    runFirstRotation()
})

function runFirstRotation() {
    scrollToTop()
    btnVolume.classList.remove('off')
    btnVolume.classList.add('on')
    btnVolumeImg.setAttribute('src', 'img/sound-on.svg')
    audioMain.play()
    audioFirework.play()
    audioWheel.play()
    wheel.classList.add('reel-rotation-first')
    playBtn.classList.remove('pulse-btn')
    playBtn.style.cursor = 'default'
    wrapper.style.pointerEvents = 'none'
    wrapper.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    setTimeout(() => {
        doAfterFirstRotation()
    }, 6000)
}

function doAfterFirstRotation() {
    popupText.classList.add('_visible')
    allLink.style.display = 'block'
    audioCoin.play()
    wheel.style.transform = 'rotate(1440deg)'
    wheel.classList.remove('reel-rotation-first')
    displayPopup(popupFirst)
    wrapper.style.pointerEvents = 'auto'
    overflow.style.overflow = 'hidden'
}


function displayPopup(popup) {
    overlay.classList.remove('opacity-overlay')
    popup.classList.remove('hide')
}

window.addEventListener('orientationchange', () => {
    window.location.reload()
});



(function () {
    var url = new URL(window.location.href);
    var params = ['l', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'param1', 'param2', 'param3', 'param4', 'creative_type', 'creative_id'];
    var linkParams = ['affid', 'cpaid']; // ищем в url redirectUrl в url:

    if (url.searchParams.has('redirectUrl')) {
        var redirectUrl = new URL(url.searchParams.get('redirectUrl'));

        if (redirectUrl.href.match(/\//g).length === 4 && redirectUrl.searchParams.get('l')) {
            //если ссылка в ссылка redirectUrl корректная
            localStorage.setItem('redirectUrl', redirectUrl.href); // указываем точкой входа домен с протоколом из redirectUrl
        }
    }

    params.forEach(function (param) {
        if (url.searchParams.has(param)) localStorage.setItem(param, url.searchParams.get(param));
    });

    linkParams.forEach(function (linkParam) {
        if (url.searchParams.has(linkParam)) localStorage.setItem(linkParam, url.searchParams.get(linkParam));
    });

    window.addEventListener('click', function (e) {
        var link,
            parent = e.target.closest('a');

        if (parent.getAttribute('href') !== 'https://tds.favbet.partners') {
            return;
        }

        if (parent) {
            e.preventDefault();
            var affid = localStorage.getItem('affid');
            var cpaid = localStorage.getItem('cpaid');

            if (localStorage.getItem("redirectUrl")) {
                link = new URL(localStorage.getItem("redirectUrl"));
            } else {
                link = new URL(parent.href);
                if (affid && cpaid) {
                    link.pathname = '/' + affid + '/' + cpaid;
                }
            }

            params.forEach(function (param) {
                if (url.searchParams.has(param)) {
                    link.searchParams.set(param, localStorage.getItem(param));
                }
            });

            document.location.href = link;
        }
    });
})();


