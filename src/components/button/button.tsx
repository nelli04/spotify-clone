import { ComponentPropsWithoutRef, ComponentPropsWithRef, ElementType, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

type ButtonProps<T extends ElementType> = {
  as?: T
  className?: string
} & ComponentPropsWithoutRef<T>

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>['ref']

export const Button = forwardRef(
  <T extends ElementType = 'button'>(
    { className, children, disabled, type = 'button', ...props }: ButtonProps<T>,
    ref?: PolymorphicRef<T>
  ) => {
    return (
      <button
        type={type}
        className={twMerge(
          `w-full rounded-full bg-violet-600 border border-transparent px-3 py-3 disabled:cursor-not-allowed disabled:opacity-50 
        text-black font-bold hover:opacity-75 transition`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
