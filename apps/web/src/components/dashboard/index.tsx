import { useNavigate } from "react-router-dom"
import { useDashboard } from "../../hooks/use-dashboard"
import { useAuth } from "../../hooks/use-auth"
import { routes } from "../../constants/routes"

import MetricCard from "./metric-card"
import Panel from "./panel"

import { formatCurrency, formatDate, formatKm } from "../../utils/dashboard-utils"

import styles from "./dashboard.module.css"

export default function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const {
    selectedVehicleId,
    setSelectedVehicleId,
    vehicles,
    isPending,
    isError,
    dashboard,
  } = useDashboard()

  const handleLogout = async () =>
    await logout.mutateAsync(undefined, {
      onSettled: () => {
        navigate(routes["landing-page"])
      },
    })

  if (isPending) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <div className={styles.loading}>
            Carregando indicadores operacionais da frota.
          </div>
        </div>
      </main>
    )
  }

  if (isError) {
    return (
      <main className={styles.page}>
        <div className={styles.shell}>
          <div className={styles.error}>
            Não foi possível carregar os dados do dashboard. Verifique se a API está em
            execução.
          </div>
        </div>
      </main>
    )
  }

  const { highestVolume, leader } = dashboard

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <h2>Bem-vindo(a), {user?.nome || "Usuário"}!</h2>
          <button
            onClick={handleLogout}
            style={{
              padding: "0.625rem 1rem",
              backgroundColor: "var(--accent, #e74c3c)",
              color: "white",
              border: "none",
              borderRadius: "0.25rem",
              cursor: "pointer",
              fontSize: "0.875rem",
            }}
          >
            {logout.isPending ? "Saindo..." : "Sair"}
          </button>
        </div>
        <section className={styles.hero}>
          <article className={styles.heroCard}>
            <span className={styles.eyebrow}>Painel operacional</span>

            <h1 className={styles.title}>LogiTrack Pro</h1>

            <p className={styles.description}>
              Acompanhe quilometragem consolidada, distribuição por categoria, agenda de
              manutenção e exposição financeira do mês sem depender de planilhas
              paralelas.
            </p>

            <div className={styles.filterWrap}>
              <label className={styles.filterLabel} htmlFor="vehicle-filter">
                Veículo selecionado:
              </label>

              <select
                id="vehicle-filter"
                className={styles.select}
                onChange={(event) => setSelectedVehicleId(event.target.value)}
                value={selectedVehicleId}
              >
                <option value="all">Toda a frota</option>

                {vehicles.map((vehicle) => (
                  <option key={vehicle.id} value={String(vehicle.id)}>
                    {vehicle.placa} • {vehicle.modelo}
                  </option>
                ))}
              </select>

              <p className={styles.helper}>
                Escopo atual:{" "}
                {dashboard.selectedVehicle
                  ? `${dashboard.selectedVehicle.placa} (${dashboard.selectedVehicle.modelo})`
                  : "Toda a frota"}
              </p>
            </div>
          </article>

          <Panel
            aside={<span className={styles.badge}>Leve vs Pesado</span>}
            description="Quantidade de viagens agrupadas por tipo de veículo para expor a distribuição da operação."
            title="Volume por categoria"
          >
            <div className={styles.categoryChart}>
              {dashboard.volumeByCategory.map((item) => (
                <div className={styles.categoryRow} key={item.tipo}>
                  <div className={styles.categoryHeader}>
                    <span>{item.tipo === "LEVE" ? "Leve" : "Pesado"}</span>
                    <span>{item.total} viagens</span>
                  </div>

                  <div className={styles.progressTrack}>
                    <div
                      className={styles.progressBar}
                      style={{ width: `${(item.total / highestVolume) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </section>

        <section className={styles.metricsGrid}>
          <MetricCard
            caption={
              dashboard.selectedVehicle
                ? "Quilometragem acumulada do veículo selecionado."
                : "Quilometragem acumulada de toda a frota."
            }
            label="Total de KM percorrido"
            value={`${formatKm(dashboard.totalKm)} km`}
          />

          <MetricCard
            caption="Soma estimada das manutenções registradas para o mês atual."
            label="Projeção financeira"
            value={formatCurrency(dashboard.currentMonthMaintenanceCost)}
          />

          <MetricCard
            caption={
              leader
                ? `${leader.modelo} lidera a frota em quilômetros acumulados.`
                : "Aguardando histórico de viagens."
            }
            label="Ranking de utilização"
            value={leader ? leader.placa : "Sem dados"}
          />
        </section>

        <section className={styles.contentGrid}>
          <Panel
            aside={<span className={styles.badge}>Próximas 5</span>}
            description="Manutenções futuras ordenadas por data para facilitar o planejamento da oficina."
            title="Cronograma de manutenção"
          >
            {dashboard.upcomingMaintenance.length === 0 ? (
              <div className={styles.empty}>Nenhuma manutenção futura encontrada.</div>
            ) : (
              <div className={styles.scheduleList}>
                {dashboard.upcomingMaintenance.map((item) => (
                  <article className={styles.scheduleItem} key={item.id}>
                    <div className={styles.scheduleTop}>
                      <strong>{item.tipoServico}</strong>
                      <span className={styles.badge}>
                        {item.status.replaceAll("_", " ")}
                      </span>
                    </div>
                    <div className={styles.scheduleMeta}>
                      <span>{item.veiculoPlaca}</span>
                      <span>{item.veiculoModelo}</span>
                      <span>{formatDate(item.dataInicio)}</span>
                      <span>{formatCurrency(Number(item.custoEstimado))}</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Panel>

          <Panel
            aside={<span className={styles.badge}>Top 3</span>}
            description="Veículos ordenados pela soma total de quilometragem acumulada em viagens registradas."
            title="Ranking de utilização"
          >
            {dashboard.ranking.length === 0 ? (
              <div className={styles.empty}>
                Nenhuma viagem encontrada para montar o ranking.
              </div>
            ) : (
              <div className={styles.rankingList}>
                {dashboard.ranking.slice(0, 3).map((item, index) => (
                  <article className={styles.rankingItem} key={item.vehicleId}>
                    <div className={styles.rankingTop}>
                      <strong>
                        {index + 1}. {item.placa}
                      </strong>
                      <span className={styles.badge}>{item.tipo}</span>
                    </div>
                    <div className={styles.rankingMeta}>
                      <span>{item.modelo}</span>
                      <span>{formatKm(item.totalKm)} km acumulados</span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Panel>
        </section>
      </div>
    </main>
  )
}
