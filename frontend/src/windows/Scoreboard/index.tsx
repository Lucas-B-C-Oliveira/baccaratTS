import { useScoreStore } from '../../stores/score'
import { BallDiv, BarImg, ScoreboardContainer } from './style'

import Banker from '../../assets/scoreboard/banker.png'
import Player from '../../assets/scoreboard/player.png'
import TieHandsBall from '../../assets/scoreboard/tie-hands-ball.png'
import TieHandsBar from '../../assets/scoreboard/tie-hands-bar.png'
import Player8 from '../../assets/scoreboard/player-8.png'
import Player9 from '../../assets/scoreboard/player-9.png'
import Banker8 from '../../assets/scoreboard/banker-8.png'
import Banker9 from '../../assets/scoreboard/banker-9.png'
import { ScoreBar } from './components/ScoreBar'
import { useContext, useEffect, useRef } from 'react'
import { ScoreContext } from '../../context/ScoreContext'
import { io, Socket } from 'socket.io-client'

export const ballsImages = [
  Banker,
  Player,
  TieHandsBall,
  Player8,
  Player9,
  Banker8,
  Banker9,
]

export enum BallTypes {
  BANKER,
  PLAYER,
  TIE_HANDS_BALL,
  PLAYER_8,
  PLAYER_9,
  BANKER_8,
  BANKER_9,
  DEFAULT,
}

export function Scoreboard() {
  const ballsTop = useScoreStore((state) => state.ballsTop)
  const ballsBottom = useScoreStore((state) => state.ballsBottom)
  const socket = useRef<null | Socket>(null)
  const calls = useRef(0) //! TODO: Remove this variable and its checks
  const isDev = useRef(false) //! TODO: Remove this variable and its checks

  const FONT_SIZE_OF_MAIN_BAR = 160
  const HEIGHT_OF_MAIN_BAR = 5.0
  const WIDTH_OF_MAIN_BAR = 44.69

  const FONT_SIZE_OF_LASTS_BAR = 110
  const HEIGHT_OF_LASTS_BAR = 4
  const WIDTH_OF_LASTS_BAR = 32.25

  const POSITION_X_OF_LASTS_BARS = 31.2

  const POSITION_OF_MAIN_BAR = {
    x: 52.4,
    y: 25.2,
  }

  const POSITION_OF_LAST_BAR = {
    x: POSITION_X_OF_LASTS_BARS,
    y: 73,
  }

  const POSITION_OF_PENULT_BAR = {
    x: POSITION_X_OF_LASTS_BARS,
    y: 77.6,
  }

  const POSITION_OF_ANTEPENULT_BAR = {
    x: POSITION_X_OF_LASTS_BARS,
    y: 81.9,
  }

  const {
    addBallsInScore,

    /// Main Bar Variables
    fillOfBankerBar,
    fillOfPlayerBar,
    fillOfTieHandsBar,
    textOfBankerBar,
    textOfPlayerBar,
    textOfTieHandsBar,

    /// Last Bar Variables
    fillOfBankerLastBar,
    fillOfPlayerLastBar,
    fillOfTieHandsLastBar,
    textOfBankerLastBar,
    textOfPlayerLastBar,
    textOfTieHandsLastBar,

    /// Penult Bar Variables
    fillOfBankerPenultBar,
    fillOfPlayerPenultBar,
    fillOfTieHandsPenultBar,
    textOfBankerPenultBar,
    textOfPlayerPenultBar,
    textOfTieHandsPenultBar,

    /// Antepenult Bar Variables
    fillOfBankerAntepenultBar,
    fillOfPlayerAntepenultBar,
    fillOfTieHandsAntepenultBar,
    textOfBankerAntepenultBar,
    textOfPlayerAntepenultBar,
    textOfTieHandsAntepenultBar,
  } = useContext(ScoreContext)

  useEffect(() => {
    socket.current = io('ws://localhost:9014', { forceNew: true })

    if (isDev.current) {
      //! TODO: Remove this check "isDev"
      socket.current.on('add ball', (ball: number) => {
        calls.current = calls.current + 1

        if (calls.current === 1) {
          addBallsInScore(ball)
        } else if (calls.current > 1) {
          calls.current = 0
        }
      })
    } else {
      socket.current.on('add ball', (ball: number) => {
        addBallsInScore(ball)
      })
    }
  }, [])

  return (
    <ScoreboardContainer>
      {ballsTop.map((ball) => (
        <BallDiv
          key={ball.key}
          image={ballsImages[ball.image]}
          position={{ x: ball.position.x, y: ball.position.y }}
        />
      ))}

      {ballsBottom.map((ball) => (
        <BallDiv
          key={ball.key}
          image={ballsImages[ball.image]}
          position={{ x: ball.position.x, y: ball.position.y }}
        >
          {ball.bars.map((bar) => (
            <BarImg
              key={bar.key}
              src={TieHandsBar}
              x={bar.x}
              y={bar.y}
            ></BarImg>
          ))}
        </BallDiv>
      ))}

      <ScoreBar
        position={POSITION_OF_MAIN_BAR}
        fontSize={FONT_SIZE_OF_MAIN_BAR}
        height={HEIGHT_OF_MAIN_BAR}
        width={WIDTH_OF_MAIN_BAR}
        fillOfBanker={fillOfBankerBar.current}
        fillOfPlayer={fillOfPlayerBar.current}
        fillOfTieHands={fillOfTieHandsBar.current}
        textOfBanker={textOfBankerBar.current}
        textOfPlayer={textOfPlayerBar.current}
        textOfTieHand={textOfTieHandsBar.current}
      />

      <ScoreBar
        position={POSITION_OF_LAST_BAR}
        fontSize={FONT_SIZE_OF_LASTS_BAR}
        height={HEIGHT_OF_LASTS_BAR}
        width={WIDTH_OF_LASTS_BAR}
        fillOfBanker={fillOfBankerLastBar.current}
        fillOfPlayer={fillOfPlayerLastBar.current}
        fillOfTieHands={fillOfTieHandsLastBar.current}
        textOfBanker={textOfBankerLastBar.current}
        textOfPlayer={textOfPlayerLastBar.current}
        textOfTieHand={textOfTieHandsLastBar.current}
      />

      <ScoreBar
        position={POSITION_OF_PENULT_BAR}
        fontSize={FONT_SIZE_OF_LASTS_BAR}
        height={HEIGHT_OF_LASTS_BAR}
        width={WIDTH_OF_LASTS_BAR}
        fillOfBanker={fillOfBankerPenultBar.current}
        fillOfPlayer={fillOfPlayerPenultBar.current}
        fillOfTieHands={fillOfTieHandsPenultBar.current}
        textOfBanker={textOfBankerPenultBar.current}
        textOfPlayer={textOfPlayerPenultBar.current}
        textOfTieHand={textOfTieHandsPenultBar.current}
      />

      <ScoreBar
        position={POSITION_OF_ANTEPENULT_BAR}
        fontSize={FONT_SIZE_OF_LASTS_BAR}
        height={HEIGHT_OF_LASTS_BAR}
        width={WIDTH_OF_LASTS_BAR}
        fillOfBanker={fillOfBankerAntepenultBar.current}
        fillOfPlayer={fillOfPlayerAntepenultBar.current}
        fillOfTieHands={fillOfTieHandsAntepenultBar.current}
        textOfBanker={textOfBankerAntepenultBar.current}
        textOfPlayer={textOfPlayerAntepenultBar.current}
        textOfTieHand={textOfTieHandsAntepenultBar.current}
      />
    </ScoreboardContainer>
  )
}
