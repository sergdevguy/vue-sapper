export type State = {
  lifes: number
  gold: number
  level: number
  bombs: number
  fieldSize: FieldSize
}

export type Status = 'idle' | 'loose' | 'win' | 'gameoverLoose' | 'gameoverWin'

export type FieldSize = { rows: number, cols: number }

export type CellData = {
  id: number
  isOpened: boolean
  isBomb: boolean
  count: number
  isHighlight: boolean
}