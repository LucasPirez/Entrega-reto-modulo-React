import { Link, useParams } from 'react-router-dom'

function ButtonAtras() {
  const { id } = useParams()

  const link = +id > 1 ? `/recorder/${+id - 1}` : '/'
  return <Link to={link}>Atras</Link>
}

export default ButtonAtras
