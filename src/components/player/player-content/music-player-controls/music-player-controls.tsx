import { FC, RefObject } from 'react'

import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { BsArrowRepeat } from 'react-icons/bs'
import { PiShuffleFill } from 'react-icons/pi'
import ReactPlayer from 'react-player'

import { TrackPlayer } from '@/components/track-player/track-player'

type MusicPlayerControlsProps = {
  onShuffle: () => void
  isShuffle: boolean
  onPlayPrevious: () => void
  handlePlay: () => void
  Icon: any
  onPlayNext: () => void
  onLoop: () => void
  isLoop: boolean
  playedDuration: string
  songDuration: string
  seek: number
  setSeek: (value: number) => void
  playerRef: RefObject<ReactPlayer>
}

export const MusicPlayerControls: FC<MusicPlayerControlsProps> = ({
  onShuffle,
  isShuffle,
  onPlayPrevious,
  handlePlay,
  Icon,
  onLoop,
  onPlayNext,
  isLoop,
  playedDuration,
  songDuration,
  playerRef,
  seek,
  setSeek,
}) => {
  return (
    <div className="flex-col md:flex justify-center items-center w-full max-w-[722px]">
      <div className="flex justify-center items-center gap-x-6 p-2">
        <PiShuffleFill
          onClick={onShuffle}
          className={`text-lg cursor-pointer hover:text-white ${
            isShuffle ? 'text-white' : 'text-neutral-400'
          } transition`}
        />
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={24}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={24} className="text-black" />
        </div>
        <AiFillStepForward
          size={24}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
          onClick={onPlayNext}
        />
        <BsArrowRepeat
          onClick={onLoop}
          className={`text-lg cursor-pointer hover:text-white ${
            isLoop ? 'text-white' : 'text-neutral-400'
          } transition`}
        />
      </div>
      <div className="w-full">
        <TrackPlayer
          playedDuration={playedDuration}
          songDuration={songDuration}
          value={seek}
          onChange={value => {
            playerRef.current?.seekTo(value)
            setSeek(value)
          }}
        />
      </div>
    </div>
  )
}
