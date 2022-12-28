let docScripts = document.getElementsByTagName('script');
let scriptsArray = Array.from(docScripts);
let beeData;
for (let i = 0; i < scriptsArray.length; i++) {
  if (scriptsArray[i].innerHTML.includes('window.gameData')) {
    beeData = JSON.parse(scriptsArray[i].innerHTML.slice(18))
  }
}

const Game = {
  allWords: beeData.today.answers,
  centerLetter: beeData.today.centerLetter,
  outerLetters: beeData.today.outerLetters,
  validLetters: beeData.today.validLetters,
  foundWords: [],
  remainingWords: [],
  pangrams: beeData.today.pangrams,
}

/* Collate Game Data */
function collate() {
  const foundWords = [];

  let wordList = document.getElementsByClassName('sb-recent-words')[0].children

  Array.from(wordList).forEach(li => foundWords.push(li.innerText.toLowerCase()));

  Game.foundWords = foundWords;
  Game.remainingWords = Game.allWords.filter(word => !foundWords.includes(word));
}

let enterButton = document.getElementsByClassName("hive-action hive-action__submit sb-touch-button")[0];

enterButton.addEventListener('click', () => setTimeout(collate, 100))

document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' ) {
    setTimeout(collate, 100)
  }
})

collate()
