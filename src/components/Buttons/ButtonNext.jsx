import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../context'

function ButtonNext() {
  const { id } = useParams()
  const { videosState } = useAppContext()

  return <Link to={'/'}>{'siguiente'}</Link>
}

export default ButtonNext
