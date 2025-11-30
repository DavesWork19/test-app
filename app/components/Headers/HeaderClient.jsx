'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Tabs, Grid, Menu, Text } from '@mantine/core';
import {
  IconUserCircle,
  IconLogout2,
  IconArrowsLeftRight,
  IconDog,
  IconCalendarClock,
  IconNotes,
  IconAmbulance,
  IconPaw,
  IconMenu2,
} from '@tabler/icons-react';
import classes from './Header.module.css';
import { useState } from 'react';
import { createClient } from '../../utils/supabase/client';

export const HeaderClient = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname.split('/')[1]);
  const supabase = createClient();

  const handleOnClick = (route) => {
    setActiveTab(route);
    router.replace(`/${route}`);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace('/login');
      router.refresh();
    }
  };

  const handleShareData = () => {
    router.replace('/home?ShareData');
  };

  return (
    <>
      <Tabs variant='outline' visibleFrom='sm' value={activeTab}>
        <Tabs.List justify='flex-end'>
          <Tabs.Tab
            value='home'
            me='auto'
            leftSection={<IconDog stroke={1} />}
            onClick={() => handleOnClick('home')}
          >
            <Text size={'lg'} fw={500}>
              HealthyDawgs
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            value='pets'
            className={classes.headerTab}
            leftSection={<IconPaw stroke={1} />}
            onClick={() => handleOnClick('pets')}
          >
            <Text size={'lg'} fw={500}>
              Pets
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
            value='vetsandinsurance'
            className={classes.headerTab}
            leftSection={<IconAmbulance stroke={1} />}
            onClick={() => handleOnClick('vetsandinsurance')}
          >
            <Text size={'lg'} fw={500}>
              Vets & Insurances
            </Text>
          </Tabs.Tab>

          <Tabs.Tab
            value='account'
            className={classes.headerTab}
            leftSection={<IconUserCircle stroke={1} />}
            onClick={() => handleOnClick('account')}
          >
            <Text size={'lg'} fw={500}>
              Account
            </Text>
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Grid hiddenFrom={'sm'} className={classes.xsHeader}>
        <Grid.Col span={1} onClick={() => handleOnClick('home')}>
          {<IconDog />}
        </Grid.Col>
        <Grid.Col span={9} onClick={() => handleOnClick('home')}>
          <Text size={'lg'} fw={500}>
            HealthyDawgs
          </Text>
        </Grid.Col>
        <Grid.Col span={2}>
          <Menu shadow='md' width={225}>
            <Menu.Target>
              <IconMenu2 stroke={1} />
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconPaw />}
                onClick={() => handleOnClick('pets')}
              >
                <Text size={'lg'} fw={500}>
                  Pets
                </Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<IconCalendarClock />}
                onClick={() => handleOnClick('appointments')}
              >
                <Text size={'lg'} fw={500}>
                  Appointments
                </Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<IconNotes />}
                onClick={() => handleOnClick('docs')}
              >
                <Text size={'lg'} fw={500}>
                  Docs
                </Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<IconAmbulance />}
                onClick={() => handleOnClick('vetsandinsurance')}
              >
                <Text size={'lg'} fw={500}>
                  Vets & Insurances
                </Text>
              </Menu.Item>
              <Menu.Item
                leftSection={<IconUserCircle />}
                onClick={() => handleOnClick('account')}
              >
                <Text size={'lg'} fw={500}>
                  Account
                </Text>
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>
                <Text size={'lg'} fw={500}>
                  Data
                </Text>
              </Menu.Label>
              <Menu.Item
                leftSection={<IconArrowsLeftRight />}
                onClick={handleShareData}
              >
                <Text size={'lg'} fw={500}>
                  Share Data
                </Text>
              </Menu.Item>
              <Menu.Item
                color='red'
                leftSection={<IconLogout2 />}
                onClick={handleSignOut}
              >
                <Text size={'lg'} fw={500}>
                  Sign Out
                </Text>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Grid.Col>
      </Grid>
    </>
  );
};
