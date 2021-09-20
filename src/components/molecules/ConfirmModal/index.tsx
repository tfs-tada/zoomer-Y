import { FC } from 'react'
import { Button } from '@material-ui/core'
import ModalWindow from '../../atoms/ModalWindow'
import styles from './index.module.scss'
interface ConfirmModalProps {
  modalFlag: boolean
  title: string
  okFunc: () => void
  cancelFunc: () => void
}
const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { modalFlag, title, okFunc, cancelFunc } = props

  return (
    <ModalWindow openFlag={modalFlag} height='auto'>
      <div className={styles.contents_wrapper}>
        <div className={styles.title_string}>{title}</div>
        <div className={styles.button_wrapper}>
          <div className={styles.button_contents}>
            <Button
              variant='contained'
              color='inherit'
              onClick={() => okFunc()}
            >
              OK
            </Button>
          </div>
          <div className={styles.button_contents}>
            <Button
              variant='contained'
              color='default'
              onClick={() => cancelFunc()}
            >
              キャンセル
            </Button>
          </div>
        </div>
      </div>
    </ModalWindow>
  )
}
export default ConfirmModal
