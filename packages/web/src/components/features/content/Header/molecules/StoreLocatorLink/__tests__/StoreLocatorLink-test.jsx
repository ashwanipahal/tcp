import React from 'react';
import { shallow } from 'enzyme';
import { StoreLocatorLinkVanilla } from '../views/StoreLocatorLink';
import mockData from '../mock';

describe('StoreLocatorLink component', () => {
  it('renders correctly when a fav store is passed', () => {
    const props = {
      className: 'test',
      store: mockData.currentStore,
      labels: {
        store: {},
      },
    };
    const component = shallow(<StoreLocatorLinkVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.storelocatorlink__detail__storename')).toHaveLength(1);
    expect(component.find('.storelocatorlink__detail__storetime')).toHaveLength(1);
  });

  it('renders correctly with no store is passed', () => {
    const props = {
      className: 'test',
      store: {},
      labels: {
        store: {},
      },
    };
    const component = shallow(<StoreLocatorLinkVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.storelocatorlink__detail__storename')).toHaveLength(0);
    expect(component.find('.storelocatorlink__detail__storetime')).toHaveLength(0);
    expect(component.find('.storelocatorlink__detail')).toHaveLength(1);
  });
});
