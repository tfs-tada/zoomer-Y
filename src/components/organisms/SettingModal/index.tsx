import { Button } from '@material-ui/core'
import { FC, useEffect, useState } from 'react'
import {
  addNewMessage,
  getStorage,
} from '../../../utils/localStorage/QuestionStore'
import styles from './index.module.scss'
import { MessageSet } from '../../../interface/MessageSet'
import AddIcon from '@material-ui/icons/Add'
import QuestionBox from '../QuestionBox'
interface SettingModalProps {
  closeModal: () => void
}
const SettingModal: FC<SettingModalProps> = ({ closeModal }) => {
  const [questionList, setQuestionList] = useState<MessageSet[]>([])
  const reloadStorage = () => setQuestionList(getStorage())
  useEffect(() => {
    reloadStorage()
  }, [])

  return (
    <div className={styles.contents_wrapper}>
      <div className={styles.title_contents}>
        <div className={styles.title_string}>質問編集</div>
        <Button
          variant='contained'
          color={'primary'}
          onClick={() => {
            addNewMessage()
            reloadStorage()
          }}
        >
          <AddIcon />
        </Button>
        <Button
          variant='contained'
          color='default'
          onClick={() => closeModal()}
        >
          x
        </Button>
      </div>
      <div className={styles.list_wrapper}>
        {questionList.map((e) => (
          <div key={e.id}>
            <QuestionBox message={e} reloadStorage={() => reloadStorage()} />
          </div>
        ))}
      </div>
    </div>
  )
}
export default SettingModal
