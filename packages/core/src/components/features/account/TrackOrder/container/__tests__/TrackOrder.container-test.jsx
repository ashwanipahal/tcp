import React from 'react';
import { shallow } from 'enzyme';
import { TrackOrderContainer, mapDispatchToProps } from '../TrackOrder.container';
import TrackOrderView from '../../views/TrackOrderModal.view';

describe('Track Order Modal', () => {
  const labels = {
    trackOrder: {},
  };
  const payloadArgs = {
    orderNumber: '3000306507',
    emailAddress: 'GYM20081901@YOPMAIL.COM',
  };
  it('should render Track Order Modal', () => {
    const component = shallow(
      <TrackOrderContainer
        labels={labels}
        errorMessage=""
        isGuestUser=""
        onSubmit={jest.fn()}
        openLoginOverlay={jest.fn()}
        openState=""
        setModalMountState={jest.fn()}
      />
    );
    expect(component.is(TrackOrderView)).toBeTruthy();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action onSubmit which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.onSubmit(payloadArgs);
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action openLoginOverlay which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.openLoginOverlay({ component: 'login', variation: 'primary' });
      expect(dispatch.mock.calls).toHaveLength(1);
    });
    it('should return an action setTrackOrderModalMountState which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.setTrackOrderModalMountState({ state: false });
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
