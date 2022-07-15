import {
  BottomContainer,
  TopButton,
  ControlContainer,
  MiddleContainer,
  TopContainer,
  MiddleButton,
  BottomButton,
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

export function Control() {
  return (
    <ControlContainer>
      <TopContainer>
        <TopButton
          backgroundImageNormal={playerBgBtn}
          backgroundImagePressed={playerPressedBgBtn}
          backgroundImageDisabled={playerDisabledBgBtn}
        />
        <TopButton
          backgroundImageNormal={bankerBgBtn}
          backgroundImagePressed={bankerPressedBgBtn}
          backgroundImageDisabled={bankerDisabledBgBtn}
        />
      </TopContainer>

      <MiddleContainer>
        <MiddleButton
          backgroundImageNormal={player8BgBtn}
          backgroundImagePressed={player8PressedBgBtn}
          backgroundImageDisabled={player8DisabledBgBtn}
        />
        <MiddleButton
          backgroundImageNormal={player9BgBtn}
          backgroundImagePressed={player9PressedBgBtn}
          backgroundImageDisabled={player9DisabledBgBtn}
        />
        <MiddleButton
          backgroundImageNormal={tieBgBtn}
          backgroundImagePressed={tiePressedBgBtn}
          backgroundImageDisabled={tieDisabledBgBtn}
          width={189}
          height={532}
          paddingTop={70}
        />
        <MiddleButton
          backgroundImageNormal={banker8BgBtn}
          backgroundImagePressed={banker8PressedBgBtn}
          backgroundImageDisabled={banker8DisabledBgBtn}
        />
        <MiddleButton
          backgroundImageNormal={banker9BgBtn}
          backgroundImagePressed={banker9PressedBgBtn}
          backgroundImageDisabled={banker9DisabledBgBtn}
        />
      </MiddleContainer>

      <BottomContainer>
        <BottomButton
          backgroundImageNormal={cancelLastBgBtn}
          backgroundImagePressed={cancelLastPressedBgBtn}
          backgroundImageDisabled={cancelLastDisabledBgBtn}
          width={786}
          height={245}
          leftPosition={94.25}
        />
        <BottomButton
          backgroundImageNormal={clearShoeBgBtn}
          backgroundImagePressed={clearShoePressedBgBtn}
          backgroundImageDisabled={clearShoeDisabledBgBtn}
        />
        <BottomButton
          backgroundImageNormal={configBgBtn}
          backgroundImagePressed={configPressedBgBtn}
          backgroundImageDisabled={configDisabledBgBtn}
        />
        <BottomButton
          backgroundImageNormal={closeBgBtn}
          backgroundImagePressed={closePressedBgBtn}
          backgroundImageDisabled={closeDisabledBgBtn}
        />
      </BottomContainer>
    </ControlContainer>
  )
}
