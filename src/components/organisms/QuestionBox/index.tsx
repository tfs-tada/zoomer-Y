import { FC, useState } from 'react'
import SettingsIcon from '@material-ui/icons/Settings'
import DoneIcon from '@material-ui/icons/Done'
import DeleteIcon from '@material-ui/icons/Delete'
import { MessageSet } from '../../../interface/MessageSet'
import { Button, Input } from '@material-ui/core'
import {
  deleteStorage,
  updateStorage,
} from '../../../utils/localStorage/QuestionStore'
import styles from './index.module.scss'
import ConfirmModal from '../../molecules/ConfirmModal'
interface QuestionBoxProps {
  reloadStorage: () => void
  message: MessageSet
}
const QuestionBox: FC<QuestionBoxProps> = ({ reloadStorage, message }) => {
  const [editFlag, setEditFlag] = useState(false)
  const [clearModalFlag, setClearModalFlag] = useState(false)
  const [editData, setEditData] = useState<[string, string]>([
    message.question,
    message.answer,
  ])
  const saveEditData = () => {
    if (editData[0] !== message.question || editData[1] !== message.answer) {
      const newItem: MessageSet = {
        id: message.id,
        question: editData[0],
        answer: editData[1],
      }
      updateStorage(newItem)
    }
    setEditFlag(false)
    reloadStorage()
  }
  const deleteData = () => {
    deleteStorage(message)
    setClearModalFlag(false)
    reloadStorage()
  }

  return (
    <>
      {editFlag ? (
        <div className={styles.contents_wrapper}>
          <div className={styles.qa_wrapper}>
            <Input
              type='text'
              value={editData[0]}
              fullWidth
              placeholder={'ここに質問文を入力'}
              onChange={(e) => setEditData([e.target.value, editData[1]])}
            />
          </div>
          <div className={styles.qa_wrapper}>
            <Input
              type='text'
              value={editData[1]}
              placeholder={'ここに回答を入力'}
              fullWidth
              onChange={(e) => setEditData([editData[0], e.target.value])}
            />
          </div>
          <Button onClick={() => saveEditData()}>
            <DoneIcon />
          </Button>
          <Button onClick={() => setClearModalFlag(true)}>
            <DeleteIcon />
          </Button>
        </div>
      ) : (
        <div className={styles.contents_wrapper}>
          <div className={styles.qa_wrapper}>
            {message.question !== ''
              ? message.question
              : '（ここに質問を入力）'}
          </div>
          <div className={styles.qa_wrapper}>
            {message.answer !== '' ? message.answer : '（ここに回答を入力）'}
          </div>
          <Button onClick={() => setEditFlag(true)}>
            <SettingsIcon />
          </Button>
          <Button onClick={() => setClearModalFlag(true)}>
            <DeleteIcon />
          </Button>
        </div>
      )}
      <ConfirmModal
        modalFlag={clearModalFlag}
        title='質問を削除します'
        okFunc={() => deleteData()}
        cancelFunc={() => setClearModalFlag(false)}
      />
    </>
  )
}
export default QuestionBox
