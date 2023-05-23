import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context'

function ButtonAtras() {
  const { id } = useParams()
  const { videosState } = useAppContext()

  const arrFilter = Object.values(videosState).filter(
    (u) => +u['id'] !== +id && u['video'] === null
  )

  const arrFind = arrFilter.findLast((u) => +u['id'] < +id)

  const link = !arrFilter.length
    ? '/'
    : arrFind !== undefined
    ? `/recorder/${arrFind['id']}`
    : `/recorder/${arrFilter[arrFilter.length - 1]['id']}`

  return (
    <Link to={link} style={{ textDecoration: 'none', fontSize: '1.2rem' }}>
      Atras
    </Link>
  )
}

export default ButtonAtras
