import React from 'react';
import { shallow } from 'enzyme';
import FreeShippingBannerSection from '../views/FreeShippingBannerSection.native';

describe('FreeShippingBannerSection View Component', () => {
  let component;
  let props;
  beforeEach(() => {
    props = {
      className: '',
      labels: {},
    };
  });

  it('FreeShippingBannerSection should render correctly', () => {
    component = shallow(<FreeShippingBannerSection {...props} />);
    expect(component).toMatchSnapshot();
  });
});
