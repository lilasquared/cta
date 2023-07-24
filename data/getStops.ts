import { promises as fs } from "fs"
import { parse } from "csv-parse/sync"

type RawStop = {
  STOP_ID: string
  DIRECTION_ID: string
  STOP_NAME: string
  STATION_NAME: string
  STATION_DESCRIPTIVE_NAME: string
  MAP_ID: string
  ADA: string
  RED: boolean
  BLUE: boolean
  G: boolean
  BRN: boolean
  P: boolean
  Pexp: boolean
  Y: boolean
  Pnk: boolean
  O: boolean
}

type Stop = {
  id: string
  station_id: string
  direction: string
  name: string
  station: string
  color: RouteColor
}

const getRouteColor = (stop: RawStop): RouteColor => {
  if (stop.RED) return "red"
  if (stop.BLUE) return "blue"
  if (stop.G) return "green"
  if (stop.BRN) return "brown"
  if (stop.P) return "purple"
  if (stop.Pexp) return "purple-express"
  if (stop.Y) return "yellow"
  if (stop.Pnk) return "pink"
  return "orange"
}

// get all the colors from RouteColor as a const array
const routeColors = ["red", "blue", "green", "brown", "purple", "purple-express", "yellow", "pink", "orange"] as const
type RouteColor = (typeof routeColors)[number]

export const getStops = async (): Promise<Stop[]> => {
  const file = await fs.readFile(process.cwd() + "/data/stops.csv", "utf-8")
  const rawStops = parse(file, {
    columns: true,
    cast: (value) => {
      if (value === "true") {
        return true
      }

      if (value === "false") {
        return false
      }
      return value
    },
  }) as RawStop[]
  const stops = rawStops.map<Stop>((x) => ({
    id: x.STOP_ID,
    station_id: x.MAP_ID,
    direction: x.DIRECTION_ID,
    name: x.STOP_NAME,
    station: x.STATION_NAME,
    color: getRouteColor(x),
  }))

  return stops
}
