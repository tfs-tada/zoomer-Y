import { Modal } from '@material-ui/core'
import React, { FC } from 'react'
import styles from './index.module.scss'

interface ModalWindowProps {
  openFlag: boolean
  height?: string
}
const ModalWindow: FC<ModalWindowProps> = (props) => {
  const { openFlag, height } = props

  return (
    <Modal
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      open={openFlag}
      aria-labelledby='server-modal-title'
      aria-describedby='server-modal-description'
    >
      <div
        className={styles.child_wrapper}
        style={height ? { height: height } : {}}
      >
        {props.children}
      </div>
    </Modal>
  )
}

export default ModalWindow
