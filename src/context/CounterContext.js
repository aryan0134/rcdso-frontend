import { createContext, useReducer } from 'react'

export const CounterContext = createContext()

export const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT': 
      return {
        counter:  1
      }
    case 'DECREMENT': 
      return {
        counter:  0
      }
    default:
      return state
  }
}

export const CounterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(counterReducer, {
    counter: 0
  })

  return (
    <CounterContext.Provider value={{...state, dispatch}}>
      { children }
    </CounterContext.Provider>
  )
}