import styles from './ButtonPlayPauseReset.module.css'
import img from './icons8-replay-30.png'

export default function ButtonPlayPause({
  onClickPlay,
  onClickStop,
  isRecording = false,
  isFinish = false,
  disabled = true
}) {
  return (
    <>
      {isRecording && !isFinish ? (
        <button
          onClick={onClickStop}
          className={`${styles.button} ${styles.stop}`}
        ></button>
      ) : isFinish ? (
        <button onClick={onClickPlay} className={`${styles.button}`}>
          <img src={img} alt="" />
        </button>
      ) : (
        <button
          onClick={onClickPlay}
          className={`${styles.button} ${styles.play}`}
          disabled={!disabled}
        ></button>
      )}
    </>
  )
}
