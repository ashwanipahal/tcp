import React from 'react';
import { shallow } from 'enzyme';
import { BrandTabsVanilla } from '../views/BrandTabs';
import mockData from './mock';

describe('BrandTabs component', () => {
  it('renders correctly with brand-tabs className', () => {
    const props = {
      className: 'brand-tabs',
      data: mockData.brand_tabs,
    };
    const component = shallow(<BrandTabsVanilla {...props}>Brand Tabs with TCP</BrandTabsVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.brand-tabs')).toHaveLength(1);
  });
});
