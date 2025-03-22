chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason !== "install" && details.reason !== "update") return;
    chrome.tabs.query({ url: ["https://www.linkedin.com/*" ,"https://www.indeed.com/jobs*",
        "https://*.joinhandshake.com/*"]}, (tabs) => {
        for (let tab of tabs) {
            chrome.tabs.reload(tab.id);
        }
    });

   
});