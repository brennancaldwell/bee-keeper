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

export {
  BoardProps,
  GameData
}