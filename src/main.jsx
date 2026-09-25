import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Saltos a secciones (#soluciones, #contacto...). Las secciones fuera de pantalla se
// procesan recién al acercarse (content-visibility en index.css), así que antes de
// saltar se procesan todas; si no, el destino quedaría corrido por las alturas estimadas.
const irASeccion = (hash, suave = true) => {
  const destino = document.getElementById(decodeURIComponent(hash.slice(1)))
  if (!destino) return false
  document.documentElement.classList.add('sin-diferir')

  const saltar = (behavior) => destino.scrollIntoView({ behavior, block: 'start' })
  const margen = parseFloat(getComputedStyle(destino).scrollMarginTop) || 0
  const llego = () => Math.abs(destino.getBoundingClientRect().top - margen) <= 4

  // El desplazamiento suave se corta si justo cambia el alto de algo (animaciones que
  // recién parten, fuentes o imágenes que terminan de cargar). Durante un momento se
  // revisa: si se detuvo antes de llegar, se completa de golpe. Si la persona se pone a
  // desplazarse por su cuenta, se deja de revisar.
  let usuarioSeMovio = false
  const soltar = () => { usuarioSeMovio = true }
  window.addEventListener('wheel', soltar, { once: true, passive: true })
  window.addEventListener('touchstart', soltar, { once: true, passive: true })
  let ultimoY = -1
  const revisar = (intentos) => {
    if (usuarioSeMovio || llego()) return
    const detenido = Math.round(window.scrollY) === ultimoY
    ultimoY = Math.round(window.scrollY)
    if (detenido) saltar('instant')
    if (intentos > 0) setTimeout(() => revisar(intentos - 1), 150)
  }

  // Dos cuadros: en el primero se aplica la clase, en el segundo ya están las alturas reales
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      saltar(suave ? 'smooth' : 'instant')
      setTimeout(() => revisar(10), 150)
    }),
  )
  return true
}

// Enlaces a una sección de la misma página: el salto lo hacemos nosotros (el
// desplazamiento nativo se corta si justo cambia el alto de la página, como al
// cerrar el menú del celular). Los enlaces a otra página siguen su curso normal.
document.addEventListener(
  'click',
  (e) => {
    const link = e.target.closest?.('a[href*="#"]')
    if (!link) return
    const url = new URL(link.href, window.location.href)
    if (!url.hash || url.pathname !== window.location.pathname) return
    if (irASeccion(url.hash)) {
      e.preventDefault()
      window.history.pushState(null, '', url.hash)
    }
  },
  { capture: true },
)

// Al llegar con un # en la dirección (por ejemplo dataorbit.cl/#contacto), se espera
// a que la sección exista (las páginas se arman con JavaScript) y se salta a ella.
const irAlCargar = (hash, intentos = 30) => {
  if (!irASeccion(hash, false) && intentos > 0) setTimeout(() => irAlCargar(hash, intentos - 1), 100)
}
if (window.location.hash) window.addEventListener('load', () => irAlCargar(window.location.hash))

const root = document.getElementById('root')
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// El home llega pre-renderizado (index.html ya trae su HTML): React lo "hidrata",
// es decir, toma lo que ya está en pantalla y le agrega la interactividad. Las
// demás rutas llegan con app.html, que viene vacío, y se dibujan desde cero.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}
