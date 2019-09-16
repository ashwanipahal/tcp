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
    const loadStoresByLatLngFn = tree.instance().loadStoresByLatLng(latLngPromise, 10, 5);
    expect(loadStoresByLatLngFn).toBeFalsy();
  });

  test('should return an action fetchStoresByLatLng which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchStoresByLatLng();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
