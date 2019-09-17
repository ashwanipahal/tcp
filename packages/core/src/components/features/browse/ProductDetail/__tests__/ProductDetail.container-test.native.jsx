import React from 'react';
import { shallow } from 'enzyme';
import { ProductDetailContainerVanilla } from '../container/ProductDetail.container.native';

describe('ProductDetailContainerVanilla component', () => {
  it('should renders correctly', () => {
    const props = {
      currentProduct: {},
      breadCrumbs: {},
      navTree: {},
      getDetails: jest.fn(),
    };
    const component = shallow(<ProductDetailContainerVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
