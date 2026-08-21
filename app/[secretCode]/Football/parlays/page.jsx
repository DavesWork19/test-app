import GamblingHeader from '../../../commonComps/GamblingHeader';
import { Center } from '@mantine/core';
import ParlayNumberPad from '../../../commonComps/ParlayNumberPad';
import { secretCode } from '../../../constants';

export default function ParlayPage() {
  return (
    <div className='container-fluid bg-black boldText lightText'>
      <GamblingHeader link={'back'} />
      <Center pb={'xl'}>
        <ParlayNumberPad sportPath={`${secretCode}/Football`} />
      </Center>
    </div>
  );
}
