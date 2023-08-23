import { getSession } from '~/lib/auth/session';
import { redirect } from 'next/navigation';

export default async function Admin() {
  const session = await getSession();

  if (session?.user) return redirect('/admin/dashboard');

  return redirect('/');
}
