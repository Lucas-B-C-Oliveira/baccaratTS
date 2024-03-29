import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/themes/default'

import { ScoreContextProvider } from './context/ScoreContext'
import { HashRouter } from 'react-router-dom'
import { Router } from './Router'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ScoreContextProvider>
        <HashRouter>
          <Router />
        </HashRouter>
      </ScoreContextProvider>
      <GlobalStyles />
    </ThemeProvider>
  )
}
