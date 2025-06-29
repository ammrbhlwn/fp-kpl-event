import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../supabase/client'

export default async function PrivatePage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('auth/login')
  }

  // Tambahkan tombol logout (pakai link ke /auth/logout jika ingin SSR, atau bisa pakai client component jika ingin JS)
  return (
    <div>
      <p>Hello {data.user.email}</p>
      <form action="/auth/logout" method="post">
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded mt-4">Logout</button>
      </form>
    </div>
  )
}