import { shallow } from 'enzyme';
import React from 'react';
import { StoreLocator, mapDispatchToProps } from '../StoreLocator.container';

describe('StoreLocator Container', () => {
  const props = {
    fetchStoresByLatLng: jest.fn(),
  };

  let tree = '';
  beforeEach(() => {
    tree = shallow(<StoreLocator {...props} />);
  });

  test('should render StoreLocator Correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  test('fetchStoresByLatLng should be called', () => {
    const latLngPromise = new Promise(resolve => resolve({ lat: 77, lng: 20 }));
    const loadStoresByCoordinatesFn = tree.instance().loadStoresByCoordinates(latLngPromise, 10, 5);
    expect(loadStoresByCoordinatesFn).toBeFalsy();
  });

  test('should return an action fetchStoresByLatLng which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchStoresByCoordinates();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
