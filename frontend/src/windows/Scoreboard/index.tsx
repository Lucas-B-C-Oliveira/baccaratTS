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
import {
  ArgumentsOfApplySettingsInAdvertising,
  ScoreContext,
} from '../../context/ScoreContext'
import { io, Socket } from 'socket.io-client'
import { Advertising } from './components/Advertising/index'

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

  /// ### Bars Variables
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

    /// # Advertising Variables
    applySettingsInAdvertising,
    frameDuration,
    advertisingFolder,
    pathAdvertising,
    assets,
  } = useContext(ScoreContext)

  //! TODO: setSettingsToAdvertising its just for test Delete this function in the future
  function setSettingsToAdvertising(ball: number) {
    const newSettingsToAdvertising = {} as ArgumentsOfApplySettingsInAdvertising

    switch (ball) {
      case BallTypes.PLAYER:
        newSettingsToAdvertising.folder = 'a'
        newSettingsToAdvertising.fileStartToShow = 0
        newSettingsToAdvertising.frameDurationTime = 900
        break
      case BallTypes.BANKER:
        newSettingsToAdvertising.folder = 'b'
        newSettingsToAdvertising.fileStartToShow = 0
        newSettingsToAdvertising.frameDurationTime = 0
        break
      case BallTypes.PLAYER_8:
        newSettingsToAdvertising.folder = 'c'
        newSettingsToAdvertising.fileStartToShow = 0
        newSettingsToAdvertising.frameDurationTime = 1000
        break
      case BallTypes.BANKER_8:
        newSettingsToAdvertising.folder = 'd'
        newSettingsToAdvertising.fileStartToShow = 3
        newSettingsToAdvertising.frameDurationTime = 0
        break
    }

    applySettingsInAdvertising(newSettingsToAdvertising)
  }

  useEffect(() => {
    socket.current = io('ws://localhost:9014', { forceNew: true })

    if (isDev) {
      //! TODO: Remove this check "isDev"
      socket.current.on('add ball', (ball: number) => {
        calls.current = calls.current + 1

        if (calls.current === 1) {
          addBallsInScore(ball)
          setSettingsToAdvertising(ball) //! TODO: Delete this function in the future
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
        setSettingsToAdvertising(ball) //! TODO: Delete this function in the future
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

      <CurrentTextScoreContainer>
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

      <LastTextScoreContainer>
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
        isMain={true}
        position={POSITION_OF_MAIN_BAR}
        fillOfBanker={fillOfBankerBar.current}
        fillOfPlayer={fillOfPlayerBar.current}
        fillOfTieHands={fillOfTieHandsBar.current}
        textOfBanker={textOfBankerBar.current}
        textOfPlayer={textOfPlayerBar.current}
        textOfTieHand={textOfTieHandsBar.current}
      />

      <ScoreBar
        isMain={false}
        position={POSITION_OF_LAST_BAR}
        fillOfBanker={fillOfBankerLastBar.current}
        fillOfPlayer={fillOfPlayerLastBar.current}
        fillOfTieHands={fillOfTieHandsLastBar.current}
        textOfBanker={textOfBankerLastBar.current}
        textOfPlayer={textOfPlayerLastBar.current}
        textOfTieHand={textOfTieHandsLastBar.current}
      />

      <ScoreBar
        isMain={false}
        position={POSITION_OF_PENULT_BAR}
        fillOfBanker={fillOfBankerPenultBar.current}
        fillOfPlayer={fillOfPlayerPenultBar.current}
        fillOfTieHands={fillOfTieHandsPenultBar.current}
        textOfBanker={textOfBankerPenultBar.current}
        textOfPlayer={textOfPlayerPenultBar.current}
        textOfTieHand={textOfTieHandsPenultBar.current}
      />

      <ScoreBar
        isMain={false}
        position={POSITION_OF_ANTEPENULT_BAR}
        fillOfBanker={fillOfBankerAntepenultBar.current}
        fillOfPlayer={fillOfPlayerAntepenultBar.current}
        fillOfTieHands={fillOfTieHandsAntepenultBar.current}
        textOfBanker={textOfBankerAntepenultBar.current}
        textOfPlayer={textOfPlayerAntepenultBar.current}
        textOfTieHand={textOfTieHandsAntepenultBar.current}
      />

      <Advertising
        frameDuration={frameDuration.current}
        advertisingFolder={advertisingFolder.current}
        path={pathAdvertising.current}
        assets={assets.current}
      />
    </ScoreboardContainer>
  )
}
