import { useState } from "react"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/use-auth"
import { routes } from "../../constants/routes"

import authStyles from "../../styles/auth.module.css"

export default function Register() {
  const navigate = useNavigate()
  const { register, isLoading, error } = useAuth()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [localError, setLocalError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setLocalError("")

    if (!nome || !email || !password) {
      setLocalError("Todos os campos são obrigatórios")
      return
    }

    if (password.length < 6) {
      setLocalError("A senha deve ter no mínimo 6 caracteres")
      return
    }

    try {
      await register(email, password, nome)
      navigate(routes.dashboard)
    } catch {
      setLocalError(error || "Falha ao registrar. Tente novamente.")
    }
  }

  return (
    <article>
      <span className={authStyles.cardTag}>Cadastro</span>
      <h2 className={authStyles.cardTitle}>Crie sua conta inicial</h2>
      <p className={authStyles.cardText}>
        Configure o primeiro acesso para centralizar o controle dos veiculos e iniciar o
        uso da plataforma.
      </p>

      <form className={authStyles.form} onSubmit={handleSubmit}>
        <label className={authStyles.fieldGroup}>
          <span className={authStyles.fieldLabel}>Nome</span>
          <input
            className={authStyles.input}
            name="name"
            placeholder="Responsavel pela operacao"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            disabled={isLoading}
          />
        </label>

        <label className={authStyles.fieldGroup}>
          <span className={authStyles.fieldLabel}>E-mail corporativo</span>
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
            placeholder="Crie uma senha"
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
            O cadastro inicial libera o acesso ao espaco administrativo da frota.
          </p>
          <button
            className={authStyles.secondaryButton}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
    </article>
  )
}
