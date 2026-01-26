'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { parlaySecretCode2, parlaySecretCode } from '../../../constants';
import {
  Container,
  Paper,
  Text,
  Button,
  Grid,
  Stack,
  Center,
} from '@mantine/core';

const NumberPad = () => {
  const router = useRouter();
  const [guess, setGuess] = useState('');
  const [activeButton, setActiveButton] = useState(null);

  const handleGuess = (userGuess) => {
    // Set active button for visual feedback
    setActiveButton(userGuess);
    setTimeout(() => {
      setActiveButton(null);
    }, 175);

    if (userGuess === 'B') {
      const newGuess = guess.substring(0, guess.length - 1);
      setGuess(newGuess);
    } else {
      const newGuess = guess.concat(userGuess);
      setGuess(newGuess);
      const newGuessInt = parseInt(newGuess);

      if (newGuessInt === parseInt(parlaySecretCode2)) {
        setTimeout(() => {
          router.push(`${parlaySecretCode}/${parlaySecretCode2}`);
        }, 10);
      }
    }
  };

  const getButtonVariant = (button) => {
    return activeButton === button ? 'filled' : 'outline';
  };

  const getButtonColor = (button) => {
    return activeButton === button ? 'dark' : 'gray';
  };

  return (
    <Container size='sm'>
      <Stack spacing='md'>
        {/* Display */}
        <Center>
          <Text size='xl' weight={500} p='md'>
            {!!guess ? guess : '_'}
          </Text>
        </Center>

        {/* Number Pad */}
        <Paper withBorder radius='md' p='xs' bg={'black'}>
          <Stack spacing={0}>
            {/* Row 1-2-3 */}
            <Grid gutter={0}>
              <Grid.Col span={4}>
                <Button
                  onClick={() => handleGuess('1')}
                  variant={getButtonVariant('1')}
                  color={getButtonColor('1')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  1
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  onClick={() => handleGuess('2')}
                  variant={getButtonVariant('2')}
                  color={getButtonColor('2')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  2
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  onClick={() => handleGuess('3')}
                  variant={getButtonVariant('3')}
                  color={getButtonColor('3')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  3
                </Button>
              </Grid.Col>
            </Grid>

            {/* Row 4-5-6 */}
            <Grid gutter={0}>
              <Grid.Col span={4}>
                <Button
                  onClick={() => handleGuess('4')}
                  variant={getButtonVariant('4')}
                  color={getButtonColor('4')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  4
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  onClick={() => handleGuess('5')}
                  variant={getButtonVariant('5')}
                  color={getButtonColor('5')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  5
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  onClick={() => handleGuess('6')}
                  variant={getButtonVariant('6')}
                  color={getButtonColor('6')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  6
                </Button>
              </Grid.Col>
            </Grid>

            {/* Row 7-8-9 */}
            <Grid gutter={0}>
              <Grid.Col span={4}>
                <Button
                  onClick={() => handleGuess('7')}
                  variant={getButtonVariant('7')}
                  color={getButtonColor('7')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  7
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  onClick={() => handleGuess('8')}
                  variant={getButtonVariant('8')}
                  color={getButtonColor('8')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  8
                </Button>
              </Grid.Col>
              <Grid.Col span={4}>
                <Button
                  onClick={() => handleGuess('9')}
                  variant={getButtonVariant('9')}
                  color={getButtonColor('9')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  9
                </Button>
              </Grid.Col>
            </Grid>

            {/* Row 0 */}
            <Grid gutter={0}>
              <Grid.Col span={12}>
                <Button
                  onClick={() => handleGuess('0')}
                  variant={getButtonVariant('0')}
                  color={getButtonColor('0')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  0
                </Button>
              </Grid.Col>
            </Grid>

            {/* Row BACK */}
            <Grid gutter={0}>
              <Grid.Col span={12}>
                <Button
                  onClick={() => handleGuess('B')}
                  variant={getButtonVariant('B')}
                  color={getButtonColor('B')}
                  size='xl'
                  fullWidth
                  styles={{ root: { height: '60px' } }}
                >
                  BACK
                </Button>
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default NumberPad;
