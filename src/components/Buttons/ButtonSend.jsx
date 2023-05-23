function ButtonSend({ onclick, disabled }) {
  return (
    <button onClick={onclick} disabled={disabled}>
      Enviar
      {`${disabled}`}
    </button>
  )
}

export default ButtonSend
