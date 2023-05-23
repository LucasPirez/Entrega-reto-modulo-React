import styles from './ButtonSend.module.css'

function ButtonSend({ onclick, disabled }) {
  return (
    <button onClick={onclick} disabled={disabled} className={styles.button}>
      ENVIAR
    </button>
  )
}

export default ButtonSend
