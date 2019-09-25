import { shallow } from 'enzyme';
import React from 'react';
import { StoreLandingVanilla } from '../views/StoreLanding';
import suggestedStore from '../__mocks__/suggestedStore';

describe('StoreSearch Container', () => {
  const props = {
    fetchStoresByLatLng: jest.fn(),
    suggestedStoreList: [suggestedStore],
    favoriteStore: suggestedStore,
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
});
