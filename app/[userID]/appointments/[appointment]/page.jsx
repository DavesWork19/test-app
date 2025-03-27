import { Appointments } from './Appointments';

export default async function AppointmentPage({ params }) {
  const { userID, appointment } = await params;

  const appointmentDataResponse = await fetch(
    `http://localhost:3000/api/${userID}/appointmentData/${appointment}/get`
  );
  const [appointmentData] = await appointmentDataResponse.json();

  //need to add related parameter in - show as a side note or something
  //put related appointments into a carasol or slide deck thing

  return (
    <main>
      <Appointments
        appointmentData={appointmentData}
        userID={userID}
        appointment={appointment}
      />
    </main>
  );
}
