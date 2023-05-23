import { Link } from 'react-router-dom'

function ButtonReturn() {
  return (
    <Link
      to={'/'}
      style={{
        textDecoration: 'none',
        fontSize: '1.2rem',
        margin: '0.8rem'
      }}
    >
      Volver
    </Link>
  )
}

export default ButtonReturn
