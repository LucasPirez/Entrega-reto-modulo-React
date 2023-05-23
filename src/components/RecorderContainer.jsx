import ButtonAtras from './Buttons/ButtonAtras'
import ButtonNext from './Buttons/ButtonNext'
import ButtonReturn from './Buttons/ButtonReturn'
import Recorder from './Recorder'
import styles from './RecorderContainer.module.css'

function RecorderContainer() {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.containerAtras}>
          <ButtonReturn />
        </div>
        <Recorder />
        <div className={styles.containerSigNext}>
          <ButtonAtras />
          <ButtonNext />
        </div>
      </div>
    </div>
  )
}

export default RecorderContainer
