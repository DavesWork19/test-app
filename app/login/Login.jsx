'use client';

import {
  Anchor,
  Button,
  Checkbox,
  Center,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '../utils/supabase/client';

export function Login() {
  const [status, setStatus] = useState('Login');
  const router = useRouter();
  const registerSize = status === 'loginError' ? 'sm' : 'xs';

  const form = useForm({
    initialValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
      terms: (val) => (val !== true ? 'Required!' : null),
    },
  });

  const handleOnClick = () => {
    if (status === 'Login') {
      setStatus('Register');
    } else if (status === 'loginError') {
      setStatus('Register');
    } else if (status === 'Register') {
      setStatus('Login');
    } else if (status === 'return') {
      setStatus('Login');
    }
  };

  const handleSubmit = async (values) => {
    if (status === 'Register') {
      const supabase = createClient();

      const formData = {
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstname,
            last_name: values.lastname,
          },
        },
      };

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        const { error } = await supabase.auth.signUp(formData);

        if (error) {
          setStatus('registerError');
        }
        setStatus('submitted');
      } else {
        setStatus('return');
      }
    } else {
      const supabase = createClient();

      const datas = {
        email: values.email,
        password: values.password,
      };

      const { error } = await supabase.auth.signInWithPassword(datas);
      console.log(error, 'tes');
      if (error) {
        setStatus('loginError');
      }
      router.push('/home');
    }
  };

  return (
    <Paper radius='md' p='xl' withBorder>
      <Center>
        {status !== 'submitted' && status !== 'return' && (
          <Text size='lg' fw={500} pb={12}>
            Welcome to PetPosts!
          </Text>
        )}
        {status === 'submitted' && (
          <Text size='lg' fw={500} pb={12}>
            Head over to your email and verify you're a human!
          </Text>
        )}
        {status === 'return' && (
          <Text size='lg' fw={500} pb={12}>
            You already have an account! Head back to the login page!
          </Text>
        )}
      </Center>

      {status === 'loginError' && (
        <>
          <Text size='xs' fw={500} c={'red'} ta='center'>
            Error!
          </Text>
          <Text size='xs' fw={500} c={'red'} ta='center'>
            Email or password is incorrect - please try again.
          </Text>
          <Text size='xs' fw={500} pb={24} c={'red'} ta='center'>
            If you don't have an account register below!
          </Text>
        </>
      )}
      {status === 'registerError' && (
        <>
          <Text size='xs' fw={500} c={'red'} ta='center'>
            Error!
          </Text>
          <Text size='xs' fw={500} c={'red'} ta='center'>
            Something went wrong - please try again.
          </Text>
        </>
      )}

      {status !== 'submitted' && status !== 'return' && (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            {status === 'Register' && (
              <TextInput
                label='First Name'
                placeholder='First Name'
                value={form.getValues().name}
                onChange={(event) =>
                  form.setFieldValue('firstname', event.currentTarget.value)
                }
                radius='md'
              />
            )}
            {status === 'Register' && (
              <TextInput
                label='Last Name'
                placeholder='Last Name'
                value={form.getValues().name}
                onChange={(event) =>
                  form.setFieldValue('lastname', event.currentTarget.value)
                }
                radius='md'
              />
            )}

            <TextInput
              required
              label='Email'
              placeholder='Your Email'
              value={form.getValues().email}
              onChange={(event) =>
                form.setFieldValue('email', event.currentTarget.value)
              }
              error={form.errors.email && 'Invalid email'}
              radius='md'
            />

            <PasswordInput
              required
              label='Password'
              placeholder='Your password'
              value={form.getValues().password}
              onChange={(event) =>
                form.setFieldValue('password', event.currentTarget.value)
              }
              error={
                form.errors.password &&
                'Password should include at least 6 characters'
              }
              radius='md'
            />

            {status === 'Register' && (
              <Checkbox
                required
                label='I accept terms and conditions'
                checked={form.getValues().terms}
                onChange={(event) =>
                  form.setFieldValue('terms', event.currentTarget.checked)
                }
                error={form.errors.terms && 'Required!'}
              />
            )}
          </Stack>

          <Group justify='space-between' mt='xl'>
            <Anchor
              component='button'
              type='button'
              c='dimmed'
              onClick={handleOnClick}
              size={registerSize}
            >
              {status === 'Register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type='submit' radius='xl'>
              {status}
            </Button>
          </Group>
        </form>
      )}
      {status === 'return' && (
        <Center>
          <Button type='submit' radius='xl' onClick={handleOnClick}>
            {'Login'}
          </Button>
        </Center>
      )}
    </Paper>
  );
}
