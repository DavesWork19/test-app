import {
  Table,
  Container,
  Divider,
  Paper,
  Text,
  Pill,
  Title,
} from '@mantine/core';
import { stateConversion } from './constants';

export const EmailTemplate = ({
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

  console.log('cl', selectedItems, pets, account);

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
  console.log(account);

  return (
    <Container>
      <Paper shadow='xs' withBorder p='md' radius='md' bg={'light'} w={800}>
        <Text>
          To :
          {emailRecipients.map((emailRecipient) => (
            <Pill key={emailRecipient} ms={'xs'}>
              {emailRecipient}
            </Pill>
          ))}
        </Text>
        <Divider my={'xs'} />
        <Text>
          Subject : Pet Information from
          {` ${account.first_name} ${account.last_name}`}
        </Text>
        <Divider my={'xs'} />
        <Text mb={'xl'}>
          {`Greetings from Integral Information! We are writing to share some vital information from ${account.first_name} ${account.last_name}. Please check below for information, thank you.`}
        </Text>

        {apptExists && (
          <Container>
            <Title order={3}>Appointments</Title>
            <Table highlightOnHover withTableBorder withColumnBorders mb={'xl'}>
              <Table.Thead>
                <Table.Tr>
                  {apptExists && <Table.Th>Start Time</Table.Th>}
                  {apptEndsExists && <Table.Th>End Time</Table.Th>}
                  {apptPricesExists && <Table.Th>Price</Table.Th>}
                  {apptVetExists && <Table.Th>Vet</Table.Th>}
                  {apptInsuranceExists && <Table.Th>Insurance</Table.Th>}
                  {apptDescriptionExists && <Table.Th>Description</Table.Th>}
                  {apptNextStepsExists && <Table.Th>Next Steps</Table.Th>}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {Object.entries(dataCategories.appointments).map(
                  (appointment) => {
                    return (
                      <Table.Tr key={appointment[0]}>
                        {apptExists && (
                          <Table.Td>{`${new Date(
                            appointment[1][0]
                          ).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}`}</Table.Td>
                        )}
                        {apptEndsExists && (
                          <Table.Td>{`${new Date(
                            appointment[1][1]
                          ).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}`}</Table.Td>
                        )}
                        {apptPricesExists && (
                          <Table.Td>{appointment[1][6]}</Table.Td>
                        )}
                        {apptVetExists && (
                          <Table.Td>{appointment[1][2]}</Table.Td>
                        )}
                        {apptInsuranceExists && (
                          <Table.Td>{appointment[1][3]}</Table.Td>
                        )}
                        {apptDescriptionExists && (
                          <Table.Td>{appointment[1][4]}</Table.Td>
                        )}
                        {apptNextStepsExists && (
                          <Table.Td>{appointment[1][5]}</Table.Td>
                        )}
                      </Table.Tr>
                    );
                  }
                )}
              </Table.Tbody>
            </Table>
          </Container>
        )}
        {docExists && (
          <Container>
            <Title order={3}>Documents</Title>
            <Table highlightOnHover withTableBorder withColumnBorders mb={'xl'}>
              <Table.Thead>
                <Table.Tr>
                  {docExists && <Table.Th>Date</Table.Th>}
                  {docDescriptionExists && <Table.Th>Description</Table.Th>}
                  {docPhotoExists && <Table.Th>Photo</Table.Th>}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {Object.entries(dataCategories.documents).map((doc) => {
                  return (
                    <Table.Tr key={doc[0]}>
                      {docExists && (
                        <Table.Td>{`${new Date(doc[1][0]).toLocaleString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}`}</Table.Td>
                      )}
                      {docDescriptionExists && <Table.Td>{doc[1][1]}</Table.Td>}
                      {docPhotoExists && <Table.Td>{doc[1][2]}</Table.Td>}
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Container>
        )}
        {vetExists && (
          <Container>
            <Title order={3}>Vets</Title>
            <Table highlightOnHover withTableBorder withColumnBorders mb={'xl'}>
              <Table.Thead>
                <Table.Tr>
                  {vetExists && <Table.Th>Name</Table.Th>}
                  {vetEmailExists && <Table.Th>Email</Table.Th>}
                  {vetPhoneExists && <Table.Th>Phone Number</Table.Th>}
                  {vetLocationExists && <Table.Th>Location</Table.Th>}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {Object.entries(dataCategories.vets).map((vet) => {
                  return (
                    <Table.Tr key={vet[0]}>
                      {vetExists && <Table.Td>{'vets'}</Table.Td>}
                      {vetEmailExists && <Table.Td>{vet[1][1]}</Table.Td>}
                      {vetPhoneExists && <Table.Td>{vet[1][2]}</Table.Td>}
                      {vetLocationExists && <Table.Td>{vet[1][0]}</Table.Td>}
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Container>
        )}
        {insuranceExists && (
          <Container>
            <Title order={3}>Insurances</Title>
            <Table highlightOnHover withTableBorder withColumnBorders mb={'xl'}>
              <Table.Thead>
                <Table.Tr>
                  {insuranceExists && <Table.Th>Company Name</Table.Th>}
                  {insurancePolicyExists && <Table.Th>Policy Number</Table.Th>}
                  {/* {insurancePetExists && <Table.Th>Pet Covered</Table.Th>} */}
                  {insuranceStartExists && <Table.Th>Coverage Start</Table.Th>}
                  {insuranceEndExists && <Table.Th>Coverage End</Table.Th>}
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {Object.entries(dataCategories.insurances).map((insurance) => {
                  console.log(insurance);
                  return (
                    <Table.Tr key={insurance[0]}>
                      {insuranceExists && <Table.Td>{'company'}</Table.Td>}
                      {insurancePolicyExists && (
                        <Table.Td>{insurance[1][0]}</Table.Td>
                      )}
                      {/* {insurancePetExists && <Table.Td>{insurance[1][1]}</Table.Td>} */}
                      {insuranceStartExists && (
                        <Table.Td>
                          {new Date(insurance[1][1]).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Table.Td>
                      )}
                      {insuranceEndExists && (
                        <Table.Td>
                          {new Date(insurance[1][2]).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </Table.Td>
                      )}
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Container>
        )}
        <Text c='dimmed' size='md'>
          Thank you,
        </Text>
        <Text
          c='dimmed'
          size='md'
        >{`From Integral Information on Behalf of, ${account.first_name} ${account.last_name}`}</Text>
        <Text c='dimmed' size='sm'>
          {userEmail}
          {account.phone_number &&
            ` - (${account.phone_number.slice(0, 3)})${account.phone_number.slice(3, 6)}-${account.phone_number.slice(6)}`}
        </Text>
        <Text c='dimmed' size='sm'>
          {account.address && `${account.address}`}
          {account.apartment ? ` ${account.apartment}, ` : ', '}
          {account.city && `${account.city}, `}
          {account.state && `${stateConversion[account.state]}, `}
          {account.zipcode && account.zipcode}
        </Text>
      </Paper>
    </Container>
  );
};
