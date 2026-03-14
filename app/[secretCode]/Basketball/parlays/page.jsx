import GamblingHeader from '../../../commonComps/GamblingHeader';
import { Center } from '@mantine/core';
import ParlayNumberPad from './ParlayNumberPad';

export default function ParlayPage() {
  return (
    <div className='container-fluid bg-black boldText lightText'>
      <GamblingHeader link={'back'} />
      <Center pb={'xl'}>
        <ParlayNumberPad />
      </Center>
    </div>
  );
}
