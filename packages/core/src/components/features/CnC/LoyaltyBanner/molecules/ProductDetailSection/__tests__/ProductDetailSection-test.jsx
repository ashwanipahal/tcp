import React from 'react';
import { shallow } from 'enzyme';
import { ProductDetailSectionVanilla } from '../views/ProductDetailSection';

describe('ProductDetailSection View Component', () => {
  let component;
  const Props = {
    className: '',
    isProductDetailView: false,
    isGuest: true,
    isPlcc: true,
    labels: {},
  };

  it('ProductDetailSection should render correctly', () => {
    component = shallow(<ProductDetailSectionVanilla {...Props} />);
    expect(component).toMatchSnapshot();
  });

  const Props2 = {
    className: '',
    isProductDetailView: true,
    isGuest: true,
    isPlcc: true,
    labels: {},
  };

  it('ProductDetailSection & guest & plcc true should render correctly', () => {
    component = shallow(<ProductDetailSectionVanilla {...Props2} />);
    expect(component).toMatchSnapshot();
  });

  const Props3 = {
    className: '',
    isProductDetailView: true,
    isGuest: false,
    isPlcc: false,
    labels: {},
  };

  it('ProductDetailSection true should render correctly', () => {
    component = shallow(<ProductDetailSectionVanilla {...Props3} />);
    expect(component).toMatchSnapshot();
  });

  const Props4 = {
    className: '',
    isProductDetailView: true,
    isGuest: false,
    isPlcc: true,
    labels: {},
  };

  it('ProductDetailSection & plcc true should render correctly', () => {
    component = shallow(<ProductDetailSectionVanilla {...Props4} />);
    expect(component).toMatchSnapshot();
  });
});
