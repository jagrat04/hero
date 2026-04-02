import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
)

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) throw new Error('Missing CLERK_WEBHOOK_SECRET')
//comment just to redeploy
  // THE FIX: Await the headers() function before calling .get()
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    return new Response('Error verifying webhook', { status: 400 })
  }

  // Handle User Created Event
  if (evt.type === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;
    const primaryEmail = email_addresses[0]?.email_address;

    await supabase.from('profiles').insert({
      id: id,
      email: primaryEmail,
      first_name: first_name || '',
      last_name: last_name || '',
      subscription_status: 'inactive'
    })
  }

  // Handle User Deleted Event (Cleanup)
  if (evt.type === 'user.deleted') {
    await supabase.from('profiles').delete().eq('id', evt.data.id);
  }

  return new Response('', { status: 200 })
}