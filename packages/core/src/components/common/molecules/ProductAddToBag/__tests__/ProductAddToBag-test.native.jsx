import React from 'react';
import { shallow } from 'enzyme';

import { ProductAddToBagVanilla } from '../views/ProductAddToBag.view.native';

describe('ProductAddToBagVanilla native should render correctly', () => {
  let wrapper;
  const props = {
    currentProduct: {
      generalProductId: '',
    },
    selectedColorProductId: 123,
    fromBagPage: true,
    quickViewPickup: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<ProductAddToBagVanilla {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render expected number of components', () => {
    expect(wrapper.find('View').length).toBe(1);
    expect(wrapper.find('Field').length).toBe(3);
  });
});
