import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyPromoBannerVanilla } from '../view/LoyaltyPromoBanner.native';

describe('LoyaltyPromoBanner', () => {
  let component;
  const props = {
    navigation: {},
    data: {
      richTextList: [{ richText: { text: 'dummy' }, link: { url: '/test' } }],
    },
  };

  beforeEach(() => {
    component = shallow(<LoyaltyPromoBannerVanilla {...props} />);
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

  it('should return Styled(Anchor) component value one', () => {
    expect(component.find('Styled(Anchor)')).toHaveLength(1);
  });

  it('should return Styled(View) component value one', () => {
    expect(component.find('Styled(View)')).toHaveLength(1);
  });

  it('should return Styled(TouchableOpacity) component value one', () => {
    expect(component.find('Styled(TouchableOpacity)')).toHaveLength(1);
  });

  it('should return Styled(Styled(ImageComp)) component value one', () => {
    expect(component.find('Styled(Styled(ImageComp))')).toHaveLength(1);
  });
});
