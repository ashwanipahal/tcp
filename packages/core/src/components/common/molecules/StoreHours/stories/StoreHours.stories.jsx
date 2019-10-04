import React from 'react';
import { storiesOf } from '@storybook/react';
import tcpTheme from '@tcp/core/styles/themes/TCP';
import gmyTheme from '@tcp/core/styles/themes/Gymboree';
import StoreHours from '../views/StoreHours';

const storeTiming = [
  {
    id: 1,
    label: 'Thanksgiving Day (Canada)',
    value: ['Open Previous Day - 11:00 pm'],
  },
  {
    id: 2,
    label: 'Character limit of 16 for day',
    value: ['9:00 am - 9:00 pm'],
  },
  {
    id: 3,
    label: 'Wednesday, December 21',
    value: ['12:00 am - Close Next Day'],
  },
  {
    id: 3,
    label: 'OOOOOOOOOOOOOOOO',
    value: ['10:00 am - Close Next Day'],
  },
  {
    id: 4,
    label: 'Friday, August 23',
    value: ['9:00 am - 9:00 pm'],
  },
  {
    id: 5,
    label: 'Saturday, August 24',
    value: ['10:00 am - 7:00 pm'],
  },
  {
    id: 6,
    label: 'Sunday, August 25',
    value: ['11:00 am - 7:00 pm'],
  },
  {
    id: 7,
    label: 'Monday, August 26',
    value: ['11:00 am - 7:00 pm'],
  },
  {
    id: 8,
    label: 'Tuesday, August 27',
    value: ['10:00 am - 7:00 pm'],
  },
];

const storeMeta = [
  {
    id: 1,
    label: 'Mall Type:',
    value: 'Street Location',
  },
  {
    id: 2,
    label: 'Type of Entrance:',
    value: 'External',
  },
];

storiesOf('StoreHours', module)
  .add('No Data', () => (
    <StoreHours theme={tcpTheme} title="Store Hours" defaultOpen noDataMsg="No Data found!" />
  ))
  .add('With Data', () => (
    <StoreHours
      theme={tcpTheme}
      title="Store Hours"
      defaultOpen
      noDataMsg="No Data found!"
      storeTiming={storeTiming}
    />
  ))
  .add('With Meta - TCP', () => (
    <StoreHours
      theme={tcpTheme}
      title="Store Hours"
      defaultOpen
      noDataMsg="No Data found!"
      storeTiming={storeTiming}
      storeMeta={storeMeta}
    />
  ))
  .add('With Meta - Gymboree', () => (
    <StoreHours
      theme={gmyTheme}
      title="Store Hours"
      defaultOpen
      noDataMsg="No Data found!"
      storeTiming={storeTiming}
      storeMeta={storeMeta}
    />
  ));
