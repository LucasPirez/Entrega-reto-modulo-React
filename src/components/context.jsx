import { createContext, useEffect, useContext, useRef, useState } from 'react'

export const AppContext = createContext()

export default function AppContextProvider({ children }) {
  const [videosState, setVideosState] = useState(null)
  const [lengthState, setLengthState] = useState(null)
  const countVideosRecorded = useRef(0)

  const handleSetLength = (length) => {
    setLengthState(length)
  }

  // useEffect(() => {
  //   console.log(videosState)
  // }, [videosState])

  const da = {
    videosState,
    setVideosState,
    handleSetLength,
    lengthState,
    countVideosRecorded
  }

  return <AppContext.Provider value={da}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }

  return context
}
