import bgGridVideo from '../assets/bg-grid.mp4'
import './VideoBackground.css'

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="video-background__video"
      >
        <source src={bgGridVideo} type="video/mp4" />
      </video>
    </div>
  )
}

export default VideoBackground
