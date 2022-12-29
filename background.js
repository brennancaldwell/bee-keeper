const url = 'https://www.nytimes.com/puzzles/spelling-bee'

chrome.action.onClicked.addListener(async (tab) => {

  if (tab.url.startsWith(url)) {
    await chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['injectdiv.js','bk-app/dist/assets/index.js']
    });

    await chrome.scripting.insertCSS({
      target: {tabId: tab.id},
      files: ['bk-app/dist/assets/index.css']
    })

  }
});