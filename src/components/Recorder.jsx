import { useState, useRef, useEffect } from 'react'
import CircleRecording from './CircleRecording'
import { useParams } from 'react-router-dom'
import { useAppContext } from './context'
import ButtonPlayPauseReset from './Buttons/ButtonPlayPauseReset'
import styles from './Recorder.module.css'
import Clock from './Clock'

export default function Recorder() {
  const { id } = useParams()
  const { videosState, setVideosState } = useAppContext()
  const mediaRecorder = useRef(null)
  const stream = useRef(null)
  const [recordingState, setRecordingState] = useState({
    isRecording: false,
    finish: false,
    streamExist: false
  })
  const ref = useRef()

  useEffect(() => {
    if (recordingState.streamExist) {
      ref.current.srcObject = null
      ref.current.src = null
      mediaRecorder.current = null

      if (videosState[id].video) {
        setRecordingState((prev) => ({
          ...prev,
          isRecording: false,
          finish: true
        }))
        ref.current.src = videosState[id].video
        ref.current.play()
      } else {
        setRecordingState((prev) => ({
          ...prev,
          isRecording: false,
          finish: false
        }))

        ref.current.srcObject = stream.current
      }
    }
  }, [id, recordingState.streamExist])

  useEffect(() => {
    ;(async () => {
      try {
        const streamRecord = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        stream.current = streamRecord
        setRecordingState({ ...recordingState, streamExist: true })
      } catch (error) {
        if (error.message === 'Permission denied') {
          alert(
            'La camara y/o microfono se encuentran desabilitados.Si desea continuar habilitelos y recargue la app en el root'
          )
        }
        throw new Error(error.message)
      }
    })()

    return () => {
      stream.current?.getTracks().forEach((str) => str.stop())
    }
  }, [])

  const handleDataAvaileble = (e) => {
    if (e.data && e.data.size > 0) {
      const recordedBlob = new Blob([e.data], {
        type: 'video/webm'
      })
      const recordedUrl = window.URL.createObjectURL(recordedBlob)
      ref.current.src = null
      ref.current.srcObject = null
      ref.current.src = recordedUrl
      ref.current.play()

      setVideosState({
        ...videosState,
        [id]: { ...videosState[id], video: recordedUrl }
      })
    }
  }

  function startRecording() {
    setRecordingState((prev) => ({ ...prev, isRecording: true, finish: false }))
    mediaRecorder.current = null
    ;(async () => {
      const media = new MediaRecorder(stream.current)
      media.addEventListener('dataavailable', handleDataAvaileble)
      mediaRecorder.current = media
    })()
    mediaRecorder.current.start()
    ref.current.src = null
    ref.current.srcObject = stream.current
  }

  const stopRecording = () => {
    mediaRecorder.current.stop()
    setRecordingState((prev) => ({
      ...prev,
      isRecording: false,
      finish: true
    }))
  }

  return (
    <div className={styles.container}>
      <video
        className={styles.video}
        ref={ref}
        autoPlay
        playsInline
        loop
        muted
      />
      <figcaption className={styles.pregunta}>
        {videosState[id].pregunta}
      </figcaption>
      <div className={styles.buttonRecord}>
        <ButtonPlayPauseReset
          onClickPlay={startRecording}
          onClickStop={stopRecording}
          isRecording={recordingState.isRecording}
          isFinish={recordingState.finish}
          disabled={recordingState.streamExist}
          scale="1.5"
        />
      </div>

      <div className={styles.circle}>
        <Clock
          isRecording={recordingState.isRecording}
          handleStop={stopRecording}
        />
        <CircleRecording bool={recordingState.isRecording} />
      </div>
    </div>
  )
}
