import { createContext, useReducer } from 'react'

export const BlogsContext = createContext()

export const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_BLOGS': 
      return {
        blogs: action.payload
      }
    case 'CREATE_BLOGS':
      return {
        blogs : [action.payload, ...state.blogs]
      }
    case 'DELETE_BLOGS':
      return {
        blogs: state.blogs.filter((P) => P._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const BlogsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(blogsReducer, {
    blogs: []
  })

  return (
    <BlogsContext.Provider value={{...state, dispatch}}>
      { children }
    </BlogsContext.Provider>
  )
}