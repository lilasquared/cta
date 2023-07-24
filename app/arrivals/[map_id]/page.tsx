import moment from "moment"
import { groupBy } from "lodash"
import { getArrivals } from "@/data/getArrivals"
import { getStations } from "@/data/getStations"

export default async function Page({ params }: { params: { map_id: string } }) {
  const stations = await getStations()
  const data = await getArrivals(params.map_id)

  const station = stations.find((x) => x.id === params.map_id)
  const directions = groupBy(data.ctatt.eta, (x) => x.stpDe)

  return (
    <div>
      <h1>Arrivals for {station?.name}</h1>
      <div>
        {Object.keys(directions).map((x, i) => (
          <div key={x}>
            <h1 className="text-center">{x}</h1>
            {directions[x].map((x) => (
              <div key={i} className="bg-blue-line text-white p-3 font-bold my-2">
                {x.destNm} - {moment(x.arrT).fromNow()}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
