import {
  BottomContainer,
  TopButton,
  ControlContainer,
  MiddleContainer,
  TopContainer,
  MiddleButton,
  BottomButton,
  ControlContainerMain,
} from './style'

import bankerBgBtn from '../../assets/control/banker/banker-btn.png'
import bankerPressedBgBtn from '../../assets/control/banker/banker-btn-pressed.png'
import bankerDisabledBgBtn from '../../assets/control/banker/banker-btn-disabled.png'

import playerBgBtn from '../../assets/control/player/player-btn.png'
import playerPressedBgBtn from '../../assets/control/player/player-btn-pressed.png'
import playerDisabledBgBtn from '../../assets/control/player/player-btn-disabled.png'

import player8BgBtn from '../../assets/control/player-8/player-8-btn.png'
import player8PressedBgBtn from '../../assets/control/player-8/player-8-btn-pressed.png'
import player8DisabledBgBtn from '../../assets/control/player-8/player-8-btn-disabled.png'

import player9BgBtn from '../../assets/control/player-9/player-9-btn.png'
import player9PressedBgBtn from '../../assets/control/player-9/player-9-btn-pressed.png'
import player9DisabledBgBtn from '../../assets/control/player-9/player-9-btn-disabled.png'

import tieBgBtn from '../../assets/control/tie/tie-btn.png'
import tiePressedBgBtn from '../../assets/control/tie/tie-btn-pressed.png'
import tieDisabledBgBtn from '../../assets/control/tie/tie-btn-disabled.png'

import banker8BgBtn from '../../assets/control/banker-8/banker-8-btn.png'
import banker8PressedBgBtn from '../../assets/control/banker-8/banker-8-btn-pressed.png'
import banker8DisabledBgBtn from '../../assets/control/banker-8/banker-8-btn-disabled.png'

import banker9BgBtn from '../../assets/control/banker-9/banker-9-btn.png'
import banker9PressedBgBtn from '../../assets/control/banker-9/banker-9-btn-pressed.png'
import banker9DisabledBgBtn from '../../assets/control/banker-9/banker-9-btn-disabled.png'

import cancelBgBtn from '../../assets/control/cancel/cancel-btn.png'
import cancelPressedBgBtn from '../../assets/control/cancel/cancel-btn-pressed.png'
import cancelDisabledBgBtn from '../../assets/control/cancel/cancel-btn-disabled.png'

import cancelLastBgBtn from '../../assets/control/cancel-last/cancel-last-btn.png'
import cancelLastPressedBgBtn from '../../assets/control/cancel-last/cancel-last-btn-pressed.png'
import cancelLastDisabledBgBtn from '../../assets/control/cancel-last/cancel-last-btn-disabled.png'

import clearShoeBgBtn from '../../assets/control/clear-shoe/clear-shoe-btn.png'
import clearShoePressedBgBtn from '../../assets/control/clear-shoe/clear-shoe-btn-pressed.png'
import clearShoeDisabledBgBtn from '../../assets/control/clear-shoe/clear-shoe-btn-disabled.png'

import configBgBtn from '../../assets/control/config/config-btn.png'
import configPressedBgBtn from '../../assets/control/config/config-btn-pressed.png'
import configDisabledBgBtn from '../../assets/control/config/config-btn-disabled.png'

import closeBgBtn from '../../assets/control/close/close-btn.png'
import closePressedBgBtn from '../../assets/control/close/close-btn-pressed.png'
import closeDisabledBgBtn from '../../assets/control/close/close-btn-disabled.png'
import { BallTypes } from '../Scoreboard'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

enum ButtonsName {
  PLAYER = 'player',
  BANKER = 'banker',
  PLAYER_8 = 'player8',
  PLAYER_9 = 'player9',
  BANKER_8 = 'banker8',
  BANKER_9 = 'banker9',
  TIE_HANDS = 'tieHands',
  CANCEL_LAST_PLAY = 'cancelLastPlay',
  CANCEL = 'cancel',
  CLEAR_SHOE = 'clearShoe',
  CONFIG = 'config',
  CLOSE = 'close',
  DEFAULT = '',
}

export function Control() {
  const [disabledState, setDisabledState] = useState(false)
  const buttonOnConfirmation = useRef<ButtonsName>(ButtonsName.DEFAULT)

  const socket = useRef<null | Socket>(null)

  useEffect(() => {
    socket.current = io('ws://localhost:9014', { forceNew: true })
  }, [])

  function addBallsInScore(ball: number) {
    if (socket.current) socket.current.emit('add balls in score', ball)
  }

  function setDisableButtonsState(
    isInConfirmation: boolean,
    buttonToIgnore: ButtonsName = ButtonsName.DEFAULT,
  ) {
    buttonOnConfirmation.current = buttonToIgnore
    setDisabledState(!isInConfirmation)
  }

  /// Handle Functions ######
  function handleCancelButton() {
    setDisableButtonsState(true)
  }

  function handleCancelLastButton() {
    // setDisableButtonsState(true)
    console.log('CancelLast button clicked')
    //! TODO: Need Implemented here
  }

  function handleClearShoeButton() {
    // setDisableButtonsState(true)
    console.log('ClearShoe button clicked')
    //! TODO: Need Implemented here
  }

  function handleConfigButton() {
    // setDisableButtonsState(true)
    console.log('Config button clicked')
    //! TODO: Need Implemented here
  }

  function handleCloseButton() {
    // setDisableButtonsState(true)
    console.log('CancelLast button clicked')
    //! TODO: Need Implemented here
  }

  function handlePlayerButton() {
    if (disabledState) {
      addBallsInScore(BallTypes.PLAYER)
      setDisableButtonsState(true)
    } else setDisableButtonsState(false, ButtonsName.PLAYER)
  }

  function handleBankerButton() {
    if (disabledState) {
      addBallsInScore(BallTypes.BANKER)
      setDisableButtonsState(true)
    } else setDisableButtonsState(false, ButtonsName.BANKER)
  }

  function handleTieHandsButton() {
    if (disabledState) {
      addBallsInScore(BallTypes.TIE_HANDS_BALL)
      setDisableButtonsState(true)
    } else setDisableButtonsState(false, ButtonsName.TIE_HANDS)
  }

  function handlePlayer8Button() {
    if (disabledState) {
      addBallsInScore(BallTypes.PLAYER_8)
      setDisableButtonsState(true)
    } else setDisableButtonsState(false, ButtonsName.PLAYER_8)
  }

  function handlePlayer9Button() {
    if (disabledState) {
      addBallsInScore(BallTypes.PLAYER_9)
      setDisableButtonsState(true)
    } else setDisableButtonsState(false, ButtonsName.PLAYER_9)
  }

  function handleBanker8Button() {
    if (disabledState) {
      addBallsInScore(BallTypes.BANKER_8)
      setDisableButtonsState(true)
    } else setDisableButtonsState(false, ButtonsName.BANKER_8)
  }

  function handleBanker9Button() {
    if (disabledState) {
      addBallsInScore(BallTypes.BANKER_9)
      setDisableButtonsState(true)
    } else setDisableButtonsState(false, ButtonsName.BANKER_9)
  }

  return (
    <ControlContainerMain>
      <ControlContainer>
        <TopContainer>
          <TopButton
            backgroundImageNormal={playerBgBtn}
            backgroundImagePressed={playerPressedBgBtn}
            backgroundImageDisabled={playerDisabledBgBtn}
            onClick={handlePlayerButton}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.PLAYER
                ? disabledState
                : !disabledState
            }
          />
          <TopButton
            backgroundImageNormal={bankerBgBtn}
            backgroundImagePressed={bankerPressedBgBtn}
            backgroundImageDisabled={bankerDisabledBgBtn}
            onClick={handleBankerButton}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.BANKER
                ? disabledState
                : !disabledState
            }
          />
        </TopContainer>

        <MiddleContainer>
          <MiddleButton
            backgroundImageNormal={player8BgBtn}
            backgroundImagePressed={player8PressedBgBtn}
            backgroundImageDisabled={player8DisabledBgBtn}
            onClick={handlePlayer8Button}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.PLAYER_8
                ? disabledState
                : !disabledState
            }
          />
          <MiddleButton
            backgroundImageNormal={player9BgBtn}
            backgroundImagePressed={player9PressedBgBtn}
            backgroundImageDisabled={player9DisabledBgBtn}
            onClick={handlePlayer9Button}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.PLAYER_9
                ? disabledState
                : !disabledState
            }
          />
          <MiddleButton
            backgroundImageNormal={tieBgBtn}
            backgroundImagePressed={tiePressedBgBtn}
            backgroundImageDisabled={tieDisabledBgBtn}
            specialSize={true}
            paddingTop={4.375}
            onClick={handleTieHandsButton}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.TIE_HANDS
                ? disabledState
                : !disabledState
            }
          />
          <MiddleButton
            backgroundImageNormal={banker8BgBtn}
            backgroundImagePressed={banker8PressedBgBtn}
            backgroundImageDisabled={banker8DisabledBgBtn}
            onClick={handleBanker8Button}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.BANKER_8
                ? disabledState
                : !disabledState
            }
          />
          <MiddleButton
            backgroundImageNormal={banker9BgBtn}
            backgroundImagePressed={banker9PressedBgBtn}
            backgroundImageDisabled={banker9DisabledBgBtn}
            onClick={handleBanker9Button}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.BANKER_9
                ? disabledState
                : !disabledState
            }
          />
        </MiddleContainer>

        <BottomContainer>
          {disabledState ? (
            <BottomButton
              backgroundImageNormal={cancelBgBtn}
              backgroundImagePressed={cancelPressedBgBtn}
              backgroundImageDisabled={cancelDisabledBgBtn}
              specialSize={true}
              leftPosition={5.891}
              onClick={handleCancelButton}
            />
          ) : (
            <BottomButton
              backgroundImageNormal={cancelLastBgBtn}
              backgroundImagePressed={cancelLastPressedBgBtn}
              backgroundImageDisabled={cancelLastDisabledBgBtn}
              specialSize={true}
              leftPosition={5.891}
              onClick={handleCancelLastButton}
            />
          )}

          <BottomButton
            backgroundImageNormal={clearShoeBgBtn}
            backgroundImagePressed={clearShoePressedBgBtn}
            backgroundImageDisabled={clearShoeDisabledBgBtn}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.CLEAR_SHOE
                ? disabledState
                : !disabledState
            }
            onClick={handleClearShoeButton}
          />
          <BottomButton
            backgroundImageNormal={configBgBtn}
            backgroundImagePressed={configPressedBgBtn}
            backgroundImageDisabled={configDisabledBgBtn}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.CONFIG
                ? disabledState
                : !disabledState
            }
            onClick={handleConfigButton}
          />
          <BottomButton
            backgroundImageNormal={closeBgBtn}
            backgroundImagePressed={closePressedBgBtn}
            backgroundImageDisabled={closeDisabledBgBtn}
            disabled={
              buttonOnConfirmation.current !== ButtonsName.CLOSE
                ? disabledState
                : !disabledState
            }
            onClick={handleCloseButton}
          />
        </BottomContainer>
      </ControlContainer>
    </ControlContainerMain>
  )
}
