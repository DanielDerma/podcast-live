import { createContext, useContext, useMemo, useReducer, useRef } from 'react'
import useAudioRecorder from '@/hooks/useAudioRecorder'

let RecorderPlayerContext = createContext()

export function RecorderProvider({ children }) {
  const { recording, startRecording, stopRecording } = useAudioRecorder()

  const handleRecorder = () => {
    if (!recording) {
      startRecording()
    } else {
      stopRecording().then((e) => console.log(e))
    }
  }
  const value = {
    recording,
    handleRecorder,
  }

  return (
    <RecorderPlayerContext.Provider value={value}>
      {children}
    </RecorderPlayerContext.Provider>
  )
}

export function useRecorderPlayer() {
  let context = useContext(RecorderPlayerContext)

  if (!context) {
    throw new Error(
      'useRecorderPlayer must be used within an RecorderPlayerProvider'
    )
  }

  return context
}
