import { useScoreStore } from '../../stores/score'
import {
  BallDiv,
  BarImg,
  ScoreboardContainer,
  CurrentTextScoreContainer,
  ScoreTextSpan,
  LastTextScoreContainer,
  CurrentValuesImage,
} from './style'

import Banker from '../../assets/scoreboard/banker.png'
import Player from '../../assets/scoreboard/player.png'
import TieHandsBall from '../../assets/scoreboard/tie-hands-ball.png'
import TieHandsBar from '../../assets/scoreboard/tie-hands-bar.png'
import Player8 from '../../assets/scoreboard/player-8.png'
import Player9 from '../../assets/scoreboard/player-9.png'
import Banker8 from '../../assets/scoreboard/banker-8.png'
import Banker9 from '../../assets/scoreboard/banker-9.png'
import invisibleBall from '../../assets/scoreboard/ball-empty.png'
import currentValuesUi from '../../assets/scoreboard/current-values-ui.png'
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
  invisibleBall,
]

export enum BallTypes {
  BANKER,
  PLAYER,
  TIE_HANDS_BALL,
  PLAYER_8,
  PLAYER_9,
  BANKER_8,
  BANKER_9,
  INVISIBLE_BALL,
  DEFAULT,
}

export function Scoreboard() {
  const ballsTop = useScoreStore((state) => state.ballsTop)
  const ballsBottom = useScoreStore((state) => state.ballsBottom)
  const socket = useRef<null | Socket>(null)
  const calls = useRef(0) //! TODO: Remove this variable and its checks
  const isDev = true //! TODO: Remove this variable and its checks

  const FONT_SIZE_OF_MAIN_BAR = 190
  const HEIGHT_OF_MAIN_BAR = 5.0
  const WIDTH_OF_MAIN_BAR = 44.69

  const FONT_SIZE_OF_LASTS_BAR = 140
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

  const POSITION_X_OF_LAST_SHOE_RESULTS = 19.5

  const LAST_SHOE_RESULTS_BANKER_POSITION = {
    x: POSITION_X_OF_LAST_SHOE_RESULTS,
    y: 78.6,
  }

  const LAST_SHOE_RESULTS_PLAYER_POSITION = {
    x: POSITION_X_OF_LAST_SHOE_RESULTS,
    y: 82.9,
  }

  const LAST_SHOE_RESULTS_NATURAL_POSITION = {
    x: POSITION_X_OF_LAST_SHOE_RESULTS,
    y: 87.7,
  }

  const LAST_SHOE_RESULTS_TIE_HANDS_POSITION = {
    x: POSITION_X_OF_LAST_SHOE_RESULTS,
    y: 93.5,
  }

  const {
    /// # Functions
    addBallsInScore,
    clearShoe,

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

    /// Current Shoe Results Variables
    currentShoeResultsBanker,
    currentShoeResultsPlayer,
    currentShoeResultsNatural,
    currentShoeResultsTie,
    currentShoeResultsHand,
    currentMinBet,
    currentMaxBet,
    currentMaxTie,

    /// Last Shoe Results Variables
    lastShoeResultsBanker,
    lastShoeResultsPlayer,
    lastShoeResultsNatural,
    lastShoeResultsTie,
    lastShoeResultsHand,
  } = useContext(ScoreContext)

  useEffect(() => {
    socket.current = io('ws://localhost:9014', { forceNew: true })

    if (isDev) {
      //! TODO: Remove this check "isDev"
      socket.current.on('add ball', (ball: number) => {
        calls.current = calls.current + 1

        if (calls.current === 1) {
          addBallsInScore(ball)
        } else if (calls.current > 1) {
          calls.current = 0
        }
      })

      socket.current.on('clear current shoe', () => {
        calls.current = calls.current + 1

        if (calls.current === 1) {
          clearShoe()
        } else if (calls.current > 1) {
          calls.current = 0
        }
      })
    } else {
      socket.current.on('add ball', (ball: number) => {
        addBallsInScore(ball)
      })

      socket.current.on('clear current shoe', () => {
        clearShoe()
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

      <CurrentValuesImage src={currentValuesUi} />

      <CurrentTextScoreContainer
        position={{
          x: 67.2,
          y: 3.9,
        }}
      >
        <ScoreTextSpan isLast={false}>
          {currentShoeResultsBanker.current}
        </ScoreTextSpan>
        <ScoreTextSpan isLast={false}>
          {currentShoeResultsPlayer.current}
        </ScoreTextSpan>
        <ScoreTextSpan isLast={false}>
          {currentShoeResultsNatural.current}
        </ScoreTextSpan>
        <ScoreTextSpan isLast={false}>
          {currentShoeResultsTie.current}
        </ScoreTextSpan>
        <ScoreTextSpan isLast={false}>
          {currentShoeResultsHand.current}
        </ScoreTextSpan>
        <ScoreTextSpan isLast={false}>
          {'$' + currentMinBet.current}
        </ScoreTextSpan>
        <ScoreTextSpan isLast={false}>
          {'$' + currentMaxBet.current}
        </ScoreTextSpan>
        <ScoreTextSpan isLast={false}>
          {'$' + currentMaxTie.current}
        </ScoreTextSpan>
      </CurrentTextScoreContainer>

      <LastTextScoreContainer
        position={{
          x: 19.5,
          y: 77.8,
        }}
      >
        <ScoreTextSpan isLast={true}>
          {lastShoeResultsBanker.current}
        </ScoreTextSpan>

        <ScoreTextSpan isLast={true}>
          {lastShoeResultsPlayer.current}
        </ScoreTextSpan>

        <ScoreTextSpan isLast={true}>
          {lastShoeResultsNatural.current}
        </ScoreTextSpan>

        <ScoreTextSpan isLast={true}>
          {lastShoeResultsTie.current}
        </ScoreTextSpan>

        <ScoreTextSpan isLast={true}>
          {lastShoeResultsHand.current}
        </ScoreTextSpan>
      </LastTextScoreContainer>

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
