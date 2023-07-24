import { promises as fs } from "fs"
import { NextResponse } from "next/server"
import { parse } from "csv-parse/sync"

export async function GET() {
  const file = await fs.readFile(process.cwd() + "/data/stops.csv", "utf-8")
  const stops = parse(file, { columns: true })

  return NextResponse.json(stops)
}
