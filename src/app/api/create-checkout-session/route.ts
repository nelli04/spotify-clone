import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getURL } from '@/libs/helpers/helpers'
import { stripe } from '@/libs/stripe/stripe'
import { createOrRetrieveACustomer } from '@/libs/supabase-admin/supabase-admin'

export async function POST(req: Request) {
  const { price, quantity = 1, metadata = {} } = await req.json()

  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { user } = (await supabase.auth.getUser())?.data ?? {}

    const customer = await createOrRetrieveACustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      line_items: [{ price: price.id, quantity }],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 31,
        metadata,
      },
      success_url: `${getURL()}/account`,
      cancel_url: `${getURL()}`,
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (e: any) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}
