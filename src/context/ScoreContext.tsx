import { useScoreStore } from '../stores/score'
import { createContext, ReactNode, useRef } from 'react'
import { BallTypes } from '../pages/Scoreboard'

interface ScoreContextType {
  addBallsInScore: (newBall: number) => void
}

interface ScoreContextProviderProps {
  children: ReactNode
}

export const ScoreContext = createContext({} as ScoreContextType)

export function ScoreContextProvider({ children }: ScoreContextProviderProps) {
  const addBallTopOfScore = useScoreStore((state) => state.addBallTopOfScore)
  const setBallTopOfScore = useScoreStore((state) => state.setBallTopOfScore)

  const addBallBottomOfScore = useScoreStore((state) => state.addBallBottomOfScore)
  const setBallBottomOfScore = useScoreStore((state) => state.setBallBottomOfScore)
  const addBarToPreviousBottomBall = useScoreStore((state) => state.addBarToPreviousBottomBall)

  const currentMatch = useRef(0)

  const TOP_BALL_MULTIPLIER_FOR_X_AND_Y = 3.25
  const START_POSITION_Y_FOR_TOP_BALL = 1.9
  const START_POSITION_Y_FOR_BOTTOM_BALL = 22.18
  const START_POSITION_X_FOR_BALLS = 2.2

  /// ### Top Ball's variables
  const columnOfTop = useRef(0)
  const rowOfTop = useRef(0)

  /// ### Bottom Ball's variables
  const rowOfBottom = useRef(0)
  const columnOfBottom = useRef(0)
  const previousBottomBall = useRef<undefined | number>(undefined)
  const lastLockedBottomRow = useRef(7)
  const lastLockedBottomColumn = useRef(0)
  const needLockANewRow = useRef(false)
  const longSequenceOfEqualsBalls = useRef(false)
  const previousBottomColumnCorrect = useRef(0)
  const initialRowFree = useRef(0)
  const modifiedBottomBall = useRef<BallTypes>(BallTypes.DEFAULT)

  /// ### Bottom Bars Variables
  const numberOfBarsInPreviousBall = useRef(0)

  const START_POSITION_X_FOR_BOTTOM_BAR = 0.8
  const START_POSITION_Y_FOR_BOTTOM_BAR = 2.31
  const BOTTOM_BAR_MULTIPLIER_FOR_Y = 0.3


  function addBallsInScore(newBall: number) {
    if (newBall === BallTypes.TIE_HANDS_BALL && numberOfBarsInPreviousBall.current >= 6) return

    let newBallTop = newBall
    switch (newBallTop) {
      case BallTypes.PLAYER_8:
        newBallTop = BallTypes.PLAYER
        break;
      case BallTypes.PLAYER_9:
        newBallTop = BallTypes.PLAYER
        break;
      case BallTypes.BANKER_8:
        newBallTop = BallTypes.BANKER
        break;
      case BallTypes.BANKER_9:
        newBallTop = BallTypes.BANKER
        break;

      default:
        newBallTop = newBall
        break;
    }

    addTopBall(newBallTop)
    addBottomBall(newBall)
    currentMatch.current++
  }

  function addTopBall(newBall: number) {

    if (currentMatch.current % 6 === 0 && currentMatch.current !== 0) {
      columnOfTop.current++
      rowOfTop.current = 0
    }

    let cleanTopBalls = false

    if (columnOfTop.current >= 18) {
      columnOfTop.current = 0
      rowOfTop.current = 0
      cleanTopBalls = true
    }

    const newXTopPosition =
      START_POSITION_X_FOR_BALLS +
      TOP_BALL_MULTIPLIER_FOR_X_AND_Y * columnOfTop.current

    const newYTopPosition =
      START_POSITION_Y_FOR_TOP_BALL +
      TOP_BALL_MULTIPLIER_FOR_X_AND_Y * rowOfTop.current

    const newTopPosition = {
      x: newXTopPosition,
      y: newYTopPosition,
    }

    rowOfTop.current++

    const newTopBall = {
      key: Math.random() * Math.random() * Math.random() + currentMatch.current, /// TODO: use lib for make key
      position: newTopPosition,
      image: newBall,
      bars: []
    }
    if (cleanTopBalls) setBallTopOfScore(newTopBall)
    else addBallTopOfScore(newTopBall)
  }

  function addBottomBall(newBall: number) {
    let newXBottomPosition = 0
    let newYBottomPosition = 0

    if (newBall === BallTypes.TIE_HANDS_BALL) {
      numberOfBarsInPreviousBall.current++

      let newXBarPosition: number = START_POSITION_X_FOR_BOTTOM_BAR
      let newYBarPosition: number = START_POSITION_Y_FOR_BOTTOM_BAR - (BOTTOM_BAR_MULTIPLIER_FOR_Y * numberOfBarsInPreviousBall.current)

      const newBar = {
        key: Math.random() * Math.random() * Math.random() + currentMatch.current, /// TODO: use lib for make key
        x: newXBarPosition,
        y: newYBarPosition,
      }

      addBarToPreviousBottomBall(newBar)
      return
    }

    numberOfBarsInPreviousBall.current = 0
    modifiedBottomBall.current = newBall

    switch (newBall) {
      case BallTypes.PLAYER_8:
        newBall = BallTypes.PLAYER
        break;
      case BallTypes.PLAYER_9:
        newBall = BallTypes.PLAYER
        break;
      case BallTypes.BANKER_8:
        newBall = BallTypes.BANKER
        break;
      case BallTypes.BANKER_9:
        newBall = BallTypes.BANKER
        break;
      default:
        modifiedBottomBall.current = BallTypes.DEFAULT
        newBall = newBall
        break;
    }

    if (previousBottomBall.current === newBall) {
      lastLockedBottomRow.current =
        columnOfBottom.current > lastLockedBottomColumn.current
          ? 7
          : lastLockedBottomRow.current

      if (rowOfBottom.current === lastLockedBottomRow.current) {
        /// ### Moving the ball to the LEFT, modifying the COLUMN

        columnOfBottom.current = columnOfBottom.current + 1

        newYBottomPosition =
          START_POSITION_Y_FOR_BOTTOM_BALL +
          TOP_BALL_MULTIPLIER_FOR_X_AND_Y * lastLockedBottomRow.current
        newXBottomPosition =
          START_POSITION_X_FOR_BALLS +
          TOP_BALL_MULTIPLIER_FOR_X_AND_Y * columnOfBottom.current

        lastLockedBottomColumn.current = columnOfBottom.current
        needLockANewRow.current = true
      } else {
        /// #### Put the ball in DOWN

        rowOfBottom.current = rowOfBottom.current + 1
        previousBottomColumnCorrect.current = columnOfBottom.current
        longSequenceOfEqualsBalls.current = true

        newYBottomPosition =
          START_POSITION_Y_FOR_BOTTOM_BALL +
          TOP_BALL_MULTIPLIER_FOR_X_AND_Y * rowOfBottom.current
        newXBottomPosition =
          START_POSITION_X_FOR_BALLS +
          TOP_BALL_MULTIPLIER_FOR_X_AND_Y * columnOfBottom.current
      }
    } else {
      /// Put the ball in LEFT

      rowOfBottom.current = initialRowFree.current

      if (longSequenceOfEqualsBalls.current) {
        columnOfBottom.current = previousBottomColumnCorrect.current
        longSequenceOfEqualsBalls.current = false
      }

      if (needLockANewRow.current) {
        /// Need to block a new row when the sequence of like balls has reached a limit
        lastLockedBottomRow.current = lastLockedBottomRow.current - 1
        needLockANewRow.current = false
      }

      columnOfBottom.current =
        currentMatch.current === 0 ? 0 : columnOfBottom.current + 1

      newYBottomPosition =
        START_POSITION_Y_FOR_BOTTOM_BALL +
        TOP_BALL_MULTIPLIER_FOR_X_AND_Y * initialRowFree.current
      newXBottomPosition =
        START_POSITION_X_FOR_BALLS +
        TOP_BALL_MULTIPLIER_FOR_X_AND_Y * columnOfBottom.current
    }

    let cleanBottomBalls = false

    if (columnOfBottom.current >= 36) {
      /// Clear the bottom game table

      cleanBottomBalls = true

      columnOfBottom.current = 0
      rowOfBottom.current = 0
      previousBottomColumnCorrect.current = 0
      longSequenceOfEqualsBalls.current = false
      needLockANewRow.current = false
      lastLockedBottomRow.current = 7
      initialRowFree.current = 0

      newYBottomPosition =
        START_POSITION_Y_FOR_BOTTOM_BALL +
        TOP_BALL_MULTIPLIER_FOR_X_AND_Y * rowOfBottom.current
      newXBottomPosition =
        START_POSITION_X_FOR_BALLS +
        TOP_BALL_MULTIPLIER_FOR_X_AND_Y * columnOfBottom.current
    }

    const newBottomPosition = {
      x: newXBottomPosition,
      y: newYBottomPosition,
    }

    const newBottomBall = {
      key: Math.random() * Math.random() * Math.random() + currentMatch.current, /// TODO: use lib for make key
      position: newBottomPosition,
      image: modifiedBottomBall.current === BallTypes.DEFAULT ? newBall : modifiedBottomBall.current,
      bars: []
    }
    previousBottomBall.current = newBall

    if (cleanBottomBalls) setBallBottomOfScore(newBottomBall)
    else addBallBottomOfScore(newBottomBall)
  }

  return (
    <ScoreContext.Provider
      value={{
        addBallsInScore,
      }}
    >
      {children}
    </ScoreContext.Provider>
  )
}
