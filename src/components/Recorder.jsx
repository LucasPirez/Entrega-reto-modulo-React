import { useState, useRef, useEffect } from 'react'

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false)
  const stream = useRef(null)
  const mediaRecorder = useRef(null)
  const [blob, setBlob] = useState([])
  const ref = useRef()

  const handleDataAvaileble = (e) => {
    if (e.data && e.data.size > 0) {
      setBlob((blob) => [...blob, e.data])
    }
  }

  const startRecording = async () => {
    ref.current.src = null
    ref.current.srcObject = null
    if (stream.current === null) {
      try {
        const streamRecord = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })

        stream.current = streamRecord
        ref.current.srcObject = streamRecord
        const media = new MediaRecorder(streamRecord)

        media.addEventListener('dataavailable', handleDataAvaileble)

        media.start()
        mediaRecorder.current = media
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log(mediaRecorder.current)
      mediaRecorder.current.resume()
      ref.current.srcObject = stream.current
      // stream.current.getTracks().forEach((str) => str.start())
    }
  }

  const pauseRecording = () => {
    mediaRecorder.current.pause()
    // stream.current.getTracks().forEach((str) => str.pause())
  }

  const stopRecording = () => {
    mediaRecorder.current.stop()
    stream.current.getTracks().forEach((str) => str.stop())
    setIsRecording(false)
  }

  useEffect(() => {
    console.log(mediaRecorder.current)

    if (blob.length && mediaRecorder.current?.state === 'inactive') {
      const recordedBlob = new Blob(blob, {
        type: 'video/webm'
      })

      const recordedUrl = window.URL.createObjectURL(recordedBlob)
      ref.current.src = null
      ref.current.srcObject = null
      ref.current.src = recordedUrl
      ref.current.controls = true
      ref.current.play()

      stream.current = null
      mediaRecorder.current = null
    }
  }, [blob])

  return (
    <>
      <div>
        <div>
          <video
            ref={ref}
            autoPlay
            playsInline
            loop
            muted
            style={{ width: '300px', aspectRatio: '12/9', background: '#eee' }}
          />
          <button onClick={startRecording}>Iniciar</button>
          <button onClick={pauseRecording}>pause</button>
          <button onClick={stopRecording}>Detener</button>
        </div>
      </div>
    </>
  )
}
