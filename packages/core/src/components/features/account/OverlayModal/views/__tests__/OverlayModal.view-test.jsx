import React from 'react';
import { shallow } from 'enzyme';
import OverlayModal from '../OverlayModal.view';

describe('OverlayModal View', () => {
  it('should render null', () => {
    const props = {
      component: null,
      variation: 'primary',
      color: null,
      openState: false,
      closeOverlay: () => {},
    };
    const tree = shallow(<OverlayModal {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly', () => {
    const props = {
      component: 'login',
      variation: 'primary',
      color: null,
      openState: true,
      closeOverlay: () => {},
    };
    const tree = shallow(<OverlayModal {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
