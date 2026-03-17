import authStyles from "../styles/auth.module.css"

export default function Login() {
  return (
    <article>
      <span className={authStyles.cardTag}>Login</span>
      <h2 className={authStyles.cardTitle}>Acesse sua operacao</h2>
      <p className={authStyles.cardText}>
        Entre com suas credenciais para acompanhar frota, manutencao e produtividade em um
        so lugar.
      </p>

      <form className={authStyles.form}>
        <label className={authStyles.fieldGroup}>
          <span className={authStyles.fieldLabel}>E-mail</span>
          <input
            className={authStyles.input}
            name="email"
            placeholder="voce@logitrack.com"
            type="email"
          />
        </label>

        <label className={authStyles.fieldGroup}>
          <span className={authStyles.fieldLabel}>Senha</span>
          <input
            className={authStyles.input}
            name="password"
            placeholder="Digite sua senha"
            type="password"
          />
        </label>

        <div className={authStyles.formFooter}>
          <p className={authStyles.helperText}>
            Use seu acesso corporativo para entrar no ambiente da operacao.
          </p>
          <button className={authStyles.primaryButton} type="submit">
            Entrar
          </button>
        </div>
      </form>
    </article>
  )
}
