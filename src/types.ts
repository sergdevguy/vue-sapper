export type State = {
  status: Status
  bonus: Bonus
  lifes: number
  gold: number
  level: number
  bombs: number
  field: { rows: number, cols: number }
}

type Status = 'loose' | 'win' | 'gameover' | ''

type Bonus = 'bombsInc' | 'fieldDec' | 'gold' | 'notChangeDifficulty' | ''

export type CellData = {
  id: number
  isOpened: boolean
  isBomb: boolean
  count: number
  isHighlight: boolean
}