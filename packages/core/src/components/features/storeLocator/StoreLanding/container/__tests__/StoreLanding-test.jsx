import { shallow } from 'enzyme';
import React from 'react';
import { StoreLandingVanilla } from '../views/StoreLanding';

describe('StoreSearch Container', () => {
  const props = {
    fetchStoresByLatLng: jest.fn(),
  };

  let tree = '';
  beforeEach(() => {
    tree = shallow(<StoreLandingVanilla {...props} />);
  });

  test('should render StoreLanding Correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
