import { FC } from 'react'
import Head from 'next/head'
import styles from './index.module.scss'
import KuromojiBox from '../../organisms/KuromojiBox'

const TopPageTemplate: FC = () => {
  return (
    <div className={styles.page_wrapper}>
      <div className={styles.header_wrapper}>ここにヘッダー</div>
      <div className={styles.contents_wrapper}>
        <KuromojiBox />
      </div>
    </div>
  )
}
export default TopPageTemplate
