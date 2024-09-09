import { readFile } from 'fs/promises'
import path from 'path'

export default async function handler(req, res) {
  try {
    const filePath = path.join(
      process.cwd(),
      'components/data',
      'albumdata.json',
    )

    const jsonData = await readFile(filePath, 'utf-8')

    const albums = JSON.parse(jsonData)

    res.status(200).json(albums)
  } catch (error) {
    console.error('Error reading albums data:', error)
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message })
  }
}
