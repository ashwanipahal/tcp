import React from 'react';
import { mount } from 'enzyme';
import Theme from '@tcp/core/styles/themes';
import { ThemeProvider } from 'styled-components';
import StoresIntlTile from '../views/StoresIntlTile';
import stores from '../__mocks__/stores.mock';
import labels from '../../../atoms/StoreAddressIntl/__mocks__/labels.mock';

describe('StoresIntlTile component', () => {
  it('StoresIntlTile component renders correctly without stores', () => {
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoresIntlTile title="Test" labels={labels.StoreLocator} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('should render correctly with stores data', () => {
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoresIntlTile title="Test" stores={stores} labels={labels.StoreLocator} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
