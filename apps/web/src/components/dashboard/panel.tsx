import type { PropsWithChildren, ReactNode } from "react"

import styles from "./dashboard.module.css"

type PanelProps = PropsWithChildren<{
  title: string
  description: string
  aside?: ReactNode
}>

export default function Panel({ title, description, aside, children }: PanelProps) {
  return (
    <section className={styles.panel}>
      <header className={styles.panelHeader}>
        <div>
          <h2 className={styles.panelTitle}>{title}</h2>
          <p className={styles.panelText}>{description}</p>
        </div>
        {aside}
      </header>
      {children}
    </section>
  )
}
