import { createContext, useContext, useState } from 'react'

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
  const [videosState, setVideosState] = useState(null)

  const data = {
    videosState,
    setVideosState
  }

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }

  return context
}
