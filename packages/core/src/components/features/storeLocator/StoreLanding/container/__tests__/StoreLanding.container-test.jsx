import { shallow } from 'enzyme';
import React from 'react';
import { StoreLanding } from '../StoreLanding.container';

describe('StoreSearch Container', () => {
  const props = {
    fetchStoresByLatLng: jest.fn(),
    getFavoriteStore: jest.fn(),
    favoriteStore: {
      name: 'saint andreas',
      basicInfo: {
        id: 1211,
      },
    },
  };

  let tree = '';
  beforeEach(() => {
    tree = shallow(<StoreLanding {...props} />);
  });

  test('should render StoreLanding Correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  test('should render StoreLanding Correctly - without fav store', () => {
    const modifiedProps = {
      ...props,
      favoriteStore: null,
    };
    const wrapper = shallow(<StoreLanding {...modifiedProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('fetchStoresByLatLng should be called', () => {
    const latLngPromise = new Promise(resolve => resolve({ lat: 77, lng: 20 }));
    const loadStoresByCoordinatesFn = tree.instance().loadStoresByCoordinates(latLngPromise, 10, 5);
    expect(loadStoresByCoordinatesFn).toBeFalsy();
  });

  test('getFavoriteStoreInititator should be called', () => {
    const mockGeolocation = {
      getCurrentPosition: cb => cb({ coords: {} }),
    };
    global.navigator.geolocation = mockGeolocation;
    const wrapper = shallow(<StoreLanding {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('getFavoriteStoreInititator should be called - no position', () => {
    const mockGeolocation = {
      getCurrentPosition: (cb, error) => error({ coords: {} }),
    };
    global.navigator.geolocation = mockGeolocation;
    const wrapper = shallow(<StoreLanding {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('getFavoriteStoreInititator should be called - no position', () => {
    const mockGeolocation = {
      getCurrentPosition: cb => cb({ coords: {} }),
    };
    global.navigator.geolocation = mockGeolocation;
    const wrapper = shallow(<StoreLanding {...props} />);
    wrapper.instance().getLocationStores();
    expect(wrapper).toMatchSnapshot();
  });
});
