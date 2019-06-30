// @flow
import React from 'react';
import { shallow } from 'enzyme';
import AddAddress from '../../../views/AddAddress.view';
import { mapDispatchToProps } from '../../AddAddress/AddAddress.container';

describe('<AddaddressContainer>', () => {
  it('should render nothing if AddaddressContainer prop is not defined', () => {
    const component = shallow(<AddAddress submitAddAddressForm={() => {}} />);
    expect(component.isEmptyRender()).toBeTruthy();
  });
});
describe('#mapDispatchToProps', () => {
  it('should return an action submitAddAddressForm which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.submitAddAddressForm();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
