import { useScoreStore } from '../stores/score'
import React, {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
} from 'react'

import { BallTypes } from '../windows/Scoreboard'
import { Bar } from './../stores/score'

interface ScoreContextType {
  addBallsInScore: (newBall: number) => void
  clearShoe: () => void
  fillOfBankerBar: React.MutableRefObject<number>
  fillOfPlayerBar: React.MutableRefObject<number>
  fillOfTieHandsBar: React.MutableRefObject<number>
  textOfBankerBar: React.MutableRefObject<number>
  textOfPlayerBar: React.MutableRefObject<number>
  textOfTieHandsBar: React.MutableRefObject<number>
  fillOfBankerLastBar: React.MutableRefObject<number>
  fillOfPlayerLastBar: React.MutableRefObject<number>
  fillOfTieHandsLastBar: React.MutableRefObject<number>
  textOfBankerLastBar: React.MutableRefObject<number>
  textOfPlayerLastBar: React.MutableRefObject<number>
  textOfTieHandsLastBar: React.MutableRefObject<number>
  fillOfBankerPenultBar: React.MutableRefObject<number>
  fillOfPlayerPenultBar: React.MutableRefObject<number>
  fillOfTieHandsPenultBar: React.MutableRefObject<number>
  textOfBankerPenultBar: React.MutableRefObject<number>
  textOfPlayerPenultBar: React.MutableRefObject<number>
  textOfTieHandsPenultBar: React.MutableRefObject<number>
  fillOfBankerAntepenultBar: React.MutableRefObject<number>
  fillOfPlayerAntepenultBar: React.MutableRefObject<number>
  fillOfTieHandsAntepenultBar: React.MutableRefObject<number>
  textOfBankerAntepenultBar: React.MutableRefObject<number>
  textOfPlayerAntepenultBar: React.MutableRefObject<number>
  textOfTieHandsAntepenultBar: React.MutableRefObject<number>
  lastShoeResultsBanker: React.MutableRefObject<number>
  lastShoeResultsPlayer: React.MutableRefObject<number>
  lastShoeResultsNatural: React.MutableRefObject<number>
  lastShoeResultsTie: React.MutableRefObject<number>
  lastShoeResultsHand: React.MutableRefObject<number>
  currentShoeResultsBanker: React.MutableRefObject<number>
  currentShoeResultsPlayer: React.MutableRefObject<number>
  currentShoeResultsNatural: React.MutableRefObject<number>
  currentShoeResultsTie: React.MutableRefObject<number>
  currentShoeResultsHand: React.MutableRefObject<number>
  currentMinBet: React.MutableRefObject<number>
  currentMaxBet: React.MutableRefObject<number>
  currentMaxTie: React.MutableRefObject<number>
}

interface ScoreContextProviderProps {
  children: ReactNode
}

export const ScoreContext = createContext({} as ScoreContextType)

export function ScoreContextProvider({ children }: ScoreContextProviderProps) {
  const addBallTopOfScore = useScoreStore((state) => state.addBallTopOfScore)
  const setBallTopOfScore = useScoreStore((state) => state.setBallTopOfScore)
  const cleanTheBalls = useScoreStore((state) => state.cleanTheBalls)

  const addBallBottomOfScore = useScoreStore(
    (state) => state.addBallBottomOfScore,
  )
  const setBallBottomOfScore = useScoreStore(
    (state) => state.setBallBottomOfScore,
  )
  const addBarToPreviousBottomBall = useScoreStore(
    (state) => state.addBarToPreviousBottomBall,
  )

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0) /// For Bar

  const currentMatch = useRef(0)

  const TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_Y = 4.8 // 8.89
  const TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_X = 2.707

  const START_POSITION_Y_FOR_TOP_BALL = 2.3
  const START_POSITION_Y_FOR_BOTTOM_BALL = 32.391
  const START_POSITION_X_FOR_BALLS = 1.5

  /// ### Top Ball's variables
  const columnOfTop = useRef(0)
  const rowOfTop = useRef(0)
  const cleanTheTopBalls = useRef(false)

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
  const cleanTheBottomBalls = useRef(false)
  const bottomBallsBars = useRef<Bar>({} as Bar)

  /// ### Bottom Bars Variables
  const numberOfBarsInPreviousBall = useRef(0)

  const START_POSITION_X_FOR_BOTTOM_BAR = 1
  const START_POSITION_Y_FOR_BOTTOM_BAR = 4.3929625
  const BOTTOM_BAR_MULTIPLIER_FOR_Y = 0.4629625

  /// #### Bar Variables

  const VISUAL_LIMIT_OF_BAR_FILL = 20

  /// # All Bars
  const numberOfBankerBallsInGame = useRef(0)
  const numberOfPlayerBallsInGame = useRef(0)
  const numberOfTieHandsBallsInGame = useRef(0)
  const numberOfBallsInGame = useRef(0)

  /// # Main Bar
  const fillOfBankerBar = useRef(0)
  const fillOfPlayerBar = useRef(0)
  const fillOfTieHandsBar = useRef(0)

  const textOfBankerBar = useRef(0)
  const textOfPlayerBar = useRef(0)
  const textOfTieHandsBar = useRef(0)

  const MODEL_OF_BARS_VARIABLES = {
    fillOfBankerBar: 33.33,
    fillOfPlayerBar: 33.33,
    fillOfTieHandsBar: 33.33,
    textOfBankerBar: 0,
    textOfPlayerBar: 0,
    textOfTieHandsBar: 0,
  }

  const previousValuesOfTheLastBars = useRef([
    MODEL_OF_BARS_VARIABLES,
    MODEL_OF_BARS_VARIABLES,
    MODEL_OF_BARS_VARIABLES,
    MODEL_OF_BARS_VARIABLES,
  ])

  /// # Last Bar
  const fillOfBankerLastBar = useRef<number>(0)
  const fillOfPlayerLastBar = useRef<number>(0)
  const fillOfTieHandsLastBar = useRef<number>(0)

  const textOfBankerLastBar = useRef<number>(0)
  const textOfPlayerLastBar = useRef<number>(0)
  const textOfTieHandsLastBar = useRef<number>(0)

  /// # Last Bar 2 -> Penult Bar
  const fillOfBankerPenultBar = useRef<number>(0)
  const fillOfPlayerPenultBar = useRef<number>(0)
  const fillOfTieHandsPenultBar = useRef<number>(0)

  const textOfBankerPenultBar = useRef<number>(0)
  const textOfPlayerPenultBar = useRef<number>(0)
  const textOfTieHandsPenultBar = useRef<number>(0)

  /// # Last Bar 3 -> Antepenult Bar
  const fillOfBankerAntepenultBar = useRef<number>(0)
  const fillOfPlayerAntepenultBar = useRef<number>(0)
  const fillOfTieHandsAntepenultBar = useRef<number>(0)

  const textOfBankerAntepenultBar = useRef<number>(0)
  const textOfPlayerAntepenultBar = useRef<number>(0)
  const textOfTieHandsAntepenultBar = useRef<number>(0)

  /// # Current Shoe Results
  const currentShoeResultsBanker = useRef<number>(0)
  const currentShoeResultsPlayer = useRef<number>(0)
  const currentShoeResultsNatural = useRef<number>(0)
  const currentShoeResultsTie = useRef<number>(0)
  const currentShoeResultsHand = useRef<number>(0)
  const currentMinBet = useRef<number>(0)
  const currentMaxBet = useRef<number>(0)
  const currentMaxTie = useRef<number>(0)

  /// # Last Shoe Results
  const lastShoeResultsBanker = useRef<number>(0)
  const lastShoeResultsPlayer = useRef<number>(0)
  const lastShoeResultsNatural = useRef<number>(0)
  const lastShoeResultsTie = useRef<number>(0)
  const lastShoeResultsHand = useRef<number>(0)

  function addBallsInScore(newBall: number) {
    if (
      newBall === BallTypes.TIE_HANDS_BALL &&
      numberOfBarsInPreviousBall.current >= 10
    )
      return

    let ballForBarFill = newBall

    switch (ballForBarFill) {
      case BallTypes.PLAYER_8:
        ballForBarFill = BallTypes.PLAYER
        break
      case BallTypes.PLAYER_9:
        ballForBarFill = BallTypes.PLAYER
        break
      case BallTypes.BANKER_8:
        ballForBarFill = BallTypes.BANKER
        break
      case BallTypes.BANKER_9:
        ballForBarFill = BallTypes.BANKER
        break

      default:
        ballForBarFill = newBall
        break
    }

    numberOfBallsInGame.current = numberOfBallsInGame.current + 1
    updateBar(ballForBarFill, numberOfBallsInGame.current)

    addTopBall(newBall)
    addBottomBall(newBall)
    updateCurrentShoeResults(newBall)
    currentMatch.current = currentMatch.current + 1
  }

  function addTopBall(newBall: number) {
    if (currentMatch.current % 6 === 0 && currentMatch.current !== 0) {
      columnOfTop.current = columnOfTop.current + 1
      rowOfTop.current = 0
    }

    cleanTheTopBalls.current = false

    if (columnOfTop.current >= 18) {
      cleanTheTopGameTable()
    }

    const newXTopPosition =
      START_POSITION_X_FOR_BALLS +
      TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_X * columnOfTop.current

    const newYTopPosition =
      START_POSITION_Y_FOR_TOP_BALL +
      TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_Y * rowOfTop.current

    const newTopPosition = {
      x: newXTopPosition,
      y: newYTopPosition,
    }

    rowOfTop.current = rowOfTop.current + 1

    const newTopBall = {
      key: Math.random() * Math.random() * Math.random() + currentMatch.current, /// TODO: use lib for make key
      position: newTopPosition,
      image: newBall,
      bars: [],
    }
    if (cleanTheTopBalls.current) setBallTopOfScore(newTopBall)
    else addBallTopOfScore(newTopBall)
  }

  function addBottomBall(newBall: number) {
    let newXBottomPosition = 0
    let newYBottomPosition = 0

    if (newBall === BallTypes.TIE_HANDS_BALL) {
      numberOfBarsInPreviousBall.current =
        numberOfBarsInPreviousBall.current + 1

      const newXBarPosition: number = START_POSITION_X_FOR_BOTTOM_BAR
      const newYBarPosition: number =
        START_POSITION_Y_FOR_BOTTOM_BAR -
        BOTTOM_BAR_MULTIPLIER_FOR_Y * numberOfBarsInPreviousBall.current

      const newBar = {
        key:
          Math.random() * Math.random() * Math.random() + currentMatch.current, /// TODO: use lib for make key
        x: newXBarPosition,
        y: newYBarPosition,
      }

      if (currentShoeResultsHand.current !== 0) {
        addBarToPreviousBottomBall(newBar)
        return
      } else {
        bottomBallsBars.current = newBar
      }
    }

    if (currentShoeResultsHand.current !== 0)
      numberOfBarsInPreviousBall.current = 0

    modifiedBottomBall.current = newBall

    switch (newBall) {
      case BallTypes.PLAYER_8:
        newBall = BallTypes.PLAYER
        break
      case BallTypes.PLAYER_9:
        newBall = BallTypes.PLAYER
        break
      case BallTypes.BANKER_8:
        newBall = BallTypes.BANKER
        break
      case BallTypes.BANKER_9:
        newBall = BallTypes.BANKER
        break
      default:
        modifiedBottomBall.current = BallTypes.DEFAULT
        break
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
          TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_Y * lastLockedBottomRow.current
        newXBottomPosition =
          START_POSITION_X_FOR_BALLS +
          TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_X * columnOfBottom.current

        lastLockedBottomColumn.current = columnOfBottom.current
        needLockANewRow.current = true
      } else {
        /// #### Put the ball in DOWN

        rowOfBottom.current = rowOfBottom.current + 1
        previousBottomColumnCorrect.current = columnOfBottom.current
        longSequenceOfEqualsBalls.current = true

        newYBottomPosition =
          START_POSITION_Y_FOR_BOTTOM_BALL +
          TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_Y * rowOfBottom.current
        newXBottomPosition =
          START_POSITION_X_FOR_BALLS +
          TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_X * columnOfBottom.current
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
        currentMatch.current === 0
          ? 0
          : (columnOfBottom.current = columnOfBottom.current + 1)

      newYBottomPosition =
        START_POSITION_Y_FOR_BOTTOM_BALL +
        TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_Y * initialRowFree.current
      newXBottomPosition =
        START_POSITION_X_FOR_BALLS +
        TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_X * columnOfBottom.current
    }

    cleanTheBottomBalls.current = false

    if (columnOfBottom.current >= 36) {
      /// Clear the bottom game table

      cleanTheBottomGameTable()

      newYBottomPosition =
        START_POSITION_Y_FOR_BOTTOM_BALL +
        TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_Y * rowOfBottom.current
      newXBottomPosition =
        START_POSITION_X_FOR_BALLS +
        TOP_AND_BOTTOM_BALLS_MULTIPLIER_FOR_X * columnOfBottom.current
    }

    const newBottomPosition = {
      x: newXBottomPosition,
      y: newYBottomPosition,
    }

    const newBottomBall = {
      key: Math.random() * Math.random() * Math.random() + currentMatch.current, /// TODO: use lib for make key
      position: newBottomPosition,
      image:
        modifiedBottomBall.current === BallTypes.DEFAULT
          ? newBall === BallTypes.TIE_HANDS_BALL
            ? BallTypes.INVISIBLE_BALL
            : newBall
          : modifiedBottomBall.current,
      bars:
        currentShoeResultsHand.current === 0 &&
          newBall === BallTypes.TIE_HANDS_BALL
          ? [bottomBallsBars.current]
          : [],
    }
    previousBottomBall.current = newBall

    if (cleanTheBottomBalls.current) setBallBottomOfScore(newBottomBall)
    else addBallBottomOfScore(newBottomBall)
  }

  function updateBar(
    newBall = -1,
    numberOfBallsInGame = 0,
    isFirstRender = false,
  ) {
    switch (newBall) {
      case 0:
        numberOfBankerBallsInGame.current =
          numberOfBankerBallsInGame.current + 1
        break
      case 1:
        numberOfPlayerBallsInGame.current =
          numberOfPlayerBallsInGame.current + 1
        break
      case 2:
        numberOfTieHandsBallsInGame.current =
          numberOfTieHandsBallsInGame.current + 1
        break
    }

    fillOfBankerBar.current =
      numberOfBallsInGame !== 0
        ? (numberOfBankerBallsInGame.current * 100) / numberOfBallsInGame
        : 0
    fillOfPlayerBar.current =
      numberOfBallsInGame !== 0
        ? (numberOfPlayerBallsInGame.current * 100) / numberOfBallsInGame
        : 0
    fillOfTieHandsBar.current =
      numberOfBallsInGame !== 0
        ? (numberOfTieHandsBallsInGame.current * 100) / numberOfBallsInGame
        : 0

    textOfBankerBar.current = fillOfBankerBar.current
    textOfPlayerBar.current = fillOfPlayerBar.current
    textOfTieHandsBar.current = fillOfTieHandsBar.current

    if (
      fillOfBankerBar.current === 0 ||
      fillOfPlayerBar.current === 0 ||
      fillOfTieHandsBar.current === 0
    ) {
      let numberOfEmptyBarFills = 0
      let numberOfBarsALittleFilled = 0

      let canIPutZeroInFillOfBankerForBar = false
      let canIPutZeroInFillOfPlayerForBar = false
      let canIPutZeroInFillOfTieForBar = false

      if (fillOfBankerBar.current === 0) numberOfEmptyBarFills++
      else numberOfBarsALittleFilled++
      if (fillOfPlayerBar.current === 0) numberOfEmptyBarFills++
      else numberOfBarsALittleFilled++
      if (fillOfTieHandsBar.current === 0) numberOfEmptyBarFills++
      else numberOfBarsALittleFilled++

      if (
        fillOfBankerBar.current -
        numberOfEmptyBarFills *
        (VISUAL_LIMIT_OF_BAR_FILL / numberOfBarsALittleFilled) >=
        fillOfBankerBar.current
      ) {
        fillOfBankerBar.current =
          fillOfBankerBar.current === 0
            ? VISUAL_LIMIT_OF_BAR_FILL
            : fillOfBankerBar.current -
            numberOfEmptyBarFills *
            (VISUAL_LIMIT_OF_BAR_FILL / numberOfBarsALittleFilled)
      } else {
        if (fillOfBankerBar.current === 0) {
          fillOfBankerBar.current = VISUAL_LIMIT_OF_BAR_FILL
          canIPutZeroInFillOfBankerForBar = true
        } else if (fillOfBankerBar.current < VISUAL_LIMIT_OF_BAR_FILL)
          fillOfBankerBar.current = VISUAL_LIMIT_OF_BAR_FILL
      }

      if (
        fillOfPlayerBar.current -
        numberOfEmptyBarFills *
        (VISUAL_LIMIT_OF_BAR_FILL / numberOfBarsALittleFilled) >=
        fillOfPlayerBar.current
      ) {
        fillOfPlayerBar.current =
          fillOfPlayerBar.current === 0
            ? VISUAL_LIMIT_OF_BAR_FILL
            : fillOfPlayerBar.current -
            numberOfEmptyBarFills *
            (VISUAL_LIMIT_OF_BAR_FILL / numberOfBarsALittleFilled)
      } else {
        if (fillOfPlayerBar.current === 0) {
          fillOfPlayerBar.current = VISUAL_LIMIT_OF_BAR_FILL
          canIPutZeroInFillOfPlayerForBar = true
        } else if (fillOfPlayerBar.current < VISUAL_LIMIT_OF_BAR_FILL)
          fillOfPlayerBar.current = VISUAL_LIMIT_OF_BAR_FILL
      }

      if (
        fillOfTieHandsBar.current -
        numberOfEmptyBarFills *
        (VISUAL_LIMIT_OF_BAR_FILL / numberOfBarsALittleFilled) >=
        fillOfTieHandsBar.current
      ) {
        fillOfTieHandsBar.current =
          fillOfTieHandsBar.current === 0
            ? VISUAL_LIMIT_OF_BAR_FILL
            : fillOfTieHandsBar.current -
            numberOfEmptyBarFills *
            (VISUAL_LIMIT_OF_BAR_FILL / numberOfBarsALittleFilled)
      } else {
        if (fillOfTieHandsBar.current === 0) {
          fillOfTieHandsBar.current = VISUAL_LIMIT_OF_BAR_FILL
          canIPutZeroInFillOfTieForBar = true
        } else if (fillOfTieHandsBar.current < VISUAL_LIMIT_OF_BAR_FILL)
          fillOfTieHandsBar.current = VISUAL_LIMIT_OF_BAR_FILL
      }

      if (
        fillOfBankerBar.current === VISUAL_LIMIT_OF_BAR_FILL &&
        canIPutZeroInFillOfBankerForBar
      )
        textOfBankerBar.current = 0
      if (
        fillOfPlayerBar.current === VISUAL_LIMIT_OF_BAR_FILL &&
        canIPutZeroInFillOfPlayerForBar
      )
        textOfPlayerBar.current = 0
      if (
        fillOfTieHandsBar.current === VISUAL_LIMIT_OF_BAR_FILL &&
        canIPutZeroInFillOfTieForBar
      )
        textOfTieHandsBar.current = 0

      if (numberOfEmptyBarFills === 3) {
        fillOfBankerBar.current = 33.3399
        fillOfPlayerBar.current = 33.3399
        fillOfTieHandsBar.current = 33.3399

        textOfBankerBar.current = 0
        textOfPlayerBar.current = 0
        textOfTieHandsBar.current = 0
      }
    } else if (
      fillOfBankerBar.current <= VISUAL_LIMIT_OF_BAR_FILL ||
      fillOfPlayerBar.current <= VISUAL_LIMIT_OF_BAR_FILL ||
      fillOfTieHandsBar.current <= VISUAL_LIMIT_OF_BAR_FILL
    ) {
      let numberOfBarsWithFillLessThanTen = 0
      let numberOfBarsWithFillGreaterThanTen = 0

      if (fillOfBankerBar.current < VISUAL_LIMIT_OF_BAR_FILL)
        numberOfBarsWithFillLessThanTen++
      else numberOfBarsWithFillGreaterThanTen++
      if (fillOfPlayerBar.current < VISUAL_LIMIT_OF_BAR_FILL)
        numberOfBarsWithFillLessThanTen++
      else numberOfBarsWithFillGreaterThanTen++
      if (fillOfTieHandsBar.current < VISUAL_LIMIT_OF_BAR_FILL)
        numberOfBarsWithFillLessThanTen++
      else numberOfBarsWithFillGreaterThanTen++

      const differenceToRightFillingOfTheBar =
        numberOfBarsWithFillLessThanTen *
        (VISUAL_LIMIT_OF_BAR_FILL / numberOfBarsWithFillGreaterThanTen)

      if (
        fillOfBankerBar.current - differenceToRightFillingOfTheBar >=
        fillOfBankerBar.current
      ) {
        fillOfBankerBar.current =
          fillOfBankerBar.current <= VISUAL_LIMIT_OF_BAR_FILL
            ? VISUAL_LIMIT_OF_BAR_FILL
            : fillOfBankerBar.current - differenceToRightFillingOfTheBar
      } else {
        fillOfBankerBar.current =
          fillOfBankerBar.current <= VISUAL_LIMIT_OF_BAR_FILL
            ? VISUAL_LIMIT_OF_BAR_FILL
            : fillOfBankerBar.current
      }

      if (
        fillOfPlayerBar.current - differenceToRightFillingOfTheBar >=
        fillOfPlayerBar.current
      ) {
        fillOfPlayerBar.current =
          fillOfPlayerBar.current <= VISUAL_LIMIT_OF_BAR_FILL
            ? VISUAL_LIMIT_OF_BAR_FILL
            : fillOfPlayerBar.current - differenceToRightFillingOfTheBar
      } else {
        fillOfPlayerBar.current =
          fillOfPlayerBar.current <= VISUAL_LIMIT_OF_BAR_FILL
            ? VISUAL_LIMIT_OF_BAR_FILL
            : fillOfPlayerBar.current
      }

      if (
        fillOfTieHandsBar.current - differenceToRightFillingOfTheBar >=
        fillOfTieHandsBar.current
      ) {
        fillOfTieHandsBar.current =
          fillOfTieHandsBar.current <= VISUAL_LIMIT_OF_BAR_FILL
            ? VISUAL_LIMIT_OF_BAR_FILL
            : fillOfTieHandsBar.current - differenceToRightFillingOfTheBar
      } else {
        fillOfTieHandsBar.current =
          fillOfTieHandsBar.current <= VISUAL_LIMIT_OF_BAR_FILL
            ? VISUAL_LIMIT_OF_BAR_FILL
            : fillOfTieHandsBar.current
      }
    }
    saveValuesOfTheBars(
      fillOfBankerBar.current,
      fillOfPlayerBar.current,
      fillOfTieHandsBar.current,
      textOfBankerBar.current,
      textOfPlayerBar.current,
      textOfTieHandsBar.current,
    )

    puttingTheValuesInTheBars()

    if (isFirstRender) forceUpdate()
  }

  function puttingTheValuesInTheBars() {
    /// ### Main Bar
    fillOfBankerBar.current =
      previousValuesOfTheLastBars.current[0].fillOfBankerBar
    fillOfPlayerBar.current =
      previousValuesOfTheLastBars.current[0].fillOfPlayerBar
    fillOfTieHandsBar.current =
      previousValuesOfTheLastBars.current[0].fillOfTieHandsBar
    textOfBankerBar.current =
      previousValuesOfTheLastBars.current[0].textOfBankerBar
    textOfPlayerBar.current =
      previousValuesOfTheLastBars.current[0].textOfPlayerBar
    textOfTieHandsBar.current =
      previousValuesOfTheLastBars.current[0].textOfTieHandsBar

    /// ### Last Bar
    fillOfBankerLastBar.current =
      previousValuesOfTheLastBars.current[1].fillOfBankerBar
    fillOfPlayerLastBar.current =
      previousValuesOfTheLastBars.current[1].fillOfPlayerBar
    fillOfTieHandsLastBar.current =
      previousValuesOfTheLastBars.current[1].fillOfTieHandsBar

    textOfBankerLastBar.current =
      previousValuesOfTheLastBars.current[1].textOfBankerBar
    textOfPlayerLastBar.current =
      previousValuesOfTheLastBars.current[1].textOfPlayerBar
    textOfTieHandsLastBar.current =
      previousValuesOfTheLastBars.current[1].textOfTieHandsBar

    /// ### Penult Bar
    fillOfBankerPenultBar.current =
      previousValuesOfTheLastBars.current[2].fillOfBankerBar
    fillOfPlayerPenultBar.current =
      previousValuesOfTheLastBars.current[2].fillOfPlayerBar
    fillOfTieHandsPenultBar.current =
      previousValuesOfTheLastBars.current[2].fillOfTieHandsBar

    textOfBankerPenultBar.current =
      previousValuesOfTheLastBars.current[2].textOfBankerBar
    textOfPlayerPenultBar.current =
      previousValuesOfTheLastBars.current[2].textOfPlayerBar
    textOfTieHandsPenultBar.current =
      previousValuesOfTheLastBars.current[2].textOfTieHandsBar

    /// ### Antepenult Bar
    fillOfBankerAntepenultBar.current =
      previousValuesOfTheLastBars.current[3].fillOfBankerBar
    fillOfPlayerAntepenultBar.current =
      previousValuesOfTheLastBars.current[3].fillOfPlayerBar
    fillOfTieHandsAntepenultBar.current =
      previousValuesOfTheLastBars.current[3].fillOfTieHandsBar

    textOfBankerAntepenultBar.current =
      previousValuesOfTheLastBars.current[3].textOfBankerBar
    textOfPlayerAntepenultBar.current =
      previousValuesOfTheLastBars.current[3].textOfPlayerBar
    textOfTieHandsAntepenultBar.current =
      previousValuesOfTheLastBars.current[3].textOfTieHandsBar
  }

  function saveValuesOfTheBars(
    fillOfBankerBar: number = MODEL_OF_BARS_VARIABLES.fillOfBankerBar,
    fillOfPlayerBar: number = MODEL_OF_BARS_VARIABLES.fillOfPlayerBar,
    fillOfTieHandsBar: number = MODEL_OF_BARS_VARIABLES.fillOfTieHandsBar,
    textOfBankerBar: number = MODEL_OF_BARS_VARIABLES.textOfBankerBar,
    textOfPlayerBar: number = MODEL_OF_BARS_VARIABLES.textOfPlayerBar,
    textOfTieHandsBar: number = MODEL_OF_BARS_VARIABLES.textOfTieHandsBar,
  ) {
    const valuesToSave = {
      fillOfBankerBar,
      fillOfPlayerBar,
      fillOfTieHandsBar,
      textOfBankerBar,
      textOfPlayerBar,
      textOfTieHandsBar,
    }

    previousValuesOfTheLastBars.current.pop()
    previousValuesOfTheLastBars.current.unshift(valuesToSave)
  }

  function updateCurrentShoeResults(newBall: number) {
    if (newBall === BallTypes.BANKER)
      currentShoeResultsBanker.current = currentShoeResultsBanker.current + 1
    else if (newBall === BallTypes.PLAYER)
      currentShoeResultsPlayer.current = currentShoeResultsPlayer.current + 1
    else if (newBall === BallTypes.TIE_HANDS_BALL)
      currentShoeResultsTie.current = currentShoeResultsTie.current + 1
    else if (
      newBall === BallTypes.BANKER_8 ||
      newBall === BallTypes.BANKER_9 ||
      newBall === BallTypes.PLAYER_8 ||
      newBall === BallTypes.PLAYER_9
    ) {
      currentShoeResultsNatural.current = currentShoeResultsNatural.current + 1

      if (newBall === BallTypes.BANKER_8 || newBall === BallTypes.BANKER_9)
        currentShoeResultsBanker.current = currentShoeResultsBanker.current + 1
      else if (newBall === BallTypes.PLAYER_8 || newBall === BallTypes.PLAYER_9)
        currentShoeResultsPlayer.current = currentShoeResultsPlayer.current + 1
    }

    currentShoeResultsHand.current = currentShoeResultsHand.current + 1
  }

  function cleanTheBottomGameTable() {
    cleanTheBottomBalls.current = false
    columnOfBottom.current = 0
    rowOfBottom.current = 0
    previousBottomColumnCorrect.current = 0
    longSequenceOfEqualsBalls.current = false
    needLockANewRow.current = false
    lastLockedBottomRow.current = 7
    initialRowFree.current = 0
    previousBottomBall.current = undefined
    lastLockedBottomColumn.current = 0
    modifiedBottomBall.current = BallTypes.DEFAULT
  }

  function cleanTheTopGameTable() {
    columnOfTop.current = 0
    rowOfTop.current = 0
    cleanTheTopBalls.current = false
  }

  function clearShoe() {
    cleanTheBottomGameTable()
    cleanTheTopGameTable()
    saveValuesOfTheBars()
    puttingTheValuesInTheBars()
    numberOfBarsInPreviousBall.current = 0

    lastShoeResultsBanker.current = currentShoeResultsBanker.current
    lastShoeResultsPlayer.current = currentShoeResultsPlayer.current
    lastShoeResultsNatural.current = currentShoeResultsNatural.current
    lastShoeResultsTie.current = currentShoeResultsTie.current
    lastShoeResultsHand.current = currentShoeResultsHand.current

    currentShoeResultsBanker.current = 0
    currentShoeResultsPlayer.current = 0
    currentShoeResultsNatural.current = 0
    currentShoeResultsTie.current = 0
    currentShoeResultsHand.current = 0
    currentMatch.current = 0
    cleanTheBalls()
  }

  useEffect(() => {
    updateBar(-1, 0, true)
  }, [])

  return (
    <ScoreContext.Provider
      value={{
        addBallsInScore,
        clearShoe,
        fillOfBankerBar,
        fillOfPlayerBar,
        fillOfTieHandsBar,
        textOfBankerBar,
        textOfPlayerBar,
        textOfTieHandsBar,
        fillOfBankerLastBar,
        fillOfPlayerLastBar,
        fillOfTieHandsLastBar,
        textOfBankerLastBar,
        textOfPlayerLastBar,
        textOfTieHandsLastBar,
        fillOfBankerPenultBar,
        fillOfPlayerPenultBar,
        fillOfTieHandsPenultBar,
        textOfBankerPenultBar,
        textOfPlayerPenultBar,
        textOfTieHandsPenultBar,
        fillOfBankerAntepenultBar,
        fillOfPlayerAntepenultBar,
        fillOfTieHandsAntepenultBar,
        textOfBankerAntepenultBar,
        textOfPlayerAntepenultBar,
        textOfTieHandsAntepenultBar,
        lastShoeResultsBanker,
        lastShoeResultsPlayer,
        lastShoeResultsNatural,
        lastShoeResultsTie,
        lastShoeResultsHand,
        currentShoeResultsBanker,
        currentShoeResultsPlayer,
        currentShoeResultsNatural,
        currentShoeResultsTie,
        currentShoeResultsHand,
        currentMinBet,
        currentMaxBet,
        currentMaxTie,
      }}
    >
      {children}
    </ScoreContext.Provider>
  )
}
