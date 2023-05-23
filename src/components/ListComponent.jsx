import { Link } from 'react-router-dom'
import styles from './ListComponent.module.css'
import Button from '../components/Buttons/ButtonPlayPauseReset'

function ListComponent({ data }) {
  return (
    <div className={styles.container}>
      <video
        autoPlay
        loop
        muted
        src={data[1].video}
        className={styles.video}
      ></video>
      <Link to={`/recorder/${data[0]}`} className={styles.buttonRecorder}>
        <Button />
      </Link>
      <figcaption className={styles.pregunta}>{data[1].pregunta}</figcaption>
    </div>
  )
}

export default ListComponent
