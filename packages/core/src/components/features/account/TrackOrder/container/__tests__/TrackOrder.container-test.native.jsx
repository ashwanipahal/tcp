import React from 'react';
import { shallow } from 'enzyme';
import TrackOrderContainerView, { mapDispatchToProps } from '../TrackOrder.container.native';

describe('Track Order Modal', () => {
  const labels = {
    trackOrder: {},
  };
  const payloadArgs = {
    orderNumber: '3000306507',
    emailAddress: 'GYM20081901@YOPMAIL.COM',
  };
  it('should render Track Order Modal View', () => {
    const props = {
      labels,
      errorMessage: '',
      onSubmit: jest.fn(),
      onChangeForm: jest.fn(),
      showNotification: '',
      onRequestClose: jest.fn(),
    };
    const component = shallow(<TrackOrderContainerView {...props} />);
    expect(component).toMatchSnapshot();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action onSubmit which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onSubmit(payloadArgs);
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action onChangeForm which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onChangeForm();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action resetModalData which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.resetModalData({ state: true });
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
