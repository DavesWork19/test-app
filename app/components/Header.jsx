'use client';

import { useRouter } from 'next/navigation';
import { Tabs, Grid, Menu, Text } from '@mantine/core';
import {
  IconSettings,
  IconTrash,
  IconArrowsLeftRight,
  IconDog,
  IconCalendarClock,
  IconNotes,
  IconAmbulance,
  IconPencil,
} from '@tabler/icons-react';
import classes from './Header.module.css';
import { Burger } from '@mantine/core';
import { useState } from 'react';

export const Header = () => {
  const [activeTab, setActiveTab] = useState('home');
  const router = useRouter();

  const handleOnClick = (route) => {
    setActiveTab(route);
    router.replace(`/${route}`);
  };

  return (
    <header className='p-8'>
      <Tabs variant='outline' visibleFrom='xs' value={activeTab}>
        <Tabs.List justify='flex-end'>
          <Tabs.Tab
            value='home'
            me='auto'
            leftSection={<IconDog stroke={1} />}
            onClick={() => handleOnClick('home')}
          >
            <Text size={'lg'} fw={500}>
              PetPosts
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value='appointments'
            className={classes.headerTab}
            leftSection={<IconCalendarClock stroke={1} />}
            onClick={() => handleOnClick('appointments')}
          >
            <Text size={'lg'} fw={500}>
              Appointments
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value='docs'
            className={classes.headerTab}
            leftSection={<IconNotes stroke={1} />}
            onClick={() => handleOnClick('docs')}
          >
            <Text size={'lg'} fw={500}>
              Docs
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value='insurance'
            className={classes.headerTab}
            leftSection={<IconAmbulance stroke={1} />}
            onClick={() => handleOnClick('insurance')}
          >
            <Text size={'lg'} fw={500}>
              Insurance
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value='account'
            className={classes.headerTab}
            leftSection={<IconAmbulance stroke={1} />}
            onClick={() => handleOnClick('account')}
          >
            <Text size={'lg'} fw={500}>
              Account
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value='settings'
            className={classes.headerTab}
            leftSection={<IconSettings stroke={1} />}
            onClick={() => handleOnClick('settings')}
          >
            <Text size={'lg'} fw={500}>
              Settings
            </Text>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Grid hiddenFrom={'xs'} className={classes.xsHeader}>
        <Grid.Col span={1} onClick={() => handleOnClick('home')}>
          {<IconDog stroke={2} />}
        </Grid.Col>
        <Grid.Col span={9} onClick={() => handleOnClick('home')}>
          <Text size={'lg'} fw={500}>
            HealthyDawgs
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Menu shadow='md' width={200}>
            <Menu.Target>
              <Burger size='sm' aria-label='Toggle navigation' />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconCalendarClock stroke={2} />}
                onClick={() => handleOnClick('appointments')}
              >
                <Text size={'lg'} fw={500}>
                  Appointments
                </Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<IconNotes stroke={2} />}
                onClick={() => handleOnClick('docs')}
              >
                <Text size={'lg'} fw={500}>
                  Docs
                </Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<IconAmbulance stroke={2} />}
                onClick={() => handleOnClick('insurance')}
              >
                <Text size={'lg'} fw={500}>
                  Insurance
                </Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<IconAmbulance stroke={2} />}
                onClick={() => handleOnClick('account')}
              >
                <Text size={'lg'} fw={500}>
                  Account
                </Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<IconSettings stroke={2} />}
                onClick={() => handleOnClick('settings')}
              >
                <Text size={'lg'} fw={500}>
                  Settings
                </Text>
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>
                <Text size={'lg'} fw={500}>
                  Data
                </Text>
              </Menu.Label>
              <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>
                <Text size={'lg'} fw={500}>
                  Share to Vet
                </Text>
              </Menu.Item>
              <Menu.Item color='red' leftSection={<IconTrash size={14} />}>
                <Text size={'lg'} fw={500}>
                  Delete ?
                </Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
      </Grid>
    </header>
  );
};
