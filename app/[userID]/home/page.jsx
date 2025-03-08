import { HomeAppointments } from '../../components/Appointments/HomeAppointments';

export default async function Home({ params }) {
  const { userID } = await params;
  const AppointmentDataResponse = await fetch(
    `http://localhost:3000/api/${userID}/appointmentData/allAppointments`
  );
  const AppointmentData = await AppointmentDataResponse.json();

  return (
    <main>
      <div className='grid grid-cols-1 place-items-center gap-4'>
        <HomeAppointments appointments={AppointmentData} userID={userID} />
      </div>
    </main>
  );
}
