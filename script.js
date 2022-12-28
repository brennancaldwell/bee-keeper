const root = document.getElementById("root");

document.addEventListener("DOMContentLoaded", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: main,
  });
});

/* Collate Game Data */
function collateAndSync() {
  const gameData = window.gameData, foundWords = [];

  document.getElementsByClassName('sb-recent-words')[0].children.forEach(li => foundWords.push(li.innerText));

  const data = { gameData, foundWords };

  chrome.storage.sync.set({data});
}

/* Main function */
function main() {
  collateAndSync();

  document.getElementsByClassName('hive-action__submit')[0].addEventListener('click', collateAndSync)

  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' ) {
      collateAndSync()
    }
  })
}

chrome.storage.sync.get(["data"]).then(({ gameData, foundWords}) => {
  root.innerHTML = `You have ${data.gameData.today.answers.length - data.foundWords.length} words left.`
  console.log(data)
})