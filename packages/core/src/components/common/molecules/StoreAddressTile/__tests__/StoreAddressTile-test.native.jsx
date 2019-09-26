import React from 'react';
import { shallow } from 'enzyme';
import StoreAddressTile from '../views/StoreAddressTile.native';
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
    it('StoreAddressTile component renders correctly', () => {
      const component = shallow(<StoreAddressTile {...props} />);
      expect(component).toMatchSnapshot();
    });
    it('should render details view with fav store', () => {
      const testProps = {
        ...props,
        isFavorite: true,
      };
      const component = shallow(<StoreAddressTile {...testProps} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('Listing', () => {
    it('should render listing view', () => {
      const testProps = {
        ...props,
        variation: 'listing',
      };
      const component = shallow(<StoreAddressTile {...testProps} />);
      expect(component).toMatchSnapshot();
    });
    it('should render listing view with index', () => {
      const testProps = {
        ...props,
        variation: 'listing',
        storeIndex: 1,
      };
      const component = shallow(<StoreAddressTile {...testProps} />);
      expect(component).toMatchSnapshot();
    });
    it('should render listing view with fav store', () => {
      const testProps = {
        ...props,
        variation: 'listing',
        storeIndex: 2,
        isFavorite: true,
      };
      const component = shallow(<StoreAddressTile {...testProps} />);
      expect(component).toMatchSnapshot();
    });

    it('should not render gymboree store', () => {
      const testProps = {
        labels,
        store: storeMockNotGym,
        variation: 'listing',
      };
      const component = shallow(<StoreAddressTile {...testProps} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('Listing Header', () => {
    it('should render listing-header view', () => {
      const testProps = {
        ...props,
        variation: 'listing-header',
      };
      const component = shallow(<StoreAddressTile {...testProps} />);
      expect(component).toMatchSnapshot();
    });
  });
});
