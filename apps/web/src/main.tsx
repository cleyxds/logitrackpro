import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import Routes from "./router"

import "./styles/globals.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App>
      <Routes />
    </App>
  </StrictMode>,
)
