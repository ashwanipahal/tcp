import React from 'react';
import { mount } from 'enzyme';
import theme from '@tcp/core/styles/themes/TCP';
import StoreAddressTile from '../views/StoreAddressTile';
import labelsMock from '../__mocks__/labels.mock';
import storeMock from '../__mocks__/store.mock';

const labels = labelsMock.StoreLocator;
const storeMockNotGym = { ...storeMock };
storeMockNotGym.isGym = false;

describe('StoreAddressTile component', () => {
  it('should render details view', () => {
    const props = {
      labels,
      store: storeMock,
      theme,
    };
    const component = mount(<StoreAddressTile {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render details view with fav store', () => {
    const props = {
      labels,
      store: storeMock,
      theme,
      variation: 'detail',
      isFavorite: true,
    };
    const component = mount(<StoreAddressTile {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render listing view', () => {
    const props = {
      labels,
      store: storeMock,
      theme,
      variation: 'listing',
    };
    const component = mount(<StoreAddressTile {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render listing view with index', () => {
    const props = {
      labels,
      store: storeMock,
      theme,
      variation: 'listing',
      storeIndex: 1,
    };
    const component = mount(<StoreAddressTile {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render listing view with fav store', () => {
    const props = {
      labels,
      store: storeMock,
      theme,
      variation: 'listing',
      storeIndex: 2,
      isFavorite: true,
    };
    const component = mount(<StoreAddressTile {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render listing header view', () => {
    const props = {
      labels,
      store: storeMock,
      theme,
      variation: 'listing-header',
    };
    const component = mount(<StoreAddressTile {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should not render gymboree store', () => {
    const props = {
      labels,
      store: storeMockNotGym,
      theme,
      variation: 'listing',
    };
    const component = mount(<StoreAddressTile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
