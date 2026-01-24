import GamblingHeader from '../../../commonComps/GamblingHeader';
import { Center } from '@mantine/core';
import ParlayNumberPad from './ParlayNumberPad';

export default function ParlayPage() {
  return (
    <main className='container-fluid text bg-black lightText'>
      <GamblingHeader />
      <Center pb={'xl'}>
        <ParlayNumberPad />
      </Center>
    </main>
  );
}
