import { FC, useEffect, useState } from 'react'
import styles from './index.module.scss'
import KuromojiBox from '../../organisms/KuromojiBox'
import SpeechBox from '../../organisms/SpeechBox'
import { Input } from '@material-ui/core'
import Header from '../../organisms/Header'
import SettingModal from '../../organisms/SettingModal'
import ModalWindow from '../../atoms/ModalWindow'
import { getStorage } from '../../../utils/localStorage/QuestionStore'
import { MessageSet } from '../../../interface/MessageSet'
import TutorialModal from '../../organisms/TutorialModal'

const TopPageTemplate: FC = () => {
  const [tutorialModalFlag, setTutorialModalFlag] = useState(false)
  const [settingModalFlag, setSettingModalFlag] = useState(false)
  const [doingRecognition, setDoingRecognition] = useState(false)
  const [searchString, setSearchString] =
    useState('ここに聞き取った音声が表示されます')
  const [questionList, setQuestionList] = useState<MessageSet[]>([])
  const reloadStorage = () => setQuestionList(getStorage())
  useEffect(() => {
    reloadStorage()
  }, [])

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.header_wrapper}>
        <Header
          openSettingModal={() => setSettingModalFlag(true)}
          openTutorialModal={() => setTutorialModalFlag(true)}
        />
      </div>
      <div className={styles.contents_wrapper}>
        <div className={styles.searchbox_wrapper}>
          <Input type={'text'} value={searchString} fullWidth />
          <SpeechBox
            setSearchString={setSearchString}
            setDoingRecognition={setDoingRecognition}
            doingRecognition={doingRecognition}
          />
        </div>
        <KuromojiBox searchString={searchString} questionList={questionList} />
      </div>

      <ModalWindow openFlag={settingModalFlag}>
        <SettingModal
          closeModal={() => {
            setSettingModalFlag(false)
            reloadStorage()
          }}
        />
      </ModalWindow>

      <ModalWindow openFlag={tutorialModalFlag}>
        <TutorialModal
          closeModal={() => {
            setTutorialModalFlag(false)
            reloadStorage()
          }}
        />
      </ModalWindow>
    </div>
  )
}
export default TopPageTemplate
