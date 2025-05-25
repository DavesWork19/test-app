'use client';

import {
  Container,
  Center,
  Divider,
  Group,
  Text,
  Button,
  Checkbox,
  Title,
  Stack,
  useMantineTheme,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useState } from 'react';
import { Accordion } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const SelectData = (props) => {
  const [value, setValue] = useState([]);
  const { hovered, ref } = useHover();
  const [selectedItems, setSelectedItems] = useState({
    petName: [],
    petBirthday: [],
    petWeight: [],
    petBreed: [],
    petColor: [],
    apptTitle: [],
    apptStart: [],
    apptEnd: [],
    apptVet: [],
    apptInsurance: [],
    apptDescription: [],
    apptNextSteps: [],
    apptPrice: [],
    docTitle: [],
    docDate: [],
    docDescription: [],
    docPhoto: [],
    vetName: [],
    vetEmail: [],
    vetPhone: [],
    vetLocation: [],
    insuranceCompany: [],
    insurancePolicy: [],
    insurancePolicyStart: [],
    insurancePolicyEnd: [],
  });
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const appointments = props.appointments;
  const docs = props.docs;
  const pets = props.pets;
  const vets = props.vets;
  const insurances = props.insurances;

  const AccordionControl = (props) => {
    const data = props.data;
    const type = props.type;
    return (
      <Container
        ps={'md'}
        bg={
          (type === 'pet' &&
            (selectedItems.petBirthday.includes(`${data.id}+birthday`) ||
              selectedItems.petBreed.includes(`${data.id}+breed`) ||
              selectedItems.petWeight.includes(`${data.id}+weight`) ||
              selectedItems.petColor.includes(`${data.id}+color`))) ||
          (type === 'appointment' &&
            (selectedItems.apptStart.includes(`${data.id}+start`) ||
              selectedItems.apptEnd.includes(`${data.id}+end`) ||
              selectedItems.apptPrice.includes(`${data.id}+price`) ||
              selectedItems.apptVet.includes(`${data.id}+vet`) ||
              selectedItems.apptInsurance.includes(`${data.id}+insurance`) ||
              selectedItems.apptDescription.includes(
                `${data.id}+description`
              ) ||
              selectedItems.apptNextSteps.includes(`${data.id}+nextsteps`))) ||
          (type === 'doc' &&
            (selectedItems.docDate.includes(`${data.id}+date`) ||
              selectedItems.docDescription.includes(`${data.id}+description`) ||
              selectedItems.docPhoto.includes(`${data.id}+photo`))) ||
          (type === 'vet' &&
            (selectedItems.vetLocation.includes(`${data.id}+location`) ||
              selectedItems.vetEmail.includes(`${data.id}+email`) ||
              selectedItems.vetPhone.includes(`${data.id}+phone`))) ||
          (type === 'insurance' &&
            (selectedItems.insurancePolicy.includes(`${data.id}+policy`) ||
              selectedItems.insurancePolicyStart.includes(
                `${data.id}+policyStart`
              ) ||
              selectedItems.insurancePolicyEnd.includes(
                `${data.id}+policyEnd`
              )))
            ? 'var(--mantine-color-blue-light)'
            : undefined
        }
      >
        {type === 'pet' && (
          <Center>
            <Checkbox
              aria-label='Select row'
              checked={
                selectedItems.petBirthday.includes(`${data.id}+birthday`) &&
                selectedItems.petBreed.includes(`${data.id}+breed`) &&
                selectedItems.petWeight.includes(`${data.id}+weight`) &&
                selectedItems.petColor.includes(`${data.id}+color`)
              }
              onChange={(event) =>
                event.currentTarget.checked
                  ? setSelectedItems(() => ({
                      ...selectedItems,
                      petBirthday: [
                        ...selectedItems.petBirthday,
                        `${data.id}+birthday`,
                      ],
                      petBreed: [...selectedItems.petBreed, `${data.id}+breed`],
                      petWeight: [
                        ...selectedItems.petWeight,
                        `${data.id}+weight`,
                      ],
                      petColor: [...selectedItems.petColor, `${data.id}+color`],
                    }))
                  : setSelectedItems(() => ({
                      ...selectedItems,
                      petBirthday:
                        selectedItems.petBirthday.filter(
                          (datas) => datas !== `${data.id}+birthday`
                        ) ?? [],
                      petBreed:
                        selectedItems.petBreed.filter(
                          (datas) => datas !== `${data.id}+breed`
                        ) ?? [],
                      petWeight:
                        selectedItems.petWeight.filter(
                          (datas) => datas !== `${data.id}+weight`
                        ) ?? [],
                      petColor:
                        selectedItems.petColor.filter(
                          (datas) => datas !== `${data.id}+color`
                        ) ?? [],
                    }))
              }
            />
            <Accordion.Control {...props} />
          </Center>
        )}
        {type === 'appointment' && (
          <Center>
            <Checkbox
              aria-label='Select row'
              checked={
                selectedItems.apptStart.includes(`${data.id}+start`) &&
                selectedItems.apptEnd.includes(`${data.id}+end`) &&
                selectedItems.apptPrice.includes(`${data.id}+price`) &&
                selectedItems.apptVet.includes(`${data.id}+vet`) &&
                selectedItems.apptInsurance.includes(`${data.id}+insurance`) &&
                selectedItems.apptDescription.includes(
                  `${data.id}+description`
                ) &&
                selectedItems.apptNextSteps.includes(`${data.id}+nextsteps`)
              }
              onChange={(event) =>
                event.currentTarget.checked
                  ? setSelectedItems(() => ({
                      ...selectedItems,
                      apptStart: [
                        ...selectedItems.apptStart,
                        `${data.id}+start`,
                      ],
                      apptEnd: [...selectedItems.apptEnd, `${data.id}+end`],
                      apptPrice: [
                        ...selectedItems.apptPrice,
                        `${data.id}+price`,
                      ],
                      apptVet: [...selectedItems.apptVet, `${data.id}+vet`],
                      apptInsurance: [
                        ...selectedItems.apptInsurance,
                        `${data.id}+insurance`,
                      ],
                      apptDescription: [
                        ...selectedItems.apptDescription,
                        `${data.id}+description`,
                      ],
                      apptNextSteps: [
                        ...selectedItems.apptNextSteps,
                        `${data.id}+nextsteps`,
                      ],
                    }))
                  : setSelectedItems(() => ({
                      ...selectedItems,
                      apptStart:
                        selectedItems.apptStart.filter(
                          (datas) => datas !== `${data.id}+start`
                        ) ?? [],
                      apptEnd:
                        selectedItems.apptEnd.filter(
                          (datas) => datas !== `${data.id}+end`
                        ) ?? [],
                      apptPrice:
                        selectedItems.apptPrice.filter(
                          (datas) => datas !== `${data.id}+price`
                        ) ?? [],
                      apptVet:
                        selectedItems.apptVet.filter(
                          (datas) => datas !== `${data.id}+vet`
                        ) ?? [],
                      apptInsurance:
                        selectedItems.apptInsurance.filter(
                          (datas) => datas !== `${data.id}+insurance`
                        ) ?? [],
                      apptDescription:
                        selectedItems.apptDescription.filter(
                          (datas) => datas !== `${data.id}+description`
                        ) ?? [],
                      apptNextSteps:
                        selectedItems.apptNextSteps.filter(
                          (datas) => datas !== `${data.id}+nextsteps`
                        ) ?? [],
                    }))
              }
            />
            <Accordion.Control {...props} />
          </Center>
        )}
        {type === 'doc' && (
          <Center>
            <Checkbox
              aria-label='Select row'
              checked={
                selectedItems.docDate.includes(`${data.id}+date`) &&
                selectedItems.docDescription.includes(
                  `${data.id}+description`
                ) &&
                selectedItems.docPhoto.includes(`${data.id}+photo`)
              }
              onChange={(event) =>
                event.currentTarget.checked
                  ? setSelectedItems(() => ({
                      ...selectedItems,
                      docDate: [...selectedItems.docDate, `${data.id}+date`],
                      docDescription: [
                        ...selectedItems.docDescription,
                        `${data.id}+description`,
                      ],
                      docPhoto: [...selectedItems.docPhoto, `${data.id}+photo`],
                    }))
                  : setSelectedItems(() => ({
                      ...selectedItems,
                      docDate:
                        selectedItems.docDate.filter(
                          (datas) => datas !== `${data.id}+date`
                        ) ?? [],
                      docDescription:
                        selectedItems.docDescription.filter(
                          (datas) => datas !== `${data.id}+description`
                        ) ?? [],
                      docPhoto:
                        selectedItems.docPhoto.filter(
                          (datas) => datas !== `${data.id}+photo`
                        ) ?? [],
                    }))
              }
            />
            <Accordion.Control {...props} />
          </Center>
        )}
        {type === 'vet' && (
          <Center>
            <Checkbox
              aria-label='Select row'
              checked={
                selectedItems.vetLocation.includes(`${data.id}+location`) &&
                selectedItems.vetEmail.includes(`${data.id}+email`) &&
                selectedItems.vetPhone.includes(`${data.id}+phone`)
              }
              onChange={(event) =>
                event.currentTarget.checked
                  ? setSelectedItems(() => ({
                      ...selectedItems,
                      vetLocation: [
                        ...selectedItems.vetLocation,
                        `${data.id}+location`,
                      ],
                      vetEmail: [...selectedItems.vetEmail, `${data.id}+email`],
                      vetPhone: [...selectedItems.vetPhone, `${data.id}+phone`],
                    }))
                  : setSelectedItems(() => ({
                      ...selectedItems,
                      vetLocation:
                        selectedItems.vetLocation.filter(
                          (datas) => datas !== `${data.id}+location`
                        ) ?? [],
                      vetEmail:
                        selectedItems.vetEmail.filter(
                          (datas) => datas !== `${data.id}+email`
                        ) ?? [],
                      vetPhone:
                        selectedItems.vetPhone.filter(
                          (datas) => datas !== `${data.id}+phone`
                        ) ?? [],
                    }))
              }
            />
            <Accordion.Control {...props} />
          </Center>
        )}
        {type === 'insurance' && (
          <Center>
            <Checkbox
              aria-label='Select row'
              checked={
                selectedItems.insurancePolicy.includes(`${data.id}+policy`) &&
                selectedItems.insurancePolicyStart.includes(
                  `${data.id}+policyStart`
                ) &&
                selectedItems.insurancePolicyEnd.includes(
                  `${data.id}+policyEnd`
                )
              }
              onChange={(event) =>
                event.currentTarget.checked
                  ? setSelectedItems(() => ({
                      ...selectedItems,
                      insurancePolicy: [
                        ...selectedItems.insurancePolicy,
                        `${data.id}+policy`,
                      ],
                      insurancePolicyStart: [
                        ...selectedItems.insurancePolicyStart,
                        `${data.id}+policyStart`,
                      ],
                      insurancePolicyEnd: [
                        ...selectedItems.insurancePolicyEnd,
                        `${data.id}+policyEnd`,
                      ],
                    }))
                  : setSelectedItems(() => ({
                      ...selectedItems,
                      insurancePolicy:
                        selectedItems.insurancePolicy.filter(
                          (datas) => datas !== `${data.id}+policy`
                        ) ?? [],
                      insurancePolicyStart:
                        selectedItems.insurancePolicyStart.filter(
                          (datas) => datas !== `${data.id}+policyStart`
                        ) ?? [],
                      insurancePolicyEnd:
                        selectedItems.insurancePolicyEnd.filter(
                          (datas) => datas !== `${data.id}+policyEnd`
                        ) ?? [],
                    }))
              }
            />
            <Accordion.Control {...props} />
          </Center>
        )}
      </Container>
    );
  };

  return (
    <Container>
      <Divider my='md' />
      <Title mt={'xl'} mb={'sm'}>
        Pets
      </Title>
      {pets && (
        <Accordion
          variant='contained'
          chevronPosition='left'
          multiple
          value={value}
          onChange={setValue}
        >
          {pets.map((pet) => (
            <Accordion.Item value={pet.id} key={pet.id}>
              <AccordionControl
                data={pet}
                type={'pet'}
                ref={ref}
                style={{
                  backgroundColor: hovered ? 'transparent' : 'transparent',
                }}
              >
                <Title size={'h4'}>{pet.name}</Title>
              </AccordionControl>
              <Accordion.Panel>
                {!isMobile && (
                  <Group grow>
                    <Stack gap={0}>
                      {selectedItems.petBirthday.includes(
                        `${pet.id}+birthday`
                      ) ? (
                        <Text>Added Birthday!</Text>
                      ) : (
                        <Text>Add Birthday</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.petBirthday.includes(
                            `${pet.id}+birthday`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                petBirthday:
                                  selectedItems.petBirthday.filter(
                                    (item) => item !== `${pet.id}+birthday`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                petBirthday: [
                                  ...selectedItems.petBirthday,
                                  `${pet.id}+birthday`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.petBirthday.includes(
                            `${pet.id}+birthday`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >{`${new Date(pet.birthday).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                      })}`}</Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.petBreed.includes(`${pet.id}+breed`) ? (
                        <Text>Added Breed!</Text>
                      ) : (
                        <Text>Add Breed</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.petBreed.includes(`${pet.id}+breed`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                petBreed:
                                  selectedItems.petBreed.filter(
                                    (item) => item !== `${pet.id}+breed`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                petBreed: [
                                  ...selectedItems.petBreed,
                                  `${pet.id}+breed`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.petBreed.includes(`${pet.id}+breed`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {pet.breed}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.petWeight.includes(`${pet.id}+weight`) ? (
                        <Text>Added Weight!</Text>
                      ) : (
                        <Text>Add Weight</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.petWeight.includes(`${pet.id}+weight`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                petWeight:
                                  selectedItems.petWeight.filter(
                                    (item) => item !== `${pet.id}+weight`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                petWeight: [
                                  ...selectedItems.petWeight,
                                  `${pet.id}+weight`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.petWeight.includes(`${pet.id}+weight`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {pet.weight}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.petColor.includes(`${pet.id}+color`) ? (
                        <Text>{'Added Color(s)!'}</Text>
                      ) : (
                        <Text>{'Add Color(s)'}</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.petColor.includes(`${pet.id}+color`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                petColor:
                                  selectedItems.petColor.filter(
                                    (item) => item !== `${pet.id}+color`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                petColor: [
                                  ...selectedItems.petColor,
                                  `${pet.id}+color`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.petColor.includes(`${pet.id}+color`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {pet.color}
                      </Button>
                    </Stack>
                  </Group>
                )}
                {isMobile && (
                  <Stack>
                    <Stack gap={0}>
                      {selectedItems.petBirthday.includes(
                        `${pet.id}+birthday`
                      ) ? (
                        <Text>Added Birthday!</Text>
                      ) : (
                        <Text>Add Birthday</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.petBirthday.includes(
                            `${pet.id}+birthday`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                petBirthday:
                                  selectedItems.petBirthday.filter(
                                    (item) => item !== `${pet.id}+birthday`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                petBirthday: [
                                  ...selectedItems.petBirthday,
                                  `${pet.id}+birthday`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.petBirthday.includes(
                            `${pet.id}+birthday`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >{`${new Date(pet.birthday).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                      })}`}</Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.petBreed.includes(`${pet.id}+breed`) ? (
                        <Text>Added Breed!</Text>
                      ) : (
                        <Text>Add Breed</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.petBreed.includes(`${pet.id}+breed`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                petBreed:
                                  selectedItems.petBreed.filter(
                                    (item) => item !== `${pet.id}+breed`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                petBreed: [
                                  ...selectedItems.petBreed,
                                  `${pet.id}+breed`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.petBreed.includes(`${pet.id}+breed`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {pet.breed}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.petWeight.includes(`${pet.id}+weight`) ? (
                        <Text>Added Weight!</Text>
                      ) : (
                        <Text>Add Weight</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.petWeight.includes(`${pet.id}+weight`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                petWeight:
                                  selectedItems.petWeight.filter(
                                    (item) => item !== `${pet.id}+weight`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                petWeight: [
                                  ...selectedItems.petWeight,
                                  `${pet.id}+weight`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.petWeight.includes(`${pet.id}+weight`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {pet.weight}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.petColor.includes(`${pet.id}+color`) ? (
                        <Text>{'Added Color(s)!'}</Text>
                      ) : (
                        <Text>{'Add Color(s)'}</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.petColor.includes(`${pet.id}+color`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                petColor:
                                  selectedItems.petColor.filter(
                                    (item) => item !== `${pet.id}+color`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                petColor: [
                                  ...selectedItems.petColor,
                                  `${pet.id}+color`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.petColor.includes(`${pet.id}+color`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {pet.color}
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
      {/* <Divider my='lg' /> */}
      <Title mt={'xl'} mb={'sm'}>
        Appointments
      </Title>
      {appointments && (
        <Accordion
          variant='contained'
          chevronPosition='left'
          multiple
          value={value}
          onChange={setValue}
        >
          {appointments.map((appointment) => (
            <Accordion.Item value={appointment.id} key={appointment.id}>
              <AccordionControl
                data={appointment}
                type={'appointment'}
                ref={ref}
                style={{
                  backgroundColor: hovered ? 'transparent' : 'transparent',
                }}
              >
                <Title size={'h4'}>{appointment.title}</Title>
              </AccordionControl>
              <Accordion.Panel>
                {!isMobile && (
                  <>
                    <Group grow>
                      <Stack gap={0}>
                        {selectedItems.apptStart.includes(
                          `${appointment.id}+start`
                        ) ? (
                          <Text>Added Start Time!</Text>
                        ) : (
                          <Text>Add Start Time</Text>
                        )}
                        <Button
                          variant='default'
                          onClick={(event) => {
                            selectedItems.apptStart.includes(
                              `${appointment.id}+start`
                            )
                              ? setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptStart:
                                    selectedItems.apptStart.filter(
                                      (item) =>
                                        item !== `${appointment.id}+start`
                                    ) ?? [],
                                }))
                              : setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptStart: [
                                    ...selectedItems.apptStart,
                                    `${appointment.id}+start`,
                                  ],
                                }));
                          }}
                          bg={
                            selectedItems.apptStart.includes(
                              `${appointment.id}+start`
                            )
                              ? 'var(--mantine-color-blue-light)'
                              : undefined
                          }
                        >
                          {`${new Date(appointment.start_time).toLocaleString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            }
                          )}`}
                        </Button>
                      </Stack>
                      <Stack gap={0}>
                        {selectedItems.apptEnd.includes(
                          `${appointment.id}+end`
                        ) ? (
                          <Text>Added End Time!</Text>
                        ) : (
                          <Text>Add End Time</Text>
                        )}
                        <Button
                          variant='default'
                          onClick={(event) => {
                            selectedItems.apptEnd.includes(
                              `${appointment.id}+end`
                            )
                              ? setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptEnd:
                                    selectedItems.apptEnd.filter(
                                      (item) => item !== `${appointment.id}+end`
                                    ) ?? [],
                                }))
                              : setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptEnd: [
                                    ...selectedItems.apptEnd,
                                    `${appointment.id}+end`,
                                  ],
                                }));
                          }}
                          bg={
                            selectedItems.apptEnd.includes(
                              `${appointment.id}+end`
                            )
                              ? 'var(--mantine-color-blue-light)'
                              : undefined
                          }
                        >
                          {`${new Date(appointment.end_time).toLocaleString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            }
                          )}`}
                        </Button>
                      </Stack>
                      <Stack gap={0}>
                        {selectedItems.apptPrice.includes(
                          `${appointment.id}+price`
                        ) ? (
                          <Text>Added Price!</Text>
                        ) : (
                          <Text>Add Price</Text>
                        )}
                        <Button
                          variant='default'
                          onClick={(event) => {
                            selectedItems.apptPrice.includes(
                              `${appointment.id}+price`
                            )
                              ? setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptPrice:
                                    selectedItems.apptPrice.filter(
                                      (item) =>
                                        item !== `${appointment.id}+price`
                                    ) ?? [],
                                }))
                              : setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptPrice: [
                                    ...selectedItems.apptPrice,
                                    `${appointment.id}+price`,
                                  ],
                                }));
                          }}
                          bg={
                            selectedItems.apptPrice.includes(
                              `${appointment.id}+price`
                            )
                              ? 'var(--mantine-color-blue-light)'
                              : undefined
                          }
                        >
                          {appointment.price}
                        </Button>
                      </Stack>
                    </Group>
                    <Group grow>
                      <Stack gap={0}>
                        {selectedItems.apptVet.includes(
                          `${appointment.id}+vet`
                        ) ? (
                          <Text>Added Vet!</Text>
                        ) : (
                          <Text>Add Vet</Text>
                        )}
                        <Button
                          variant='default'
                          onClick={(event) => {
                            selectedItems.apptVet.includes(
                              `${appointment.id}+vet`
                            )
                              ? setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptVet:
                                    selectedItems.apptVet.filter(
                                      (item) => item !== `${appointment.id}+vet`
                                    ) ?? [],
                                }))
                              : setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptVet: [
                                    ...selectedItems.apptVet,
                                    `${appointment.id}+vet`,
                                  ],
                                }));
                          }}
                          bg={
                            selectedItems.apptVet.includes(
                              `${appointment.id}+vet`
                            )
                              ? 'var(--mantine-color-blue-light)'
                              : undefined
                          }
                        >
                          {appointment.vet}
                        </Button>
                      </Stack>
                      <Stack gap={0}>
                        {selectedItems.apptInsurance.includes(
                          `${appointment.id}+insurance`
                        ) ? (
                          <Text>Added Insurance!</Text>
                        ) : (
                          <Text>Add Insurance</Text>
                        )}
                        <Button
                          variant='default'
                          onClick={() => {
                            selectedItems.apptInsurance.includes(
                              `${appointment.id}+insurance`
                            )
                              ? setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptInsurance:
                                    selectedItems.apptInsurance.filter(
                                      (item) =>
                                        item !== `${appointment.id}+insurance`
                                    ) ?? [],
                                }))
                              : setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptInsurance: [
                                    ...selectedItems.apptInsurance,
                                    `${appointment.id}+insurance`,
                                  ],
                                }));
                          }}
                          bg={
                            selectedItems.apptInsurance.includes(
                              `${appointment.id}+insurance`
                            )
                              ? 'var(--mantine-color-blue-light)'
                              : undefined
                          }
                        >
                          {appointment.insurance}
                        </Button>
                      </Stack>
                      <Stack gap={0}>
                        {selectedItems.apptDescription.includes(
                          `${appointment.id}+description`
                        ) ? (
                          <Text>Added Description!</Text>
                        ) : (
                          <Text>Add Description</Text>
                        )}
                        <Button
                          variant='default'
                          onClick={(event) => {
                            selectedItems.apptDescription.includes(
                              `${appointment.id}+description`
                            )
                              ? setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptDescription:
                                    selectedItems.apptDescription.filter(
                                      (item) =>
                                        item !== `${appointment.id}+description`
                                    ) ?? [],
                                }))
                              : setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptDescription: [
                                    ...selectedItems.apptDescription,
                                    `${appointment.id}+description`,
                                  ],
                                }));
                          }}
                          bg={
                            selectedItems.apptDescription.includes(
                              `${appointment.id}+description`
                            )
                              ? 'var(--mantine-color-blue-light)'
                              : undefined
                          }
                        >
                          {appointment.description}
                        </Button>
                      </Stack>
                      <Stack gap={0}>
                        {selectedItems.apptNextSteps.includes(
                          `${appointment.id}+nextsteps`
                        ) ? (
                          <Text>Added Next Steps!</Text>
                        ) : (
                          <Text>Add Next Steps</Text>
                        )}
                        <Button
                          variant='default'
                          onClick={() => {
                            selectedItems.apptNextSteps.includes(
                              `${appointment.id}+nextsteps`
                            )
                              ? setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptNextSteps:
                                    selectedItems.apptNextSteps.filter(
                                      (item) =>
                                        item !== `${appointment.id}+nextsteps`
                                    ) ?? [],
                                }))
                              : setSelectedItems(() => ({
                                  ...selectedItems,
                                  apptNextSteps: [
                                    ...selectedItems.apptNextSteps,
                                    `${appointment.id}+nextsteps`,
                                  ],
                                }));
                          }}
                          bg={
                            selectedItems.apptNextSteps.includes(
                              `${appointment.id}+nextsteps`
                            )
                              ? 'var(--mantine-color-blue-light)'
                              : undefined
                          }
                        >
                          {appointment.next_steps}
                        </Button>
                      </Stack>
                    </Group>
                  </>
                )}
                {isMobile && (
                  <Stack>
                    <Stack gap={0}>
                      {selectedItems.apptStart.includes(
                        `${appointment.id}+start`
                      ) ? (
                        <Text>Added Start Time!</Text>
                      ) : (
                        <Text>Add Start Time</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={(event) => {
                          selectedItems.apptStart.includes(
                            `${appointment.id}+start`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                apptStart:
                                  selectedItems.apptStart.filter(
                                    (item) => item !== `${appointment.id}+start`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                apptStart: [
                                  ...selectedItems.apptStart,
                                  `${appointment.id}+start`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.apptStart.includes(
                            `${appointment.id}+start`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {`${new Date(appointment.start_time).toLocaleString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }
                        )}`}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.apptEnd.includes(
                        `${appointment.id}+end`
                      ) ? (
                        <Text>Added End Time!</Text>
                      ) : (
                        <Text>Add End Time</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={(event) => {
                          selectedItems.apptEnd.includes(
                            `${appointment.id}+end`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                apptEnd:
                                  selectedItems.apptEnd.filter(
                                    (item) => item !== `${appointment.id}+end`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                apptEnd: [
                                  ...selectedItems.apptEnd,
                                  `${appointment.id}+end`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.apptEnd.includes(
                            `${appointment.id}+end`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {`${new Date(appointment.end_time).toLocaleString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }
                        )}`}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.apptVet.includes(
                        `${appointment.id}+vet`
                      ) ? (
                        <Text>Added Vet!</Text>
                      ) : (
                        <Text>Add Vet</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={(event) => {
                          selectedItems.apptVet.includes(
                            `${appointment.id}+vet`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                apptVet:
                                  selectedItems.apptVet.filter(
                                    (item) => item !== `${appointment.id}+vet`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                apptVet: [
                                  ...selectedItems.apptVet,
                                  `${appointment.id}+vet`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.apptVet.includes(
                            `${appointment.id}+vet`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {appointment.vet}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.apptInsurance.includes(
                        `${appointment.id}+insurance`
                      ) ? (
                        <Text>Added Insurance!</Text>
                      ) : (
                        <Text>Add Insurance</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.apptInsurance.includes(
                            `${appointment.id}+insurance`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                apptInsurance:
                                  selectedItems.apptInsurance.filter(
                                    (item) =>
                                      item !== `${appointment.id}+insurance`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                apptInsurance: [
                                  ...selectedItems.apptInsurance,
                                  `${appointment.id}+insurance`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.apptInsurance.includes(
                            `${appointment.id}+insurance`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {appointment.insurance}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.apptDescription.includes(
                        `${appointment.id}+description`
                      ) ? (
                        <Text>Added Description!</Text>
                      ) : (
                        <Text>Add Description</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={(event) => {
                          selectedItems.apptDescription.includes(
                            `${appointment.id}+description`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                apptDescription:
                                  selectedItems.apptDescription.filter(
                                    (item) =>
                                      item !== `${appointment.id}+description`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                apptDescription: [
                                  ...selectedItems.apptDescription,
                                  `${appointment.id}+description`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.apptDescription.includes(
                            `${appointment.id}+description`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {appointment.description}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.apptNextSteps.includes(
                        `${appointment.id}+nextsteps`
                      ) ? (
                        <Text>Added Next Steps!</Text>
                      ) : (
                        <Text>Add Next Steps</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.apptNextSteps.includes(
                            `${appointment.id}+nextsteps`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                apptNextSteps:
                                  selectedItems.apptNextSteps.filter(
                                    (item) =>
                                      item !== `${appointment.id}+nextsteps`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                apptNextSteps: [
                                  ...selectedItems.apptNextSteps,
                                  `${appointment.id}+nextsteps`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.apptNextSteps.includes(
                            `${appointment.id}+nextsteps`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {appointment.next_steps}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.apptPrice.includes(
                        `${appointment.id}+price`
                      ) ? (
                        <Text>Added Price!</Text>
                      ) : (
                        <Text>Add Price</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={(event) => {
                          selectedItems.apptPrice.includes(
                            `${appointment.id}+price`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                apptPrice:
                                  selectedItems.apptPrice.filter(
                                    (item) => item !== `${appointment.id}+price`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                apptPrice: [
                                  ...selectedItems.apptPrice,
                                  `${appointment.id}+price`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.apptPrice.includes(
                            `${appointment.id}+price`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {appointment.price}
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )}

      {/* <Divider my='lg' /> */}
      <Title mt={'xl'} mb={'sm'}>
        Documents
      </Title>
      {docs && (
        <Accordion
          variant='contained'
          chevronPosition='left'
          multiple
          value={value}
          onChange={setValue}
        >
          {docs.map((doc) => (
            <Accordion.Item value={doc.id} key={doc.id}>
              <AccordionControl
                data={doc}
                type={'doc'}
                ref={ref}
                style={{
                  backgroundColor: hovered ? 'transparent' : 'transparent',
                }}
              >
                <Title size={'h4'}>{doc.title}</Title>
              </AccordionControl>
              <Accordion.Panel>
                {!isMobile && (
                  <Group grow>
                    <Stack gap={0}>
                      {selectedItems.docDate.includes(`${doc.id}+date`) ? (
                        <Text>Added Document Date!</Text>
                      ) : (
                        <Text>Add Document Date</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.docDate.includes(`${doc.id}+date`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                docDate:
                                  selectedItems.docDate.filter(
                                    (item) => item !== `${doc.id}+date`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                docDate: [
                                  ...selectedItems.docDate,
                                  `${doc.id}+date`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.docDate.includes(`${doc.id}+date`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {`${new Date(doc.date).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          // hour: '2-digit',
                          // minute: '2-digit',
                          // hour12: true,
                        })}`}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.docDescription.includes(
                        `${doc.id}+description`
                      ) ? (
                        <Text>Added Document Description!</Text>
                      ) : (
                        <Text>Add Document Description</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.docDescription.includes(
                            `${doc.id}+description`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                docDescription:
                                  selectedItems.docDescription.filter(
                                    (item) => item !== `${doc.id}+description`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                docDescription: [
                                  ...selectedItems.docDescription,
                                  `${doc.id}+description`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.docDescription.includes(
                            `${doc.id}+description`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {doc.description}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.docPhoto.includes(`${doc.id}+photo`) ? (
                        <Text>Added Document Photo!</Text>
                      ) : (
                        <Text>Add Document Photo</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.docPhoto.includes(`${doc.id}+photo`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                docPhoto:
                                  selectedItems.docPhoto.filter(
                                    (item) => item !== `${doc.id}+photo`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                docPhoto: [
                                  ...selectedItems.docPhoto,
                                  `${doc.id}+photo`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.docPhoto.includes(`${doc.id}+photo`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {doc.description}
                      </Button>
                    </Stack>
                  </Group>
                )}
                {isMobile && (
                  <Stack>
                    <Stack gap={0}>
                      {selectedItems.docDate.includes(`${doc.id}+date`) ? (
                        <Text>Added Document Date!</Text>
                      ) : (
                        <Text>Add Document Date</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.docDate.includes(`${doc.id}+date`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                docDate:
                                  selectedItems.docDate.filter(
                                    (item) => item !== `${doc.id}+date`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                docDate: [
                                  ...selectedItems.docDate,
                                  `${doc.id}+date`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.docDate.includes(`${doc.id}+date`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {`${new Date(doc.date).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          // hour: '2-digit',
                          // minute: '2-digit',
                          // hour12: true,
                        })}`}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.docDescription.includes(
                        `${doc.id}+description`
                      ) ? (
                        <Text>Added Document Description!</Text>
                      ) : (
                        <Text>Add Document Description</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.docDescription.includes(
                            `${doc.id}+description`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                docDescription:
                                  selectedItems.docDescription.filter(
                                    (item) => item !== `${doc.id}+description`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                docDescription: [
                                  ...selectedItems.docDescription,
                                  `${doc.id}+description`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.docDescription.includes(
                            `${doc.id}+description`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {doc.description}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.docPhoto.includes(`${doc.id}+photo`) ? (
                        <Text>Added Document Photo!</Text>
                      ) : (
                        <Text>Add Document Photo</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.docPhoto.includes(`${doc.id}+photo`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                docPhoto:
                                  selectedItems.docPhoto.filter(
                                    (item) => item !== `${doc.id}+photo`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                docPhoto: [
                                  ...selectedItems.docPhoto,
                                  `${doc.id}+photo`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.docPhoto.includes(`${doc.id}+photo`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {doc.description}
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )}

      {/* <Divider my='lg' /> */}
      <Title mt={'xl'} mb={'sm'}>
        Vets
      </Title>
      {vets && (
        <Accordion
          variant='contained'
          chevronPosition='left'
          multiple
          value={value}
          onChange={setValue}
        >
          {vets.map((vet) => (
            <Accordion.Item value={vet.id} key={vet.id}>
              <AccordionControl
                data={vet}
                type={'vet'}
                ref={ref}
                style={{
                  backgroundColor: hovered ? 'transparent' : 'transparent',
                }}
              >
                <Title size={'h4'}>{vet.name}</Title>
              </AccordionControl>
              <Accordion.Panel>
                {!isMobile && (
                  <Group grow>
                    <Stack gap={0}>
                      {selectedItems.vetLocation.includes(
                        `${vet.id}+location`
                      ) ? (
                        <Text>Added Vet Location!</Text>
                      ) : (
                        <Text>Add Vet Location</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.vetLocation.includes(
                            `${vet.id}+location`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                vetLocation:
                                  selectedItems.vetLocation.filter(
                                    (item) => item !== `${vet.id}+location`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                vetLocation: [
                                  ...selectedItems.vetLocation,
                                  `${vet.id}+location`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.vetLocation.includes(
                            `${vet.id}+location`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {vet.location}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.vetEmail.includes(
                        `${vet.id}+description`
                      ) ? (
                        <Text>Added Vet Email!</Text>
                      ) : (
                        <Text>Add Vet Email</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.vetEmail.includes(`${vet.id}+email`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                vetEmail:
                                  selectedItems.vetEmail.filter(
                                    (item) => item !== `${vet.id}+email`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                vetEmail: [
                                  ...selectedItems.vetEmail,
                                  `${vet.id}+email`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.vetEmail.includes(`${vet.id}+email`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {vet.email}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.vetPhone.includes(`${vet.id}+phone`) ? (
                        <Text>Added Vet Phone Number!</Text>
                      ) : (
                        <Text>Add Vet Phone Number</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.vetPhone.includes(`${vet.id}+phone`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                vetPhone:
                                  selectedItems.vetPhone.filter(
                                    (item) => item !== `${vet.id}+phone`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                vetPhone: [
                                  ...selectedItems.vetPhone,
                                  `${vet.id}+phone`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.vetPhone.includes(`${vet.id}+phone`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {vet.phone}
                      </Button>
                    </Stack>
                  </Group>
                )}
                {isMobile && (
                  <Stack>
                    <Stack gap={0}>
                      {selectedItems.vetLocation.includes(
                        `${vet.id}+location`
                      ) ? (
                        <Text>Added Vet Location!</Text>
                      ) : (
                        <Text>Add Vet Location</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.vetLocation.includes(
                            `${vet.id}+location`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                vetLocation:
                                  selectedItems.vetLocation.filter(
                                    (item) => item !== `${vet.id}+location`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                vetLocation: [
                                  ...selectedItems.vetLocation,
                                  `${vet.id}+location`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.vetLocation.includes(
                            `${vet.id}+location`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {vet.location}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.vetEmail.includes(
                        `${vet.id}+description`
                      ) ? (
                        <Text>Added Vet Email!</Text>
                      ) : (
                        <Text>Add Vet Email</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.vetEmail.includes(`${vet.id}+email`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                vetEmail:
                                  selectedItems.vetEmail.filter(
                                    (item) => item !== `${vet.id}+email`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                vetEmail: [
                                  ...selectedItems.vetEmail,
                                  `${vet.id}+email`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.vetEmail.includes(`${vet.id}+email`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {vet.email}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.vetPhone.includes(`${vet.id}+phone`) ? (
                        <Text>Added Vet Phone Number!</Text>
                      ) : (
                        <Text>Add Vet Phone Number</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.vetPhone.includes(`${vet.id}+phone`)
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                vetPhone:
                                  selectedItems.vetPhone.filter(
                                    (item) => item !== `${vet.id}+phone`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                vetPhone: [
                                  ...selectedItems.vetPhone,
                                  `${vet.id}+phone`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.vetPhone.includes(`${vet.id}+phone`)
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {vet.phone}
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )}

      {/* <Divider my='lg' /> */}
      <Title mt={'xl'} mb={'sm'}>
        Insurances
      </Title>
      {insurances && (
        <Accordion
          variant='contained'
          chevronPosition='left'
          multiple
          value={value}
          onChange={setValue}
        >
          {insurances.map((insurance) => (
            <Accordion.Item value={insurance.id} key={insurance.id}>
              <AccordionControl
                data={insurance}
                type={'insurance'}
                ref={ref}
                style={{
                  backgroundColor: hovered ? 'transparent' : 'transparent',
                }}
              >
                <Title size={'h4'}>{insurance.company}</Title>
              </AccordionControl>
              <Accordion.Panel>
                {!isMobile && (
                  <Group grow>
                    <Stack gap={0}>
                      {selectedItems.insurancePolicy.includes(
                        `${insurance.id}+policy`
                      ) ? (
                        <Text>Added Insurance Policy!</Text>
                      ) : (
                        <Text>Add Insurance Policy</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.insurancePolicy.includes(
                            `${insurance.id}+policy`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicy:
                                  selectedItems.insurancePolicy.filter(
                                    (item) => item !== `${insurance.id}+policy`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicy: [
                                  ...selectedItems.insurancePolicy,
                                  `${insurance.id}+policy`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.insurancePolicy.includes(
                            `${insurance.id}+policy`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {insurance.policy}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.insurancePolicyStart.includes(
                        `${insurance.id}+policyStart`
                      ) ? (
                        <Text>Added Insurance Policy Start Date!</Text>
                      ) : (
                        <Text>Add Insurance Policy Start Date</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.insurancePolicyStart.includes(
                            `${insurance.id}+policyStart`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicyStart:
                                  selectedItems.insurancePolicyStart.filter(
                                    (item) =>
                                      item !== `${insurance.id}+policyStart`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicyStart: [
                                  ...selectedItems.insurancePolicyStart,
                                  `${insurance.id}+policyStart`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.insurancePolicyStart.includes(
                            `${insurance.id}+policyStart`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {`${new Date(insurance.policy_start).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                          }
                        )}`}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.insurancePolicyEnd.includes(
                        `${insurance.id}+policyEnd`
                      ) ? (
                        <Text>Added Insurance Policy End Date!</Text>
                      ) : (
                        <Text>Add Insurance Policy End Date</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.insurancePolicyEnd.includes(
                            `${insurance.id}+policyEnd`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicyEnd:
                                  selectedItems.insurancePolicyEnd.filter(
                                    (item) =>
                                      item !== `${insurance.id}+policyEnd`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicyEnd: [
                                  ...selectedItems.insurancePolicyEnd,
                                  `${insurance.id}+policyEnd`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.insurancePolicyEnd.includes(
                            `${insurance.id}+policyEnd`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {`${new Date(insurance.policy_end).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                          }
                        )}`}
                      </Button>
                    </Stack>
                  </Group>
                )}
                {isMobile && (
                  <Stack>
                    <Stack gap={0}>
                      {selectedItems.insurancePolicy.includes(
                        `${insurance.id}+policy`
                      ) ? (
                        <Text>Added Insurance Policy!</Text>
                      ) : (
                        <Text>Add Insurance Policy</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.insurancePolicy.includes(
                            `${insurance.id}+policy`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicy:
                                  selectedItems.insurancePolicy.filter(
                                    (item) => item !== `${insurance.id}+policy`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicy: [
                                  ...selectedItems.insurancePolicy,
                                  `${insurance.id}+policy`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.insurancePolicy.includes(
                            `${insurance.id}+policy`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {insurance.policy}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.insurancePolicyStart.includes(
                        `${insurance.id}+policyStart`
                      ) ? (
                        <Text>Added Insurance Policy Start Date!</Text>
                      ) : (
                        <Text>Add Insurance Policy Start Date</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.insurancePolicyStart.includes(
                            `${insurance.id}+policyStart`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicyStart:
                                  selectedItems.insurancePolicyStart.filter(
                                    (item) =>
                                      item !== `${insurance.id}+policyStart`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicyStart: [
                                  ...selectedItems.insurancePolicyStart,
                                  `${insurance.id}+policyStart`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.insurancePolicyStart.includes(
                            `${insurance.id}+policyStart`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {`${new Date(insurance.policy_start).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                          }
                        )}`}
                      </Button>
                    </Stack>
                    <Stack gap={0}>
                      {selectedItems.insurancePolicyEnd.includes(
                        `${insurance.id}+policyEnd`
                      ) ? (
                        <Text>Added Insurance Policy End Date!</Text>
                      ) : (
                        <Text>Add Insurance Policy End Date</Text>
                      )}
                      <Button
                        variant='default'
                        onClick={() => {
                          selectedItems.insurancePolicyEnd.includes(
                            `${insurance.id}+policyEnd`
                          )
                            ? setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicyEnd:
                                  selectedItems.insurancePolicyEnd.filter(
                                    (item) =>
                                      item !== `${insurance.id}+policyEnd`
                                  ) ?? [],
                              }))
                            : setSelectedItems(() => ({
                                ...selectedItems,
                                insurancePolicyEnd: [
                                  ...selectedItems.insurancePolicyEnd,
                                  `${insurance.id}+policyEnd`,
                                ],
                              }));
                        }}
                        bg={
                          selectedItems.insurancePolicyEnd.includes(
                            `${insurance.id}+policyEnd`
                          )
                            ? 'var(--mantine-color-blue-light)'
                            : undefined
                        }
                      >
                        {`${new Date(insurance.policy_end).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                          }
                        )}`}
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  );
};
