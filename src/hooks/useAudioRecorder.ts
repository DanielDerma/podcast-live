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
    recorder.stop()
    recorder.onstop = (e) => {
      recorder.stream.getTracks().forEach((track) => track.stop())
    }
    recorder.ondataavailable = async (e) => {
      const blob = new Blob([e.data], { type: 'audio/mp3' })
      const file = new File([blob], 'test.mp3', { type: 'audio/mp3' })
      const url = URL.createObjectURL(file)
      console.log(url)
    }
    setRecording(false)
  }

  return { startRecording, stopRecording, recording }
}
