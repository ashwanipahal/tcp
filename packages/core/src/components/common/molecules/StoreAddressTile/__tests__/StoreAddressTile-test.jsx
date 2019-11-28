/* istanbul ignore file */
import React from 'react';
import { shallow } from 'enzyme';
import labelsMock from '../__mocks__/labels.mock';
import storeMock from '../__mocks__/store.mock';
import { StoreAddressTileVanilla } from '../views/StoreAddressTile';

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
    it('should render details view', () => {
      const component = shallow(<StoreAddressTileVanilla {...props} />);
      expect(component).toMatchSnapshot();
    });
    it('should render details view - with titleClickCb', () => {
      const titleClickCb = jest.fn();
      const component = shallow(<StoreAddressTileVanilla {...props} titleClickCb={titleClickCb} />);
      expect(component).toMatchSnapshot();
    });
    it('should render details view with clickable title', () => {
      const component = shallow(<StoreAddressTileVanilla {...props} titleClickCb={() => {}} />);
      expect(component).toMatchSnapshot();
    });
    it('should render details view with set fav button', () => {
      const component = shallow(<StoreAddressTileVanilla {...props} showSetFavorite />);
      expect(component).toMatchSnapshot();
    });
    it('should render details view with fav store', () => {
      const testProps = {
        ...props,
        isFavorite: true,
      };
      const component = shallow(<StoreAddressTileVanilla {...testProps} />);
      expect(component).toMatchSnapshot();
    });
  });
  describe('Listing', () => {
    it('should render listing view', () => {
      const testProps = {
        ...props,
        variation: 'listing',
      };
      const component = shallow(<StoreAddressTileVanilla {...testProps} />);
      expect(component).toMatchSnapshot();
    });
    it('should render listing view with index', () => {
      const testProps = {
        ...props,
        variation: 'listing',
        storeIndex: 1,
      };
      const storeMockData = { ...props.store, hours: { ...props.store.hours, regularHours: [] } };
      const component = shallow(<StoreAddressTileVanilla {...testProps} store={storeMockData} />);
      expect(component).toMatchSnapshot();
    });
    it('should render listing view with fav store', () => {
      const testProps = {
        ...props,
        variation: 'listing',
        storeIndex: 2,
        isFavorite: true,
      };
      const component = shallow(<StoreAddressTileVanilla {...testProps} />);
      expect(component).toMatchSnapshot();
    });

    it('should not render gymboree store', () => {
      const testProps = {
        labels,
        store: storeMockNotGym,
        variation: 'listing',
      };
      const component = shallow(<StoreAddressTileVanilla {...testProps} />);
      expect(component).toMatchSnapshot();
    });
  });

  describe('Listing Header', () => {
    it('should render listing-header view', () => {
      const testProps = {
        ...props,
        variation: 'listing-header',
      };
      const component = shallow(<StoreAddressTileVanilla {...testProps} />);
      expect(component).toMatchSnapshot();
    });
  });
});
