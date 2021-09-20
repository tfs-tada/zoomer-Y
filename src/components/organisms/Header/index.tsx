import { FC } from 'react'
import Head from 'next/head'
import ContactSupportIcon from '@material-ui/icons/ContactSupport'
import SaveIcon from '@material-ui/icons/Save'
import styles from './index.module.scss'
const Header: FC = () => {
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.title_wrapper}>
        <h1>ZOOMER - Y</h1>
        <div>音声検索可能なカンペアプリ</div>
      </div>
      <div className={styles.icon_wrapper}>
        <div className={styles.icon_contents}>
          <ContactSupportIcon />
        </div>
        <div className={styles.icon_contents}>
          <SaveIcon />
        </div>
      </div>
    </div>
  )
}
export default Header
