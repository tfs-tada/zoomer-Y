import React, { FC, useEffect, useState } from 'react'
import kuromoji, { Tokenizer } from 'kuromoji'
import { MessageSet } from '../../../interface/MessageSet'
import styles from './index.module.scss'
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
interface KuromojiBoxProps {
  searchString: string
  questionList: MessageSet[]
}

type patternsType = {
  word: string[]
  question: string
  ans: string
}

const KuromojiBox: FC<KuromojiBoxProps> = ({ searchString, questionList }) => {
  const [tokenizer, setTokenizer] = useState<
    Tokenizer<kuromoji.IpadicFeatures> | undefined
  >()
  const [patterns, setPatterns] = useState<patternsType[]>([])
  const [parsedStr, setParsedStr] = useState<kuromoji.IpadicFeatures[]>([])
  useEffect(() => {
    kuromoji.builder({ dicPath: '/dict' }).build((err, tokenizer) => {
      setTokenizer(tokenizer)
    })
  }, [])
  useEffect(() => {
    if (typeof tokenizer !== 'undefined') {
      const parsedPatterns: patternsType[] = questionList.map((e) => {
        const ansTokens = tokenizer
          .tokenize(e.question)
          .filter((e) => e.pos === '名詞' || e.pos === '動詞')
        const contents = {
          word: ansTokens.map((e) => e.basic_form),
          ans: e.answer,
          question: e.question,
        }
        return contents
      })
      setPatterns(parsedPatterns)
    }
  }, [questionList, tokenizer])
  useEffect(() => {
    if (typeof tokenizer !== 'undefined' && searchString !== '') {
      const ansTokens = tokenizer.tokenize(searchString)
      setParsedStr(
        ansTokens.filter((e) => e.pos === '名詞' || e.pos === '動詞')
      )
    }
  }, [searchString])

  const searchAns = () => {
    const simList = parsedStr.map((e) => e.basic_form)
    const ansList = patterns.reduce((list: [number, patternsType][], e) => {
      const set = new Set([...e.word, ...simList])
      const size = e.word.length + simList.length - set.size
      if (size > 0) {
        list.push([size, e])
      }
      return list
    }, [])
    return ansList.sort().reverse()
  }

  return (
    <div>
      <div>
        {searchAns().map((e, idx) => (
          <div key={`${e[1].ans}_${idx}`} className={styles.qa_wrapper}>
            <div className={styles.qa_contents}>
              <div className={styles.icon_wrapper}>
                <LiveHelpIcon />
              </div>
              {e[1].question}
            </div>
            <div className={styles.qa_contents}>
              <div className={styles.icon_wrapper}>
                <ChatBubbleOutlineIcon />
              </div>
              {e[1].ans}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KuromojiBox
