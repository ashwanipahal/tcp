import React from 'react';
import { shallow, mount } from 'enzyme';
import Theme from '@tcp/core/styles/themes';
import { ThemeProvider } from 'styled-components';
import { isMobileApp } from '@tcp/core/src/utils';
import StoreStaticMap from '../views/StoreStaticMap';
import list from '../__mocks__/storesList.mock';

jest.mock('@tcp/core/src/utils', () => ({
  getViewportInfo: jest.fn(),
  getAPIConfig: () => ({
    brandId: 'tcp',
  }),
  isCanada: jest.fn(),
  isClient: jest.fn(),
  getIconPath: jest.fn(),
  isMobileApp: jest.fn(),
}));

describe('StoreStaticMap component', () => {
  const apiKey = 'AIzaSyCzOG6DZLR-haS8xvPOr73KkIWPMBbTVI8';
  it('StoreStaticMap component renders correctly without props', () => {
    const component = shallow(<StoreStaticMap />);
    expect(component).toMatchSnapshot();
  });

  it('StoreStaticMap component renders correctly with props', () => {
    const props = {
      storesList: list,
      apiKey,
    };
    const component = shallow(<StoreStaticMap {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('StoreStaticMap component renders correctly with map', () => {
    const props = {
      storesList: list,
      apiKey,
    };
    const component = shallow(<StoreStaticMap {...props} />);
    expect(component).toHaveLength(1);
  });
  it('StoreStaticMap component renders correctly with particular store mark in map', () => {
    const props = {
      storesList: list,
      centeredStoreId: '110850',
      apiKey,
    };
    const component = shallow(<StoreStaticMap {...props} />);
    expect(component).toHaveLength(1);
  });

  it('should mount with default props', () => {
    const component = mount(
      <ThemeProvider theme={Theme()}>
        <StoreStaticMap />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  describe('canada specific', () => {
    it('should mount for canada region', () => {
      const props = {
        storesList: list,
        centeredStoreId: '110850',
        apiKey,
        isCanada: true,
      };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreStaticMap {...props} />
        </ThemeProvider>
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('resize window', () => {
    const map = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });
    it('should update component on window resize', () => {
      map.resize();
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreStaticMap />
        </ThemeProvider>
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('mobile viewport and app', () => {
    it('should mount for mobile viewport', () => {
      const props = {
        storesList: list,
        centeredStoreId: '110850',
        apiKey,
        isMobile: true,
      };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreStaticMap {...props} />
        </ThemeProvider>
      );
      expect(component).toMatchSnapshot();
    });
    it('should mount for mobile app', () => {
      isMobileApp.mockImplementation(() => true);
      const props = {
        storesList: list,
        centeredStoreId: '110850',
        apiKey,
        isMobile: false,
      };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreStaticMap {...props} />
        </ThemeProvider>
      );
      expect(component).toMatchSnapshot();
    });
  });
});
