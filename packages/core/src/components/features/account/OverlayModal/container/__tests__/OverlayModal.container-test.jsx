import React from 'react';
import { shallow } from 'enzyme';
import { OverlayModal, mapDispatchToProps } from '../OverlayModal.container';

describe('OverlayModal Container', () => {
  it('should render correctly', () => {
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
  describe('should call dispatch actions', () => {
    it('should return an action closeOverlay which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.closeOverlay();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
