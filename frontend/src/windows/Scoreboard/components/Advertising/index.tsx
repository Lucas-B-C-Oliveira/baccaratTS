import { LottieContainer, VideoContainer } from './styles'
import { ImageBox } from './../ImageBox/index'
import { Player, Video } from '@vime/react'
import { Player as ReactLottiePlayer } from '@lottiefiles/react-lottie-player'
import '@vime/core/themes/default.css'

interface AdvertisingProps {
  advertisingFolder?: 'a' | 'b' | 'c' | 'd'
  path: string
  assets: [] | [string] | any
}

export function Advertising({
  advertisingFolder,
  path,
  assets,
}: AdvertisingProps) {
  console.log('path', path)
  return (
    <>
      {(() => {
        switch (advertisingFolder) {
          case 'a':
            return <ImageBox frameDuration={900} frames={assets} />
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
            return <ImageBox frameDuration={1100} frames={assets} />
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
