import { promises as fs } from 'fs' // 読み込む

export async function loadJson(fileName: string): Promise<any> {
  const jsonStr = await fs.readFile(fileName, 'utf-8')
  return JSON.parse(jsonStr)
}
