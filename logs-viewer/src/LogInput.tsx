import { ChangeEventHandler } from 'react'
import { TLogFile } from './types'

interface IProps {
  onLogChange: (d: TLogFile) => void
}

export const LogInput = ({ onLogChange }: IProps) => {
  const handleChange: ChangeEventHandler = async (event) => {
    if (!('files' in event.target)) {
      return
    }

    const files = event.target.files as FileList
    const logFile = files.item(0)

    if (!logFile) {
      return
    }

    const text = await logFile.text()

    onLogChange(JSON.parse(text) as TLogFile)
  }

  return (
    <label>
      <span>Log file:</span>
      <input type='file' onChange={handleChange} />
    </label>
  )
}
