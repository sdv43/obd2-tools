import { useState } from 'react'
import { LogInput } from './LogInput'
import { TBufferAsJson, TLogFile } from './types'

const bufferToString = (buffer: TBufferAsJson) => {
  return String.fromCodePoint(
    ...buffer.data.filter((byte) => byte !== 13 && byte !== 62),
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [logs, setLogs] = useState<TLogFile>()

  return (
    <>
      <LogInput onLogChange={(log) => setLogs(log)} />

      <input
        placeholder='Search command'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <h4>Logs:</h4>

      <ol>
        {logs
          ?.filter((cmd) =>
            bufferToString(cmd.command)
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()),
          )
          .map((cmd) => {
            return (
              <li>
                {bufferToString(cmd.command)}
                <ol>
                  {cmd.responses.map((resp) => (
                    <li style={{ fontSize: '0.9em', opacity: '0.9' }}>
                      {bufferToString(resp)}
                    </li>
                  ))}
                </ol>
              </li>
            )
          })}
      </ol>
    </>
  )
}

export default App
