/* istanbul ignore file */
import React from 'react';
import { mount } from 'enzyme';
import Theme from '@tcp/core/styles/themes';
import { ThemeProvider } from 'styled-components';
import StoreAddressTile from '../views/StoreAddressTile';
import labelsMock from '../__mocks__/labels.mock';
import storeMock from '../__mocks__/store.mock';

const labels = labelsMock.StoreLocator;
const storeMockNotGym = { ...storeMock };
storeMockNotGym.isGym = false;

const props = {
  labels,
  store: storeMock,
  showSetFavorite: true,
};

describe('StoreAddressTile component', () => {
  const RealDate = Date;

  function mockDate(isoDate) {
    global.Date = class extends RealDate {
      constructor() {
        return new RealDate(isoDate);
      }
    };
  }

  afterEach(() => {
    global.Date = RealDate;
  });

  beforeEach(() => {
    mockDate('2019-09-18 20:00:00');
  });

  describe('Details', () => {
    it.skip('should render details view', () => {
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...props} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
    it.skip('should render details view - with titleClickCb', () => {
      const titleClickCb = jest.fn();
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...props} titleClickCb={titleClickCb} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
    it.skip('should render details view with clickable title', () => {
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...props} titleClickCb={() => {}} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
    it.skip('should render details view with set fav button', () => {
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...props} showSetFavorite />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
    it.skip('should render details view with fav store', () => {
      const testProps = {
        ...props,
        isFavorite: true,
      };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...testProps} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
  });
  describe('Listing', () => {
    it.skip('should render listing view', () => {
      const testProps = {
        ...props,
        variation: 'listing',
      };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...testProps} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
    it.skip('should render listing view with index', () => {
      const testProps = {
        ...props,
        variation: 'listing',
        storeIndex: 1,
      };
      const storeMockData = { ...props.store, hours: { ...props.store.hours, regularHours: [] } };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...testProps} store={storeMockData} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
    it.skip('should render listing view with fav store', () => {
      const testProps = {
        ...props,
        variation: 'listing',
        storeIndex: 2,
        isFavorite: true,
      };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...testProps} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });

    it.skip('should not render gymboree store', () => {
      const testProps = {
        labels,
        store: storeMockNotGym,
        variation: 'listing',
      };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...testProps} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
  });

  describe('Listing Header', () => {
    it.skip('should render listing-header view', () => {
      const testProps = {
        ...props,
        variation: 'listing-header',
      };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...testProps} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
  });
});
