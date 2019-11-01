import React from 'react';
import { shallow } from 'enzyme';
import FreeShippingBanner from '../views/FreeShippingBanner.view';

describe('FreeShippingBanner View Component', () => {
  let component;
  let props;
  beforeEach(() => {
    props = {
      className: '',
      labels: {},
    };
  });

  it('FreeShippingBanner should render correctly', () => {
    component = shallow(<FreeShippingBanner {...props} />);
    expect(component).toMatchSnapshot();
  });
});
