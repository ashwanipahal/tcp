import { shallow } from 'enzyme';
import React from 'react';
import { StoreSearch } from '../StoreLanding.container';

describe('StoreSearch Container', () => {
  const props = {
    fetchStoresByLatLng: jest.fn(),
  };

  let tree = '';
  beforeEach(() => {
    tree = shallow(<StoreSearch {...props} />);
  });

  test('should render StoreSearch Correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  test('fetchStoresByLatLng should be called', () => {
    const latLngPromise = new Promise(resolve => resolve({ lat: 77, lng: 20 }));
    const loadStoresByCoordinatesFn = tree.instance().loadStoresByCoordinates(latLngPromise, 10, 5);
    expect(loadStoresByCoordinatesFn).toBeFalsy();
  });
});
