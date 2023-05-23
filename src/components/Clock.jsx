import { useEffect, useState } from 'react'

function Clock({ isRecording, handleStop }) {
  const [time, setTime] = useState({ minutes: 1, seconds: 59 })

  useEffect(() => {
    let interval
    if (isRecording) {
      interval = setInterval(() => {
        if (time.seconds > 0) {
          setTime((time) => ({ ...time, seconds: time.seconds - 1 }))
        } else {
          if (time.minutes >= 1) {
            setTime((time) => ({
              minuts: time.minutes - 1,
              seconds: 59
            }))
          } else {
            ;(time.minutes !== 1 || time.seconds !== 59) &&
              setTime(() => ({ minutes: 1, seconds: 59 }))
            handleStop()
            clearInterval(interval)
          }
        }
      }, 1000)
    } else {
      ;(time.minutes !== 1 || time.seconds !== 59) &&
        setTime(() => ({ minutes: 1, seconds: 59 }))
    }

    return () => clearInterval(interval)
  }, [isRecording, time])

  return (
    <div
      style={{
        color: '#000',
        background: '#eee',
        borderRadius: 5,
        paddingInline: 4,
        opacity: '.7'
      }}
    >
      <span>0{time.minutes}</span>
      <span>:</span>
      <span>{time.seconds < 10 ? '0' + time.seconds : time.seconds}</span>
    </div>
  )
}

export default Clock
