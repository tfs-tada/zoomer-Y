import { MessageSet } from '../../interface/MessageSet'
const STORE_NAME = 'QuestionStore'
export const clearStorage = () => {
  if (process.browser) localStorage.removeItem(STORE_NAME)
}

export const updateStorage = (item: MessageSet) => {
  if (process.browser) {
    const items = getStorage()
    const newItems = items.map((e) => (e.id === item.id ? item : e))
    localStorage.setItem(STORE_NAME, JSON.stringify(newItems))
  }
}

export const deleteStorage = (item: MessageSet) => {
  if (process.browser) {
    const items = getStorage()
    const newItems = items.filter((e) => e.id !== item.id)
    localStorage.setItem(STORE_NAME, JSON.stringify(newItems))
  }
}

export const getStorage = (): MessageSet[] => {
  if (process.browser) {
    const items = localStorage.getItem(STORE_NAME)
    return items ? JSON.parse(items) : []
  }
  return []
}

export const addNewMessage = () => {
  if (process.browser) {
    const newItem: MessageSet = {
      id: new Date().toLocaleDateString() + '_' + Math.random(),
      question: '',
      answer: '',
    }
    const newStoreList = [...getStorage(), newItem]
    localStorage.setItem(STORE_NAME, JSON.stringify(newStoreList))
  }
}
