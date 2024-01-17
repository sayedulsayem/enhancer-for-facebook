document.addEventListener('DOMContentLoaded', function () {
    const applySpeedButton = document.getElementById('eff-save-btn');
    const speedInput = document.getElementById('eff-playback-speed');

    // Retrieve the stored speed when the popup is opened
    chrome.storage.sync.get(['speed'], function (result) {
        console.log(result);
        speedInput.value = result.speed || '1.5';
    });

    applySpeedButton.addEventListener('click', function () {
        const speed = speedInput.value;

        // Store the speed in Chrome storage
        chrome.storage.sync.set({ speed: speed }, function () {
            console.log('Speed is set to ' + speed);
        });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const activeTab = tabs[0];

            // Send a message to content script with the speed
            chrome.tabs.sendMessage(activeTab.id, { speed: speed });
        });
    });
});
