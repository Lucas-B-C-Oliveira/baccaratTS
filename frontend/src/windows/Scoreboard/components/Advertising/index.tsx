import ReactPlayer from 'react-player'
import { BannerImg, VideoContainer } from './styles'
import { ImageBox } from './../ImageBox/index'
import Lottie from 'lottie-react'

interface AdvertisingProps {
  advertisingFolder?: 'a' | 'b' | 'c' | 'd'
  path?: string
  assets: [] | [string] | any
}

export function Advertising({
  advertisingFolder,
  path,
  assets,
}: AdvertisingProps) {
  console.log('advertisingFolder', advertisingFolder)
  console.log('path', path)
  // console.log('assets', assets)

  return (
    <>
      {(() => {
        switch (advertisingFolder) {
          case 'a':
            return <ImageBox frameDuration={3000} frames={assets} />
          case 'b':
            return (
              <VideoContainer>
                <ReactPlayer
                  muted={true}
                  loop={true}
                  playing={true}
                  controls={false}
                  height={'26.48vh'}
                  width={'26.88vw'}
                  url={path}
                />
              </VideoContainer>
            )
          case 'c':
            return <ImageBox frameDuration={1500} frames={assets} />
          // case 'd':
          //   return <Lottie animationData={groovyWalkAnimation} loop={true} />
          default:
            return null
        }
      })()}
    </>
  )
}
