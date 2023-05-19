import { useState, useRef, useEffect } from 'react'

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [stream, setStream] = useState(null)
  const [mediaRecorder, setMediaRecorder] = useState(null)
  const [blob, setBlob] = useState(null)
  const ref = useRef()

  const handleDataAvaileble = (e) => {
    if (e.data && e.data.size > 0) {
      // Hacer algo con los datos grabados, como almacenarlos en un arreglo
      setBlob((blob) => [...blob, e.data])
    }
  }

  const startRecording = async () => {
    try {
      const streamRecord = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      setStream(streamRecord)

      const media = new MediaRecorder(streamRecord)

      media.addEventListener('dataavailable', handleDataAvaileble)

      media.start()

      setMediaRecorder(media)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    console.log(stream)
  }, [stream])

  const stopRecording = () => {
    // Detener el objeto MediaRecorder
    setMediaRecorder(mediaRecorder.stop())

    // Parar el stream de video y audio
    setStream((stream) => stream.stop())
    //   this.state.stream.getTracks().forEach((track) => track.stop())

    // Limpiar el estado y reiniciar los valores
    // this.setState({ mediaRecorder: null, stream: null, isRecording: false })
    setStream(null)
    setMediaRecorder(null)
    setIsRecording(false)

    // Hacer algo con los datos grabados, como guardarlos o mostrarlos en el elemento de video
    const recordedBlob = new Blob(blob, {
      type: 'video/webm'
    })
    const recordedUrl = URL.createObjectURL(recordedBlob)
    // Mostrar la grabación en el elemento de video
    ref.current = recordedUrl
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
            style={{ width: '300px', height: '300px', background: '#eee' }}
          />
          <button onClick={startRecording}>Iniciar grabación</button>
          <button onClick={stopRecording}>Detener grabación</button>
        </div>
      </div>
    </>
  )
}
