import React from 'react';
import { storiesOf } from '@storybook/react';
import StoreAddressIntl from '../views/StoreAddressIntl';
import labels from '../__mocks__/labels.mock';

storiesOf('StoreAddressIntl', module)
  .add('Basic', () => (
    <StoreAddressIntl
      storeName="Shoppers Stop Inorbit Cyberabad"
      storeLocation="Hyderabad"
      labels={labels.StoreLocator}
    />
  ))
  .add('With Shop In Shop', () => (
    <StoreAddressIntl
      storeName="Shoppers Stop Inorbit Cyberabad"
      isShopInShop
      storeLocation="Hyderabad"
      labels={labels.StoreLocator}
    />
  ));
