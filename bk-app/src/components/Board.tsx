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

  const remaining = useMemo(() => all.filter(word => !found?.includes(word)), [all, found])

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

    const nums = Array.from(new Set(all.map(word => word.length))).sort();
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

    const lastLine = ['Σ', ...nums.map(num => words.filter(word => word.length === num).length), words.length];
    result.push(lastLine)
    return result;

  }, [gridView, all, allLetters, remaining])



  useEffect(() => {

    function fetchFoundAndRank() {
      if (window && typeof window !== 'undefined') {
        let wordList: HTMLCollection= document.getElementsByClassName('sb-recent-words')[0]?.children;
        let currentRank: string = document.getElementsByClassName('sb-progress-rank')[0]?.textContent?.toLowerCase() || '';

        const foundWords: string[] = wordList ? Array.from(wordList).map(li => li.textContent?.toLowerCase() || '').filter(x => x !== '') : [];

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
    <div className="bg-white overflow-scroll border border-nyt-grey rounded">
        <h1 className="">Bee Keeper</h1>
        <select value={gridView} onChange={(e) => setGridView(e.target.value)} name="keeper-grid-view" id="keeper-grid-view">
          <option value="all">All</option>
          <option value="remaining">Remaining</option>
          <option value="found">Found</option>
        </select>
        <div className="m-4">
          <table id="bee-keeper-table" className="mx-auto border-separate border-spacing-0 rounded w-full max-w-md border border-nyt-grey">
            {
              grid.map((row, rowIdx) =>
                <tr className="">
                  {row.map((el, elIdx) =>
                    rowIdx === 0
                    ? <th className="px-2 py-1 ">{el}</th>
                    : <td className={`px-2 py-1  ${(rowIdx === grid.length - 1
                                    || elIdx === row.length - 1)
                                    ? 'font-bold'
                                    : ''}`}>{el}</td>
                  )}
                </tr>
              )
            }
          </table>
        </div>
    </div>
  )
}

export default Board;