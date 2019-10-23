import { shallow } from 'enzyme';
import React from 'react';
import { CategoryListingVanilla } from '../views/CategoryListing';

describe('StoreSearch Container', () => {
  const props = {
    getLayout: jest.fn(),
    className: '',
  };

  let tree = '';
  beforeEach(() => {
    tree = shallow(<CategoryListingVanilla {...props} />);
  });

  test('should render CLP Correctly', () => {
    expect(tree).toMatchSnapshot();
  });
});
