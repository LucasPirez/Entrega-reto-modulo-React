import { useEffect } from 'react'
import { sendInfo } from '../simulateServer'
import Home from '../components/Home'
import { useAppContext } from '../components/context'

export default function Root() {
  const { setVideosState, videosState } = useAppContext()

  useEffect(() => {
    async function fetch() {
      try {
        const response = await sendInfo()
        const dicVideos = {}
        response.forEach((u, i) => {
          dicVideos[i + 1] = {
            pregunta: u.pregunta,
            video: null,
            id: i + 1
          }
        })
        setVideosState(dicVideos)
      } catch (error) {
        throw new Error(error)
      }
    }

    if (!videosState) fetch()
  }, [])

  return (
    <>
      <Home />
    </>
  )
}
