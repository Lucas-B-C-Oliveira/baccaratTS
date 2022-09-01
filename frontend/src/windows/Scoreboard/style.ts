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

interface ScoreText {
  fontSize?: number
  isLast: boolean
}

export const ScoreboardContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: url(${scoreboardImageBackground});
  background-size: 100% 100%;
`

export const CurrentTextScoreContainer = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 7.38vw 9.1vw;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;
  column-gap: 14.4vw;
  left: 67.2vw;
  top: 2.9vh;
`

export const LastTextScoreContainer = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  row-gap: 0vh;
  left: 19.5vw;
  top: 78.4vh;
`

export const ScoreTextSpan = styled.span<ScoreText>`
  font-size: ${(props) => {
    if (props.isLast) return '2.6vw'
    else return '3.3vw'
  }};

  font-family: ${(props) => {
    if (props.isLast) return 'Genko Gold'
    else return 'Genko Regular'
  }};

  text-align: ${(props) => {
    if (props.isLast) return 'left'
    else return 'right'
  }};

  display: flex;
  flex-direction: column;
  white-space: nowrap;
`

export const CurrentValuesImage = styled.img`
  position: absolute;

  width: 36.72vw;
  height: 21.2vh;
  left: 52vw;
  top: 3vh;
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
    return props.x + 'vw'
  }};

  top: ${(props) => {
    return props.y + 'vh'
  }};
`
