import { FC, ReactNode } from 'react'

import * as DialogRadix from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'

type ModalProps = {
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onChange, description, title }) => {
  return (
    <DialogRadix.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <DialogRadix.Portal>
        <DialogRadix.Overlay className="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
        <DialogRadix.Content
          className="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h-[85vh] w-full
        md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none"
        >
          <DialogRadix.Title className="text-xl text-center font-bold mb-4">
            {title}
          </DialogRadix.Title>
          <DialogRadix.Description className="mb-5 text-sm leading-normal text-center">
            {description}
          </DialogRadix.Description>
          <div>{children}</div>
          <DialogRadix.Close asChild>
            <button
              className="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none
              items-center justify-center rounded-full focus:outline-none"
            >
              <IoMdClose />
            </button>
          </DialogRadix.Close>
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  )
}
