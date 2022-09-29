import styled from 'styled-components'

interface ControlButtons {
  backgroundImageNormal: string
  backgroundImagePressed: string
  backgroundImageDisabled: string
  specialSize?: boolean
  paddingTop?: number | null
  leftPosition?: number | null
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

  padding: 4.6563rem 1.6875rem 1.6875rem 1.6875rem;
  display: grid;
  row-gap: 5.375rem;

  transform: ${() => {
    const rotate = -90
    let x = 20.75
    let y = 35.5

    if (isDev) {
      //! TODO: Remove this Lucas' Screen size
      y = 38.9
      x = 21.9
    } else {
      //! TODO: Remove this #### Michel's Screen size
      y = 35.5
      x = 20.75
    }

    return `rotate(${rotate}deg) translate(${y}vh, ${x}vw)`
  }};
`

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1.625rem;

  width: 95vh;
  height: 21.15vw;
`

export const TopButton = styled.button<ControlButtons>`
  width: 46.3vh;
  height: 21.15vw;

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
  gap: 1.0938rem;

  width: 37.13vh;
  height: 35.1vw;
`

export const MiddleButton = styled.button<ControlButtons>`
  position: relative;

  top: ${(props) => {
    if (props.paddingTop) return props.paddingTop + 'rem'
    else return '0rem'
  }};

  width: ${(props) => {
    if (props.specialSize) return '17.5vh'
    else return '37.13vh'
  }};

  height: ${(props) => {
    if (props.specialSize) return '27.71vw'
    else return '15.63vw'
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
  justify-content: space-between;
  margin-left: 1.625rem;
  row-gap: 5.375rem;

  width: 89.91vh;
  height: 27.19vw;
`

export const BottomButton = styled.button<ControlButtons>`
  position: relative;

  left: ${(props) => {
    if (props.leftPosition) return props.leftPosition + 'rem'
    else return '0rem'
  }};

  width: ${(props) => {
    if (props.specialSize) return '72.78vh'
    else return '26.67vh'
  }};

  height: ${(props) => {
    if (props.specialSize) return '12.76vw'
    else return '9.79vw'
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
