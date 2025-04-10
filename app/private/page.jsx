import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/login');
  }

  return <p>Hello {data.user.email}</p>;
}

// <style>
//   #header{
//     font-weight: 600;
//     text-align: center;
//     text-transform: capitalize;
//   }
//   #main{
//     text-align: center;
//   }
//   #button{
//     padding: 10px;
//     border: solid black 2px;
//     border-radius: 10px;
//     text-align: center;
//     width: 25%;
//     margin: auto;
//     margin-top: 25px;
//     margin-bottom: 25px;
//   }
//   .footer{
//     text-align: center;
//     margin: 5px;
//   }
// </style>

// <h2 id="header">Welcome {{ .Data.first_name }} {{ .Data.last_name }}!</h2>

// <div id="main">Follow this link to confirm your account</div>

// <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email"><div id="button">Confirm your account!</div></a>

// <div class="footer">Enjoy</div>
// <div></div>
// <div class="footer">- Integral Information</div>
