import React from 'react';
import { storiesOf } from '@storybook/react';
import labelsMock from '@tcp/core/src/components/common/molecules/StoreLocations/__mocks__/labels.mock';
import storeMock from '@tcp/core/src/components/common/molecules/StoreLocations/__mocks__/stores.mock';
import StoresCountryTile from '../views/StoresCountryTile';

const stores = [...storeMock, ...storeMock];

storiesOf('StoresCountryTile', module).add('Basic', () => (
  <StoresCountryTile
    title="India"
    labels={labelsMock.StoreLocator}
    stores={stores}
    titleClickCb={item => {
      console.log(item);
    }}
  />
));
