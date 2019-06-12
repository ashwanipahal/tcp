import React from 'react';
import { shallow } from 'enzyme';
import BrandTabs from '../views';
import mockData from './mock';

describe('BrandTabs component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'brand-tabs',
      data: mockData.brand_tabs,
    };
    const component = shallow(<BrandTabs {...props} />);
    expect(component).toMatchSnapshot();
  });
});
