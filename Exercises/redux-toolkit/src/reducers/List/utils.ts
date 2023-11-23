import { ListState } from './listSlice'

export const loadDataFromLocalStorage = (): ListState | null => {
  try {
    const storedData: string | null = localStorage.getItem('listData')
    if (storedData) {
      const parsedData: ListState = JSON.parse(storedData)
      console.log('parsedData:', parsedData)
      return parsedData
    }
  } catch (err) {
    console.error('Error loading data from localStorage:', err)
  }
  return null
}

export const saveDataToLocalStorageFn = (data: ListState) => {
  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem('listData', serializedData)
  } catch (err) {
    console.error('Error saving data to localStorage:', err)
  }
}
