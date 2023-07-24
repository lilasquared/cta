import { getStops } from "./getStops"

type Station = {
  id: string
  name: string
}

export const getStations = async (): Promise<Station[]> => {
  const stops = await getStops()
  const stations = stops.map((stop) => {
    return {
      id: stop.station_id,
      name: stop.station,
    }
  })

  return stations
}
