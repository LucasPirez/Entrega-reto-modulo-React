import { useState, useRef, useEffect } from 'react'
import CircleRecording from './CircleRecording'
import { useParams } from 'react-router-dom'
import { useAppContext } from './context'
import ButtonPlayPauseReset from './Buttons/ButtonPlayPauseReset'

export default function Recorder() {
  const { id } = useParams()
  const { videosState, countVideosRecorded, setVideosState } = useAppContext()
  const mediaRecorder = useRef(null)
  const stream = useRef(null)
  const [recordingState, setRecordingState] = useState({
    isRecording: false,
    finish: false,
    streamExist: false
  })
  const ref = useRef()

  useEffect(() => {
    if (stream.current) {
      ref.current.srcObject = null
      ref.current.src = null
      mediaRecorder.current = null

      if (videosState[id].video) {
        console.log(id)
        setRecordingState({ isRecording: false, finish: true })
        ref.current.src = videosState[id].video
        ref.current.play()
      } else {
        setRecordingState({ isRecording: false, finish: false })

        ref.current.srcObject = stream.current
      }
    }
  }, [id, recordingState.streamExist])

  useEffect(() => {
    console.log('effec stream')
    ;(async () => {
      try {
        const streamRecord = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        })
        stream.current = streamRecord
        setRecordingState({ ...recordingState, streamExist: true })
      } catch (error) {
        console.log(error)
      }
    })()

    return () => {
      stream.current.getTracks().forEach((str) => str.stop())
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
      if (videosState[id]['video']) {
        setVideosState({
          ...videosState,
          [id]: { ...videosState[id], video: recordedUrl }
        })
        // videosState[id]['video'] = recordedUrl
      } else {
        setVideosState({
          ...videosState,
          [id]: { ...videosState[id], video: recordedUrl }
        })
        countVideosRecorded.current++
      }
    }
  }

  function startRecording() {
    setRecordingState({ isRecording: true, finish: false })
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
    setRecordingState({ isRecording: false, finish: true })
  }

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
            style={{
              width: '300px',
              aspectRatio: '12/9',
              background: '#a000aa76',
              opacity: !recordingState.isRecording && 0.5
            }}
          />
          <figcaption>{videosState[id].pregunta}</figcaption>
          <ButtonPlayPauseReset
            onClickPlay={startRecording}
            onClickStop={stopRecording}
            isRecording={recordingState.isRecording}
            isFinish={recordingState.finish}
            disabled={recordingState.streamExist}
          />

          <CircleRecording bool={recordingState.isRecording} />
        </div>
      </div>
    </>
  )
}
