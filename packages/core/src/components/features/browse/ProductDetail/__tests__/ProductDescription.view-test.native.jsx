import React from 'react';
import { shallow } from 'enzyme';
import { ProductDetailDescriptionVanilla } from '../molecules/ProductDescription/views/ProductDescription.view.native';

describe('ProductDetailDescriptionView native should render correctly', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ProductDetailDescriptionVanilla />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('ProductDetailDescriptionView component', () => {
  let wrapper;

  beforeEach(() => {
    const props = {
      longDescription: '',
      shortDescription: '',
      pdpLabels: {},
      itemPartNumber: '',
      margins: null,
      isShowMore: false,
    };
    wrapper = shallow(<ProductDetailDescriptionVanilla {...props} />);
  });

  it('should renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
