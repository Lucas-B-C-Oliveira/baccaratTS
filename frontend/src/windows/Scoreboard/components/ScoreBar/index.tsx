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
  width: number
  height: number
  fontSize: number
  fillOfBanker: number
  fillOfPlayer: number
  fillOfTieHands: number
  textOfBanker: number
  textOfPlayer: number
  textOfTieHand: number
}

export function ScoreBar({
  fontSize,
  height,
  width,
  position,
  fillOfBanker,
  fillOfPlayer,
  fillOfTieHands,
  textOfBanker,
  textOfPlayer,
  textOfTieHand,
}: BarProps) {
  return (
    <OuterBarDiv width={width} height={height} position={position}>
      <BankerBarDiv
        widthOfBankerBar={fillOfBanker}
        fontSize={fontSize}
      >{`${Math.round(textOfBanker)}%`}</BankerBarDiv>
      <PlayerBarDiv
        widthOfPlayerBar={fillOfPlayer}
        fontSize={fontSize}
      >{`${Math.round(textOfPlayer)}%`}</PlayerBarDiv>
      <TieHandsBarDiv
        widthOfTieHandsBar={fillOfTieHands}
        fontSize={fontSize}
      >{`${Math.round(textOfTieHand)}%`}</TieHandsBarDiv>
    </OuterBarDiv>
  )
}
