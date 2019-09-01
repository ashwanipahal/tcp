import React from 'react';
import { shallow } from 'enzyme';
import ShippingPage from '../ShippingPage.view.native';

describe('Shipping Page', () => {
  it('should render correctly', () => {
    const mockedhandleSubmit = jest.fn();
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const data = { address, shipmentMethods: [{}], smsSignUp: {} };
    const props = {
      address,
      shipmentMethods: [{}],
      loadShipmentMethods: () => {},
      shippingLabels: {
        sectionHeader: '',
      },
      handleSubmit: mockedhandleSubmit,
      navigation: {
        state: {
          params: {
            shippingLabels: {},
            shipmentMethods: jest.fn(),
            defaultShipmentId: '',
            selectedShipmentId: '',
            addressLabels: {},
            emailSignUpLabels: {},
            loadShipmentMethods: jest.fn(),
            handleSubmit: mockedhandleSubmit,
          },
        },
      },
    };
    const prevProps = {
      address,
    };
    const tree = shallow(<ShippingPage {...props} prevProps={prevProps} />);
    tree.instance().submitShippingForm(data);
    expect(mockedhandleSubmit).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });
  it('should call component did Update', () => {
    const address = {
      addressLine1: 'pob',
      addressLine2: '',
    };
    const mockedloadShipmentMethods = jest.fn();
    const props = {
      shipmentMethods: [{}],
      loadShipmentMethods: mockedloadShipmentMethods,
      shippingLabels: {
        sectionHeader: '',
      },
      navigation: {
        state: {
          params: {
            shippingLabels: {},
            shipmentMethods: jest.fn(),
            defaultShipmentId: '',
            selectedShipmentId: '',
            addressLabels: {},
            emailSignUpLabels: {},
            loadShipmentMethods: jest.fn(),
            handleSubmit: jest.fn(),
          },
        },
      },
    };
    const prevProps = {
      address: {
        addressLine1: 'pob',
        addressLine2: '11',
      },
    };
    const tree = shallow(<ShippingPage {...props} prevProps={prevProps} />);
    tree.setProps({
      address,
    });
  });
});
