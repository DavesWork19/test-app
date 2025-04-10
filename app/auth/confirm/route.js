import { createClient } from '../../utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type');
  const next = searchParams.get('next') ?? '/home';

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { error } = await supabase.from('user_info').insert({
        user_id: user.id,
        first_name: user.user_metadata.first_name,
        last_name: user.user_metadata.last_name,
      });
      // redirect user to specified redirect URL or root of app
      if (!error) {
        redirect(next);
      }
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/auth/auth-code-error');
}
