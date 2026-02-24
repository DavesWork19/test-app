import '../Fonts.css';
import { newPercentages } from './newPercents';
import { todaysGames } from './todaysGames';
import PercentDataTableGameDayRow from '../percentDataTableComps/PercentDataTableGameDayRow';
import { Table, Paper, Title, Box } from '@mantine/core';

const PercentDataTable = (props) => {
  const title = props.title;
  const percentagesName = props.percentagesName;
  // const hours = props.hours;
  const checksAndXs = props?.checksAndXs;
  // const hoursArray = [...hours];
  const today = todaysGames.slice(0, 1)[0];

  const addPercentText = (text) => `${text}%`;

  const checkNA = (value) => {
    if (value === 'NA' || value === undefined) {
      return value;
    }
    return value.toFixed(2);
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

  const daySpread = addPercentText(
    checkNA(newPercentages[`${percentagesName}_${today}_spread`])
  );
  const dayOverUnder = addPercentText(
    checkNA(newPercentages[`${percentagesName}_${today}_overUnder`])
  );
  const daymoneyLine = addPercentText(
    checkNA(newPercentages[`${percentagesName}_${today}_moneyLine`])
  );

  const spread1dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_1_spread`])
  );
  console.log('testing 2', spread1dayago);
  const overUnder1dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_1_overUnder`])
  );
  const moneyLine1dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_1_moneyLine`])
  );
  const spread2dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_2_spread`])
  );
  const overUnder2dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_2_overUnder`])
  );
  const moneyLine2dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_2_moneyLine`])
  );
  const spread3dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_3_spread`])
  );
  const overUnder3dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_3_overUnder`])
  );
  const moneyLine3dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_3_moneyLine`])
  );
  const spread4dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_4_spread`])
  );
  const overUnder4dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_4_overUnder`])
  );
  const moneyLine4dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_4_moneyLine`])
  );
  const spread5dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_5_spread`])
  );
  const overUnder5dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_5_overUnder`])
  );
  const moneyLine5dayago = addPercentText(
    checkNA(newPercentages[`${percentagesName}_prev_5_moneyLine`])
  );

  const gameDay1Text = checksAndXs ? ' Game Ago' : ' Day Ago';
  const gameDayText = checksAndXs ? ' Games Ago' : ' Days Ago';

  return (
    <Paper
      withborder='true'
      p='md'
      radius='md'
      style={{
        borderColor: '#d3d3d3',
        backgroundColor: '#1a1a1a',
      }}
    >
      {/* Title */}
      <Box mb='lg'>
        <Title order={2} className='boldText lightText' ta='center'>
          {title}
        </Title>
      </Box>

      {/* Main Stats Table */}
      <Table
        withborder='true'
        withColumnBorders
        highlightOnHover
        style={{
          borderColor: '#d3d3d3',
        }}
      >
        <thead style={{ backgroundColor: 'black' }}>
          <tr>
            <th style={{ color: '#d3d3d3', textAlign: 'left' }}></th>
            <th
              style={{
                color: '#d3d3d3',
                textAlign: 'center',
                'padding-left': '50px',
              }}
            >
              Spread
            </th>
            <th style={{ color: '#d3d3d3', textAlign: 'center' }}>
              Over Under
            </th>
            <th style={{ color: '#d3d3d3', textAlign: 'center' }}>
              Money Line
            </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'black' }}>
          {/* Overall Row */}
          <tr>
            <td style={{ color: '#d3d3d3', fontWeight: 'normal' }}>Overall</td>
            <td
              style={{
                color: '#d3d3d3',
                textAlign: 'center',
                'padding-left': '50px',
              }}
            >
              {spread}
            </td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
              {overUnder}
            </td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
              {moneyLine}
            </td>
          </tr>

          {/* Time-based Rows
          {hoursArray.map((hour) => (
            <tr key={hour}>
              <td
                style={{ color: '#d3d3d3', fontWeight: 'normal' }}
              >{`At ${hour}PM`}</td>
              <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
                {addPercentText(
                  checkNA(
                    newPercentages[
                      `${percentagesName}_Time_${hour}_${hour}59_spread`
                    ]
                  )
                )}
              </td>
              <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
                {addPercentText(
                  checkNA(
                    newPercentages[
                      `${percentagesName}_Time_${hour}_${hour}59_overUnder`
                    ]
                  )
                )}
              </td>
              <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
                {addPercentText(
                  checkNA(
                    newPercentages[
                      `${percentagesName}_Time_${hour}_${hour}59_moneyLine`
                    ]
                  )
                )}
              </td>
            </tr>
          ))} */}

          {/* Today Row
          <tr>
            <td style={{ color: '#d3d3d3', fontWeight: 'normal' }}>{today}</td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
              {daySpread}
            </td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
              {dayOverUnder}
            </td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
              {daymoneyLine}
            </td>
          </tr> */}
        </tbody>
      </Table>

      {/* Spacer */}
      <Box my='lg' />

      {/* Game Days Table */}
      <Table
        withborder='true'
        withColumnBorders
        highlightOnHover
        style={{
          borderColor: '#d3d3d3',
        }}
      >
        <tbody style={{ backgroundColor: 'black' }}>
          <PercentDataTableGameDayRow
            data={{
              title: `1 ${gameDay1Text}`,
              spread: spread1dayago,
              overUnder: overUnder1dayago,
              moneyLine: moneyLine1dayago,
              checksAndXs,
            }}
          />
          <PercentDataTableGameDayRow
            data={{
              title: `2 ${gameDayText}`,
              spread: spread2dayago,
              overUnder: overUnder2dayago,
              moneyLine: moneyLine2dayago,
              checksAndXs,
            }}
          />
          <PercentDataTableGameDayRow
            data={{
              title: `3 ${gameDayText}`,
              spread: spread3dayago,
              overUnder: overUnder3dayago,
              moneyLine: moneyLine3dayago,
              checksAndXs,
            }}
          />
          <PercentDataTableGameDayRow
            data={{
              title: `4 ${gameDayText}`,
              spread: spread4dayago,
              overUnder: overUnder4dayago,
              moneyLine: moneyLine4dayago,
              checksAndXs,
            }}
          />
          <PercentDataTableGameDayRow
            data={{
              title: `5 ${gameDayText}`,
              spread: spread5dayago,
              overUnder: overUnder5dayago,
              moneyLine: moneyLine5dayago,
              checksAndXs,
            }}
          />
        </tbody>
      </Table>
    </Paper>
  );
};

export default PercentDataTable;
