'use client';

import { Input, Textarea, Grid } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useState } from 'react';

export const SingleNote = (props) => {
  const userID = props.userID;
  const [noteData, setNoteData] = useState({
    title: '',
    date: '',
    description: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`/api/${userID}/notes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 mb-2'>
      <div>
        <Grid>
          <Grid.Col span={6}>
            <Input variant={'filled'} placeholder='Title' />
          </Grid.Col>
          <Grid.Col span={6}>
            <DateInput clearable variant={'filled'} placeholder='Date' />
          </Grid.Col>

          <Grid.Col span={12}>
            <Textarea
              variant={'filled'}
              placeholder={'What Happened???'}
              autosize
              minRows={2}
              cols={24}
            />
          </Grid.Col>

          <Grid.Col span={2}>
            <button type='submit'>Save Note</button>
          </Grid.Col>
        </Grid>
      </div>
    </form>
  );
};
