import { onMounted } from "vue"
import { useField } from "./useField"
import { useState } from "./useState"

export function useGame() {

  const { fieldRows } = useField()
  const { state } = useState()

  return { fieldRows }

}