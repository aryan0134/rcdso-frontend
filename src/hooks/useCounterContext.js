import { CounterContext } from "../context/CounterContext"
import { useContext } from "react"

export const useCounterContext = () => {
  const context = useContext(CounterContext)

  if(!context) {
    throw Error('useCounterContext must be used inside an CounterContextProvider')
  }

  return context
}