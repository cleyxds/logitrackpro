import { Link, NavLink, Outlet } from "react-router-dom"

import { routes } from "../constants/routes"

import commonStyles from "../styles/common.module.css"
import authStyles from "../styles/auth.module.css"

export default function Auth() {
  return (
    <main className={commonStyles.container}>
      <section className={authStyles.page}>
        <div className={authStyles.panel}>
          <div className={authStyles.copy}>
            <span className={authStyles.eyebrow}>Acesso ao LogiTrack</span>

            <h1 className={authStyles.title}>Entrar ou criar conta para começar.</h1>

            <p className={authStyles.description}>
              Escolha como deseja acessar a plataforma e continue para o fluxo de
              autenticacao.
            </p>

            <Link className={authStyles.backLink} to={routes["landing-page"]}>
              Voltar para a página inicial
            </Link>
          </div>

          <div className={authStyles.content}>
            <nav className={authStyles.tabs} aria-label="Navegacao de autenticacao">
              <NavLink
                className={({ isActive }) =>
                  isActive ? authStyles.tabLinkActive : authStyles.tabLink
                }
                to={routes.auth.login}
              >
                Login
              </NavLink>

              <NavLink
                className={({ isActive }) =>
                  isActive ? authStyles.tabLinkActive : authStyles.tabLink
                }
                to={routes.auth.register}
              >
                Cadastro
              </NavLink>
            </nav>

            <div className={authStyles.formPanel}>
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
