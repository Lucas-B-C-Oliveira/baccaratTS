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

interface ScoreContainer {
  position: {
    x: number
    y: number
  }
}

export const ScoreboardContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: url(${scoreboardImageBackground});
  background-size: 100%;
`

export const CurrentTextScoreContainer = styled.div<ScoreContainer>`
  position: absolute;
  display: grid;

  grid-template-columns: 7.38vw 9.1vw;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-auto-flow: column;

  row-gap: 5%;
  column-gap: 87%;

  left: ${(props) => {
    return props.position.x + '%'
  }};

  top: ${(props) => {
    return props.position.y + '%'
  }};
`

export const LastTextScoreContainer = styled.div<ScoreContainer>`
  position: absolute;
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

  row-gap: 1%;

  left: ${(props) => {
    return props.position.x + '%'
  }};

  top: ${(props) => {
    return props.position.y + '%'
  }};
`

export const ScoreTextSpan = styled.span<ScoreText>`
  font-size: ${(props) => {
    if (props.isLast) return '220%'
    else return '230%'
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

export const DollarSignSpan = styled.span`` //! TODO: verify this

export const CurrentValuesImage = styled.img`
  position: absolute;

  width: 36.72vw;
  height: 21.2vh;
  left: 52%;
  top: 3%;
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
