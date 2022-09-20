import ReactPlayer from 'react-player'
import { VideoContainer } from './styles'
import video320p from '../../../../../assets/scoreboard/videos/new-slots-trailer-2020-320p.mp4'
import video720p from '../../../../assets/scoreboard/videos/new-slots-trailer-2020-720.mp4'

export function Video() {
  return (
    <VideoContainer>
      <ReactPlayer
        muted={true}
        loop={true}
        playing={true}
        controls={false}
        height={'26.48vh'}
        width={'26.88vw'}
        url={video720p}
      />
    </VideoContainer>
  )
}
