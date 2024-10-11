import os from 'node:os'

export const getIps = () => {
  const result: Record<string, string[]> = {}

  Object.entries(os.networkInterfaces()).forEach(([iface, ips]) => {
    if (!ips) {
      return
    }

    const ipv4 = ips
      .filter((ip) => ip.family === 'IPv4')
      .map((ip) => ip.address)

    if (ipv4.length) {
      result[iface] = ipv4
    }
  })

  return result
}

export const logIps = () => {
  const ips = getIps()

  Object.entries(ips).forEach(([iface, ip]) => {
    console.log(` - ${iface}: ${ip.join(', ')}`);
  })
}

