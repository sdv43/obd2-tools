import { createServer, Socket } from 'node:net'
import { logIps } from './utils.js'

export type TTCPServerOptions = {
  host: string
  port: number
  onconnection: (s: Socket) => void
}

export const createTcpServer = ({
  host,
  port,
  onconnection,
}: TTCPServerOptions) => {
  const server = createServer()

  server.on('connection', (socket) => {
    onconnection(socket)

    socket.on('error', (error) => console.log('🟡 Socket error:', error.message))
    
    socket.on('close', () => console.log('🟡 Socket closed'))
  })

  server.on('listening', () => {
    console.log('🟡 TCP Server started on port', port)
    logIps()
    console.log('\n')
  })

  server.on('error', (error) => console.log('🟡 TCP Server error:', error.message))

  server.on('close', () => console.log('🟡 TCP Server stopped'))

  server.listen(port, host)
}
