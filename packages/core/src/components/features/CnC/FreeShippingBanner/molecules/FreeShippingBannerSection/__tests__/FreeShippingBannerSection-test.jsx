import React from 'react';
import { shallow } from 'enzyme';
import { FreeShippingBannerSectionVanilla } from '../views/FreeShippingBannerSection';

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
    component = shallow(<FreeShippingBannerSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('FreeShippingBannerSection with label should render correctly', () => {
    props.labels = 'abc';
    component = shallow(<FreeShippingBannerSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
