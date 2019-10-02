import React from 'react';
import { shallow } from 'enzyme';
import { OrdersContainer, mapDispatchToProps } from '../Orders.container';
import { OrdersList } from '../../views/OrdersList.view';

describe('Orders Container', () => {
  it('should render OrdersContainer', () => {
    const tree = shallow(
      <OrdersContainer labels={{}} onFilterLink={jest.fn()} ordersListItems={[]} />
    );
    expect(tree.is(OrdersList)).toBeTruthy();
  });

  it('should return an action fetchOrders which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.fetchOrders();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
