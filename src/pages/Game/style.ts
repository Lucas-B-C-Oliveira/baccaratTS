import styled from 'styled-components'
import gameBgImg from '../../assets/game/game-bg.png'

export const GameContainer = styled.div`
  width: 1920px;
  height: 1080px;
  background: url(${gameBgImg}); //! TODO: verify if this is a best solution for a import a image for a image in background
`
