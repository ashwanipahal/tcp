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
};

describe('StoreAddressTile component', () => {
  describe('Details', () => {
    it('should render details view', () => {
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...props} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
    it('should render details view with clickable title', () => {
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...props} titleClickCb={() => {}} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
    it('should render details view with fav store', () => {
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
    it('should render listing view', () => {
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
    it('should render listing view with index', () => {
      const testProps = {
        ...props,
        variation: 'listing',
        storeIndex: 1,
      };
      const component = mount(
        <ThemeProvider theme={Theme()}>
          <StoreAddressTile {...testProps} />
        </ThemeProvider>
      );
      expect(component.html()).toMatchSnapshot();
    });
    it('should render listing view with fav store', () => {
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

    it('should not render gymboree store', () => {
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
    it('should render listing-header view', () => {
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
