import React from 'react';
import { mount } from 'enzyme';
import Theme from '@tcp/core/styles/themes';
import { ThemeProvider } from 'styled-components';
import StoreAddressIntl from '../views/StoreAddressIntl';
import labels from '../__mocks__/labels.mock';

describe('StoreAddressIntl component', () => {
  it('StoreAddressIntl component renders correctly', () => {
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoreAddressIntl
          storeName="Test"
          storeLocation="Test"
          isShopInShop
          labels={labels.StoreLocator}
        />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
