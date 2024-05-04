import ShowFormat from '../enums/showFormat'
import type { Contestant } from './contestant'

export type Show = {
  date: string
  showType: ShowFormat
  contestants: Contestant[]
}
