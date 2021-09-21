import { Button } from '@material-ui/core'
import { FC } from 'react'
import SaveIcon from '@material-ui/icons/Save'

import MicIcon from '@material-ui/icons/Mic'
import styles from './index.module.scss'
const modalMessage = [
  {
    title: 'このアプリについて',
    message: (
      <div className=''>
        <ul>
          <li>音声入力で情報を検索できるアプリケーションです</li>
          <li>主な用途として、質問応答におけるカンペ検索を想定しています</li>
        </ul>
      </div>
    ),
  },
  {
    title: '使い方',
    message: (
      <div className=''>
        <ol>
          <li>
            メモリーアイコン（
            <SaveIcon />
            ）を押して設定を開く
          </li>
          <li>カンペの概要を追加</li>
          <li>
            ボイスアイコン（
            <MicIcon />
            ）を押して音声検索開始
          </li>
          だいたいアイコンを追えばなんとかなります。
        </ol>
      </div>
    ),
  },
  {
    title: '注意点',
    message: (
      <div className=''>
        <ul>
          <li>
            音声入力機能の仕様上、PC版のchrome系ブラウザでしか動作しません。スマホ上では動きません
          </li>
          <li>質問データはブラウザ上に保存されます。サーバには送信されないのでご安心ください</li>
          <li>GoogleChrome:93.0.4577.82 で動作確認しています</li>
        </ul>
      </div>
    ),
  },
  {
    title: '使用技術',
    message: (
      <div className=''>
        <ul>
          <li>Next.js + TypeScript</li>
          <li>Material UI</li>
          <li>Kuromoji（自然言語処理ライブラリ）</li>
          <li>Web Speech API (PC版WEBブラウザ搭載機能）</li>
          <li>netlify（デプロイ）</li>
        </ul>
      </div>
    ),
  },
]

interface TutorialModalProps {
  closeModal: () => void
}
const TutorialModal: FC<TutorialModalProps> = ({ closeModal }) => {
  return (
    <div className={styles.contents_wrapper}>
      <div className={styles.title_contents}>
        <div className={styles.title_string}>使い方</div>
        <Button
          variant='contained'
          color='default'
          onClick={() => closeModal()}
        >
          x
        </Button>
      </div>
      <div className={styles.list_wrapper}>
        {modalMessage.map((e) => (
          <div className={styles.list_contents} key={e.title}>
            <div className={styles.list_title}>{e.title}</div>
            <div className={styles.list_string}>{e.message}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default TutorialModal
