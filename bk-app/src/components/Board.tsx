import React, { SetStateAction, useState, useMemo, useEffect } from 'react'
import { BoardProps, GameData } from '../types';

let docScripts: HTMLCollectionOf<HTMLElement> = document.getElementsByTagName('script');
let scriptsArray: HTMLElement[] = Array.from(docScripts);
let beeData: GameData = scriptsArray.filter(el => el.innerHTML.includes('window.gameData')).map(tag => JSON.parse(tag.innerHTML.slice(18)))[0];

function Board({ close }: BoardProps) {
  const [ loading, setLoading ] = useState<boolean>(false);

  const [ all, setAll ] = useState<string[]>(beeData?.today?.answers || ['big', 'bog', 'blog', 'lobg', 'bilogol']);
  const [ found, setFound ] = useState<string[]>([]);
  const [ currentRank, setCurrentRank ] = useState<string>('');
  const allLetters = beeData?.today.validLetters || ['b', 'i', 'l', 'o', 'g']
  const [ gridView, setGridView ] = useState<string>('all');

  const remaining = useMemo(() => all.filter(word => !found.includes(word)), [all, found])

  const grid = useMemo(() => {
    let words: string[];
    switch (gridView) {
      case 'remaining':
        words = remaining;
        break;
      case 'found':
        words = found;
        break;
      default:
        words = all;
        break;
    }

    const nums = Array.from(new Set(all.map(word => word.length))).sort((a, b) => a - b);
    const firstLine = [' ', ...nums, 'Σ'];
    const letters = allLetters.sort();
    const result = [firstLine];

    for (const letter of letters) {
      const row: (string | number)[] = [`${letter.toUpperCase()}:`];
      const letterWords = words.filter(w => w[0] === letter);
      for (let i = 1; i < firstLine.length - 1; i++) {
        const temp = letterWords.filter(w => w.length === firstLine[i]);
        temp.length ? row.push(temp.length) : row.push('-')
      }
      row.push(letterWords.length)
      result.push(row)
    }

    const lastLine = ['Σ:', ...nums.map(num => words.filter(word => word.length === num).length), words.length];
    result.push(lastLine)
    return result;

  }, [gridView, all, allLetters, remaining])



  useEffect(() => {

    function fetchFoundAndRank() {
      if (window && typeof window !== 'undefined') {
        let wordList: HTMLCollection= document.getElementsByClassName('sb-recent-words')[0]?.children;
        let currentRank: string = document.getElementsByClassName('sb-progress-rank')[0]?.textContent?.toLowerCase() || '';

        const foundWords: string[] = wordList ? Array.from(wordList).map(li => li.className !== 'sb-placeholder-text' && li.textContent?.toLowerCase() || '').filter(x => x !== '') : [];

        setFound(foundWords)
        setCurrentRank(currentRank)
      }
    }

    fetchFoundAndRank();

    function play(e: KeyboardEvent | Event) {
      if (e instanceof KeyboardEvent && e.key !== 'Enter') return;
      setLoading(true)
      setTimeout(() => {
        fetchFoundAndRank()
        setLoading(false)
      }, 100)
    }

    const enterButton = document.getElementsByClassName("hive-action hive-action__submit sb-touch-button")[0];

    enterButton && enterButton.addEventListener('click', play)

    document.body.addEventListener('keydown', play)

    return () => {
      enterButton && enterButton.removeEventListener('click', play);
      document.body.removeEventListener('keydown', play);
    }
  }, [])

  return (
    <div>
      <img src="data:image/svg+xml,%3C%3Fxml version='1.0' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 20010904//EN' 'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3E%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='512.000000pt' height='512.000000pt' viewBox='0 0 512.000000 512.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cg transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'%0Afill='%23000000' stroke='none'%3E%3Cpath d='M161 5103 c-88 -31 -161 -136 -161 -233 0 -20 7 -59 16 -86 15 -45%0A106 -139 1103 -1137 l1086 -1087 -1082 -1083 c-594 -595 -1089 -1097 -1098%0A-1116 -45 -90 -24 -213 50 -286 69 -70 163 -91 261 -59 45 15 139 106 1136%0A1103 l1088 1086 1088 -1086 c997 -997 1091 -1088 1136 -1103 98 -32 192 -11%0A261 59 70 69 91 163 59 261 -15 45 -106 139 -1103 1137 l-1086 1087 1086 1088%0Ac997 997 1088 1091 1103 1136 32 98 11 192 -59 261 -69 70 -163 91 -261 59%0A-45 -15 -139 -106 -1137 -1103 l-1087 -1086 -1088 1086 c-997 997 -1091 1088%0A-1136 1103 -61 20 -117 19 -175 -1z'/%3E%3C/g%3E%3C/svg%3E%0A" alt="Close Bee Keeper" onClick={close} className="cursor-pointer absolute top-4 right-5 w-3"></img>
        <h1 id="keeper-headline" className="font-bold">Bee Keeper</h1>
        <select value={gridView} onChange={(e) => setGridView(e.target.value)} name="keeper-grid-view" id="keeper-grid-view">
          <option value="all">All</option>
          <option value="remaining">Remaining</option>
          <option value="found">Found</option>
        </select>
        <div className="m-4">
          <table id="bee-keeper-table" className="mx-auto w-full max-w-md">
            {
              grid.map((row, rowIdx) =>
                <tr className="">
                  {row.map((el, elIdx) =>
                    rowIdx === 0
                    ? <th className={`px-2 py-1`}>{el}</th>
                    : <td className={`px-2 py-1  ${(rowIdx === grid.length - 1
                                    || elIdx === row.length - 1
                                    || elIdx === 0)
                                    ? 'font-bold'
                                    : ''}`}>{el}</td>
                  )}
                </tr>
              )
            }
          </table>
        </div>
        <p className="text-xs"><a target="_blank" className="underline" href="https://icons8.com/icon/ocTQkWmUEZQW/beehive">Beehive</a> icon by <a target="_blank" className="underline" href="https://icons8.com">Icons8</a></p>
    </div>
  )
}



export default Board;