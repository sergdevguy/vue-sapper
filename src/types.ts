export type State = {
  status: Status
  bonus: Bonus
  lifes: number
  gold: number
  level: number
  bombs: number
  field: FieldSize
}

export type Status = 'idle' | 'loose' | 'win' | 'gameover'

type Bonus = 'bombsInc' | 'fieldDec' | 'gold' | 'notChangeDifficulty' | ''

export type FieldSize = { rows: number, cols: number }

export type CellData = {
  id: number
  isOpened: boolean
  isBomb: boolean
  count: number
  isHighlight: boolean
}