import { createConnection } from 'node:net'
import { createTcpServer } from '../tcpServer.js'
import { saveLog, TLogs } from '../logs.js'

const adapterConfig = {
  host: '192.168.0.10',
  port: 35000,
}

createTcpServer({
  host: '0.0.0.0',
  port: 35000,
  onconnection(s) {
    const logs: TLogs = []
    const adapterWifiSocket = createConnection({
      host: adapterConfig.host,
      port: adapterConfig.port,
    })

    adapterWifiSocket.on('close', () =>
      console.log('Adapter socket was closed'),
    )

    adapterWifiSocket.on('error', (error) =>
      console.log('Adapter socket error:', error.message),
    )

    adapterWifiSocket.on('data', (data) => {
      logs.at(-1)?.responses.push(data)

      console.log(data.filter((byte) => byte !== 0x0d).toString(), data)

      s.write(data)
    })

    s.on('close', () => {
      adapterWifiSocket.end()
      adapterWifiSocket.destroy()
      saveLog(logs, new Date().toJSON())
    })

    s.on('data', (data) => {
      console.log('✅', data.filter((byte) => byte !== 0x0d).toString(), data)

      logs.push({ command: data, responses: [] })

      adapterWifiSocket.write(data, (error) =>
        error
          ? console.log('Adapter socket write error:', error.message)
          : null,
      )
    })
  },
})
