import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreLocations from '../views/StoreLocations';
import labelsMock from '../__mocks__/labels.mock';
import storeMock from '../__mocks__/stores.mock';

storiesOf('StoreLocations', module).add('Basic', () => (
  <StoreLocations labels={labelsMock.StoreLocator} stores={storeMock} />
));
