import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'
import { Control } from '../pages/Control'
import { Scoreboard } from '../pages/Scoreboard'
import { ScoreContextProvider } from '../context/ScoreContext'
import { GameContainer, ControlContainer } from './style'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ScoreContextProvider>
        <GameContainer >
          <Scoreboard />
          <ControlContainer>
            <Control />
          </ControlContainer>
        </GameContainer>
      </ScoreContextProvider>
      <GlobalStyles />
    </ThemeProvider>
  )
}
