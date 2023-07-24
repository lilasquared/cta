import axios from "axios"

type Root = {
  ctatt: Ctatt
}

type Ctatt = {
  tmst: string
  errCd: string
  errNm: string
  eta: Eta[]
}

type Eta = {
  staId: string
  stpId: string
  staNm: string
  stpDe: string
  rn: string
  rt: string
  destSt: string
  destNm: string
  trDr: string
  prdt: string
  arrT: string
  isApp: string
  isSch: string
  isDly: string
  isFlt: string
  flags: string
  lat: string
  lon: string
  heading: string
}

export const getArrivals = async (map_id: string) => {
  const response = await axios.get(
    `https://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=${process.env.CTA_API_KEY}&mapid=${map_id}&outputType=JSON`
  )

  return response.data as Root
}
