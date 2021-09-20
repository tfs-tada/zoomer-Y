import { Button } from '@material-ui/core'
import { FC, useEffect, useState } from 'react'
import MicIcon from '@material-ui/icons/Mic'
interface SpeechBoxProps {
  setSearchString: (str: string) => void
}
const SpeechBox: FC<SpeechBoxProps> = ({ setSearchString }) => {
  const [recognition, setRecognition] = useState()

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
    recognition.onresult = (event) => {
      setSearchString(event.results[event.results.length - 1][0].transcript)
    }

  const changeRecognitionMode = () => {
    recognition?.start()
  }

  return (
    <Button
      variant={'contained'}
      color={'primary'}
      onClick={() => changeRecognitionMode()}
    >
      <MicIcon />
    </Button>
  )
}
export default SpeechBox
