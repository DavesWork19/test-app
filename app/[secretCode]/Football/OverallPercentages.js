import '../../Fonts.css';
import PercentDataTable from '../../commonComps/OverallPercentDataTable';
import { Accordion } from '@mantine/core';

const OverallPercents = ({ percentagesData, todayLabel }) => {
  return (
    <Accordion
      variant='contained'
      defaultValue={null}
      styles={{
        item: {
          backgroundColor: '#6b7f8f',
          border: '1px solid #2e3d47',
          borderRadius: '8px',
          overflow: 'hidden',
        },
        control: {
          backgroundColor: '#6b7f8f',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        },
        panel: {
          backgroundColor: '#6b7f8f',
          padding: 0,
        },
        chevron: { color: '#7a8f9a' },
        label: {
          color: '#c8d4da',
          fontWeight: 500,
          letterSpacing: '0.03em',
        },
      }}
    >
      <Accordion.Item value='overallStats'>
        <Accordion.Control className='boldText'>
          <div style={{ textAlign: 'center', width: '100%', color: 'black' }}>
            Overall Stats
          </div>
        </Accordion.Control>
        <Accordion.Panel p={0} className='lightText'>
          <div
            style={{
              backgroundColor: '#232f36',
              padding: '6px 14px 10px',
            }}
          >
            <PercentDataTable
              title=''
              percentagesName='overall'
              section='overall'
              percentagesData={percentagesData}
              todayLabel={todayLabel}
            />
          </div>

          {/* Divider */}
          <div style={{ height: '3px', backgroundColor: '#232f36' }} />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};

export default OverallPercents;
