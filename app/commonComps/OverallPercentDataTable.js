import '../Fonts.css';
import { Title, Box } from '@mantine/core';

const PercentDataTable = (props) => {
  const title = props.title;
  const percentagesName = props.percentagesName;
  const newPercentages = props.percentagesData;
  const today = props.todayLabel;

  const addPercentText = (text) => `${text}%`;

  const checkNA = (value) => {
    if (value === 'NA' || value === undefined) return 'NA';
    return (value * 100).toFixed(2);
  };

  const spread = addPercentText(
    checkNA(newPercentages[`${percentagesName}_spread`])
  );
  const overUnder = addPercentText(
    checkNA(newPercentages[`${percentagesName}_overUnder`])
  );
  const moneyLine = addPercentText(
    checkNA(newPercentages[`${percentagesName}_moneyLine`])
  );

  const days = [1, 2, 3, 4, 5].map((n) => ({
    label: `${n} ${n === 1 ? 'Game Ago' : 'Games Ago'}`,
    spread: addPercentText(
      checkNA(newPercentages[`${percentagesName}_prev_${n}_spread`])
    ),
    overUnder: addPercentText(
      checkNA(newPercentages[`${percentagesName}_prev_${n}_overUnder`])
    ),
    moneyLine: addPercentText(
      checkNA(newPercentages[`${percentagesName}_prev_${n}_moneyLine`])
    ),
  }));

  const getColor = (val) => {
    if (val === 'NA%' || val === 'undefined%')
      return { bg: '#2e3d47', text: '#a0b4bf', tag: '#7a8f9a' };
    const num = parseFloat(val);
    if (num >= 60)
      return { bg: 'rgba(34, 139, 34, 0.85)', text: '#ffffff', tag: '#a8f0c0' };
    if (num >= 45) return { bg: '#b87800', text: '#ffffff', tag: '#ffe0a0' };
    return { bg: '#9b1c1c', text: '#ffffff', tag: '#ffb0b0' };
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '80px repeat(3, 1fr)',
    gap: '3px',
    padding: '5px 6px',
    alignItems: 'center',
    width: '100%',
    boxSizing: 'border-box',
  };

  const ColHeaders = () => (
    <div
      style={{ ...gridStyle, padding: '8px 6px', backgroundColor: '#2e3d47' }}
    >
      {['', 'SPREAD', 'OVER/UNDER', 'MONEY LINE'].map((h, i) => (
        <div
          key={i}
          style={{
            fontSize: '8px',
            letterSpacing: '0.06em',
            color: '#7a8f9a',
            fontWeight: 500,
            textAlign: i === 0 ? 'left' : 'center',
          }}
        >
          {h}
        </div>
      ))}
    </div>
  );

  const HeatCell = ({ val }) => {
    const c = getColor(val);
    return (
      <div
        style={{
          height: '52px',
          borderRadius: '6px',
          backgroundColor: c.bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 500, color: 'white' }}>
          {val}
        </span>
      </div>
    );
  };

  const DataRow = ({ label, spreadVal, ouVal, mlVal, borderTop }) => (
    <div
      style={{
        ...gridStyle,
        borderTop: borderTop ? '0.5px solid rgba(255,255,255,0.07)' : 'none',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          color: 'black',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          paddingRight: '4px',
        }}
      >
        {label}
      </div>
      <HeatCell val={spreadVal} />
      <HeatCell val={ouVal} />
      <HeatCell val={mlVal} />
    </div>
  );

  return (
    <div
      style={{
        backgroundColor: '#3a4a54',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {title ? (
        <Box mb='lg'>
          <Title order={2} className='boldText lightText' ta='center'>
            {title}
          </Title>
        </Box>
      ) : null}

      <ColHeaders />

      {/* Overall section */}
      <div style={{ backgroundColor: '#3a4a54' }}>
        <DataRow
          label='Overall'
          spreadVal={spread}
          ouVal={overUnder}
          mlVal={moneyLine}
        />
      </div>

      {/* Last 5 game days section */}
      <div
        style={{
          fontSize: '9px',
          letterSpacing: '0.08em',
          color: '#5a7080',
          fontWeight: 500,
          padding: '8px 10px 4px',
          backgroundColor: '#2a373f',
        }}
      >
        LAST 5 GAME DAYS
      </div>
      <div style={{ backgroundColor: '#3a4a54' }}>
        {days.map((d, i) => (
          <DataRow
            key={i}
            label={d.label}
            spreadVal={d.spread}
            ouVal={d.overUnder}
            mlVal={d.moneyLine}
            borderTop={i > 0}
          />
        ))}
      </div>
    </div>
  );
};

export default PercentDataTable;
