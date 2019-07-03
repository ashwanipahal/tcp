// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { mapDispatchToProps, AddaddressContainer } from '../AddAddress/AddAddress.container';

describe('<AddaddressContainer>', () => {
  it('should render correctly', () => {
    const component = shallow(<AddaddressContainer submitAddAddressForm={() => {}} />);
    expect(component).toMatchSnapshot();
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
