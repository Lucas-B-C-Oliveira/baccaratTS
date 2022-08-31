import {
  BankerBarDiv,
  OuterBarDiv,
  PlayerBarDiv,
  TieHandsBarDiv,
} from './styles'

interface BarProps {
  position: {
    x: number
    y: number
  }
  isMain: boolean
  fillOfBanker: number
  fillOfPlayer: number
  fillOfTieHands: number
  textOfBanker: number
  textOfPlayer: number
  textOfTieHand: number
}

export function ScoreBar({
  isMain,
  position,
  fillOfBanker,
  fillOfPlayer,
  fillOfTieHands,
  textOfBanker,
  textOfPlayer,
  textOfTieHand,
}: BarProps) {
  return (
    <OuterBarDiv isMain={isMain} position={position}>
      <BankerBarDiv
        isMain={isMain}
        widthOfBankerBar={fillOfBanker}
      >{`${Math.round(textOfBanker)}%`}</BankerBarDiv>
      <PlayerBarDiv
        isMain={isMain}
        widthOfPlayerBar={fillOfPlayer}
      >{`${Math.round(textOfPlayer)}%`}</PlayerBarDiv>
      <TieHandsBarDiv
        isMain={isMain}
        widthOfTieHandsBar={fillOfTieHands}
      >{`${Math.round(textOfTieHand)}%`}</TieHandsBarDiv>
    </OuterBarDiv>
  )
}
