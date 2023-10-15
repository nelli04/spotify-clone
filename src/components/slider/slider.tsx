'use client'

import { FC } from 'react'

import * as RadixSlider from '@radix-ui/react-slider'
import { twMerge } from 'tailwind-merge'

type SliderProps = {
  value?: number
  onChange?: (value: number) => void
  min?: number
  max?: number
  className?: string
}

export const Slider: FC<SliderProps> = ({ onChange, value = 1, className }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0])
  }

  return (
    <RadixSlider.Root
      className={twMerge(
        `relative flex items-center select-none touch-none w-full h-10 cursor-pointer`,
        className
      )}
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
    >
      <RadixSlider.Track className="bg-neutral-600 relative grow rounded-full h-[3px]">
        <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  )
}
