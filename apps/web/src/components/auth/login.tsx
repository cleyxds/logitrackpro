import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/use-auth"
import { routes } from "../../constants/routes"

import authStyles from "../../styles/auth.module.css"

export default function Login() {
  const navigate = useNavigate()
  const { login, isLoading, error } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [localError, setLocalError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setLocalError("")

    if (!email || !password) {
      setLocalError("Email e senha são obrigatórios")
      return
    }

    try {
      await login(email, password)
      navigate(routes.dashboard)
    } catch {
      setLocalError(error || "Falha ao fazer login. Verifique suas credenciais.")
    }
  }

  return (
    <article>
      <span className={authStyles.cardTag}>Login</span>
      <h2 className={authStyles.cardTitle}>Acesse sua operacao</h2>
      <p className={authStyles.cardText}>
        Entre com suas credenciais para acompanhar frota, manutencao e produtividade em um
        so lugar.
      </p>

      <form className={authStyles.form} onSubmit={handleSubmit}>
        <label className={authStyles.fieldGroup}>
          <span className={authStyles.fieldLabel}>E-mail</span>
          <input
            className={authStyles.input}
            name="email"
            placeholder="voce@logitrack.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </label>

        <label className={authStyles.fieldGroup}>
          <span className={authStyles.fieldLabel}>Senha</span>
          <input
            className={authStyles.input}
            name="password"
            placeholder="Digite sua senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </label>

        {(localError || error) && (
          <p style={{ color: "var(--error, #ff4444)", fontSize: "0.875rem" }}>
            {localError || error}
          </p>
        )}

        <div className={authStyles.formFooter}>
          <p className={authStyles.helperText}>
            Use seu acesso corporativo para entrar no ambiente da operacao.
          </p>

          <button className={authStyles.primaryButton} type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
    </article>
  )
}
