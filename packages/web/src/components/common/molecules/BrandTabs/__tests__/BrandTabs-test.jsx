import React from 'react';
import { shallow } from 'enzyme';
import { BrandTabsVanilla } from '../views/BrandTabs';
import mockData from './mock';

describe('BrandTabs component', () => {
  it('renders correctly with tcp logoClass', () => {
    const props = {
      className: 'brand-tabs',
      data: mockData.brand_tabs,
      logoClass: 'header__brand-tab--tcp',
    };
    const component = shallow(<BrandTabsVanilla {...props}>Brand Tabs with TCP</BrandTabsVanilla>);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const props = {
      className: 'brand-tabs',
      data: mockData.brand_tabs,
      logoClass: 'header__brand-tab--gymboree',
    };
    const component = shallow(
      <BrandTabsVanilla {...props}>Brand Tabs with Gymboree</BrandTabsVanilla>
    );
    expect(component).toMatchSnapshot();
  });
});
