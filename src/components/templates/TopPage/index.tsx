import { FC, useState } from 'react'
import styles from './index.module.scss'
import KuromojiBox from '../../organisms/KuromojiBox'
import SpeechBox from '../../organisms/SpeechBox'
import { Input } from '@material-ui/core'
import Header from '../../organisms/Header'

const TopPageTemplate: FC = () => {
  const [searchString, setSearchString] = useState('ここに音声が表示されます')

  return (
    <div className={styles.page_wrapper}>
      <div className={styles.header_wrapper}>
        <Header />
      </div>
      <div className={styles.contents_wrapper}>
        <div className={styles.searchbox_wrapper}>
          <Input type={'text'} value={searchString} fullWidth />
          <SpeechBox setSearchString={setSearchString} />
        </div>
        <KuromojiBox searchString={searchString} />
      </div>
    </div>
  )
}
export default TopPageTemplate
