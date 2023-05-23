import ButtonAtras from './Buttons/ButtonAtras'
import ButtonNext from './Buttons/ButtonNext'
import ButtonReturn from './Buttons/ButtonReturn'
import Recorder from './Recorder'

function RecorderContainer() {
  return (
    <>
      <ButtonReturn />
      <Recorder />
      <ButtonAtras />
      <ButtonNext />
    </>
  )
}

export default RecorderContainer
