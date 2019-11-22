import React from 'react';
import { shallow } from 'enzyme';
import Espot from '../Espot.view';

jest.mock('@tcp/core/src/utils/utils.web', () => ({
  routerPush: jest.fn(),
}));

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
    component.instance().onClickHandler('', '_modal', 'plccModal');
    expect(togglePlccModalSpy).toBeCalled();
  });

  it('should call handleUrl for target blank', () => {
    component.instance().onClickHandler('/pointsClaimForm', '_blank', '');

    const handleUrl = jest.spyOn(component.instance(), 'handleUrl');
    const richTextInternalRoute = jest.spyOn(component.instance(), 'richTextInternalRoute');

    component.instance().handleUrl('/pointsClaim', '_blank');

    component.instance().richTextInternalRoute('/pointsClaim');
    expect(richTextInternalRoute).toHaveBeenCalled();
  });

  it('should call handleUrl for target self', () => {
    component.instance().onClickHandler('/pointHistoryPage', '_self', '');

    const handleUrl = jest.spyOn(component.instance(), 'handleUrl');
    const richTextInternalRoute = jest.spyOn(component.instance(), 'richTextInternalRoute');

    component.instance().handleUrl('/pointHistory', '_self');

    component.instance().richTextInternalRoute('/pointHistory');
    expect(richTextInternalRoute).toHaveBeenCalled();
  });
});
