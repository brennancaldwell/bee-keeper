chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['injectdiv.js','bk-app/dist/assets/index.js']
  });

  chrome.scripting.insertCSS({
    target: {tabId: tab.id},
    files: ['bk-app/dist/assets/index.css']
  })
});