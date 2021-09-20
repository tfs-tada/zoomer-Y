import { Button } from '@material-ui/core'
import { FC, useEffect, useState } from 'react'
import MicIcon from '@material-ui/icons/Mic'
import StopIcon from '@material-ui/icons/Stop'
interface SpeechBoxProps {
  setSearchString: (str: string) => void
  doingRecognition: boolean
  setDoingRecognition: (bool: boolean) => void
}
const SpeechBox: FC<SpeechBoxProps> = ({
  setSearchString,
  doingRecognition,
  setDoingRecognition,
}) => {
  const [recognition, setRecognition] = useState<any>()

  // speechAPI 初期化
  useEffect(() => {
    window.SpeechRecognition = webkitSpeechRecognition || SpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'ja-JP'
    recognition.interimResults = true
    recognition.continuous = true
    setRecognition(recognition)
  }, [])

  if (recognition)
    recognition.onresult = (event: any) => {
      setSearchString(event.results[event.results.length - 1][0].transcript)
    }

  const changeRecognitionMode = () => {
    if (!doingRecognition) recognition?.start()
    else recognition?.stop()
    setDoingRecognition(!doingRecognition)
  }

  return (
    <Button
      variant={'contained'}
      color={'primary'}
      onClick={() => changeRecognitionMode()}
    >
      {doingRecognition ? <StopIcon /> : <MicIcon />}
    </Button>
  )
}
export default SpeechBox
