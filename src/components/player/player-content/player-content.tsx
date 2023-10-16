'use client'

import { FC } from 'react'

import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import ReactPlayer from 'react-player'

import { MediaItem, Slider } from '@/components'
import { LikeButton } from '@/components/like-button/like-button'
import { MusicPlayerControls } from '@/components/player/player-content/music-player-controls/music-player-controls'
import { usePlayerContent } from '@/hooks/use-player-content/use-player-content'
import { Song } from '@/types'

type PlayerContentProps = {
  song: Song
  songUrl: string
}

export const PlayerContent: FC<PlayerContentProps> = ({ songUrl, song }) => {
  const {
    onPlayNext,
    onPlayPrevious,
    handlePlay,
    toggleMute,
    onLoop,
    onShuffle,
    playedDuration,
    songDuration,
    isPlaying,
    setIsPlaying,
    seek,
    setSeek,
    isLoop,
    isShuffle,
    onProgress,
    onDuration,
    volume,
    setVolume,
    playerRef,
  } = usePlayerContent()

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={24} className="text-black" />
        </div>
      </div>
      <MusicPlayerControls
        songDuration={songDuration}
        playedDuration={playedDuration}
        handlePlay={handlePlay}
        Icon={Icon}
        isLoop={isLoop}
        isShuffle={isShuffle}
        onLoop={onLoop}
        onPlayNext={onPlayNext}
        onPlayPrevious={onPlayPrevious}
        onShuffle={onShuffle}
        playerRef={playerRef}
        seek={seek}
        setSeek={setSeek}
      />
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon onClick={toggleMute} size={34} className="cursor-pointer" />
          <Slider value={volume} onChange={value => setVolume(value)} />
        </div>
      </div>
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url={songUrl}
          volume={volume}
          playing={isPlaying}
          onProgress={({ played, playedSeconds }) => onProgress(played, playedSeconds)}
          onDuration={duration => onDuration(duration)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onEnded={() => onPlayNext()}
        />
      </div>
    </div>
  )
}
