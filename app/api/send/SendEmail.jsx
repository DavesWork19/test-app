import { stateConversion } from '../../components/constants';

export const SendEmail = ({
  emailRecipients,
  selectedItems,
  appointments,
  docs,
  pets,
  vets,
  insurances,
  account,
  userEmail,
}) => {
  const dataCategories = {
    appointments: {},
    documents: {},
    vets: {},
    insurances: {},
  };

  const petNames = pets.map((data) => data.name);
  if (petNames.length > 1) {
    petNames.splice(petNames.length - 1, 0, ' and ');
  }
  const allPetBirthdays =
    selectedItems.petBirthday &&
    selectedItems.petBirthday.map((datas) =>
      pets.map((pet) => {
        if (pet.id === datas.split('+')[0]) {
          return pet.birthday;
        }
        return null;
      })
    );
  const allPetBreeds =
    selectedItems.petBreed &&
    selectedItems.petBreed.map((datas) =>
      pets.map((pet) => {
        if (pet.id === datas.split('+')[0]) {
          return pet.breed;
        }
        return null;
      })
    );
  const allPetColors =
    selectedItems.petColor &&
    selectedItems.petColor.map((datas) =>
      pets.map((pet) => {
        if (pet.id === datas.split('+')[0]) {
          return pet.color;
        }
        return null;
      })
    );
  const allPetWeights =
    selectedItems.petWeight &&
    selectedItems.petWeight.map((datas) =>
      pets.map((pet) => {
        if (pet.id === datas.split('+')[0]) {
          return pet.weight;
        }
        return null;
      })
    );

  const allNNPetBirthdays = allPetBirthdays.filter(
    (element) => element !== null
  );

  const allApptStarts =
    selectedItems.apptStart &&
    selectedItems.apptStart.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [appointment] = appointments.filter((appt) => appt.id === id);
        dataCategories.appointments[id]
          ? (dataCategories.appointments[id] = [
              ...dataCategories.appointments[id],
              appointment.start_time,
            ])
          : (dataCategories.appointments[id] = [appointment.start_time]);
        return appointment.start_time ? true : undefined;
      }
    });

  const allApptEnds =
    selectedItems.apptEnd &&
    selectedItems.apptEnd.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [appointment] = appointments.filter((appt) => appt.id === id);
        dataCategories.appointments[id]
          ? (dataCategories.appointments[id] = [
              ...dataCategories.appointments[id],
              appointment.end_time,
            ])
          : (dataCategories.appointments[id] = [appointment.end_time]);
        return appointment.end_time ? true : undefined;
      }
    });
  const apptEndsExists = !allApptEnds.every(
    (element) => element === undefined || element === null || element === ''
  );

  const allApptVets =
    selectedItems.apptVet &&
    selectedItems.apptVet.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [appointment] = appointments.filter((appt) => appt.id === id);
        dataCategories.appointments[id]
          ? (dataCategories.appointments[id] = [
              ...dataCategories.appointments[id],
              appointment.vet,
            ])
          : (dataCategories.appointments[id] = [appointment.vet]);
        return appointment.vet ? true : undefined;
      }
    });
  const apptVetExists = !allApptVets.every(
    (element) => element === undefined || element === null || element === ''
  );

  const allApptInsurances =
    selectedItems.apptInsurance &&
    selectedItems.apptInsurance.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [appointment] = appointments.filter((appt) => appt.id === id);
        dataCategories.appointments[id]
          ? (dataCategories.appointments[id] = [
              ...dataCategories.appointments[id],
              appointment.insurance,
            ])
          : (dataCategories.appointments[id] = [appointment.insurance]);
        return appointment.insurance ? true : undefined;
      }
    });
  const apptInsuranceExists = !allApptInsurances.every(
    (element) => element === undefined || element === null || element === ''
  );
  const allApptDescriptions =
    selectedItems.apptDescription &&
    selectedItems.apptDescription.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [appointment] = appointments.filter((appt) => appt.id === id);
        dataCategories.appointments[id]
          ? (dataCategories.appointments[id] = [
              ...dataCategories.appointments[id],
              appointment.description,
            ])
          : (dataCategories.appointments[id] = [appointment.description]);
        return appointment.description ? true : undefined;
      }
    });
  const apptDescriptionExists = !allApptDescriptions.every(
    (element) => element === undefined || element === null || element === ''
  );
  const allApptNextSteps =
    selectedItems.apptNextSteps &&
    selectedItems.apptNextSteps.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [appointment] = appointments.filter((appt) => appt.id === id);
        dataCategories.appointments[id]
          ? (dataCategories.appointments[id] = [
              ...dataCategories.appointments[id],
              appointment.next_steps,
            ])
          : (dataCategories.appointments[id] = [appointment.next_steps]);
        return appointment.next_steps ? true : undefined;
      }
    });
  const apptNextStepsExists = !allApptNextSteps.every(
    (element) => element === undefined || element === null || element === ''
  );
  const allApptPrices =
    selectedItems.apptPrice &&
    selectedItems.apptPrice.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [appointment] = appointments.filter((appt) => appt.id === id);
        dataCategories.appointments[id]
          ? (dataCategories.appointments[id] = [
              ...dataCategories.appointments[id],
              appointment.price,
            ])
          : (dataCategories.appointments[id] = [appointment.price]);
        return appointment.price ? true : undefined;
      }
    });
  const apptPricesExists = !allApptPrices.every(
    (element) => element === undefined || element === null || element === ''
  );
  const apptExists =
    apptEndsExists ||
    apptVetExists ||
    apptInsuranceExists ||
    apptDescriptionExists ||
    apptNextStepsExists ||
    apptPricesExists;

  const allDocDates =
    selectedItems.docDate &&
    selectedItems.docDate.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [document] = docs.filter((doc) => doc.id === id);
        dataCategories.documents[id]
          ? (dataCategories.documents[id] = [
              ...dataCategories.documents[id],
              document.date,
            ])
          : (dataCategories.documents[id] = [document.date]);
        return document.date ? true : undefined;
      }
    });
  const allDocDescriptions =
    selectedItems.docDate &&
    selectedItems.docDate.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [document] = docs.filter((doc) => doc.id === id);
        dataCategories.documents[id]
          ? (dataCategories.documents[id] = [
              ...dataCategories.documents[id],
              document.description,
            ])
          : (dataCategories.documents[id] = [document.description]);
        return document.description ? true : undefined;
      }
    });
  const docDescriptionExists = !allDocDescriptions.every(
    (element) => element === undefined || element === null || element === ''
  );
  const allPhotoDescriptions =
    selectedItems.docDate &&
    selectedItems.docDate.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [document] = docs.filter((doc) => doc.id === id);
        dataCategories.documents[id]
          ? (dataCategories.documents[id] = [
              ...dataCategories.documents[id],
              document.description,
            ])
          : (dataCategories.documents[id] = [document.description]);
        return document.description ? true : undefined;
      }
    });
  const docPhotoExists = !allPhotoDescriptions.every(
    (element) => element === undefined || element === null || element === ''
  );
  const docExists = docDescriptionExists || docPhotoExists;

  const allVetNames =
    selectedItems.vetName &&
    selectedItems.vetName.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [vet] = vets.filter((vet) => vet.id === id);
        dataCategories.vets[id]
          ? (dataCategories.vets[id] = [...dataCategories.vets[id], vet.name])
          : (dataCategories.vets[id] = [vet.name]);
        return vet.name ? true : undefined;
      }
    });
  const allVetLocations =
    selectedItems.vetLocation &&
    selectedItems.vetLocation.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [vet] = vets.filter((vet) => vet.id === id);
        dataCategories.vets[id]
          ? (dataCategories.vets[id] = [
              ...dataCategories.vets[id],
              vet.location,
            ])
          : (dataCategories.vets[id] = [vet.location]);
        return vet.location ? true : undefined;
      }
    });
  const vetLocationExists = !allVetLocations.every(
    (element) => element === undefined || element === null || element === ''
  );
  const allVetEmails =
    selectedItems.vetEmail &&
    selectedItems.vetEmail.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [vet] = vets.filter((vet) => vet.id === id);
        dataCategories.vets[id]
          ? (dataCategories.vets[id] = [...dataCategories.vets[id], vet.email])
          : (dataCategories.vets[id] = [vet.email]);
        return vet.email ? true : undefined;
      }
    });
  const vetEmailExists = !allVetEmails.every(
    (element) => element === undefined || element === null || element === ''
  );
  const allVetPhone =
    selectedItems.vetPhone &&
    selectedItems.vetPhone.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [vet] = vets.filter((vet) => vet.id === id);
        dataCategories.vets[id]
          ? (dataCategories.vets[id] = [...dataCategories.vets[id], vet.phone])
          : (dataCategories.vets[id] = [vet.phone]);
        return vet.phone ? true : undefined;
      }
    });
  const vetPhoneExists = !allVetPhone.every(
    (element) => element === undefined || element === null || element === ''
  );
  const vetExists = vetLocationExists || vetEmailExists || vetPhoneExists;

  const allInsurancePolicies =
    selectedItems.insurancePolicy &&
    selectedItems.insurancePolicy.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [insurance] = insurances.filter(
          (insurance) => insurance.id === id
        );
        dataCategories.insurances[id]
          ? (dataCategories.insurances[id] = [
              ...dataCategories.insurances[id],
              insurance.policy,
            ])
          : (dataCategories.insurances[id] = [insurance.policy]);
        return insurance.policy ? true : undefined;
      }
    });
  const insurancePolicyExists = !allInsurancePolicies.every(
    (element) => element === undefined || element === null || element === ''
  );
  const allInsuranceStarts =
    selectedItems.insurancePolicyStart &&
    selectedItems.insurancePolicyStart.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [insurance] = insurances.filter(
          (insurance) => insurance.id === id
        );
        dataCategories.insurances[id]
          ? (dataCategories.insurances[id] = [
              ...dataCategories.insurances[id],
              insurance.policy_start,
            ])
          : (dataCategories.insurances[id] = [insurance.policy_start]);
        return insurance.policy_start ? true : undefined;
      }
    });
  const insuranceStartExists = !allInsuranceStarts.every(
    (element) => element === undefined || element === null || element === ''
  );
  const allInsuranceEnds =
    selectedItems.insurancePolicyEnd &&
    selectedItems.insurancePolicyEnd.map((selectedAppointment) => {
      const id = selectedAppointment.split('+')[0];
      if (id) {
        const [insurance] = insurances.filter(
          (insurance) => insurance.id === id
        );
        dataCategories.insurances[id]
          ? (dataCategories.insurances[id] = [
              ...dataCategories.insurances[id],
              insurance.policy_end,
            ])
          : (dataCategories.insurances[id] = [insurance.policy_end]);
        return insurance.policy_end ? true : undefined;
      }
    });
  const insuranceEndExists = !allInsuranceEnds.every(
    (element) => element === undefined || element === null || element === ''
  );
  const insuranceExists =
    insurancePolicyExists || insuranceStartExists || insuranceEndExists;

  return (
    <>
      <div>
        {`Greetings from Integral Information! We are writing to share some vital information from ${account.first_name} ${account.last_name}. Please check below for information, thank you.`}
      </div>

      {apptExists && (
        <>
          <h3
            style={{
              fontWeight: 'bold',
              marginTop: '15px',
              marginBottom: '5px',
            }}
          >
            Appointments
          </h3>
          <table
            style={{
              width: '100%',
              borderSpacing: '0px',
              border: '1px solid lightgrey',
            }}
          >
            <thead>
              <tr>
                {apptExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Start Time</th>
                )}
                {apptEndsExists && (
                  <th style={{ border: '1px solid lightgrey' }}>End Time</th>
                )}
                {apptPricesExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Price</th>
                )}
                {apptVetExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Vet</th>
                )}
                {apptInsuranceExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Insurance</th>
                )}
                {apptDescriptionExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Description</th>
                )}
                {apptNextStepsExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Next Steps</th>
                )}
              </tr>
            </thead>
            <tbody>
              {Object.entries(dataCategories.appointments).map(
                (appointment) => {
                  return (
                    <tr key={appointment[0]}>
                      {apptExists && (
                        <td
                          style={{
                            border: '1px solid lightgrey',
                            textAlign: 'center',
                            padding: '3px',
                          }}
                        >{`${new Date(appointment[1][0]).toLocaleString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          }
                        )}`}</td>
                      )}
                      {apptEndsExists && (
                        <td
                          style={{
                            border: '1px solid lightgrey',
                            textAlign: 'center',
                            padding: '3px',
                          }}
                        >{`${new Date(appointment[1][1]).toLocaleString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          }
                        )}`}</td>
                      )}
                      {apptPricesExists && (
                        <td
                          style={{
                            border: '1px solid lightgrey',
                            textAlign: 'center',
                            padding: '3px',
                          }}
                        >
                          {appointment[1][6]}
                        </td>
                      )}
                      {apptVetExists && (
                        <td
                          style={{
                            border: '1px solid lightgrey',
                            textAlign: 'center',
                            padding: '3px',
                          }}
                        >
                          {appointment[1][2]}
                        </td>
                      )}
                      {apptInsuranceExists && (
                        <td
                          style={{
                            border: '1px solid lightgrey',
                            textAlign: 'center',
                            padding: '3px',
                          }}
                        >
                          {appointment[1][3]}
                        </td>
                      )}
                      {apptDescriptionExists && (
                        <td
                          style={{
                            border: '1px solid lightgrey',
                            textAlign: 'center',
                            padding: '3px',
                          }}
                        >
                          {appointment[1][4]}
                        </td>
                      )}
                      {apptNextStepsExists && (
                        <td
                          style={{
                            border: '1px solid lightgrey',
                            textAlign: 'center',
                            padding: '3px',
                          }}
                        >
                          {appointment[1][5]}
                        </td>
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </>
      )}
      {docExists && (
        <>
          <h3
            style={{
              fontWeight: 'bold',
              marginTop: '15px',
              marginBottom: '5px',
            }}
          >
            Documents
          </h3>
          <table
            style={{
              width: '100%',
              borderSpacing: '0px',
              border: '1px solid lightgrey',
            }}
          >
            <thead>
              <tr style={{ border: '1px solid lightgrey' }}>
                {docExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Date</th>
                )}
                {docDescriptionExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Description</th>
                )}
                {docPhotoExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Photo</th>
                )}
              </tr>
            </thead>
            <tbody>
              {Object.entries(dataCategories.documents).map((doc) => {
                return (
                  <tr style={{ border: '1px solid lightgrey' }} key={doc[0]}>
                    {docExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >{`${new Date(doc[1][0]).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}`}</td>
                    )}
                    {docDescriptionExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {doc[1][1]}
                      </td>
                    )}
                    {docPhotoExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {doc[1][2]}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {vetExists && (
        <>
          <h3
            style={{
              fontWeight: 'bold',
              marginTop: '15px',
              marginBottom: '5px',
            }}
          >
            Vets
          </h3>
          <table
            style={{
              width: '100%',
              borderSpacing: '0px',
              border: '1px solid lightgrey',
            }}
          >
            <thead>
              <tr style={{ border: '1px solid lightgrey' }}>
                {vetExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Name</th>
                )}
                {vetEmailExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Email</th>
                )}
                {vetPhoneExists && (
                  <th style={{ border: '1px solid lightgrey' }}>
                    Phone Number
                  </th>
                )}
                {vetLocationExists && (
                  <th style={{ border: '1px solid lightgrey' }}>Location</th>
                )}
              </tr>
            </thead>
            <tbody>
              {Object.entries(dataCategories.vets).map((vet) => {
                return (
                  <tr style={{ border: '1px solid lightgrey' }} key={vet[0]}>
                    {vetExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {'vets'}
                      </td>
                    )}
                    {vetEmailExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {vet[1][1]}
                      </td>
                    )}
                    {vetPhoneExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {vet[1][2]}
                      </td>
                    )}
                    {vetLocationExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {vet[1][0]}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {insuranceExists && (
        <>
          <h3
            style={{
              fontWeight: 'bold',
              marginTop: '15px',
              marginBottom: '5px',
            }}
          >
            Insurances
          </h3>
          <table
            style={{
              width: '100%',
              borderSpacing: '0px',
              border: '1px solid lightgrey',
            }}
          >
            <thead>
              <tr style={{ border: '1px solid lightgrey' }}>
                {insuranceExists && (
                  <th style={{ border: '1px solid lightgrey' }}>
                    Company Name
                  </th>
                )}
                {insurancePolicyExists && (
                  <th style={{ border: '1px solid lightgrey' }}>
                    Policy Number
                  </th>
                )}
                {/* {insurancePetExists && <th style={{ border: '1px solid lightgrey' }}>Pet Covered</th>} */}
                {insuranceStartExists && (
                  <th style={{ border: '1px solid lightgrey' }}>
                    Coverage Start
                  </th>
                )}
                {insuranceEndExists && (
                  <th style={{ border: '1px solid lightgrey' }}>
                    Coverage End
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {Object.entries(dataCategories.insurances).map((insurance) => {
                return (
                  <tr
                    style={{ border: '1px solid lightgrey' }}
                    key={insurance[0]}
                  >
                    {insuranceExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {'company'}
                      </td>
                    )}
                    {insurancePolicyExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {insurance[1][0]}
                      </td>
                    )}
                    {/* {insurancePetExists && <td style={{ border: '1px solid lightgrey', textAlign: 'center', padding: '3px' }} >{insurance[1][1]}</td>} */}
                    {insuranceStartExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {new Date(insurance[1][1]).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                    )}
                    {insuranceEndExists && (
                      <td
                        style={{
                          border: '1px solid lightgrey',
                          textAlign: 'center',
                          padding: '3px',
                        }}
                      >
                        {new Date(insurance[1][2]).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <div style={{ marginTop: '50px', color: 'gray' }}>Thank you,</div>
      <div
        style={{ color: 'gray' }}
      >{`From Integral Information on Behalf of, ${account.first_name} ${account.last_name}`}</div>
      <div style={{ color: 'gray', fontSize: '14px' }}>
        {userEmail}
        {account.phone_number &&
          ` - (${account.phone_number.slice(0, 3)})${account.phone_number.slice(3, 6)}-${account.phone_number.slice(6)}`}
      </div>
      <div style={{ color: 'gray', fontSize: '14px' }}>
        {account.address && `${account.address}`}
        {account.apartment ? ` ${account.apartment}, ` : ', '}
        {account.city && `${account.city}, `}
        {account.state && `${stateConversion[account.state]}, `}
        {account.zipcode && account.zipcode}
      </div>
    </>
  );
};
