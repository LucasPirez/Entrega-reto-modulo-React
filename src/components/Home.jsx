import ListComponent from './ListComponent'
import { useAppContext } from './context'
import styles from './Home.module.css'
import ButtonSend from './Buttons/ButtonSend'

function Home() {
  const { videosState } = useAppContext()

  const handleSend = () => {
    console.log(videosState)
    alert(JSON.stringify(videosState, null, 2))
  }

  const disabled =
    videosState && Object.values(videosState).some((u) => u['video'] === null)

  console.log(disabled)
  return (
    <>
      <main>
        <h1 className={styles.title}>Video Cuestionario</h1>
        <div className={styles.container}>
          <section className={styles.section}>
            {videosState &&
              Object.entries(videosState).map((video) => (
                <ListComponent key={Math.random()} data={video} />
              ))}
          </section>
          {videosState && (
            <div className={styles.button}>
              <ButtonSend onclick={handleSend} disabled={disabled} />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
export default Home
