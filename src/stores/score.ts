import create from 'zustand'

interface Ball {
  key: number
  position: {
    x: number
    y: number
  }
  image: number
}

interface Score {
  ballsTop: Ball[]
  ballsBottom: Ball[]
  addBallTopOfScore: (newBall: Ball) => void
  addBallBottomOfScore: (newBall: Ball) => void
  setBallBottomOfScore: (newBall: Ball) => void
}

export const useScoreStore = create<Score>((set) => ({
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
    set((state) => ({
      ballsBottom: [newBall],
    }))
  },
}))
