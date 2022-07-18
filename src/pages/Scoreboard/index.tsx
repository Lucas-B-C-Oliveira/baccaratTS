import { useScoreStore } from '../../stores/score'
import { BallImg, ScoreboardContainer } from './style'

import Banker from '../../assets/scoreboard/red-ball.png'
import Player from '../../assets/scoreboard/blue-ball.png'
import Natural from '../../assets/scoreboard/yellow-ball.png'
import TieHands from '../../assets/scoreboard/green-ball.png'

export const ballsImages = [Banker, Player, TieHands, Natural]

export enum BallTypes {
  BANKER,
  PLAYER,
  TIE_HANDS,
  NATURAL,
}

export function Scoreboard() {
  const ballsTop = useScoreStore((state) => state.ballsTop)
  const ballsBottom = useScoreStore((state) => state.ballsBottom)

  return (
    <ScoreboardContainer>
      {ballsTop.map((ball) => (
        <BallImg
          key={ball.key}
          image={ballsImages[ball.image]}
          position={{ x: ball.position.x, y: ball.position.y }}
        />
      ))}

      {ballsBottom.map((ball) => (
        <BallImg
          key={ball.key}
          image={ballsImages[ball.image]}
          position={{ x: ball.position.x, y: ball.position.y }}
        />
      ))}
    </ScoreboardContainer>
  )
}
