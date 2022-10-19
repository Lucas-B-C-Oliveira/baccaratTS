import { ImageContainer } from './styles'
import { useEffect, useRef, useState } from 'react'

interface ImageContainerProps {
  frames: [] | [string]
  frameDuration: number
}

export function ImageBox({ frames, frameDuration }: ImageContainerProps) {
  const [imagePath, setImagePath] = useState<string>('')
  const currentIndex = useRef(0)

  useEffect(() => {
    if (frames.length > 0) {
      const interval = setInterval(() => {
        setImagePath(frames[currentIndex.current])
        currentIndex.current = currentIndex.current + 1
        if (currentIndex.current >= frames.length) currentIndex.current = 0
      }, frameDuration)

      return () => clearInterval(interval)
    }
  }, [frames, frameDuration])

  return <ImageContainer src={imagePath} />
}
