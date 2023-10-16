import { FC } from 'react'

import { Range, Root, Track } from '@radix-ui/react-slider'

type TrackPlayerProps = {
  currentPosition?: string
  value: number
  onChange?: (value: number) => void
  playedDuration?: string
  songDuration?: string
}

export const TrackPlayer: FC<TrackPlayerProps> = ({
  playedDuration,
  songDuration,
  value = 0,
  onChange,
}) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0])
  }

  return (
    <div className="w-full">
      <div className="flex items-center mb-2 justify-center gap-x-4">
        <span className="text-xs">{playedDuration}</span>
        <Root
          className="relative flex items-center select-none touch-none w-full h-full cursor-pointer"
          defaultValue={[0]}
          value={[value]}
          onValueChange={handleChange}
          max={1}
          step={0.01}
          aria-label="TrackPlayer"
        >
          <Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
            <Range className="absolute bg-white rounded-full h-full" />
          </Track>
        </Root>
        <span className="text-xs">{songDuration}</span>
      </div>
    </div>
  )
}
