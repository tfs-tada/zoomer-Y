import React, { FC, useEffect, useState } from 'react'
import kuromoji, { Tokenizer } from 'kuromoji'

const KuromojiBox: FC = () => {
  const [tokenizer, setTokenizer] = useState<
    Tokenizer<kuromoji.IpadicFeatures> | undefined
  >()
  const [parsedStr, setParsedStr] = useState<kuromoji.IpadicFeatures[]>([])
  const [inputText, setInputText] = useState('テスト用の文章ですよ')
  useEffect(() => {
    kuromoji.builder({ dicPath: '/dict' }).build((err, tokenizer) => {
      setTokenizer(tokenizer)
    })
  }, [])
  const parse = async (text: string) => {
    if (typeof tokenizer !== 'undefined') {
      const ansTokens = tokenizer.tokenize(text)
      setParsedStr(ansTokens)
    }
  }

  return (
    <div>
      <input
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={() => parse(inputText)}>parse</button>
      <div>
        {parsedStr.map((str, idx) => (
          <div key={`${str.surface_form}_${String(idx)}`}>
            {`${String(idx)}:${str.basic_form}:${str.pos}`}
          </div>
        ))}
      </div>
    </div>
  )
}

export default KuromojiBox
