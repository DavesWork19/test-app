import { createClient } from '../../utils/supabase/server';
import { CreateNewAppointment } from './CreateNewAppointment';

export default async function CreateAppointmentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <CreateNewAppointment userID={user.id} />
    </main>
  );
}
