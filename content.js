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
  currentRank: ''
}

const helper = document.createElement('div');
const heading = document.createElement('h1');
heading.innerHTML = 'Bee Keeper 🐝'
css(heading, {
  'text-align': 'center',
  'font-size': '1em'
})
css(helper, {
  'z-index': 20000,
  'background-color': 'white',
  border: '2px solid black',
  'border-radius': '10%',
  position: 'fixed',
  bottom: '1em',
  left: '1em',
  width: '140px',
  height: '140px',
  padding: '.5em',
  opacity: '0.9'
})
helper.appendChild(heading)
document.body.appendChild(helper)

/* Collate Game Data */
function collate() {
  const foundWords = [];

  let wordList = document.getElementsByClassName('sb-recent-words')[0].children;
  let currentRank = document.getElementsByClassName('sb-progress-rank')[0].innerText;

  Array.from(wordList).forEach(li => foundWords.push(li.innerText.toLowerCase()));

  Game.foundWords = foundWords;
  Game.remainingWords = Game.allWords.filter(word => !foundWords.includes(word));
  Game.currentRank = currentRank.toLowerCase();

}

let enterButton = document.getElementsByClassName("hive-action hive-action__submit sb-touch-button")[0];

enterButton.addEventListener('click', () => setTimeout(collate, 100))

document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' ) {
    setTimeout(collate, 100)
  }
})

collate()

function css(element, style) {
  for (const prop in style) {
    element.style[prop] = style[prop]
  }
}
