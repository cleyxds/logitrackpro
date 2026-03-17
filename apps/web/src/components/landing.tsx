import commonStyles from "../styles/common.module.css"
import { Link } from "react-router-dom"

import { routes } from "../constants/routes"
import landingStyles from "../styles/landing.module.css"

export default function Landing() {
  return (
    <main className={commonStyles.container}>
      <div className={landingStyles.page}>
        <section className={landingStyles.hero}>
          <div className={landingStyles.heroCopy}>
            <span className={landingStyles.eyebrow}>
              Logística interestadual com controle real
            </span>
            <h1 className={landingStyles.title}>
              Visibilidade operacional para uma frota que não pode parar.
            </h1>
            <p className={landingStyles.description}>
              A LogiTrack centraliza a gestão de veículos, manutenção e produtividade em
              uma única plataforma, substituindo planilhas isoladas por decisões baseadas
              em dados.
            </p>

            <div className={landingStyles.actions}>
              <Link className={landingStyles.primaryAction} to={routes.auth.login}>
                Comece agora
              </Link>
            </div>
          </div>

          <div className={landingStyles.heroPanel}>
            <div className={landingStyles.metricCard}>
              <span className={landingStyles.metricLabel}>Cenário atual</span>
              <strong className={landingStyles.metricValue}>Baixa previsibilidade</strong>
              <p className={landingStyles.metricText}>
                Falta de visão consolidada sobre disponibilidade, custos e desempenho da
                frota.
              </p>
            </div>

            <div className={landingStyles.metricGrid}>
              <article className={landingStyles.infoCard}>
                <span className={landingStyles.infoTitle}>Agendamentos</span>
                <p className={landingStyles.infoText}>
                  Reduz erros operacionais no uso diário dos veículos.
                </p>
              </article>
              <article className={landingStyles.infoCard}>
                <span className={landingStyles.infoTitle}>Manutenção</span>
                <p className={landingStyles.infoText}>
                  Acompanha custos e evita surpresas por falta de histórico.
                </p>
              </article>
              <article className={landingStyles.infoCard}>
                <span className={landingStyles.infoTitle}>Produtividade</span>
                <p className={landingStyles.infoText}>
                  Expõe gargalos e melhora a previsibilidade das entregas.
                </p>
              </article>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
