import styled from 'styled-components'

interface OuterBarProps {
  position: {
    x: number
    y: number
  }
  width: number
  height: number
}

interface InnerBarsProps {
  widthOfBankerBar?: number
  widthOfPlayerBar?: number
  widthOfTieHandsBar?: number
  fontSize?: number
}

export const OuterBarDiv = styled.div<OuterBarProps>`
  position: relative;

  left: ${(props) => {
    return props.position.x + '%'
  }};

  top: ${(props) => {
    return props.position.y + '%'
  }};

  width: ${(props) => {
    return props.width + '%'
  }};

  height: ${(props) => {
    return props.height + '%'
  }};

  overflow: hidden;
  border-radius: 1.875rem;
  box-shadow: 0px 2px 3px 0px #0f172aae;
  display: flex;
`

export const BankerBarDiv = styled.div<InnerBarsProps>`
  width: ${(props) => {
    return props.widthOfBankerBar + '%'
  }};

  box-shadow: none;
  font-size: ${(props) => {
    return props.fontSize + '%'
  }};
  display: flex;
  flex-direction: column;
  text-align: center;
  white-space: nowrap;
  justify-content: center;
  color: #000000;
  background-image: linear-gradient(
    #f66262,
    #f66262,
    #f65a59,
    #f65a59,
    #f24e4d,
    #f24e4d,
    #ee4342,
    #ee4342,
    #d71312,
    #c10e0c,
    #c00e0c,
    #b21311,
    #af100f,
    #af100f,
    #ae0c0b
  );
`

export const PlayerBarDiv = styled.div<InnerBarsProps>`
  width: ${(props) => {
    return props.widthOfPlayerBar + '%'
  }};
  box-shadow: none;
  display: flex;
  font-size: ${(props) => {
    return props.fontSize + '%'
  }};
  flex-direction: column;
  text-align: center;
  white-space: nowrap;
  color: #000000;
  justify-content: center;
  background-image: linear-gradient(
    #909ee7,
    #7c8ce4,
    #7487e4,
    #697ee4,
    #6474e4,
    #576bdb,
    #475fcc,
    #4054c0,
    #344cb4,
    #203394,
    #203394,
    #203394,
    #203394,
    #203394,
    #203394,
    #203394
  );
`

export const TieHandsBarDiv = styled.div<InnerBarsProps>`
  width: ${(props) => {
    return props.widthOfTieHandsBar + '%'
  }};
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  display: flex;
  box-shadow: none;
  font-size: ${(props) => {
    return props.fontSize + '%'
  }};
  flex-direction: column;
  text-align: center;
  white-space: nowrap;
  color: #000000;
  justify-content: center;
  background-image: linear-gradient(
    #90df99,
    #84dc8c,
    #7cd484,
    #66cc71,
    #54c45c,
    #48bc54,
    #3cb848,
    #2cac3c,
    #1e922c,
    #14711f,
    #14711f,
    #14711f,
    #14711f,
    #14711f,
    #14711f,
    #14711f
  );
`
