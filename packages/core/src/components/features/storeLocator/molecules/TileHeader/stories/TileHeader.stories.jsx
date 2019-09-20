import React from 'react';
import { storiesOf } from '@storybook/react';
import TileHeader from '../views/TileHeader';
import mockData from '../../../organism/StoreAddressTile/__mocks__/SingleStore.mock';
import labels from '../../../__mocks__/labels.mock';

console.log(mockData);

storiesOf('TileHeader', module).add('TileHeader', () => (
  <TileHeader storeIndex={1} store={mockData} labels={labels.StoreLocator} />
));
