import styled from 'styled-components'

interface ControlButtons {
  backgroundImageNormal: string
  backgroundImagePressed: string
  backgroundImageDisabled: string
  width?: number | null
  height?: number | null
  paddingTop?: number | null
  leftPosition?: number | null
}

export const ControlContainer = styled.div`
  width: 1080px;
  height: 1920px;
  background: ${(props) => props.theme['gray-900']}; // TODO: Remove this

  padding: 27px;
  padding-top: 74.5px;
  transform: rotate(90deg) translate(-420px, -420px);
`

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 86px;
`
export const TopButton = styled.button<ControlButtons>`
  width: 500px;
  height: 406px;
  background: url(${(props) => props.backgroundImageNormal});

  &:disabled {
    background: url(${(props) => props.backgroundImageDisabled});
  }

  &:not(:disabled):active {
    background: url(${(props) => props.backgroundImagePressed});
  }
`

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;

  height: 674px;
  width: 401px;
  gap: 19px;
`

export const MiddleButton = styled.button<ControlButtons>`
  position: relative;

  top: ${(props) => {
    if (props.paddingTop) return props.paddingTop + 'px'
    else return '0px'
  }};

  width: ${(props) => {
    if (props.width) return props.width + 'px'
    else return '401px'
  }};

  height: ${(props) => {
    if (props.height) return props.height + 'px'
    else return '300px'
  }};

  background: url(${(props) => props.backgroundImageNormal});

  &:disabled {
    background: url(${(props) => props.backgroundImageDisabled});
  }

  &:not(:disabled):active {
    background: url(${(props) => props.backgroundImagePressed});
  }
`

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 26px;
  max-height: 522px;
  max-width: 971px;
  row-gap: 86px;
  padding-top: 86px;
`

export const BottomButton = styled.button<ControlButtons>`
  position: relative;

  left: ${(props) => {
    if (props.leftPosition) return props.leftPosition + 'px'
    else return '0px'
  }};

  width: ${(props) => {
    if (props.width) return props.width + 'px'
    else return '288px'
  }};

  height: ${(props) => {
    if (props.height) return props.height + 'px'
    else return '188px'
  }};

  background: url(${(props) => props.backgroundImageNormal});

  &:disabled {
    background: url(${(props) => props.backgroundImageDisabled});
  }

  &:not(:disabled):active {
    background: url(${(props) => props.backgroundImagePressed});
  }
`
