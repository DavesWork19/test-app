'use client';

import {
  Container,
  Button,
  Paper,
  Grid,
  Center,
  Text,
  Title,
  TextInput,
  NumberInput,
  Modal,
  Select,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';
import { IconCircleCheck, IconCircleX, IconCircle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

// export const CreateNewAppointment = (props) => {
//   const [successModalopened, successModalObj] = useDisclosure(false);
//   const [failModalopened, failModalObj] = useDisclosure(false);
//   const [status, setStatus] = useState(2);
//   const router = useRouter();

//   let color = 'blue';
//   let icon = <IconCircle size={12} />;

//   if (parseInt(status) === 0) {
//     color = 'red';
//     icon = <IconCircleX size={12} />;
//   } else if (parseInt(status) === 1) {
//     color = 'green';
//     icon = <IconCircleCheck size={12} />;
//   }

//   const initialValues = {
//     title: '',
//     startTime: '',
//     endTime: '',
//     status: status,
//     price: '',
//     vetname: '',
//     vetlocation: '',
//     vetphone: '',
//     vetemail: '',
//     description: '',
//     nextsteps: '',
//   };

//   const form = useForm({
//     mode: 'uncontrolled',
//     initialValues: initialValues,

//     validate: {
//       title: (value) => (value.length > 0 ? null : 'Title Required!'),
//       startTime: (value) =>
//         value.toString().length > 0 ? null : 'Start Time Required!',
//     },
//   });

//   const handleExit = () => {
//     router.replace('/appointments');
//   };

//   const handleSubmit = async (values) => {
//     if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
//       let startTimeStr = null;
//       if (values.startTime) {
//         const dateStartTime = values.startTime;
//         const offset = dateStartTime.getTimezoneOffset();
//         const adjustedDate = new Date(
//           dateStartTime.getTime() - offset * 60 * 1000
//         );
//         startTimeStr = adjustedDate.toISOString();
//       }
//       let endTimeStr = null;
//       if (values.endTime) {
//         const dateEndTime = values.endTime;
//         const offset = dateEndTime.getTimezoneOffset();
//         const adjustedDate = new Date(
//           dateEndTime.getTime() - offset * 60 * 1000
//         );
//         endTimeStr = adjustedDate.toISOString();
//       }

//       const updatedPrice = values.price ? values.price : null;

//       const supabase = createClient();

//       if (
//         initialValues.vetname === values.vetname &&
//         initialValues.vetphone === values.vetphone &&
//         initialValues.vetemail === values.vetemail &&
//         initialValues.vetlocation === values.vetlocation
//       ) {
//         const appointmentInsertObj = await supabase
//           .from('appointments')
//           .insert({
//             title: values.title,
//             start_time: startTimeStr,
//             end_time: endTimeStr,
//             status: parseInt(status),
//             price: updatedPrice,
//             description: values.description,
//             next_steps: values.nextsteps,
//           });

//         if (appointmentInsertObj.error) {
//           failModalObj.open();
//           setTimeout(() => {
//             failModalObj.close();
//           }, 1500);
//         } else {
//           successModalObj.open();
//           setTimeout(() => {
//             successModalObj.close();
//           }, 1500);
//         }
//       } else {
//         const vetInsertObj = await supabase
//           .from('vets')
//           .upsert({
//             name: values.vetname,
//             phone_number: values.vetphone ? values.vetphone : null,
//             email: values.vetemail,
//             location: values.vetlocation,
//             last_updated: new Date(),
//           })
//           .select();

//         const appointmentInsertObj = await supabase
//           .from('appointments')
//           .insert({
//             title: values.title,
//             start_time: startTimeStr,
//             end_time: endTimeStr,
//             status: parseInt(status),
//             price: updatedPrice,
//             description: values.description,
//             next_steps: values.nextsteps,
//             vet: vetInsertObj.data[0].id,
//           });

//         if (vetInsertObj.error || appointmentInsertObj.error) {
//           failModalObj.open();
//           setTimeout(() => {
//             failModalObj.close();
//           }, 1500);
//         } else {
//           successModalObj.open();
//           setTimeout(() => {
//             successModalObj.close();
//           }, 1500);
//         }
//       }
//     }
//   };

//   return (
//     <Container size='md'>
//       <Modal
//         opened={successModalopened}
//         onClose={successModalObj.close}
//         centered
//         withCloseButton={false}
//         size={'xs'}
//       >
//         <Text size='md' fw={600} c={'green'} ta='center' pb={12}>
//           Successfully Saved!
//         </Text>
//         <Text size='xs' fw={500} c={'green'} ta='center'>
//           Continue editing or exit and return to the Appointments page
//         </Text>
//       </Modal>
//       <Modal
//         opened={failModalopened}
//         onClose={failModalObj.close}
//         centered
//         withCloseButton={false}
//         size={'xs'}
//       >
//         <Text size='md' fw={600} c={'red'} ta='center' pb={12}>
//           Error!
//         </Text>
//         <Text size='xs' fw={500} c={'red'} ta='center'>
//           Something went wrong!
//         </Text>
//       </Modal>

//       <Paper shadow='xs' withBorder p='md' radius='md' bg={color}>
//         <form onSubmit={form.onSubmit(handleSubmit)}>
//           <Grid pb={24}>
//             <Grid.Col span='content' ps={40} pe={0} pb={0} pt={18} fz={'h4'}>
//               {icon}
//             </Grid.Col>
//             <Grid.Col span={2} ps={2} pt={14} fz={'h4'}>
//               <NativeSelect
//                 value={status}
//                 onChange={(event) => setStatus(event.currentTarget.value)}
//                 data={[
//                   { label: 'Upcoming', value: 2 },
//                   { label: 'Completed', value: 1 },
//                   { label: 'Canceled', value: 0 },
//                 ]}
//               />
//             </Grid.Col>
//             <Grid.Col span={6}>
//               <Center fz={'h2'} fw={700}>
//                 <TextInput
//                   key={form.key('title')}
//                   {...form.getInputProps('title')}
//                   placeholder='Enter title'
//                 />
//               </Center>
//             </Grid.Col>
//             <Grid.Col span={3} pt={12}>
//               <Center>
//                 <Button
//                   variant='outline'
//                   color='black'
//                   bg='white'
//                   size='compact-xs'
//                   radius='xl'
//                   type='submit'
//                   me={6}
//                 >
//                   Save
//                 </Button>
//                 <Button
//                   variant='outline'
//                   color='black'
//                   bg='white'
//                   size='compact-xs'
//                   radius='xl'
//                   onClick={handleExit}
//                 >
//                   Exit
//                 </Button>
//               </Center>
//             </Grid.Col>
//           </Grid>

//           <Text size='lg' fw={700} mt={'md'}>
//             {'Details'}
//           </Text>
//           <Grid ms={6} mb={'xl'}>
//             <Grid.Col span={5}>
//               <Grid ms={60} mt={12}>
//                 <Grid.Col span={2} p={2} fw={550}>
//                   <Text fw={550} pt={'sm'} pb={'lg'}>
//                     {'Start'}
//                   </Text>
//                 </Grid.Col>
//                 <Grid.Col span={10} p={2} h={40}>
//                   <DateTimePicker
//                     key={form.key('startTime')}
//                     {...form.getInputProps('startTime')}
//                     valueFormat='ddd MMM DD, h:mm A'
//                     placeholder='Enter appointment start time'
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={2} p={2} fw={550}>
//                   <Text fw={550} pt={'sm'}>
//                     {'Pick Up'}
//                   </Text>
//                 </Grid.Col>
//                 <Grid.Col span={10} p={2} h={40}>
//                   <DateTimePicker
//                     key={form.key('endTime')}
//                     {...form.getInputProps('endTime')}
//                     valueFormat='ddd MMM DD, h:mm A'
//                     placeholder='Enter appointment end time'
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={2} p={2} fw={550}>
//                   <Text fw={550} pt={'sm'}>
//                     {'Price'}
//                   </Text>
//                 </Grid.Col>
//                 <Grid.Col span={10} p={2} h={40}>
//                   <NumberInput
//                     prefix='$'
//                     step={0.01}
//                     key={form.key('price')}
//                     {...form.getInputProps('price')}
//                     placeholder='Enter price'
//                   />
//                 </Grid.Col>
//               </Grid>
//             </Grid.Col>
//             <Grid.Col span={7}>
//               <Grid ps={60}>
//                 <Grid.Col span={2} p={2} fw={550}>
//                   <Text fw={550} pt={'sm'}>
//                     {'Vet'}
//                   </Text>
//                 </Grid.Col>
//                 <Grid.Col span={10} p={2} h={40}>
//                   <TextInput
//                     key={form.key('vetname')}
//                     {...form.getInputProps('vetname')}
//                     placeholder="Enter vet's name"
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={2} p={2} fw={550}>
//                   <Text fw={550} pt={'sm'}>
//                     {'Location'}
//                   </Text>
//                 </Grid.Col>
//                 <Grid.Col span={10} p={2} h={40}>
//                   <TextInput
//                     key={form.key('vetlocation')}
//                     {...form.getInputProps('vetlocation')}
//                     placeholder="Enter vet's address"
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={2} p={2} fw={550}>
//                   <Text fw={550} pt={'sm'}>
//                     {'Phone'}
//                   </Text>
//                 </Grid.Col>
//                 <Grid.Col span={10} p={2} h={40}>
//                   <NumberInput
//                     decimalSeparator='-'
//                     key={form.key('vetphone')}
//                     {...form.getInputProps('vetphone')}
//                     placeholder="Enter vet's phone number"
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={2} p={2} fw={550}>
//                   <Text fw={550} pt={'sm'}>
//                     {'Email'}
//                   </Text>
//                 </Grid.Col>
//                 <Grid.Col span={10} p={2} h={40}>
//                   <TextInput
//                     key={form.key('vetemail')}
//                     {...form.getInputProps('vetemail')}
//                     placeholder="Enter vet's email address"
//                   />
//                 </Grid.Col>
//               </Grid>
//             </Grid.Col>
//           </Grid>

//           <Text size='lg' fw={700}>
//             {'Review'}
//           </Text>
//           <TextInput
//             key={form.key('description')}
//             {...form.getInputProps('description')}
//             placeholder='Enter a description'
//           />

//           <Text size='lg' fw={700}>
//             {'Next Steps'}
//           </Text>
//           <TextInput
//             key={form.key('nextsteps')}
//             {...form.getInputProps('nextsteps')}
//             placeholder='Enter next steps'
//           />
//         </form>
//       </Paper>
//     </Container>
//   );
// };

export const CreateNewAppointment = (props) => {
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);
  const router = useRouter();

  const [status, setStatus] = useState('2');
  const [categorySelected, setCategorySelected] = useState();

  const vetNames = props.vetNames;
  const insuranceNames = props.insuranceNames;

  const initialValues = {
    title: null,
    startTime: null,
    endTime: null,
    price: null,
    status: null,
    vet: null,
    insurance: null,
    description: null,
    nextsteps: null,
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      title: (value) => (value ? null : 'Title Required!'),
      startTime: (value) =>
        value.toString().length > 0 ? null : 'Start Time Required!',
    },
  });

  let color = '';
  let icon = '';

  if (status === '0') {
    color = 'red';
    icon = <IconCircleX size={24} />;
  } else if (status === '1') {
    color = 'green';
    icon = <IconCircleCheck size={24} />;
  } else if (status === '2') {
    color = 'blue';
    icon = <IconCircle size={24} />;
  }

  const handleExit = () => {
    router.replace('/appointments');
  };

  const handleSubmit = async (values) => {
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      let startTimeStr = null;
      if (values.startTime) {
        startTimeStr = values.startTime.toISOString();
      }
      let endTimeStr = null;
      if (values.endTime) {
        endTimeStr = values.endTime.toISOString();
      }
      const updatedPrice = values.price ? values.price : null;
      const supabase = createClient();

      const { error } = await supabase.from('appointments').insert({
        title: values.title,
        start_time: startTimeStr,
        end_time: endTimeStr,
        status: parseInt(status),
        price: updatedPrice,
        vet: values.vet,
        insurance: values.insurance,
        description: values.description,
        next_steps: values.nextsteps,
      });

      if (error) {
        failModalObj.open();
        setTimeout(() => {
          failModalObj.close();
        }, 1500);
      } else {
        successModalObj.open();
        setTimeout(() => {
          successModalObj.close();
        }, 1500);
      }
    }
  };
  return (
    <Container size='md'>
      <Modal
        opened={successModalopened}
        onClose={successModalObj.close}
        centered
        withCloseButton={false}
        size={'xs'}
      >
        <Text size='md' fw={600} c={'green'} ta='center' pb={12}>
          Successfully Saved!
        </Text>
        <Text size='xs' fw={500} c={'green'} ta='center'>
          Continue editing or exit and return to the Appointments page
        </Text>
      </Modal>
      <Modal
        opened={failModalopened}
        onClose={failModalObj.close}
        centered
        withCloseButton={false}
        size={'xs'}
      >
        <Text size='md' fw={600} c={'red'} ta='center' pb={12}>
          Error!
        </Text>
        <Text size='xs' fw={500} c={'red'} ta='center'>
          Something went wrong! Please try again
        </Text>
      </Modal>

      <Paper shadow='xs' withBorder p='md' bg={color}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid pb={24}>
            <Grid.Col span='content' ps={40} pe={0} pb={0} pt={12} fz={'h4'}>
              {icon}
            </Grid.Col>
            <Grid.Col span={2} ps={2} pt={8} fz={'h4'}>
              <Select
                value={status}
                onChange={setStatus}
                data={[
                  { label: 'Upcoming', value: '2' },
                  { label: 'Completed', value: '1' },
                  { label: 'Canceled', value: '0' },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Center fz={'h2'} fw={700}>
                <TextInput
                  key={form.key('title')}
                  {...form.getInputProps('title')}
                  placeholder='Enter Appointment Title'
                />
              </Center>
            </Grid.Col>
            <Grid.Col span={3} pt={12}>
              <Center>
                <Button
                  variant='outline'
                  color='black'
                  bg='white'
                  size='compact-xs'
                  radius='xl'
                  type='submit'
                  me={6}
                >
                  Save
                </Button>
                <Button
                  variant='outline'
                  color='black'
                  bg='white'
                  size='compact-xs'
                  radius='xl'
                  onClick={handleExit}
                  me={6}
                >
                  Exit
                </Button>
              </Center>
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={12}>
              <Title order={3} size='h3' mt={'xl'}>
                {'Details'}
              </Title>
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size={'lg'} fw={700}>
                {'Start'}
              </Text>
              <DateTimePicker
                key={form.key('startTime')}
                {...form.getInputProps('startTime')}
                valueFormat='ddd MMM DD, h:mm A'
                placeholder='Enter Appointment Start Time'
              />
              <Text size={'lg'} fw={700} mt={'xs'}>
                {'Pick Up'}
              </Text>
              <DateTimePicker
                key={form.key('endTime')}
                {...form.getInputProps('endTime')}
                valueFormat='ddd MMM DD, h:mm A'
                placeholder='Enter Appointment End Time'
              />
              <Text size={'lg'} fw={700} mt={'xs'}>
                {'Price'}
              </Text>
              <NumberInput
                prefix='$'
                step={0.01}
                key={form.key('price')}
                {...form.getInputProps('price')}
                placeholder='Enter Price'
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text size={'lg'} fw={700}>
                {'Vet'}
              </Text>
              <Select
                key={form.key('vet')}
                {...form.getInputProps('vet')}
                data={vetNames}
                placeholder='Select Vet Used'
              />
              <Text size={'lg'} fw={700} mt={'xs'}>
                {'Insurance'}
              </Text>
              <Select
                key={form.key('insurance')}
                {...form.getInputProps('insurance')}
                data={insuranceNames}
                placeholder='Select Insurance Used'
              />
              <Text size={'lg'} fw={700} mt={'xs'}>
                {'Category'}
              </Text>
              <Select
                searchable
                searchValue={categorySelected}
                onSearchChange={setCategorySelected}
                data={[
                  { label: 'Add New Vet', value: '0' },
                  { label: 'Dental', value: '1' },
                  { label: 'for fun', value: '2' },
                  { label: 'others', value: '3' },
                ]}
                placeholder='Select Category'
              />
            </Grid.Col>
          </Grid>

          <Title order={3} size='h3' mt={'xl'}>
            {'Review'}
          </Title>

          <TextInput
            key={form.key('description')}
            {...form.getInputProps('description')}
            placeholder='Enter Description'
          />

          <Title order={3} size='h3' mt={'md'}>
            {'Next Steps'}
          </Title>
          <TextInput
            key={form.key('nextsteps')}
            {...form.getInputProps('nextsteps')}
            placeholder='Enter Next Steps'
          />
        </form>
      </Paper>
    </Container>
  );
};
