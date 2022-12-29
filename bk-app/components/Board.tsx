import React, { SetStateAction, useState, useMemo, useEffect } from 'react'

type BoardProps = {
  close: any
}

type GameData = {
  today: {
    answers: string[],
    centerLetter: string,
    displayDate: string,
    displayWeekday: string,
    editor: string,
    expiration: number,
    freeExpiration: number,
    id: number,
    outerLetters: string[],
    pangrams: string[],
    printDate: string,
    validLetters: string[]
  },
  yesterday: {
    answers: string[],
    centerLetter: string,
    displayWeekday: string,
    editor: string,
    freeExpiration: number,
    id: number,
    outerLetters: string[],
    pangrams: string[],
    printDate: string,
    validLetters: string[]
  }
}

let docScripts: HTMLCollectionOf<HTMLElement> = document.getElementsByTagName('script');
let scriptsArray: HTMLElement[] = Array.from(docScripts);
let beeData: GameData = scriptsArray.filter(el => el.innerHTML.includes('window.gameData')).map(tag => JSON.parse(tag.innerHTML.slice(18)))[0];

function Board({ close }: BoardProps) {
  const [ loading, setLoading ] = useState<boolean>(false);

  const [ all, setAll ] = useState<string[]>(beeData.today.answers);
  const [ answered, setAnswered ] = useState<string[]>([]);
  const [ currentRank, setCurrentRank ] = useState<string>('');

  const remaining = useMemo(() => all.filter(word => !answered?.includes(word)), [all, answered])


  useEffect(() => {

    function fetchAnsweredAndRank() {
      if (window && typeof window !== 'undefined') {
        let wordList: HTMLCollection= document.getElementsByClassName('sb-recent-words')[0].children;
        let currentRank: string = document.getElementsByClassName('sb-progress-rank')[0].textContent?.toLowerCase() || '';

        const answeredWords: string[] = Array.from(wordList).map(li => li.textContent?.toLowerCase() || '').filter(x => x !== '');

        setAnswered(answeredWords)
        setCurrentRank(currentRank)
      }
    }

    fetchAnsweredAndRank();

    function play(e: KeyboardEvent | Event) {
      if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
      setLoading(true)
      setTimeout(() => {
        fetchAnsweredAndRank()
        setLoading(false)
      }, 100)
    }

    const enterButton = document.getElementsByClassName("hive-action hive-action__submit sb-touch-button")[0];

    enterButton.addEventListener('click', play)

    document.body.addEventListener('keydown', play)

    return () => {
      enterButton.removeEventListener('click', play);
      document.body.removeEventListener('keydown', play);
    }
  })

  return (
    <div onClick={close}>
        You have {all.length - answered.length} words left to find.
    </div>
  )
}

export default Board;