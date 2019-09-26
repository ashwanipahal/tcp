import { shallow } from 'enzyme';
import React from 'react';
import { StoreLandingVanilla } from '../views/StoreLanding.native';
import suggestedStore from '../__mocks__/suggestedStore';

describe('StoreSearch Container', () => {
  const props = {
    fetchStoresByLatLng: jest.fn(),
    suggestedStoreList: [suggestedStore],
    favoriteStore: suggestedStore,
    labels: {},
    theme: {
      colors: {
        TEXT: {},
      },
    },
  };

  let tree = '';
  beforeEach(() => {
    tree = shallow(<StoreLandingVanilla {...props} />);
  });

  test('should render StoreLanding Correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  test('should call toggleMap', () => {
    const event = {
      target: {
        name: 'test',
      },
      preventDefault: jest.fn(),
    };
    const wrapper = shallow(<StoreLandingVanilla {...props} />);
    wrapper.instance().toggleMap(event);
    expect(wrapper.instance().state.mapView).toBeTruthy();
  });

  test('should call selectStoreType', () => {
    const wrapper = shallow(<StoreLandingVanilla {...props} />);
    wrapper.instance().selectStoreType({ gymSelected: true, outletSelected: true });
    expect(wrapper.instance().state.isGym).toBeTruthy();
  });
});
