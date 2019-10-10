import { shallow } from 'enzyme';
import React from 'react';
import { StoreLandingVanilla } from '../views/StoreLanding';
import suggestedStore from '../__mocks__/suggestedStore';

jest.mock('next/router', () => ({
  push: jest.fn().mockReturnValue(new Promise(() => {})),
}));

describe('StoreSearch Container', () => {
  const props = {
    fetchStoresByLatLng: jest.fn(),
    fetchCurrentStore: jest.fn(),
    suggestedStoreList: [suggestedStore],
    favoriteStore: suggestedStore,
    labels: {},
  };

  let tree = '';
  beforeEach(() => {
    tree = shallow(<StoreLandingVanilla {...props} />);
  });

  test('should render StoreLanding Correctly', () => {
    tree.setState({
      isGym: true,
    });
    expect(tree).toMatchSnapshot();
  });

  test('should render StoreLanding Correctly with map', () => {
    tree.setState({
      isOutlet: true,
      mapView: true,
    });
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

  test('should call openStoreDetails', () => {
    const wrapper = shallow(<StoreLandingVanilla {...props} />);
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.instance().openStoreDetails(event, suggestedStore);
    expect(wrapper).toMatchSnapshot();
  });
});
