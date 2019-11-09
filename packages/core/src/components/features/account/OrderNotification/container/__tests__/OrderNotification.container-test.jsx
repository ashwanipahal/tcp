import React from 'react';
import { shallow } from 'enzyme';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import { OrderNotification, mapDispatchToProps } from '../OrderNotification.container';

describe('OrderNotification Container', () => {
  it('should render OrderNotificationContainer', () => {
    const tree = shallow(<OrderNotification labels={{}} />);
    expect(tree.is(BodyCopy)).toBeTruthy();
  });

  it('should return an action fetchOrders which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchOrders();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
