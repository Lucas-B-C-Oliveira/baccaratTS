import styled from 'styled-components'
import scoreboardImageBackground from '../../assets/scoreboard/background-scoreboard.png'

interface Ball {
  image: string
  position: {
    x: number
    y: number
  }
}

interface Bar {
  x: number
  y: number
}

export const ScoreboardContainer = styled.div`
  width: 1920px;
  height: 1080px;
  background: url(${scoreboardImageBackground}); //! TODO: verify if this is a best solution for a import a image for a image in background
`

export const BallDiv = styled.div<Ball>`
  background: url(${(props) => props.image});
  background-size: 2.5rem 2.5rem;
  width: 2.5rem;
  height: 2.5rem;
  position: absolute;

  left: ${(props) => {
    return props.position.x + 'rem'
  }};

  top: ${(props) => {
    return props.position.y + 'rem'
  }};

`

export const BarImg = styled.img<Bar>`
  position: absolute;
  /* top: 2.08rem; */
  left: ${(props) => {
    return props.x + 'rem'
  }};

  top: ${(props) => {
    return props.y + 'rem'
  }};

`
