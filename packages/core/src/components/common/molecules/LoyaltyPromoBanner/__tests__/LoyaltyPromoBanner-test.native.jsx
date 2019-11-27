import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyPromoBannerVanilla } from '../view/LoyaltyPromoBanner.native';

describe('LoyaltyPromoBannerVanilla native component', () => {
  let component;
  const props = {
    navigation: {},
    richTextList: [
      {
        richText: { text: '' },
        link: {},
      },
    ],
  };
  beforeEach(() => {
    component = shallow(<LoyaltyPromoBannerVanilla {...props} />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
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
