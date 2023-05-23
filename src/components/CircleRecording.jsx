import styles from './circleRecording.module.css'

function CircleRecording({ bool = false }) {
  return <div className={`${styles.circle} ${bool && styles.animate}`}></div>
}

export default CircleRecording
