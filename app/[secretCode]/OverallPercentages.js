import '../Fonts.css';
import PercentDataTable from '../commonComps/PercentDataTable';
import { Accordion } from '@mantine/core';

const OverallPercents = () => {
  return (
    <Accordion
      variant='contained'
      defaultValue={null}
      styles={{
        item: {
          backgroundColor: 'lightslategray',
          border: '1px solid #333',
        },
        control: { backgroundColor: 'lightslategray' },
        panel: { backgroundColor: 'black' },
        chevron: { color: 'white' },
        itemOpened: { backgroundColor: 'black' },
      }}
    >
      <Accordion.Item value='overallStats'>
        <Accordion.Control className='boldText'>
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
