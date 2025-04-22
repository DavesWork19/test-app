import { createClient } from '../utils/supabase/server';
import { SignOut } from './SignOut';

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: [userInfo],
  } = await supabase.from('user_info').select();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <SignOut userInfo={userInfo} email={user.email} />
    </main>
  );
}
