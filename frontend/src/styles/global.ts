import { createGlobalStyle } from 'styled-components'
import genkoRegular from '../assets/scoreboard/GenkoRegular.otf'
import genkoGold from '../assets/scoreboard/GenkoGold.otf'

export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'Genko Regular';
    src: url(${genkoRegular}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: auto;
  }

  @font-face {
    font-family: 'Genko Gold';
    src: url(${genkoGold}) format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: auto;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
  }
  :focus {
    outline: none;
  }
  body {
    background: ${(props) => props.theme['gray-600']}; //! TODO: Remove this

    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Genko Regular', sans-serif;
  }
`
