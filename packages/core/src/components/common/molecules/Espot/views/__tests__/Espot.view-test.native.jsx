import React from 'react';
import { shallow } from 'enzyme';
import { Espot } from '../Espot.view.native';

describe('Espot component', () => {
  let component;
  const togglePlccModalSpy = jest.fn();
  beforeEach(() => {
    const props = {
      richTextHtml: '<b>test</b>',
      togglePlccModal: togglePlccModalSpy,
      navigation: {
        navigate: () => {},
      },
    };
    component = shallow(<Espot {...props} />);
  });

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('onPressHandler instance should call togglePlccModal prop if action is plccModal', () => {
    component.instance().onPressHandler('', '_modal', 'plccModal');
    expect(togglePlccModalSpy).toBeCalled();
  });
});
