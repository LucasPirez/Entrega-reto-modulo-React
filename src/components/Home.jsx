import ListComponent from './ListComponent'
import { useAppContext } from './context'
import styles from './Home.module.css'
import ButtonSend from './Buttons/ButtonSend'

function Home() {
  const { videosState, lengthState, countVideosRecorded } = useAppContext()

  const handleSend = () => {
    console.log(videosState)
  }

  return (
    <>
      <main>
        <h1>Video Cuestionario</h1>
        <section className={styles.section}>
          {videosState &&
            Object.entries(videosState).map((video) => (
              <ListComponent key={Math.random()} data={video} />
            ))}
        </section>

        <ButtonSend
          onclick={handleSend}
          disabled={lengthState !== countVideosRecorded.current}
        />
      </main>
    </>
  )
}
export default Home
