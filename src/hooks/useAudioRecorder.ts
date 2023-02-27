import { useState } from 'react'

interface RecorderFunctions {
  startRecording: () => void
  stopRecording: () => void
}

type Recorder = RecorderFunctions & { recording: boolean }

export default function useAudioRecorder(): Recorder {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const [recording, setRecording] = useState(false)

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream)
        setRecorder(mediaRecorder)
        mediaRecorder.start()
        setRecording(true)
      })
      .catch(console.error)
  }

  const stopRecording = () => {
    return new Promise((resolve) => {
      recorder.stop()
      recorder.onstop = (e) => {
        recorder.stream.getTracks().forEach((track) => track.stop())
      }
      recorder.ondataavailable = (e) => {
        const blob = new Blob([e.data], { type: 'audio/mp3' })
        const url = URL.createObjectURL(blob)
        setRecording(false)
        resolve(url)
      }
    })
  }

  return { startRecording, stopRecording, recording }
}
