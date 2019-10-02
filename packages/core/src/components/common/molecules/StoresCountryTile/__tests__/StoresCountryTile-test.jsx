import React from 'react';
import { mount } from 'enzyme';
import Theme from '@tcp/core/styles/themes';
import { ThemeProvider } from 'styled-components';
import { getViewportInfo } from '@tcp/core/src/utils';
import labelsMock from '@tcp/core/src/components/common/molecules/StoreLocations/__mocks__/labels.mock';
import storesMock from '@tcp/core/src/components/common/molecules/StoreLocations/__mocks__/stores.mock';
import StoresCountryTile from '../views/StoresCountryTile';

jest.mock('@tcp/core/src/utils', () => ({
  getViewportInfo: jest.fn(),
  getAPIConfig: () => ({
    brandId: 'tcp',
  }),
  isCanada: jest.fn(),
  isClient: jest.fn(),
  getIconPath: jest.fn(),
}));

const labels = labelsMock.StoreLocator;

const props = {
  labels,
  stores: storesMock,
  title: 'Test',
};

describe('StoresCountryTile component', () => {
  it('StoresCountryTile component renders correctly for mobile/tablet', () => {
    getViewportInfo.mockImplementation(() => ({ isMobile: true, isTablet: true }));
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoresCountryTile {...props} />
      </ThemeProvider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('StoresCountryTile component renders correctly for desktop screens', () => {
    getViewportInfo.mockImplementation(() => ({ isMobile: false, isTablet: false }));
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoresCountryTile {...props} />
      </ThemeProvider>
    );
    expect(component.html()).toMatchSnapshot();
  });
});
