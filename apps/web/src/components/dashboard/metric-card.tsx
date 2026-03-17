import styles from "./dashboard.module.css"

type MetricCardProps = {
  label: string
  value: string
  caption: string
}

export default function MetricCard({ label, value, caption }: MetricCardProps) {
  return (
    <article className={styles.metricCard}>
      <span className={styles.metricLabel}>{label}</span>
      <strong className={styles.metricValue}>{value}</strong>
      <p className={styles.metricCaption}>{caption}</p>
    </article>
  )
}
