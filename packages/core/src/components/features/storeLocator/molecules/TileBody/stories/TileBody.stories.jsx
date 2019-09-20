import React from 'react';
import { storiesOf } from '@storybook/react';
import TileBody from '../views/TileBody';
import mockData from '../../../organism/StoreAddressTile/__mocks__/SingleStore.mock';
import labels from '../../../__mocks__/labels.mock';

console.log(mockData);

storiesOf('TileBody', module).add('TileBody', () => (
  <TileBody
    storeIndex={1}
    store={mockData}
    labels={labels.StoreLocator}
    openStoreDetail={() => null}
    showGymboreeStore={true}
    isFavoriteStore={false}
    onSetAsFavorite={() => null}
    className=""
  />
));
