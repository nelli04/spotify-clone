'use client'

import { FC, ReactNode } from 'react'

import { useRouter } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { UserAccount } from '@/components/header/user-account/user-account'

type HeaderProps = {
  children: ReactNode
  className?: string
}

export const Header: FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter()

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-violet-600 p-6`, className)}>
      <div className="w-full md-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center cursor-pointer hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <UserAccount router={router} />
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}
