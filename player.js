var audioPlayer = document.querySelector('.player');
var main = document.querySelector('.main');
var menu = document.querySelector('.menu-list');
var active = document.querySelector('.active');
var currentTrack = 0;
var isPlaying = false;
var tracksList = [
    'forest',
    'drozd',
    'javoronok',
    'slavka',
    'solovey',
    'zarynka',
];
var audio = new Audio();
function playAudio(trackID) {
    audio.src = "./assets/audio/".concat(tracksList[trackID], ".mp3");
    currentTrack = trackID;
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    document.body.classList.add('audio-playing');
}
function pauseAudio() {
    audio.pause();
    isPlaying = false;
    document.body.classList.remove('audio-playing');
}
audioPlayer.addEventListener('click', function () {
    if (!isPlaying) {
        playAudio(currentTrack);
    }
    else {
        pauseAudio();
    }
    console.log("Player state: ".concat(isPlaying, ". Track #").concat(currentTrack));
});
menu.addEventListener('click', function (event) {
    var target = event.target;
    var num = Number(target.dataset.track);
    if (currentTrack == num) {
        return;
    }
    pauseAudio();
    active.classList.remove('active');
    active = target;
    active.classList.add('active');
    var bgName = "url(\"/assets/img/".concat(tracksList[num], ".jpg\")");
    main.style.backgroundImage = bgName;
    playAudio(num);
});
// preload Images
function preloadImages() {
    tracksList.forEach(function (i) {
        var img = new Image();
        img.src = "/assets/img/".concat(i, ".jpg");
    });
}
preloadImages();
// review
console.log("\n\u041E\u0446\u0435\u043D\u043A\u0430 60\n\n1) \u0412\u0451\u0440\u0441\u0442\u043A\u0430 +10\n  \u0435\u0441\u0442\u044C \u043D\u0435 \u043C\u0435\u043D\u044C\u0448\u0435 \u043F\u044F\u0442\u0438 \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432, \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438 \u043C\u043E\u0433\u0443\u0442 \u0432\u0437\u0430\u0438\u043C\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u043E\u0432\u0430\u0442\u044C. \u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0432\u043D\u0435\u0448\u043D\u0435\u0433\u043E \u0432\u0438\u0434\u0430 \u0441\u0430\u043C\u043E\u0433\u043E \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 \u0438 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u043A\u0443\u0440\u0441\u043E\u0440\u0430 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438, \u043F\u043B\u0430\u0432\u043D\u044B\u0435 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0438 +5\n  \u0432 \u0444\u0443\u0442\u0435\u0440\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0435\u0441\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0433\u0438\u0442\u0445\u0430\u0431 \u0430\u0432\u0442\u043E\u0440\u0430 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0433\u043E\u0434 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u043B\u043E\u0433\u043E\u0442\u0438\u043F \u043A\u0443\u0440\u0441\u0430 \u0441\u043E \u0441\u0441\u044B\u043B\u043A\u043E\u0439 \u043D\u0430 \u043A\u0443\u0440\u0441 +5\n\n2)\u041F\u0440\u0438 \u043A\u043B\u0438\u043A\u0430\u0445 \u043F\u043E \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u043C \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u043C \u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 +10\n\n3) \u041F\u0440\u0438 \u043A\u043B\u0438\u043A\u0430\u0445 \u043F\u043E \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u043C \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430\u043C \u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0437\u0432\u0443\u043A +10\n\n4) \u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0432 \u0434\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0432\u044B\u0434\u0435\u043B\u044F\u0435\u0442\u0441\u044F \u0441\u0442\u0438\u043B\u0435\u043C +10\n\n5) \u041A\u043D\u043E\u043F\u043A\u0430 Play/Pause +20\n  \u0435\u0441\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0430 Play/Pause, \u043F\u0440\u0438 \u043A\u043B\u0438\u043A\u0435 \u043F\u043E \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0438\u043B\u0438 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0432\u0430\u043D\u0438\u0435 \u0437\u0432\u0443\u043A\u0430 +10\n  \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434 \u0438 \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B \u043A\u043D\u043E\u043F\u043A\u0438 Play/Pause \u0438\u0437\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0432 \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u0438 \u043E\u0442 \u0442\u043E\u0433\u043E, \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043B\u0438 \u0432 \u0434\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 \u0437\u0432\u0443\u043A +10\n\n6) \u041E\u0447\u0435\u043D\u044C \u0432\u044B\u0441\u043E\u043A\u043E\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438/\u0438\u043B\u0438 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u043D\u0435 \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u044B\u0439 \u0432 \u0437\u0430\u0434\u0430\u043D\u0438\u0438 \u0444\u0443\u043D\u043A\u0446\u0438\u043E\u043D\u0430\u043B, \u0443\u043B\u0443\u0447\u0448\u0430\u044E\u0449\u0438\u0439 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F +10\n  \u0432\u044B\u0441\u043E\u043A\u043E\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u043F\u0440\u0435\u0434\u043F\u043E\u043B\u0430\u0433\u0430\u0435\u0442 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B\u044C\u043D\u043E\u0435 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0440\u0430\u0432\u043D\u043E\u0435 \u0438\u043B\u0438 \u043E\u0442\u043B\u0438\u0447\u0430\u044E\u0449\u0435\u0435\u0441\u044F \u0432 \u043B\u0443\u0447\u0448\u0443\u044E \u0441\u0442\u043E\u0440\u043E\u043D\u0443 \u043F\u043E \u0441\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u044E \u0441 \u0434\u0435\u043C\u043E\n\n");
