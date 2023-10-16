import { FC } from 'react'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context'
import { toast } from 'react-hot-toast'
import { FaUserAlt } from 'react-icons/fa'

import { Button } from '@/components'
import { useAuthModal, usePlayer, useUser } from '@/hooks'

type UserAccountProps = {
  router: AppRouterInstance
}

export const UserAccount: FC<UserAccountProps> = ({ router }) => {
  const authModal = useAuthModal()
  const player = usePlayer()

  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut()

    player.reset()
    router.refresh()

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out!')
    }
  }

  return (
    <div className="flex justify-between items-center gap-x-4">
      {user ? (
        <div className="flex gap-x-4 items-center">
          <Button onClick={handleLogout} className="bg-white px-6 py-2">
            Logout
          </Button>
          <Button onClick={() => router.push('/account')} className="bg-white">
            <FaUserAlt />
          </Button>
        </div>
      ) : (
        <>
          <div className="">
            <Button
              onClick={authModal.onOpen}
              className="bg-transparent text-neutral-300 font-medium"
            >
              Sign Up
            </Button>
          </div>
          <div className="">
            <Button className="bg-white px-6 py-2" onClick={authModal.onOpen}>
              Log in
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
