import React from 'react';
import { shallow } from 'enzyme';
import { AddEditAddressContainer, mapDispatchToProps } from '../AddEditAddress.container';
import AddAddressComponent from '../../views/AddEditAddress.view';

describe('AddEditAddressContainer', () => {
  it('should render AddAddress component', () => {
    const component = shallow(
      <AddEditAddressContainer address={{}} labels={{}} onCancel={() => {}} showHeading />
    );
    expect(component.is(AddAddressComponent)).toBeTruthy();
  });

  describe('#mapDispatchToProps', () => {
    it('should return an action getAddressListAction which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.getAddressListAction();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
