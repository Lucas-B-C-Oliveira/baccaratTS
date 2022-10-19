import styled from 'styled-components'

interface ControlButtons {
  backgroundImageNormal: string
  backgroundImagePressed: string
  backgroundImageDisabled: string
  specialSize?: boolean
}

const isDev = false

export const ControlContainerMain = styled.div`
  width: 100vw;
  height: 100vh;
`

export const ControlContainer = styled.div`
  width: 100vh;
  height: 100vw;

  background: ${(props) => props.theme['gray-900']}; //! TODO: Remove this

  padding: 4.88vw 2.5vh 0vw 2.5vh;

  display: grid;

  transform: ${() => {
    const rotate = -90

    const x = 20.75
    const y = 35.5

    // if (isDev) {
    //   //! TODO: Remove this Lucas' Screen size
    //   x = 21.9
    //   y = 38.9
    // } else {
    //   //! TODO: Remove this #### Michel's Screen size
    //   x = 20.75
    //   y = 35.5
    // }

    return `rotate(${rotate}deg) translate(${y}vh, ${x}vw)`
  }};
`

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.94vw;

  height: 20.9vw;
  width: 94.6vh;
`

export const TopButton = styled.button<ControlButtons>`
  width: 46.33vh;
  height: 20.9vw;

  background: url(${(props) => props.backgroundImageNormal});
  background-size: 100% 100%;

  &:disabled {
    background: url(${(props) => props.backgroundImageDisabled});
    background-size: 100% 100%;
  }

  &:not(:disabled):active {
    background: url(${(props) => props.backgroundImagePressed});
    background-size: 100% 100%;
  }
`

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.9375vw;

  width: 37.13vh;
  height: 35.1vw;
`

export const MiddleButton = styled.button<ControlButtons>`
  position: relative;

  top: ${(props) => {
    if (props.specialSize) return '3.71vw'
    else return '0vw'
  }};

  width: ${(props) => {
    if (props.specialSize) return '17.17vh'
    else return '37.17vh'
  }};

  height: ${(props) => {
    if (props.specialSize) return '27.64vw'
    else return '15.43vw'
  }};

  background: url(${(props) => props.backgroundImageNormal});
  background-size: 100% 100%;

  &:disabled {
    background: url(${(props) => props.backgroundImageDisabled});
    background-size: 100% 100%;
  }

  &:not(:disabled):active {
    background: url(${(props) => props.backgroundImagePressed});
    background-size: 100% 100%;
  }
`

export const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 1.26vw;
  row-gap: 2.2vw;
  column-gap: 4.84vh;
`

export const BottomButton = styled.button<ControlButtons>`
  position: relative;

  left: ${(props) => {
    if (props.specialSize) return '8.84vh'
    else return '0rem'
  }};

  width: ${(props) => {
    if (props.specialSize) return '72.67vh'
    else return '26.83vh'
  }};

  height: ${(props) => {
    if (props.specialSize) return '12.79vw'
    else return '9.86vw'
  }};

  background: url(${(props) => props.backgroundImageNormal});
  background-size: 100% 100%;

  &:disabled {
    background: url(${(props) => props.backgroundImageDisabled});
    background-size: 100% 100%;
  }

  &:not(:disabled):active {
    background: url(${(props) => props.backgroundImagePressed});
    background-size: 100% 100%;
  }
`
