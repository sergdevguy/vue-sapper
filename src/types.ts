export type State = {
  status: Status
  lifes: number
  gold: number
  level: number
  bombs: number
  fieldSize: FieldSize
}

export type Status = 'idle' | 'loose' | 'win' | 'gameover'

export type FieldSize = { rows: number, cols: number }

export type CellData = {
  id: number
  isOpened: boolean
  isBomb: boolean
  count: number
  isHighlight: boolean
}