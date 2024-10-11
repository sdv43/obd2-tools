export type TBufferAsJson = {
  type: 'Buffer'
  data: number[]
}

export type TLogFile = {
  command: TBufferAsJson
  responses: TBufferAsJson[]
}[]
