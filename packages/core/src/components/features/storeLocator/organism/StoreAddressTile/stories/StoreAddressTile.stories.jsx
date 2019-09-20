import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreAddressTile from '../views/StoreAddressTile';
import mockData from '../__mocks__/SingleStore.mock';
import labels from '../../../__mocks__/labels.mock';

storiesOf('StoreAddressTile', module).add('Basic', () => (
  <StoreAddressTile
    storeInfo={mockData}
    storeIndex={1}
    labels={labels.StoreLocator}
    className="storeaddress__tile__wrapper"
    onSetAsFavorite={() => null}
  />
));
