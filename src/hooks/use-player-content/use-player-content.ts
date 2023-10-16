import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import ReactPlayer from 'react-player'

import { usePlayer } from '@/hooks'

export const usePlayerContent = () => {
  const player = usePlayer()
  const [volume, setVolume] = useState(1)

  const [isPlaying, setIsPlaying] = useState(false)
  const [seek, setSeek] = useState(0)

  const playerRef = useRef<ReactPlayer>(null)
  const playedRef = useRef<string>('')

  const [playedDuration, setPlayedDuration] = useState('0:00')
  const [songDuration, setSongDuration] = useState('0:00')

  const [isLoop, setIsLoop] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  const getNextSong = useCallback(
    (currentIndex: number, clicked: boolean): string => {
      let nextSong: string

      if (isLoop && !clicked) {
        nextSong = player.ids[currentIndex]
        playerRef.current?.seekTo(0)
        setIsPlaying(true)
      } else {
        nextSong = player.ids[currentIndex + 1]
      }

      if (!nextSong) {
        return player.ids[0]
      }

      return nextSong
    },
    [isLoop, player.ids]
  )

  const onPlayNext = useCallback(
    (clicked = false) => {
      if (player.ids.length === 0) {
        return
      }

      const currentIndex = player.ids.findIndex(id => id === player.activeId)

      const nextSong = getNextSong(currentIndex, clicked)

      player.setId(nextSong)
    },
    [player.ids, player.activeId, getNextSong]
  )

  const onPlayPrevious = useCallback(() => {
    if (player.ids.length === 0) {
      return
    }
    const currentIndex = player.ids.findIndex(id => id === player.activeId)
    const previousSong = player.ids[currentIndex - 1]

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1])
    }
    player.setId(previousSong)
  }, [player.ids, player.activeId])

  useEffect(() => {
    setIsPlaying(true)

    if (isShuffle) {
      player.shuffle(player.unShuffledIds)
    } else {
      player.resetShuffle(player.unShuffledIds)
    }

    return () => {
      setIsPlaying(false)
    }
  }, [isShuffle])

  const handlePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1)
    } else {
      setVolume(0)
    }
  }

  const onLoop = () => {
    setIsLoop(!isLoop)
  }

  const onShuffle = () => {
    if (isShuffle) {
      setIsShuffle(false)
    } else {
      setIsShuffle(true)
    }
  }

  const progress = useMemo(
    () => (duration: number, seconds: number) => {
      if (!duration) {
        return '0:00'
      }
      const minutes = Math.floor(duration / 60)

      seconds = Math.round(duration - minutes * 60 + seconds)

      return `${minutes}:${seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`
    },
    []
  )

  const onProgress = useCallback(
    (played: number, playedSeconds: number) => {
      const playedDuration = progress(playedSeconds, played)

      setPlayedDuration(playedDuration)
      setSeek(played)
      playedRef.current = playedDuration
    },
    [progress]
  )

  useEffect(() => {
    const updatePlayedDuration = () => {
      setPlayedDuration(playedRef.current)
    }
    const interval = setInterval(updatePlayedDuration, 1000)

    return () => clearInterval(interval)
  }, [])

  const onDuration = (duration: number) => {
    setSongDuration(progress(duration, 0))
  }

  return {
    onPlayNext,
    onPlayPrevious,
    handlePlay,
    toggleMute,
    onLoop,
    onShuffle,
    onDuration,
    onProgress,
    playedDuration,
    songDuration,
    isPlaying,
    setIsPlaying,
    seek,
    setSeek,
    isLoop,
    setIsLoop,
    isShuffle,
    setIsShuffle,
    volume,
    setVolume,
    playerRef,
  }
}
