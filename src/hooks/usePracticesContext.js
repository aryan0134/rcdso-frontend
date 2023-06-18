import { PracticesContext } from '../context/PracticesContext'
import { useContext } from 'react'

export const usePracticesContext = () => {
  const context = useContext(PracticesContext)

  if (!context) {
    throw Error('usePracticesContext must be used inside an PracticesContextProvider')
  }

  return context
}