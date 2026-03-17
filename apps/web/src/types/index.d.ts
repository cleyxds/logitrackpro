type VehicleType = "LEVE" | "PESADO"

type Vehicle = {
  id: number
  placa: string
  modelo: string
  tipo: VehicleType
}

type Trip = {
  id: number
  veiculoId: number
  veiculoPlaca: string
  dataSaida: string
  dataChegada: string
  origem: string
  destino: string
  kmPercorrida: number
}

type DashboardMaintenance = {
  id: number
  veiculoId: number
  veiculoPlaca: string
  veiculoModelo: string
  tipoServico: string
  dataInicio: string
  dataFinalizacao: string | null
  custoEstimado: number
  status: "PENDENTE" | "EM_REALIZACAO" | "CONCLUIDA"
}

type DashboardSummary = {
  currentMonthMaintenanceCost: number
  upcomingMaintenance: DashboardMaintenance[]
}
