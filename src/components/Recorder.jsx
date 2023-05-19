import { useState, useRef, useEffect } from 'react'

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [stream, setStream] = useState(null)
  const mediaRecorder = useRef()
  const [blob, setBlob] = useState(null)
  const ref = useRef()

  const handleDataAvaileble = (e) => {
    if (e.data && e.data.size > 0) {
      // Hacer algo con los datos grabados, como almacenarlos en un arreglo
      console.log('handleDataValaible', e.data)

      const recordedBlob = new Blob([e.data], {
        type: 'video/webm'
      })
      // Mostrar la grabación en el elemento de video
      const recordedUrl = window.URL.createObjectURL(recordedBlob)
      // Mostrar la grabación en el elemento de video
      ref.current.src = null
      ref.current.srcObject = null
      ref.current.src = recordedUrl
      ref.current.controls = true
      ref.current.play()
    }
  }

  const startRecording = async () => {
    ref.current.src = null
    ref.current.srcObject = null
    try {
      const streamRecord = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      setStream(streamRecord)
      ref.current.srcObject = streamRecord
      const media = new MediaRecorder(streamRecord)
      console.log(media)
      media.addEventListener('dataavailable', handleDataAvaileble)

      media.start()
      mediaRecorder.current = media
      console.log(mediaRecorder.current)
    } catch (error) {
      console.log(error)
    }
  }

  const stopRecording = () => {
    // Detener el objeto MediaRecorder
    mediaRecorder.current.stop()
    console.log(mediaRecorder.current)

    // Parar el stream de video y audio
    stream.getTracks().forEach((str) => str.stop())
    //   this.state.stream.getTracks().forEach((track) => track.stop())

    // Limpiar el estado y reiniciar los valores
    // this.setState({ mediaRecorder: null, stream: null, isRecording: false })

    setStream(null)
    mediaRecorder.current = null
    setIsRecording(false)

    // Hacer algo con los datos grabados, como guardarlos o mostrarlos en el elemento de video
  }
  return (
    <>
      <div>
        <div>
          <video
            ref={ref}
            autoPlay
            playsInline
            muted
            style={{ width: '300px', aspectRatio: '12/9', background: '#eee' }}
          />
          <button onClick={startRecording}>Iniciar grabación</button>
          <button onClick={stopRecording}>Detener grabación</button>
        </div>
      </div>
    </>
  )
}
