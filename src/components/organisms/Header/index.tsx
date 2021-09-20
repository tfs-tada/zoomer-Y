import { FC } from 'react'
import Head from 'next/head'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import SaveIcon from '@material-ui/icons/Save'
import styles from './index.module.scss'
import { Button } from '@material-ui/core'
interface HeaderProps {
  openSettingModal: () => void
}
const Header: FC<HeaderProps> = ({ openSettingModal }) => {
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.title_wrapper}>
        <h1>ZOOMER - Y</h1>
        <div>音声検索するタイプのカンペ</div>
      </div>
      <div className={styles.icon_wrapper}>
        <div className={styles.icon_contents}>
          <Button>
            <ContactSupportIcon />
          </Button>
        </div>
        <div className={styles.icon_contents}>
          <Button onClick={() => openSettingModal()}>
            <SaveIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}
export default Header
