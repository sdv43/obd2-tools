import { join } from 'node:path'
import { readFileSync } from 'node:fs'
import { createTcpServer } from '../tcpServer.js'
import { logDir, TLogs } from '../logs.js'

const config = {
  logFileName: '2024-10-10T16:05:54.869Z.json',
}

const fakeResponses: Record<string, Buffer> = {
  //   ATI: Buffer.from([23, 23, 2, 32]),
}

const readLogFile = (path: string) => {
  const json = readFileSync(path, 'utf-8')
  const data: TLogs = JSON.parse(json).map(
    (row: { command: { data: number[] }; responses: { data: number[] }[] }) => {
      return {
        command: Buffer.from(row.command.data),
        responses: row.responses.map((r) => Buffer.from(r.data)),
      }
    },
  )

  const findCommandInLogs = (cmd: Buffer) => {
    const cmdAsString = cmd.filter((byte) => byte !== 0x0d).toString()

    if (fakeResponses[cmdAsString]) {
      return [fakeResponses[cmdAsString]]
    }

    const responseFromLog = data.find((row) => row.command.equals(cmd))

    return responseFromLog?.responses
  }

  return findCommandInLogs
}

createTcpServer({
  host: '0.0.0.0',
  port: 35000,
  onconnection(s) {
    const findResponse = readLogFile(join(logDir, config.logFileName))

    s.on('data', (data) => {
      console.log('✅', data.filter((byte) => byte !== 0x0d).toString())

      const responses = findResponse(data)

      responses?.forEach((response) => {
        s.write(response, (error) =>
          error ? console.log('Response write error:', error.message) : null,
        )
      })
    })
  },
})
