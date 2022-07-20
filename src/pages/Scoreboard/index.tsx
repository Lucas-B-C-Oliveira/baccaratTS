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

export const ballsImages = [Banker, Player, TieHandsBall, Player8, Player9, Banker8, Banker9]

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
          {
            ball.bars.map((bar) => (
              <BarImg key={bar.key} src={TieHandsBar} x={bar.x} y={bar.y}></BarImg>
            ))
          }
        </BallDiv>
      ))}
    </ScoreboardContainer>
  )
}
