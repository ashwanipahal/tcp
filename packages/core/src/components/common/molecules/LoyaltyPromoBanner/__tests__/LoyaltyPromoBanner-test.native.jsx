import React from 'react';
import { shallow } from 'enzyme';
import LoyaltyPromoBanner from '../view/LoyaltyPromoBanner.native';

describe('LoyaltyPromoBanner', () => {
  let component;
  const props = {
    navigation: {},
    data: {
      richTextList: [{ richText: { text: 'dummy' }, link: { url: '/test' } }],
    },
  };

  beforeEach(() => {
    component = shallow(<LoyaltyPromoBanner {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
  it('should call correctly', () => {
    component.instance().validateView();
    expect(component.state('bannerClosed')).toBe(true);
  });
});
