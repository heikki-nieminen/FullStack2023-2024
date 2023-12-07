import fs from 'fs/promises'

export const readDataFromFile = async (file: string) => {
  try {
    const data = await fs.readFile(file, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

export const saveDataToFile = async (file: string, data: any[]) => {
  const stringifiedData = JSON.stringify(data, null, 2)

  try {
    await fs.writeFile(file, stringifiedData)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(file, { recursive: true })
      await fs.writeFile(file, stringifiedData)
    } else {
      throw error
    }
  }
}
