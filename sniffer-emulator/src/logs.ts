import { join } from 'path'
import { writeFileSync } from 'node:fs'
import { readFileSync } from 'fs'

export type TLogs = TLogCommand[]

export type TLogCommand = {
  command: Buffer
  responses: Buffer[]
}

export const logDir = join(import.meta.dirname, '../logs')

export const saveLog = (logs: TLogs, name?: string) => {
  writeFileSync(join(logDir, name + '.json'), JSON.stringify(logs))
}

export const readLog = (name: string): TLogs => {
  return JSON.parse(readFileSync(join(logDir, name + '.json'), 'utf8'))
}
