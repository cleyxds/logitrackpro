import { createContext } from "react"

type RankingItem = {
  vehicleId: number
  totalKm: number
  placa: string
  modelo: string
  tipo: VehicleType
}

export type DashboardComputed = {
  selectedVehicle: Vehicle | null
  totalKm: number
  volumeByCategory: Array<{ tipo: VehicleType; total: number }>
  ranking: RankingItem[]
  leader: RankingItem | undefined
  highestVolume: number
  upcomingMaintenance: DashboardMaintenance[]
  currentMonthMaintenanceCost: number
  tripCount: number
  fleetSize: number
  totalTripsKm: number
}

export type DashboardContextType = {
  selectedVehicleId: string
  setSelectedVehicleId: (value: string) => void
  vehicles: Vehicle[]
  isPending: boolean
  isError: boolean
  dashboard: DashboardComputed
}

export const DashboardContext = createContext<DashboardContextType | null>(null)
