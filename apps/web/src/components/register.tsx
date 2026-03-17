import authStyles from "../styles/auth.module.css"

export default function Register() {
  return (
    <article>
      <span className={authStyles.cardTag}>Cadastro</span>
      <h2 className={authStyles.cardTitle}>Crie sua conta inicial</h2>
      <p className={authStyles.cardText}>
        Configure o primeiro acesso para centralizar o controle dos veiculos e iniciar o
        uso da plataforma.
      </p>

      <form className={authStyles.form}>
        <label className={authStyles.fieldGroup}>
          <span className={authStyles.fieldLabel}>Nome</span>
          <input
            className={authStyles.input}
            name="name"
            placeholder="Responsavel pela operacao"
            type="text"
          />
        </label>

        <label className={authStyles.fieldGroup}>
          <span className={authStyles.fieldLabel}>E-mail corporativo</span>
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
            placeholder="Crie uma senha"
            type="password"
          />
        </label>

        <div className={authStyles.formFooter}>
          <p className={authStyles.helperText}>
            O cadastro inicial libera o acesso ao espaco administrativo da frota.
          </p>
          <button className={authStyles.secondaryButton} type="submit">
            Registrar
          </button>
        </div>
      </form>
    </article>
  )
}
