import { getRoutes } from "@/data/getRoutes"

export default async function Home() {
  const routes = await getRoutes()

  return (
    <ul>
      {routes.map((x) => (
        <li key={x.color}>
          {x.name}
          <ul>
            {x.stops.map((stop) => (
              <li>
                {stop.station} - {stop.name} - {stop.direction}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
