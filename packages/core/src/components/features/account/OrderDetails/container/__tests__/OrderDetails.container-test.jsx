import React from 'react';
import { shallow } from 'enzyme';
import { OrderDetailsContainer, mapDispatchToProps } from '../OrderDetails.container';
import OrderDetailsData from '../../views/OrderDetails.view';

describe('Order Details container', () => {
  const props = {
    ordersLabels: {},
  };
  it('should render Order Details component', () => {
    const component = shallow(
      <OrderDetailsContainer getOrderDetailsAction={() => {}} {...props} />
    );
    expect(component.is(OrderDetailsData)).toBeTruthy();
  });

  it('should return an action getOrderDetailsAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getOrderDetailsAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
