window.s = true;

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("toggleBtn");
    const saveShortCuts = document.getElementById("saveShortCuts");
    const statusDiv = document.getElementById("status");
    const refreshMessage = document.getElementById("refreshMessage");

    chrome.storage.local.get(["isFirstTime"], function (res) {
        if (res.isFirstTime === "true") {
            refreshMessage.style.display = "block";
            chrome.storage.local.set({ isFirstTime: "false" }, function () {
            });
        }
    });

    chrome.storage.local.get(["extensionEnabled", "shortcutPreferences"], function (result) {
        
        if (result.extensionEnabled === false) {
            toggleBtn.textContent = "Enable Shortcuts";
            statusDiv.textContent = "Shortcuts are currently disabled.";
            window.s = false;
        } else {
            toggleBtn.textContent = "Disable Shortcuts";
            statusDiv.textContent = "Shortcuts are currently enabled.";
            window.s = true;
        }

        if (result.shortcutPreferences) {
            document.getElementById("pJob").value = result.shortcutPreferences.pJob || "";
            document.getElementById("nJob").value = result.shortcutPreferences.nJob || "";
            document.getElementById("pPage").value = result.shortcutPreferences.pPage || "";
            document.getElementById("nPage").value = result.shortcutPreferences.nPage || "";
            document.getElementById("dJob").value = result.shortcutPreferences.dJob || "";
            document.getElementById("sJob").value = result.shortcutPreferences.sJob || "";
            document.getElementById("aJob").value = result.shortcutPreferences.aJob || "";



        }
    });

    saveShortCuts.addEventListener("click", function () {
        const newShortcuts = {
            pJob: document.getElementById("pJob").value.trim(),
            nJob: document.getElementById("nJob").value.trim(),
            pPage: document.getElementById("pPage").value.trim(),
            nPage: document.getElementById("nPage").value.trim(),
            dJob: document.getElementById("dJob").value.trim(), 
            sJob: document.getElementById("sJob").value.trim(),
            aJob: document.getElementById("aJob").value.trim()
        };


        chrome.storage.local.set({ shortcutPreferences: newShortcuts }, function () {
            if (chrome.runtime.lastError) {
            } else {
                statusDiv.textContent = "Shortcuts saved successfully!";
            }
        });
    });

    toggleBtn.addEventListener("click", function () {
        chrome.storage.local.get(["extensionEnabled"], function (result) {
            const isEnabled = result.extensionEnabled !== false;
            const newState = !isEnabled;

            chrome.storage.local.set({ extensionEnabled: newState }, function () {
                if (chrome.runtime.lastError) {
                    return;
                }

                if (newState) {
                    toggleBtn.textContent = "Disable Shortcuts";
                    statusDiv.textContent = "Shortcuts are now enabled.";
                    window.s = true;
                } else {
                    toggleBtn.textContent = "Enable Shortcuts";
                    statusDiv.textContent = "Shortcuts are now disabled.";
                    window.s = false;
                }
            });
        });
    });
});
