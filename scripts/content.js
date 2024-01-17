let speed = '1.5';

function increasePlayBackSpeed(speed) {
    var videos = document.getElementsByTagName('video');
    for (var i = 0; i < videos.length; i++) {
        videos[i].playbackRate = parseFloat(speed);
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}

if (typeof chrome !== 'undefined') {
    chrome.storage.sync.get(['speed'], function (result) {
        speed = result.speed || '1.5';
    });

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.speed) {
            speed = request.speed
            increasePlayBackSpeed(request.speed);
        }
    });

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.speed) {
                speed = request.speed
                increasePlayBackSpeed(request.speed);
            }
        }
    );

    chrome.storage.sync.get(['speed'], function (result) {
        const speed = result.speed || '1.5';
        increasePlayBackSpeed(speed);
    });
} else if (typeof browser !== 'undefined') {
    browser.storage.sync.get(['speed'], function (result) {
        speed = result.speed || '1.5';
    });

    browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.speed) {
            speed = request.speed;
            increasePlayBackSpeed(speed);
        }
    });

    browser.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.speed) {
                speed = request.speed
                increasePlayBackSpeed(speed);
            }
        }
    );

    browser.storage.sync.get(['speed']).then(function (result) {
        speed = result.speed || '1.5';
        increasePlayBackSpeed(speed);
    });
}

window.addEventListener('load', function () {
    increasePlayBackSpeed(speed);
});

window.addEventListener('scroll', debounce(function () {
    increasePlayBackSpeed(speed);
}, 800));

// firefox scroll event
document.addEventListener('scroll', debounce(function () {
    increasePlayBackSpeed(speed);
}, 800));

