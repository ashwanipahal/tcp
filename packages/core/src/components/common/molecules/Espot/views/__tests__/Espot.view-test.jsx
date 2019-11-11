import React from 'react';
import { shallow } from 'enzyme';
import Espot from '../Espot.view';

describe('Espot component', () => {
  let component;
  const togglePlccModalSpy = jest.fn();
  beforeEach(() => {
    const props = {
      richTextHtml: '<b>test</b>',
      togglePlccModal: togglePlccModalSpy,
    };
    component = shallow(<Espot {...props} />);
  });

  it('should renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('onClickHandler instance should call togglePlccModal prop if action is plccModal', () => {
    component.instance().onClickHandler('plccModal');
    expect(togglePlccModalSpy).toBeCalled();
  });
});
