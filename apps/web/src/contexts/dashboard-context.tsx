import { useMemo, useState } from "react"

import { useQuery } from "@tanstack/react-query"

import { DashboardContext, type DashboardComputed } from "../stores/dashboard-store"

import { api, api_routes } from "../services/api"

type RankingItem = {
  vehicleId: number
  totalKm: number
  placa: string
  modelo: string
  tipo: VehicleType
}

export default function DashboardProvider({ children }: React.PropsWithChildren) {
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("all")

  const vehiclesQuery = useQuery({
    queryKey: ["vehicles"],
    queryFn: async () => {
      const response = await api.get<Vehicle[]>(api_routes.veiculos)
      return response.data
    },
  })

  const tripsQuery = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const response = await api.get<Trip[]>(api_routes.viagens)
      return response.data
    },
  })

  const dashboardQuery = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const response = await api.get<DashboardSummary>(api_routes.dashboard)
      return response.data
    },
  })

  const isPending =
    vehiclesQuery.isPending || tripsQuery.isPending || dashboardQuery.isPending
  const isError = vehiclesQuery.isError || tripsQuery.isError || dashboardQuery.isError

  const dashboard = useMemo<DashboardComputed>(() => {
    const vehicles = vehiclesQuery.data ?? []
    const trips = tripsQuery.data ?? []
    const dashboardData = dashboardQuery.data
    const selectedId = selectedVehicleId === "all" ? null : Number(selectedVehicleId)
    const vehicleById = new Map(vehicles.map((vehicle) => [vehicle.id, vehicle]))

    const filteredTrips =
      selectedId === null ? trips : trips.filter((trip) => trip.veiculoId === selectedId)

    const totalKm = filteredTrips.reduce(
      (total, trip) => total + Number(trip.kmPercorrida),
      0,
    )

    const volumeByCategory: Array<{ tipo: VehicleType; total: number }> = (
      ["LEVE", "PESADO"] as const
    ).map((tipo) => ({
      tipo,
      total: trips.filter((trip) => vehicleById.get(trip.veiculoId)?.tipo === tipo)
        .length,
    }))

    const topVehicleMap = trips.reduce<Map<number, number>>((accumulator, trip) => {
      const current = accumulator.get(trip.veiculoId) ?? 0
      accumulator.set(trip.veiculoId, current + Number(trip.kmPercorrida))
      return accumulator
    }, new Map())

    const ranking: RankingItem[] = Array.from(topVehicleMap.entries())
      .map(([vehicleId, totalKmByVehicle]) => {
        const vehicle = vehicleById.get(vehicleId)

        return {
          vehicleId,
          totalKm: totalKmByVehicle,
          placa: vehicle?.placa ?? "Sem placa",
          modelo: vehicle?.modelo ?? "Veículo não identificado",
          tipo: vehicle?.tipo ?? "LEVE",
        }
      })
      .sort((left, right) => right.totalKm - left.totalKm)

    const totalTripsKm = trips.reduce(
      (total, trip) => total + Number(trip.kmPercorrida),
      0,
    )

    return {
      selectedVehicle: selectedId === null ? null : (vehicleById.get(selectedId) ?? null),
      totalKm,
      volumeByCategory,
      ranking,
      leader: ranking[0],
      highestVolume: Math.max(...volumeByCategory.map((item) => item.total), 1),
      upcomingMaintenance: dashboardData?.upcomingMaintenance ?? [],
      currentMonthMaintenanceCost: Number(
        dashboardData?.currentMonthMaintenanceCost ?? 0,
      ),
      tripCount: trips.length,
      fleetSize: vehicles.length,
      totalTripsKm,
    }
  }, [dashboardQuery.data, selectedVehicleId, tripsQuery.data, vehiclesQuery.data])

  const value = useMemo(
    () => ({
      selectedVehicleId,
      setSelectedVehicleId,
      vehicles: vehiclesQuery.data ?? [],
      isPending,
      isError,
      dashboard,
    }),
    [dashboard, isError, isPending, selectedVehicleId, vehiclesQuery.data],
  )

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}
