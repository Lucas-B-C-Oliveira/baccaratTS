import styled from 'styled-components'
import scoreboardImageBackground from './../../assets/scoreboard/background-scoreboard.png'

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
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: url(${scoreboardImageBackground});
  background-size: 100%;
`

export const BallDiv = styled.div<Ball>`
  position: absolute;
  background: url(${(props) => props.image});

  background-size: 2.29vw 4.07vh;
  width: 2.29vw;
  height: 4.07vh;

  left: ${(props) => {
    return props.position.x + 'vw'
  }};

  top: ${(props) => {
    return props.position.y + 'vh'
  }};
`

export const BarImg = styled.img<Bar>`
  position: absolute;

  width: 1.35vw;
  height: 0.37037vh;

  left: ${(props) => {
    return props.x + '%'
  }};

  top: ${(props) => {
    return props.y + '%'
  }};
`
