import React from 'react';
import { mount } from 'enzyme';
import Theme from '@tcp/core/styles/themes';
import { ThemeProvider } from 'styled-components';
import { getViewportInfo } from '@tcp/core/src/utils';
import StoreLocations from '../views/StoreLocations';
import labelsMock from '../__mocks__/labels.mock';
import storesMock from '../__mocks__/stores.mock';

jest.mock('@tcp/core/src/utils', () => ({
  getViewportInfo: jest.fn(),
  getAPIConfig: () => ({
    brandId: 'tcp',
  }),
  isCanada: jest.fn(),
  isClient: jest.fn().mockImplementation(() => true),
  getIconPath: jest.fn(),
}));

const labels = labelsMock.StoreLocator;

const props = {
  labels,
  stores: storesMock,
};

describe('StoreLocations component', () => {
  it.skip('StoreLocations component renders correctly for mobile', () => {
    getViewportInfo.mockImplementation(() => ({ isMobile: true }));
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoreLocations {...props} />
      </ThemeProvider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it.skip('StoreLocations component renders correctly for tablet/desktop screens', () => {
    getViewportInfo.mockImplementation(() => ({ isMobile: false }));
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoreLocations {...props} />
      </ThemeProvider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it.skip('should trigger openStoreDetails callback on click of details link', () => {
    getViewportInfo.mockImplementation(() => ({ isMobile: false }));
    const mockFn = jest.fn();
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoreLocations {...props} openStoreDetails={mockFn} />
      </ThemeProvider>
    );
    component
      .find('[data-locator="open-store-details"]')
      .last()
      .simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
