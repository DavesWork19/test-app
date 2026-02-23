import '../Fonts.css';
import PercentDataTable from '../commonComps/PercentDataTable';
import { Accordion } from '@mantine/core';

const OverallPercents = () => {
  return (
    <Accordion variant='contained' defaultValue={null}>
      <Accordion.Item value='overallStats'>
        <Accordion.Control className='slateGrayBackground boldText text-black'>
          Overall Stats
        </Accordion.Control>
        <Accordion.Panel p={0} className='lightText'>
          <PercentDataTable title='' percentagesName='overall' />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default OverallPercents;
