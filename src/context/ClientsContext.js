import { createContext, useReducer } from 'react'

export const ClientsContext = createContext()

export const clientsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CLIENTS': 
      return {
        clients: action.payload
      }
    case 'CREATE_CLIENTS':
      return {
        clients : [action.payload, ...state.clients]
      }
    case 'DELETE_CLIENTS':
      return {
        clients: state.clients.filter((P) => P._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ClientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(clientsReducer, {
    clients: []
  })

  return (
    <ClientsContext.Provider value={{...state, dispatch}}>
      { children }
    </ClientsContext.Provider>
  )
}