import { LottieContainer, VideoContainer } from './styles'
import { ImageBox } from './../ImageBox/index'
import { Player, Video } from '@vime/react'
import { Player as ReactLottiePlayer } from '@lottiefiles/react-lottie-player'
import '@vime/core/themes/default.css'

interface AdvertisingProps {
  advertisingFolder?: 'a' | 'b' | 'c' | 'd'
  path: string
  assets: [] | [string] | any
  frameDuration?: number
}

export function Advertising({
  advertisingFolder,
  path,
  assets,
  frameDuration,
}: AdvertisingProps) {
  return (
    <>
      {(() => {
        switch (advertisingFolder) {
          case 'a':
            return <ImageBox frameDuration={frameDuration} frames={assets} />
          case 'b':
            return (
              <VideoContainer>
                <Player muted={true} loop={true} autoplay={true} paused={false}>
                  <Video>
                    <source src={path} />
                  </Video>
                </Player>
              </VideoContainer>
            )
          case 'c':
            return <ImageBox frameDuration={frameDuration} frames={assets} />
          case 'd':
            return (
              <LottieContainer>
                <ReactLottiePlayer
                  src={path}
                  className="player"
                  loop
                  autoplay
                />
              </LottieContainer>
            )
          default:
            return <> </>
        }
      })()}
    </>
  )
}
