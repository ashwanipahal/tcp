import React from 'react';
import { storiesOf } from '@storybook/react';
import StoresIntlTile from '../views/StoresIntlTile';
import stores from '../__mocks__/stores.mock';
import labels from '../../../atoms/StoreAddressIntl/__mocks__/labels.mock';

storiesOf('StoresIntlTile', module)
  .add('No Stores', () => (
    <div className="content-wrapper">
      <StoresIntlTile title="India" labels={labels.StoreLocator} />
    </div>
  ))
  .add('With Stores', () => (
    <div className="content-wrapper">
      <StoresIntlTile title="India" stores={stores} labels={labels.StoreLocator} />
    </div>
  ));
