import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { routes } from "../../constants/routes"
import { viagemService } from "../../services/api"
import { formatDate, formatKm } from "../../utils/dashboard-utils"

import styles from "./viagens.module.css"

export default function Viagens() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const {
    data: trips = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const response = await viagemService.findAll()
      return response.data
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => viagemService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
    onSettled: () => setDeletingId(null),
  })

  const handleDelete = (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta viagem?")) return
    setDeletingId(id)
    deleteMutation.mutate(id)
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div>
            <Link className={styles.backLink} to={routes.dashboard}>
              ← Dashboard
            </Link>
            <h1 className={styles.title}>Módulo de Viagens</h1>
            <p className={styles.description}>
              Gerencie todas as viagens registradas da frota.
            </p>
          </div>
          <Link className={styles.addButton} to={routes.viagens.new}>
            + Nova Viagem
          </Link>
        </header>

        {isPending && <div className={styles.loading}>Carregando viagens...</div>}

        {isError && (
          <div className={styles.error}>
            Não foi possível carregar as viagens. Verifique se a API está em execução.
          </div>
        )}

        {!isPending && !isError && trips.length === 0 && (
          <div className={styles.empty}>
            Nenhuma viagem registrada.{" "}
            <Link to={routes.viagens.new}>Cadastre a primeira.</Link>
          </div>
        )}

        {!isPending && !isError && trips.length > 0 && (
          <div className={styles.list}>
            {trips.map((trip) => (
              <article className={styles.item} key={trip.id}>
                <div className={styles.itemMain}>
                  <div className={styles.route}>
                    <span className={styles.plate}>{trip.veiculoPlaca}</span>
                    <span className={styles.routeArrow}>
                      {trip.origem} → {trip.destino}
                    </span>
                  </div>
                  <div className={styles.meta}>
                    <span>Saída: {formatDate(trip.dataSaida)}</span>
                    <span>Chegada: {formatDate(trip.dataChegada)}</span>
                    <span>{formatKm(Number(trip.kmPercorrida))} km</span>
                  </div>
                </div>
                <div className={styles.actions}>
                  <button
                    className={styles.editButton}
                    onClick={() => navigate(`/dashboard/viagens/${trip.id}/edit`)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    disabled={deletingId === trip.id}
                    onClick={() => handleDelete(trip.id)}
                  >
                    {deletingId === trip.id ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
