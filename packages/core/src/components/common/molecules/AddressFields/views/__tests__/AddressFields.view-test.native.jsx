import React from 'react';
import { shallow } from 'enzyme';
import { AddressFields } from '../AddressFields.view.native';

describe('AddressFields component', () => {
  it('should render correctly', () => {
    const props = {
      formName: 'creditCard',
      addressFormLabels: {},
      formSection: 'address',
      dispatch: jest.fn(),
    };
    const component = shallow(<AddressFields {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly without phoneNumber and ', () => {
    const props = {
      formName: 'creditCard',
      formSection: 'address',
      addressFormLabels: {},
      dispatch: jest.fn(),
    };
    const component = shallow(<AddressFields {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render correctly without phoneNumber and variation secondary and country ca', () => {
    const props = {
      formName: 'creditCard',
      formSection: 'address',
      addressFormLabels: {},
      dispatch: jest.fn(),
    };

    const component = shallow(<AddressFields {...props} />);
    component.setState({ country: 'CA' });
    expect(component).toMatchSnapshot();
  });
  it('should render correctly without phoneNumber and variation secondary and country US', () => {
    const mockedcheckPOBoxAddress = jest.fn();
    const mockedloadShipmentMethods = jest.fn();
    const props = {
      formName: 'creditCard',
      addressFormLabels: {},
      formSection: 'address',
      checkPOBoxAddress: mockedcheckPOBoxAddress,
      loadShipmentMethods: mockedloadShipmentMethods,
      dispatch: jest.fn(),
    };

    const component = shallow(<AddressFields {...props} />);
    component.setState({ country: 'US' });
    component.instance().changeShipmentMethods();
    expect(mockedloadShipmentMethods).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });
});
