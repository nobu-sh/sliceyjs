import { Constants } from 'discord.js'
import Axios from 'axios'
import { DiscordBotGateway } from 'types'
export function chunk(shards: number[], totalClusters: number): number[][] {
  if (totalClusters < 2) return [shards]

  const len = shards.length
  const out = []
  let i = 0
  let size: number

  if (len % totalClusters === 0) {
    size = Math.floor(len / totalClusters)

    while (i < len) {
      out.push(shards.slice(i, i += size))
    }
  } else {
    while (i < len) {
      size = Math.ceil((len - i) / totalClusters--)
      out.push(shards.slice(i, i += size))
    }
  }

  return out
}
export function createRangeArray(start: number, end: number): number[] {
  const range = []
  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
}
export async function getGateway(token: string): Promise<DiscordBotGateway | undefined> {
  const url = "https://discord.com/api" // DJS Removed Root Url And Versions From Constants. NGL wtf are you doing lol
  const gateway = url + Constants.Endpoints.botGateway

  return new Promise((res) => {
    Axios({
      method: 'get',
      url: gateway,
      headers: {
        "Authorization": `Bot ${token}`,
      },
    })
      .then(({ data }) => {
        res(data)
      })
      .catch(() => {
        res(undefined)
      })
  })
}
