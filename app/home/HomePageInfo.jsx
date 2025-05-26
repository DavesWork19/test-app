'use client';

import {
  Container,
  Paper,
  Center,
  Divider,
  Group,
  Text,
  Button,
  Stepper,
  ActionIcon,
  TagsInput,
  Accordion,
  useMantineTheme,
  Checkbox,
  Title,
  Stack,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import {
  IconUserCircle,
  IconCalendarClock,
  IconNotes,
  IconAmbulance,
  IconPaw,
  IconHome,
} from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { EmailTemplate } from '../components/EmailTemplate';
import { useMediaQuery } from '@mantine/hooks';
import { SelectData } from './SelectData';

export const HomePageInfo = (props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [emailRecipients, setEmailRecipients] = useState([]);
  const [emailRecipientsError, setEmailRecipientsError] = useState();
  const [showShareData, setShowShareData] = useState(
    searchParams.get('ShareData') === ''
  );
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
    accountAddress: [],
    accountApartment: [],
    accountCity: [],
    accountState: [],
    accountZipcode: [],
    accountPhone: [],
  });
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const appointments = props.appointments;
  const docs = props.docs;
  const pets = props.pets;
  const vets = props.vets;
  const insurances = props.insurances;
  const accountInfo = props.account;
  const userEmail = props.userEmail;

  const handleOnClick = (route) => {
    router.replace(`/${route}`);
  };

  const handleHome = () => {
    setEmailRecipients([]);
    setActive(0);
    setShowShareData(false);
  };

  const vetEmails = [];
  for (let i = 0; i < props.vets.length; i++) {
    if (props.vets[i].email) {
      vetEmails.push(props.vets[i].email);
    }
  }

  const handleEmailRecipients = (event) => {
    console.log('em222', event);
    if (emailRecipients.length === 0) {
      console.log('em', event);
      if (!/^\S+@\S+$/.test(event)) {
        setEmailRecipientsError(true);
      } else {
        setEmailRecipientsError(false);
        setEmailRecipients(event);
      }
    } else {
      const newEmail = event[[event.length - 1]];
      console.log('em3', newEmail);
      if (!/^\S+@\S+$/.test(newEmail) && newEmail !== undefined) {
        setEmailRecipientsError(true);
      } else {
        setEmailRecipientsError(false);
        setEmailRecipients(event);
      }
    }
  };

  const handleSendEmail = async () => {
    const data = await fetch('api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailRecipients: emailRecipients,
        selectedItems: selectedItems,
        appointments: props.appointments,
        docs: props.docs,
        pets: props.pets,
        vets: props.vets,
        insurances: props.insurances,
        account: props.account,
        userEmail: props.userEmail,
      }),
    });
    setActive(3);
  };

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
              ))) ||
          (type === 'account' &&
            (selectedItems.accountAddress.includes(`${data.user_id}+address`) ||
              selectedItems.accountApartment.includes(
                `${data.user_id}+apartment`
              ) ||
              selectedItems.accountCity.includes(`${data.user_id}+city`) ||
              selectedItems.accountState.includes(`${data.user_id}+state`) ||
              selectedItems.accountZipcode.includes(
                `${data.user_id}+zipcode`
              ) ||
              selectedItems.accountPhone.includes(`${data.user_id}+phone`)))
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
        {type === 'account' && (
          <Center>
            <Checkbox
              aria-label='Select row'
              checked={
                selectedItems.accountAddress.includes(
                  `${data.user_id}+address`
                ) &&
                selectedItems.accountApartment.includes(
                  `${data.user_id}+apartment`
                ) &&
                selectedItems.accountCity.includes(`${data.user_id}+city`) &&
                selectedItems.accountState.includes(`${data.user_id}+state`) &&
                selectedItems.accountZipcode.includes(
                  `${data.user_id}+zipcode`
                ) &&
                selectedItems.accountPhone.includes(`${data.user_id}+phone`)
              }
              onChange={(event) =>
                event.currentTarget.checked
                  ? setSelectedItems(() => ({
                      ...selectedItems,
                      accountAddress: [
                        ...selectedItems.accountAddress,
                        `${data.user_id}+address`,
                      ],
                      accountApartment: [
                        ...selectedItems.accountApartment,
                        `${data.user_id}+apartment`,
                      ],
                      accountCity: [
                        ...selectedItems.accountCity,
                        `${data.user_id}+city`,
                      ],
                      accountState: [
                        ...selectedItems.accountState,
                        `${data.user_id}+state`,
                      ],
                      accountZipcode: [
                        ...selectedItems.accountZipcode,
                        `${data.user_id}+zipcode`,
                      ],
                      accountPhone: [
                        ...selectedItems.accountPhone,
                        `${data.user_id}+phone`,
                      ],
                    }))
                  : setSelectedItems(() => ({
                      ...selectedItems,
                      accountAddress:
                        selectedItems.accountAddress.filter(
                          (datas) => datas !== `${data.user_id}+address`
                        ) ?? [],
                      accountApartment:
                        selectedItems.accountApartment.filter(
                          (datas) => datas !== `${data.user_id}+apartment`
                        ) ?? [],
                      accountCity:
                        selectedItems.accountCity.filter(
                          (datas) => datas !== `${data.user_id}+city`
                        ) ?? [],
                      accountState:
                        selectedItems.accountState.filter(
                          (datas) => datas !== `${data.user_id}+state`
                        ) ?? [],
                      accountZipcode:
                        selectedItems.accountZipcode.filter(
                          (datas) => datas !== `${data.user_id}+zipcode`
                        ) ?? [],
                      accountPhone:
                        selectedItems.accountPhone.filter(
                          (datas) => datas !== `${data.user_id}+phone`
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
    <Container size='md'>
      <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
        {!showShareData && (
          <Center>
            <Button w={125} onClick={() => setShowShareData(true)}>
              Share Data
            </Button>
          </Center>
        )}

        {!showShareData && (
          <Container>
            <Divider my='md' />
            <Center mt={'xl'}>
              <Paper
                shadow='xs'
                withBorder
                p='md'
                mb={'md'}
                w={300}
                radius='md'
                component='button'
                onClick={() => handleOnClick('appointments')}
              >
                <Group>
                  <IconCalendarClock stroke={1} />
                  <div>
                    <Text size='sm' ta={'start'}>
                      {'Appointment Page'}
                    </Text>
                    <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                      {'Where your appointments live.'}
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Center>
            <Center>
              <Paper
                shadow='xs'
                withBorder
                p='md'
                mb={'md'}
                w={300}
                radius='md'
                component='button'
                onClick={() => handleOnClick('docs')}
              >
                <Group>
                  <IconNotes stroke={1} />
                  <div>
                    <Text size='sm' ta={'start'}>
                      {'Document Page'}
                    </Text>
                    <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                      {'Where your documents live.'}
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Center>
            <Center>
              <Paper
                shadow='xs'
                withBorder
                p='md'
                mb={'md'}
                w={300}
                radius='md'
                component='button'
                onClick={() => handleOnClick('vetsandinsurance')}
              >
                <Group>
                  <IconAmbulance stroke={1} />
                  <div>
                    <Text size='sm' ta={'start'}>
                      {'Vet Page'}
                    </Text>
                    <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                      {'Where your vet data lives.'}
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Center>
            <Center>
              <Paper
                shadow='xs'
                withBorder
                p='md'
                mb={'md'}
                w={300}
                radius='md'
                component='button'
                onClick={() => handleOnClick('pets')}
              >
                <Group>
                  <IconPaw stroke={1} />
                  <div>
                    <Text size='sm' ta={'start'}>
                      {'Pet Page'}
                    </Text>
                    <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                      {'Where your pet data lives.'}
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Center>
            <Center>
              <Paper
                shadow='xs'
                withBorder
                p='md'
                w={300}
                radius='md'
                component='button'
                onClick={() => handleOnClick('account')}
              >
                <Group>
                  <IconUserCircle stroke={1} />
                  <div>
                    <Text size='sm' ta={'start'}>
                      {'Account Page'}
                    </Text>
                    <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                      {'Where your personal data lives.'}
                    </Text>
                  </div>
                </Group>
              </Paper>
            </Center>
          </Container>
        )}
        {showShareData && (
          <Container>
            <Stepper
              active={active}
              onStepClick={setActive}
              allowNextStepsSelect={false}
            >
              <Stepper.Step
                label='First Step'
                description='Assign Recipient(s)'
              >
                <Divider my='md' />
                <Center mt={'xl'}>
                  <TagsInput
                    value={emailRecipients}
                    onChange={handleEmailRecipients}
                    withAsterisk
                    label='Select Email Recipient(s)'
                    placeholder={
                      emailRecipientsError
                        ? 'Select or Enter a Valid Email'
                        : 'Select or Enter Email'
                    }
                    data={vetEmails}
                    error={emailRecipientsError && 'Invalid Email'}
                    w={690}
                  />
                </Center>
              </Stepper.Step>
              <Stepper.Step label='Second Step' description='Select Data'>
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
                              backgroundColor: hovered
                                ? 'transparent'
                                : 'transparent',
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
                                                (item) =>
                                                  item !== `${pet.id}+birthday`
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
                                  >{`${new Date(
                                    pet.birthday
                                  ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: '2-digit',
                                  })}`}</Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.petBreed.includes(
                                    `${pet.id}+breed`
                                  ) ? (
                                    <Text>Added Breed!</Text>
                                  ) : (
                                    <Text>Add Breed</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.petBreed.includes(
                                        `${pet.id}+breed`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            petBreed:
                                              selectedItems.petBreed.filter(
                                                (item) =>
                                                  item !== `${pet.id}+breed`
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
                                      selectedItems.petBreed.includes(
                                        `${pet.id}+breed`
                                      )
                                        ? 'var(--mantine-color-blue-light)'
                                        : undefined
                                    }
                                  >
                                    {pet.breed}
                                  </Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.petWeight.includes(
                                    `${pet.id}+weight`
                                  ) ? (
                                    <Text>Added Weight!</Text>
                                  ) : (
                                    <Text>Add Weight</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.petWeight.includes(
                                        `${pet.id}+weight`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            petWeight:
                                              selectedItems.petWeight.filter(
                                                (item) =>
                                                  item !== `${pet.id}+weight`
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
                                      selectedItems.petWeight.includes(
                                        `${pet.id}+weight`
                                      )
                                        ? 'var(--mantine-color-blue-light)'
                                        : undefined
                                    }
                                  >
                                    {pet.weight}
                                  </Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.petColor.includes(
                                    `${pet.id}+color`
                                  ) ? (
                                    <Text>{'Added Color(s)!'}</Text>
                                  ) : (
                                    <Text>{'Add Color(s)'}</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.petColor.includes(
                                        `${pet.id}+color`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            petColor:
                                              selectedItems.petColor.filter(
                                                (item) =>
                                                  item !== `${pet.id}+color`
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
                                      selectedItems.petColor.includes(
                                        `${pet.id}+color`
                                      )
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
                                                (item) =>
                                                  item !== `${pet.id}+birthday`
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
                                  >{`${new Date(
                                    pet.birthday
                                  ).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: '2-digit',
                                  })}`}</Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.petBreed.includes(
                                    `${pet.id}+breed`
                                  ) ? (
                                    <Text>Added Breed!</Text>
                                  ) : (
                                    <Text>Add Breed</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.petBreed.includes(
                                        `${pet.id}+breed`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            petBreed:
                                              selectedItems.petBreed.filter(
                                                (item) =>
                                                  item !== `${pet.id}+breed`
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
                                      selectedItems.petBreed.includes(
                                        `${pet.id}+breed`
                                      )
                                        ? 'var(--mantine-color-blue-light)'
                                        : undefined
                                    }
                                  >
                                    {pet.breed}
                                  </Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.petWeight.includes(
                                    `${pet.id}+weight`
                                  ) ? (
                                    <Text>Added Weight!</Text>
                                  ) : (
                                    <Text>Add Weight</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.petWeight.includes(
                                        `${pet.id}+weight`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            petWeight:
                                              selectedItems.petWeight.filter(
                                                (item) =>
                                                  item !== `${pet.id}+weight`
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
                                      selectedItems.petWeight.includes(
                                        `${pet.id}+weight`
                                      )
                                        ? 'var(--mantine-color-blue-light)'
                                        : undefined
                                    }
                                  >
                                    {pet.weight}
                                  </Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.petColor.includes(
                                    `${pet.id}+color`
                                  ) ? (
                                    <Text>{'Added Color(s)!'}</Text>
                                  ) : (
                                    <Text>{'Add Color(s)'}</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.petColor.includes(
                                        `${pet.id}+color`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            petColor:
                                              selectedItems.petColor.filter(
                                                (item) =>
                                                  item !== `${pet.id}+color`
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
                                      selectedItems.petColor.includes(
                                        `${pet.id}+color`
                                      )
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
                        <Accordion.Item
                          value={appointment.id}
                          key={appointment.id}
                        >
                          <AccordionControl
                            data={appointment}
                            type={'appointment'}
                            ref={ref}
                            style={{
                              backgroundColor: hovered
                                ? 'transparent'
                                : 'transparent',
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
                                                    item !==
                                                    `${appointment.id}+start`
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
                                      {`${new Date(
                                        appointment.start_time
                                      ).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                      })}`}
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
                                                  (item) =>
                                                    item !==
                                                    `${appointment.id}+end`
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
                                      {`${new Date(
                                        appointment.end_time
                                      ).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                      })}`}
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
                                                    item !==
                                                    `${appointment.id}+price`
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
                                                  (item) =>
                                                    item !==
                                                    `${appointment.id}+vet`
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
                                                    item !==
                                                    `${appointment.id}+insurance`
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
                                                    item !==
                                                    `${appointment.id}+description`
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
                                                    item !==
                                                    `${appointment.id}+nextsteps`
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
                                                (item) =>
                                                  item !==
                                                  `${appointment.id}+start`
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
                                    {`${new Date(
                                      appointment.start_time
                                    ).toLocaleString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true,
                                    })}`}
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
                                                (item) =>
                                                  item !==
                                                  `${appointment.id}+end`
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
                                    {`${new Date(
                                      appointment.end_time
                                    ).toLocaleString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: true,
                                    })}`}
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
                                                (item) =>
                                                  item !==
                                                  `${appointment.id}+vet`
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
                                                  item !==
                                                  `${appointment.id}+insurance`
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
                                                  item !==
                                                  `${appointment.id}+description`
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
                                                  item !==
                                                  `${appointment.id}+nextsteps`
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
                                                (item) =>
                                                  item !==
                                                  `${appointment.id}+price`
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
                              backgroundColor: hovered
                                ? 'transparent'
                                : 'transparent',
                            }}
                          >
                            <Title size={'h4'}>{doc.title}</Title>
                          </AccordionControl>
                          <Accordion.Panel>
                            {!isMobile && (
                              <Group grow>
                                <Stack gap={0}>
                                  {selectedItems.docDate.includes(
                                    `${doc.id}+date`
                                  ) ? (
                                    <Text>Added Document Date!</Text>
                                  ) : (
                                    <Text>Add Document Date</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.docDate.includes(
                                        `${doc.id}+date`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            docDate:
                                              selectedItems.docDate.filter(
                                                (item) =>
                                                  item !== `${doc.id}+date`
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
                                      selectedItems.docDate.includes(
                                        `${doc.id}+date`
                                      )
                                        ? 'var(--mantine-color-blue-light)'
                                        : undefined
                                    }
                                  >
                                    {`${new Date(doc.date).toLocaleString(
                                      'en-US',
                                      {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        // hour: '2-digit',
                                        // minute: '2-digit',
                                        // hour12: true,
                                      }
                                    )}`}
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
                                                (item) =>
                                                  item !==
                                                  `${doc.id}+description`
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
                                  {selectedItems.docPhoto.includes(
                                    `${doc.id}+photo`
                                  ) ? (
                                    <Text>Added Document Photo!</Text>
                                  ) : (
                                    <Text>Add Document Photo</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.docPhoto.includes(
                                        `${doc.id}+photo`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            docPhoto:
                                              selectedItems.docPhoto.filter(
                                                (item) =>
                                                  item !== `${doc.id}+photo`
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
                                      selectedItems.docPhoto.includes(
                                        `${doc.id}+photo`
                                      )
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
                                  {selectedItems.docDate.includes(
                                    `${doc.id}+date`
                                  ) ? (
                                    <Text>Added Document Date!</Text>
                                  ) : (
                                    <Text>Add Document Date</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.docDate.includes(
                                        `${doc.id}+date`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            docDate:
                                              selectedItems.docDate.filter(
                                                (item) =>
                                                  item !== `${doc.id}+date`
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
                                      selectedItems.docDate.includes(
                                        `${doc.id}+date`
                                      )
                                        ? 'var(--mantine-color-blue-light)'
                                        : undefined
                                    }
                                  >
                                    {`${new Date(doc.date).toLocaleString(
                                      'en-US',
                                      {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        // hour: '2-digit',
                                        // minute: '2-digit',
                                        // hour12: true,
                                      }
                                    )}`}
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
                                                (item) =>
                                                  item !==
                                                  `${doc.id}+description`
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
                                  {selectedItems.docPhoto.includes(
                                    `${doc.id}+photo`
                                  ) ? (
                                    <Text>Added Document Photo!</Text>
                                  ) : (
                                    <Text>Add Document Photo</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.docPhoto.includes(
                                        `${doc.id}+photo`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            docPhoto:
                                              selectedItems.docPhoto.filter(
                                                (item) =>
                                                  item !== `${doc.id}+photo`
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
                                      selectedItems.docPhoto.includes(
                                        `${doc.id}+photo`
                                      )
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
                              backgroundColor: hovered
                                ? 'transparent'
                                : 'transparent',
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
                                                (item) =>
                                                  item !== `${vet.id}+location`
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
                                      selectedItems.vetEmail.includes(
                                        `${vet.id}+email`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            vetEmail:
                                              selectedItems.vetEmail.filter(
                                                (item) =>
                                                  item !== `${vet.id}+email`
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
                                      selectedItems.vetEmail.includes(
                                        `${vet.id}+email`
                                      )
                                        ? 'var(--mantine-color-blue-light)'
                                        : undefined
                                    }
                                  >
                                    {vet.email}
                                  </Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.vetPhone.includes(
                                    `${vet.id}+phone`
                                  ) ? (
                                    <Text>Added Vet Phone Number!</Text>
                                  ) : (
                                    <Text>Add Vet Phone Number</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.vetPhone.includes(
                                        `${vet.id}+phone`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            vetPhone:
                                              selectedItems.vetPhone.filter(
                                                (item) =>
                                                  item !== `${vet.id}+phone`
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
                                      selectedItems.vetPhone.includes(
                                        `${vet.id}+phone`
                                      )
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
                                                (item) =>
                                                  item !== `${vet.id}+location`
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
                                      selectedItems.vetEmail.includes(
                                        `${vet.id}+email`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            vetEmail:
                                              selectedItems.vetEmail.filter(
                                                (item) =>
                                                  item !== `${vet.id}+email`
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
                                      selectedItems.vetEmail.includes(
                                        `${vet.id}+email`
                                      )
                                        ? 'var(--mantine-color-blue-light)'
                                        : undefined
                                    }
                                  >
                                    {vet.email}
                                  </Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.vetPhone.includes(
                                    `${vet.id}+phone`
                                  ) ? (
                                    <Text>Added Vet Phone Number!</Text>
                                  ) : (
                                    <Text>Add Vet Phone Number</Text>
                                  )}
                                  <Button
                                    variant='default'
                                    onClick={() => {
                                      selectedItems.vetPhone.includes(
                                        `${vet.id}+phone`
                                      )
                                        ? setSelectedItems(() => ({
                                            ...selectedItems,
                                            vetPhone:
                                              selectedItems.vetPhone.filter(
                                                (item) =>
                                                  item !== `${vet.id}+phone`
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
                                      selectedItems.vetPhone.includes(
                                        `${vet.id}+phone`
                                      )
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
                              backgroundColor: hovered
                                ? 'transparent'
                                : 'transparent',
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
                                                (item) =>
                                                  item !==
                                                  `${insurance.id}+policy`
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
                                    <Text>
                                      Added Insurance Policy Start Date!
                                    </Text>
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
                                                  item !==
                                                  `${insurance.id}+policyStart`
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
                                    {`${new Date(
                                      insurance.policy_start
                                    ).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: '2-digit',
                                    })}`}
                                  </Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.insurancePolicyEnd.includes(
                                    `${insurance.id}+policyEnd`
                                  ) ? (
                                    <Text>
                                      Added Insurance Policy End Date!
                                    </Text>
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
                                                  item !==
                                                  `${insurance.id}+policyEnd`
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
                                    {`${new Date(
                                      insurance.policy_end
                                    ).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: '2-digit',
                                    })}`}
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
                                                (item) =>
                                                  item !==
                                                  `${insurance.id}+policy`
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
                                    <Text>
                                      Added Insurance Policy Start Date!
                                    </Text>
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
                                                  item !==
                                                  `${insurance.id}+policyStart`
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
                                    {`${new Date(
                                      insurance.policy_start
                                    ).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: '2-digit',
                                    })}`}
                                  </Button>
                                </Stack>
                                <Stack gap={0}>
                                  {selectedItems.insurancePolicyEnd.includes(
                                    `${insurance.id}+policyEnd`
                                  ) ? (
                                    <Text>
                                      Added Insurance Policy End Date!
                                    </Text>
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
                                                  item !==
                                                  `${insurance.id}+policyEnd`
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
                                    {`${new Date(
                                      insurance.policy_end
                                    ).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: '2-digit',
                                    })}`}
                                  </Button>
                                </Stack>
                              </Stack>
                            )}
                          </Accordion.Panel>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  )}

                  {/* <Divider my='lg' />
                  <Title mt={'xl'} mb={'sm'}>
                    Account
                  </Title>
                  <Accordion
                    variant='contained'
                    chevronPosition='left'
                    multiple
                    value={value}
                    onChange={setValue}
                  >
                    <Accordion.Item
                      value={accountInfo.user_id}
                      key={accountInfo.user_id}
                    >
                      <AccordionControl
                        data={accountInfo}
                        type={'account'}
                        ref={ref}
                        style={{
                          backgroundColor: hovered
                            ? 'transparent'
                            : 'transparent',
                        }}
                      >
                        <Title
                          size={'h4'}
                        >{`${accountInfo.first_name} ${accountInfo.last_name}`}</Title>
                      </AccordionControl>
                      <Accordion.Panel>
                        {!isMobile && (
                          <>
                            <Group grow>
                              <Stack gap={0}>
                                {selectedItems.accountAddress.includes(
                                  `${accountInfo.user_id}+address`
                                ) ? (
                                  <Text>Added Account Address!</Text>
                                ) : (
                                  <Text>Add Account Address</Text>
                                )}
                                <Button
                                  variant='default'
                                  onClick={() => {
                                    selectedItems.accountAddress.includes(
                                      `${accountInfo.user_id}+address`
                                    )
                                      ? setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountAddress:
                                            selectedItems.accountAddress.filter(
                                              (item) =>
                                                item !==
                                                `${accountInfo.user_id}+address`
                                            ) ?? [],
                                        }))
                                      : setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountAddress: [
                                            ...selectedItems.accountAddress,
                                            `${accountInfo.user_id}+address`,
                                          ],
                                        }));
                                  }}
                                  bg={
                                    selectedItems.accountAddress.includes(
                                      `${accountInfo.user_id}+address`
                                    )
                                      ? 'var(--mantine-color-blue-light)'
                                      : undefined
                                  }
                                >
                                  {accountInfo.address}
                                </Button>
                              </Stack>
                              <Stack gap={0}>
                                {selectedItems.accountApartment.includes(
                                  `${accountInfo.user_id}+apartment`
                                ) ? (
                                  <Text>Added Account Apartment!</Text>
                                ) : (
                                  <Text>Add Account Apartment</Text>
                                )}
                                <Button
                                  variant='default'
                                  onClick={() => {
                                    selectedItems.accountApartment.includes(
                                      `${accountInfo.user_id}+apartment`
                                    )
                                      ? setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountApartment:
                                            selectedItems.accountApartment.filter(
                                              (item) =>
                                                item !==
                                                `${accountInfo.user_id}+apartment`
                                            ) ?? [],
                                        }))
                                      : setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountApartment: [
                                            ...selectedItems.accountApartment,
                                            `${accountInfo.user_id}+apartment`,
                                          ],
                                        }));
                                  }}
                                  bg={
                                    selectedItems.accountApartment.includes(
                                      `${accountInfo.user_id}+apartment`
                                    )
                                      ? 'var(--mantine-color-blue-light)'
                                      : undefined
                                  }
                                >
                                  {accountInfo.apartment}
                                </Button>
                              </Stack>
                              <Stack gap={0}>
                                {selectedItems.accountCity.includes(
                                  `${accountInfo.user_id}+city`
                                ) ? (
                                  <Text>Added Account City!</Text>
                                ) : (
                                  <Text>Add Account City</Text>
                                )}
                                <Button
                                  variant='default'
                                  onClick={() => {
                                    selectedItems.accountCity.includes(
                                      `${accountInfo.user_id}+city`
                                    )
                                      ? setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountCity:
                                            selectedItems.accountCity.filter(
                                              (item) =>
                                                item !==
                                                `${accountInfo.user_id}+city`
                                            ) ?? [],
                                        }))
                                      : setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountCity: [
                                            ...selectedItems.accountCity,
                                            `${accountInfo.user_id}+city`,
                                          ],
                                        }));
                                  }}
                                  bg={
                                    selectedItems.accountCity.includes(
                                      `${accountInfo.user_id}+city`
                                    )
                                      ? 'var(--mantine-color-blue-light)'
                                      : undefined
                                  }
                                >
                                  {accountInfo.city}
                                </Button>
                              </Stack>
                            </Group>
                            <Group grow>
                              <Stack gap={0}>
                                {selectedItems.accountAddress.includes(
                                  `${accountInfo.user_id}+state`
                                ) ? (
                                  <Text>Added Account State!</Text>
                                ) : (
                                  <Text>Add Account State</Text>
                                )}
                                <Button
                                  variant='default'
                                  onClick={() => {
                                    selectedItems.accountState.includes(
                                      `${accountInfo.user_id}+state`
                                    )
                                      ? setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountState:
                                            selectedItems.accountState.filter(
                                              (item) =>
                                                item !==
                                                `${accountInfo.user_id}+state`
                                            ) ?? [],
                                        }))
                                      : setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountState: [
                                            ...selectedItems.accountState,
                                            `${accountInfo.user_id}+state`,
                                          ],
                                        }));
                                  }}
                                  bg={
                                    selectedItems.accountState.includes(
                                      `${accountInfo.user_id}+state`
                                    )
                                      ? 'var(--mantine-color-blue-light)'
                                      : undefined
                                  }
                                >
                                  {accountInfo.state}
                                </Button>
                              </Stack>
                              <Stack gap={0}>
                                {selectedItems.accountZipcode.includes(
                                  `${accountInfo.user_id}+zipcode`
                                ) ? (
                                  <Text>Added Account Zip Code!</Text>
                                ) : (
                                  <Text>Add Account Zip Code</Text>
                                )}
                                <Button
                                  variant='default'
                                  onClick={() => {
                                    selectedItems.accountZipcode.includes(
                                      `${accountInfo.user_id}+zipcode`
                                    )
                                      ? setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountZipcode:
                                            selectedItems.accountZipcode.filter(
                                              (item) =>
                                                item !==
                                                `${accountInfo.user_id}+zipcode`
                                            ) ?? [],
                                        }))
                                      : setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountZipcode: [
                                            ...selectedItems.accountZipcode,
                                            `${accountInfo.user_id}+zipcode`,
                                          ],
                                        }));
                                  }}
                                  bg={
                                    selectedItems.accountZipcode.includes(
                                      `${accountInfo.user_id}+zipcode`
                                    )
                                      ? 'var(--mantine-color-blue-light)'
                                      : undefined
                                  }
                                >
                                  {accountInfo.zipcode}
                                </Button>
                              </Stack>
                              <Stack gap={0}>
                                {selectedItems.accountPhone.includes(
                                  `${accountInfo.user_id}+phone`
                                ) ? (
                                  <Text>Added Account Phone Number!</Text>
                                ) : (
                                  <Text>Add Account Phone Number</Text>
                                )}
                                <Button
                                  variant='default'
                                  onClick={() => {
                                    selectedItems.accountPhone.includes(
                                      `${accountInfo.user_id}+phone`
                                    )
                                      ? setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountPhone:
                                            selectedItems.accountPhone.filter(
                                              (item) =>
                                                item !==
                                                `${accountInfo.user_id}+phone`
                                            ) ?? [],
                                        }))
                                      : setSelectedItems(() => ({
                                          ...selectedItems,
                                          accountPhone: [
                                            ...selectedItems.accountPhone,
                                            `${accountInfo.user_id}+phone`,
                                          ],
                                        }));
                                  }}
                                  bg={
                                    selectedItems.accountPhone.includes(
                                      `${accountInfo.user_id}+phone`
                                    )
                                      ? 'var(--mantine-color-blue-light)'
                                      : undefined
                                  }
                                >
                                  {accountInfo.phone_number}
                                </Button>
                              </Stack>
                            </Group>
                          </>
                        )}
                        {isMobile && (
                          <Stack>
                            <Stack gap={0}>
                              {selectedItems.accountAddress.includes(
                                `${accountInfo.user_id}+address`
                              ) ? (
                                <Text>Added Account Address!</Text>
                              ) : (
                                <Text>Add Account Address</Text>
                              )}
                              <Button
                                variant='default'
                                onClick={() => {
                                  selectedItems.accountAddress.includes(
                                    `${accountInfo.user_id}+address`
                                  )
                                    ? setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountAddress:
                                          selectedItems.accountAddress.filter(
                                            (item) =>
                                              item !==
                                              `${accountInfo.user_id}+address`
                                          ) ?? [],
                                      }))
                                    : setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountAddress: [
                                          ...selectedItems.accountAddress,
                                          `${accountInfo.user_id}+address`,
                                        ],
                                      }));
                                }}
                                bg={
                                  selectedItems.accountAddress.includes(
                                    `${accountInfo.user_id}+address`
                                  )
                                    ? 'var(--mantine-color-blue-light)'
                                    : undefined
                                }
                              >
                                {accountInfo.address}
                              </Button>
                            </Stack>
                            <Stack gap={0}>
                              {selectedItems.accountApartment.includes(
                                `${accountInfo.user_id}+apartment`
                              ) ? (
                                <Text>Added Account Apartment!</Text>
                              ) : (
                                <Text>Add Account Apartment</Text>
                              )}
                              <Button
                                variant='default'
                                onClick={() => {
                                  selectedItems.accountApartment.includes(
                                    `${accountInfo.user_id}+apartment`
                                  )
                                    ? setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountApartment:
                                          selectedItems.accountApartment.filter(
                                            (item) =>
                                              item !==
                                              `${accountInfo.user_id}+apartment`
                                          ) ?? [],
                                      }))
                                    : setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountApartment: [
                                          ...selectedItems.accountApartment,
                                          `${accountInfo.user_id}+apartment`,
                                        ],
                                      }));
                                }}
                                bg={
                                  selectedItems.accountApartment.includes(
                                    `${accountInfo.user_id}+apartment`
                                  )
                                    ? 'var(--mantine-color-blue-light)'
                                    : undefined
                                }
                              >
                                {accountInfo.apartment}
                              </Button>
                            </Stack>
                            <Stack gap={0}>
                              {selectedItems.accountCity.includes(
                                `${accountInfo.user_id}+city`
                              ) ? (
                                <Text>Added Account City!</Text>
                              ) : (
                                <Text>Add Account City</Text>
                              )}
                              <Button
                                variant='default'
                                onClick={() => {
                                  selectedItems.accountCity.includes(
                                    `${accountInfo.user_id}+city`
                                  )
                                    ? setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountCity:
                                          selectedItems.accountCity.filter(
                                            (item) =>
                                              item !==
                                              `${accountInfo.user_id}+city`
                                          ) ?? [],
                                      }))
                                    : setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountCity: [
                                          ...selectedItems.accountCity,
                                          `${accountInfo.user_id}+city`,
                                        ],
                                      }));
                                }}
                                bg={
                                  selectedItems.accountCity.includes(
                                    `${accountInfo.user_id}+city`
                                  )
                                    ? 'var(--mantine-color-blue-light)'
                                    : undefined
                                }
                              >
                                {accountInfo.city}
                              </Button>
                            </Stack>
                            <Stack gap={0}>
                              {selectedItems.accountAddress.includes(
                                `${accountInfo.user_id}+state`
                              ) ? (
                                <Text>Added Account State!</Text>
                              ) : (
                                <Text>Add Account State</Text>
                              )}
                              <Button
                                variant='default'
                                onClick={() => {
                                  selectedItems.accountState.includes(
                                    `${accountInfo.user_id}+state`
                                  )
                                    ? setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountState:
                                          selectedItems.accountState.filter(
                                            (item) =>
                                              item !==
                                              `${accountInfo.user_id}+state`
                                          ) ?? [],
                                      }))
                                    : setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountState: [
                                          ...selectedItems.accountState,
                                          `${accountInfo.user_id}+state`,
                                        ],
                                      }));
                                }}
                                bg={
                                  selectedItems.accountState.includes(
                                    `${accountInfo.user_id}+state`
                                  )
                                    ? 'var(--mantine-color-blue-light)'
                                    : undefined
                                }
                              >
                                {accountInfo.state}
                              </Button>
                            </Stack>
                            <Stack gap={0}>
                              {selectedItems.accountZipcode.includes(
                                `${accountInfo.user_id}+zipcode`
                              ) ? (
                                <Text>Added Account Zip Code!</Text>
                              ) : (
                                <Text>Add Account Zip Code</Text>
                              )}
                              <Button
                                variant='default'
                                onClick={() => {
                                  selectedItems.accountZipcode.includes(
                                    `${accountInfo.user_id}+zipcode`
                                  )
                                    ? setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountZipcode:
                                          selectedItems.accountZipcode.filter(
                                            (item) =>
                                              item !==
                                              `${accountInfo.user_id}+zipcode`
                                          ) ?? [],
                                      }))
                                    : setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountZipcode: [
                                          ...selectedItems.accountZipcode,
                                          `${accountInfo.user_id}+zipcode`,
                                        ],
                                      }));
                                }}
                                bg={
                                  selectedItems.accountZipcode.includes(
                                    `${accountInfo.user_id}+zipcode`
                                  )
                                    ? 'var(--mantine-color-blue-light)'
                                    : undefined
                                }
                              >
                                {accountInfo.zipcode}
                              </Button>
                            </Stack>
                            <Stack gap={0}>
                              {selectedItems.accountPhone.includes(
                                `${accountInfo.user_id}+phone`
                              ) ? (
                                <Text>Added Account Phone Number!</Text>
                              ) : (
                                <Text>Add Account Phone Number</Text>
                              )}
                              <Button
                                variant='default'
                                onClick={() => {
                                  selectedItems.accountPhone.includes(
                                    `${accountInfo.user_id}+phone`
                                  )
                                    ? setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountPhone:
                                          selectedItems.accountPhone.filter(
                                            (item) =>
                                              item !==
                                              `${accountInfo.user_id}+phone`
                                          ) ?? [],
                                      }))
                                    : setSelectedItems(() => ({
                                        ...selectedItems,
                                        accountPhone: [
                                          ...selectedItems.accountPhone,
                                          `${accountInfo.user_id}+phone`,
                                        ],
                                      }));
                                }}
                                bg={
                                  selectedItems.accountPhone.includes(
                                    `${accountInfo.user_id}+phone`
                                  )
                                    ? 'var(--mantine-color-blue-light)'
                                    : undefined
                                }
                              >
                                {accountInfo.phone_number}
                              </Button>
                            </Stack>
                          </Stack>
                        )}
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion> */}
                </Container>
              </Stepper.Step>
              <Stepper.Step label='Final Step' description='Review'>
                <Divider my='md' />
                <Center mt={'xl'}>
                  <EmailTemplate
                    emailRecipients={emailRecipients}
                    selectedItems={selectedItems}
                    appointments={props.appointments}
                    docs={props.docs}
                    pets={props.pets}
                    vets={props.vets}
                    insurances={props.insurances}
                    account={props.account}
                    userEmail={props.userEmail}
                  />
                </Center>
              </Stepper.Step>
              <Stepper.Completed>
                {emailRecipients.length > 1 ? (
                  <Center>
                    <Text fz={'h3'} fw={600}>
                      Your emails have been sent!
                    </Text>
                  </Center>
                ) : (
                  <Center>
                    <Text fz={'h3'} fw={600}>
                      Your email has been sent!
                    </Text>
                  </Center>
                )}
              </Stepper.Completed>
            </Stepper>
            <Group justify='center' mt='xl'>
              <ActionIcon onClick={handleHome} me={'xl'}>
                <IconHome stroke={1} />
              </ActionIcon>
              {active !== 3 && active !== 0 && (
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
              )}
              {emailRecipients.length === 0 && active < 2 && (
                <Button disabled>Next Step</Button>
              )}
              {emailRecipients.length > 0 && active < 2 && (
                <Button onClick={nextStep}>Next Step</Button>
              )}
              {active === 2 && (
                <Button onClick={handleSendEmail}>Send Email</Button>
              )}
            </Group>
          </Container>
        )}
      </Paper>
    </Container>
  );
};
