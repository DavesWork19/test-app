import '../Fonts.css';

const PercentDataTableGameDayRow = (props) => {
  const { title, spread, overUnder, parlay, checksAndXs } = props.data;

  const formatValue = (value) => {
    if (!checksAndXs) return value;
    return value === '100.00%' ? '☑' : '☐';
  };

  const cellStyle = {
    color: '#d3d3d3',
    textAlign: 'center',
    fontSize: checksAndXs ? '1.5rem' : '1rem',
    width: '25%',
  };

  return (
    <tr>
      <td style={{ color: '#d3d3d3', fontWeight: 'normal', textAlign: 'left' }}>
        {title}
      </td>
      <td style={cellStyle}>{formatValue(spread)}</td>
      <td style={cellStyle}>{formatValue(overUnder)}</td>
      <td style={cellStyle}>{formatValue(parlay)}</td>
    </tr>
  );
};

export default PercentDataTableGameDayRow;
