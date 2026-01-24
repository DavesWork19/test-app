import '../Fonts.css';
import { percentages } from './percentages';
import { todaysGames } from './todaysGames';
import PercentDataTableGameDayRow from '../percentDataTableComps/PercentDataTableGameDayRow';
import { Table, Paper, Title, Box } from '@mantine/core';

const PercentDataTable = (props) => {
  const title = props.title;
  const percentagesName = props.percentagesName;
  const hours = props.hours;
  const checksAndXs = props?.checksAndXs;
  const hoursArray = [...hours];
  const today = todaysGames.slice(0, 1)[0];

  const addPercentText = (text) => `${text}%`;

  const checkNA = (value) => {
    if (value === 'NA' || value === undefined) {
      return value;
    }
    return value.toFixed(2);
  };

  const spread = addPercentText(
    checkNA(percentages[`${percentagesName}_spread`])
  );
  const overUnder = addPercentText(
    checkNA(percentages[`${percentagesName}_overUnder`])
  );
  const parlay = addPercentText(
    checkNA(percentages[`${percentagesName}_parlay`])
  );

  const daySpread = addPercentText(
    checkNA(percentages[`${percentagesName}_${today}_spread`])
  );
  const dayOverUnder = addPercentText(
    checkNA(percentages[`${percentagesName}_${today}_overUnder`])
  );
  const dayParlay = addPercentText(
    checkNA(percentages[`${percentagesName}_${today}_parlay`])
  );

  const spread1dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_spread_1`])
  );
  const overUnder1dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_overUnder_1`])
  );
  const parlay1dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_parlay_1`])
  );
  const spread2dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_spread_2`])
  );
  const overUnder2dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_overUnder_2`])
  );
  const parlay2dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_parlay_2`])
  );
  const spread3dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_spread_3`])
  );
  const overUnder3dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_overUnder_3`])
  );
  const parlay3dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_parlay_3`])
  );
  const spread4dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_spread_4`])
  );
  const overUnder4dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_overUnder_4`])
  );
  const parlay4dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_parlay_4`])
  );
  const spread5dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_spread_5`])
  );
  const overUnder5dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_overUnder_5`])
  );
  const parlay5dayago = addPercentText(
    checkNA(percentages[`${percentagesName}_last_games_parlay_5`])
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
            <th style={{ color: '#d3d3d3', textAlign: 'center' }}>Spread</th>
            <th style={{ color: '#d3d3d3', textAlign: 'center' }}>
              Over Under
            </th>
            <th style={{ color: '#d3d3d3', textAlign: 'center' }}>Parlay</th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: 'black' }}>
          {/* Overall Row */}
          <tr>
            <td style={{ color: '#d3d3d3', fontWeight: 'normal' }}>Overall</td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>{spread}</td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
              {overUnder}
            </td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>{parlay}</td>
          </tr>

          {/* Time-based Rows */}
          {hoursArray.map((hour) => (
            <tr key={hour}>
              <td
                style={{ color: '#d3d3d3', fontWeight: 'normal' }}
              >{`At ${hour}PM`}</td>
              <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
                {addPercentText(
                  checkNA(
                    percentages[
                      `${percentagesName}_Time_${hour}_${hour}59_spread`
                    ]
                  )
                )}
              </td>
              <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
                {addPercentText(
                  checkNA(
                    percentages[
                      `${percentagesName}_Time_${hour}_${hour}59_overUnder`
                    ]
                  )
                )}
              </td>
              <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
                {addPercentText(
                  checkNA(
                    percentages[
                      `${percentagesName}_Time_${hour}_${hour}59_parlay`
                    ]
                  )
                )}
              </td>
            </tr>
          ))}

          {/* Today Row */}
          <tr>
            <td style={{ color: '#d3d3d3', fontWeight: 'normal' }}>{today}</td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
              {daySpread}
            </td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
              {dayOverUnder}
            </td>
            <td style={{ color: '#d3d3d3', textAlign: 'center' }}>
              {dayParlay}
            </td>
          </tr>
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
              parlay: parlay1dayago,
              checksAndXs,
            }}
          />
          <PercentDataTableGameDayRow
            data={{
              title: `2 ${gameDayText}`,
              spread: spread2dayago,
              overUnder: overUnder2dayago,
              parlay: parlay2dayago,
              checksAndXs,
            }}
          />
          <PercentDataTableGameDayRow
            data={{
              title: `3 ${gameDayText}`,
              spread: spread3dayago,
              overUnder: overUnder3dayago,
              parlay: parlay3dayago,
              checksAndXs,
            }}
          />
          <PercentDataTableGameDayRow
            data={{
              title: `4 ${gameDayText}`,
              spread: spread4dayago,
              overUnder: overUnder4dayago,
              parlay: parlay4dayago,
              checksAndXs,
            }}
          />
          <PercentDataTableGameDayRow
            data={{
              title: `5 ${gameDayText}`,
              spread: spread5dayago,
              overUnder: overUnder5dayago,
              parlay: parlay5dayago,
              checksAndXs,
            }}
          />
        </tbody>
      </Table>
    </Paper>
  );
};

export default PercentDataTable;
