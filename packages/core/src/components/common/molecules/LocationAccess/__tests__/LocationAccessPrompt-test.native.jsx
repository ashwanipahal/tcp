import React from 'react';
import { shallow } from 'enzyme';
import { LocationAccessPromptVanilla } from '../views/LocationAccessPrompt.native';

describe('LocationAccessPromptVanilla native component', () => {
  let component;
  const props = {
    isUserLoggedIn: false,
  };
  beforeEach(() => {
    component = shallow(<LocationAccessPromptVanilla {...props} />);
  });

  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });

  it('should return ModalNative component value one', () => {
    expect(component.find('ModalNative')).toHaveLength(1);
  });

  it('should return Styled(View) component value four', () => {
    expect(component.find('Styled(View)')).toHaveLength(4);
  });

  it('should return Styled(Styled(ImageComp)) component value two', () => {
    expect(component.find('Styled(Styled(ImageComp))')).toHaveLength(2);
  });

  it('should return Styled(TouchableOpacity) component value one', () => {
    expect(component.find('Styled(TouchableOpacity)')).toHaveLength(1);
  });

  it('should return Styled(Styled(BodyCopy)) component value three', () => {
    expect(component.find('Styled(Styled(BodyCopy))')).toHaveLength(3);
  });

  it('should return Styled(Styled(Anchor)) component value one', () => {
    expect(component.find('Styled(Styled(Anchor))')).toHaveLength(1);
  });

  it('should return Styled(Styled(CustomButton)) component value one', () => {
    expect(component.find('Styled(Styled(CustomButton))')).toHaveLength(1);
  });

  it('should return Styled(Styled(BodyCopy)) component value three', () => {
    expect(component.find('Styled(Styled(BodyCopy))')).toHaveLength(3);
  });
});
