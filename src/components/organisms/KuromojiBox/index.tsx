import React, { FC, useEffect, useState } from 'react'
import kuromoji, { Tokenizer } from 'kuromoji'
interface KuromojiBoxProps {
  searchString: string
}

type patternsType = {
  word: string[]
  question: string
  ans: string
}

const patterns = [
  {
    word: ['学生', '時代', '力'],
    question: '学生時代に力を入れていたことは？',
    ans: 'インターンシップで実務経験をつけること',
  },
  {
    word: ['当社', '志望', '理由', '動機'],
    question: '当社を志望した動機は？',
    ans: 'ネタに走った制作物でも評価してくれること',
  },
  {
    word: ['今', '研究', '理由', '選ぶ'],
    question: '今の研究を選んだ理由は？',
    ans: '自然言語処理を通じてロボットに小説を書かせたい',
  },
  {
    word: ['長所', '短所'],
    question: 'あなたの長所や短所を教えて！',
    ans: '短所は無能なこと、長所は無能を自覚していること',
  },
]

const KuromojiBox: FC<KuromojiBoxProps> = ({ searchString }) => {
  const [tokenizer, setTokenizer] = useState<
    Tokenizer<kuromoji.IpadicFeatures> | undefined
  >()
  const [parsedStr, setParsedStr] = useState<kuromoji.IpadicFeatures[]>([])
  useEffect(() => {
    kuromoji.builder({ dicPath: '/dict' }).build((err, tokenizer) => {
      setTokenizer(tokenizer)
    })
  }, [])
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

        return list
      }

      return list
    }, [])
    ansList.sort().reverse()

    return ansList
  }

  return (
    <div>
      <div>
        {searchAns().map((e, idx) => (
          <div key={`${e[1].ans}_${idx}`}>
            <div>質問候補:{e[1].question}</div>
            <div>回答候補:{e[1].ans}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default KuromojiBox
