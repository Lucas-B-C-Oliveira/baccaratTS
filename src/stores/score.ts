import create from 'zustand'

interface Bar {
  key: number
  x: number
  y: number
}

interface Ball {
  key: number
  position: {
    x: number
    y: number
  }
  image: number
  bars: Bar[]
}

interface Score {
  ballsTop: Ball[]
  ballsBottom: Ball[]
  addBallTopOfScore: (newBall: Ball) => void
  addBallBottomOfScore: (newBall: Ball) => void
  setBallBottomOfScore: (newBall: Ball) => void
  setBallTopOfScore: (newBall: Ball) => void
  addBarToPreviousBottomBall: (newBar: Bar) => void
}

export const useScoreStore = create<Score>((set, get) => ({
  ballsTop: [],
  ballsBottom: [],

  addBallTopOfScore: (newBall: Ball) => {
    set((state) => ({
      ballsTop: [...state.ballsTop, newBall],
    }))
  },

  addBallBottomOfScore: (newBall: Ball) => {
    set((state) => ({
      ballsBottom: [...state.ballsBottom, newBall],
    }))
  },

  setBallBottomOfScore: (newBall: Ball) => {
    set(() => ({
      ballsBottom: [newBall],
    }))
  },

  setBallTopOfScore: (newBall: Ball) => {
    set(() => ({
      ballsTop: [newBall],
    }))
  },

  addBarToPreviousBottomBall: (newBar: Bar) => {
    const lastIndex: Ball | undefined = get().ballsBottom.pop()

    if (lastIndex) {
      lastIndex.bars = [...lastIndex.bars, newBar]

      set((state) => ({
        ballsBottom: [...state.ballsBottom, lastIndex]
      }))
    }
  },

}))
