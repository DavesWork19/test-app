import '../Fonts.css';
import GamblingHeader from '../commonComps/GamblingHeader';
import { Center } from '@mantine/core';
import NumberPad from './NumberPad';

const GamblingHomePage = () => {
  return (
    <div className='container-fluid bg-black boldText lightText'>
      <GamblingHeader />
      <Center pb={'xl'}>
        <NumberPad />
      </Center>
    </div>
  );
};

export default GamblingHomePage;
