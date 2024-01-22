document.addEventListener('DOMContentLoaded', function () {
    
    let browserEngine = chrome;
    if (typeof chrome === 'undefined') {
        browserEngine = browser;
    }

    const applySpeedButton = document.getElementById('eff-save-btn');
    const speedInput = document.getElementById('eff-playback-speed');

    browserEngine.storage.sync.get([ 'speed' ], function (result) {
        console.log(result);
        speedInput.value = result.speed || '1.5';
    });

    // if (typeof chrome !== 'undefined') {
    //     chrome.storage.sync.get([ 'speed' ], function (result) {
    //         speedInput.value = result.speed || '1.5';
    //     });
    // } else if (typeof browser !== 'undefined') {
    //     browser.storage.sync.get([ 'speed' ], function (result) {
    //         speedInput.value = result.speed || '1.5';
    //     });
    // }

    applySpeedButton.addEventListener('click', function () {
        const speed = speedInput.value;

        browserEngine.storage.sync.set({ speed: speed }, function () {
            console.log('Speed is set to ' + speed);
        });

        browserEngine.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[ 0 ];
            chrome.tabs.sendMessage(activeTab.id, { speed: speed });
        });

        // if (typeof chrome !== 'undefined') {
        //     chrome.storage.sync.set({ speed: speed }, function () {
        //         console.log('Speed is set to ' + speed);
        //     });

        //     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //         const activeTab = tabs[ 0 ];
        //         chrome.tabs.sendMessage(activeTab.id, { speed: speed });
        //     });
        // } else if (typeof browser !== 'undefined') {
        //     browser.storage.sync.set({ speed: speed }, function () {
        //         console.log('Speed is set to ' + speed);
        //     });

        //     browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //         const activeTab = tabs[ 0 ];
        //         browser.tabs.sendMessage(activeTab.id, { speed: speed });
        //     });
        // }
    });
});
