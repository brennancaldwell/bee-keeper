document.addEventListener("DOMContentLoaded", async () => {
  const root = document.getElementById("root");

  await chrome.storage.sync.get(["data"]).then((result) => {
    console.log(result)
    root.innerHTML = `You have ${gameData.today.answers.length - foundWords.length} words left.`
  })

 })