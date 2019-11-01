import React from 'react';
import { shallow } from 'enzyme';
import { ReviewPageVanilla } from '../views/ReviewPage.view.native';

describe('ReviewPageVanilla component', () => {
  it('should renders correctly props not present', () => {
    const props = {
      labels: {},
      handleSubmit: jest.fn(),
      reviewDidMount: () => {},
      ServerErrors: {},
    };
    const component = shallow(<ReviewPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  const props1 = {
    className: '',
    labels: {},
    submitReview: jest.fn(),
    handleSubmit: jest.fn(),
    reviewDidMount: () => {},
    isExpressCheckout: true,
    pickUpContactPerson: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
    },
    pickUpContactAlternate: {},
    orderHasPickUp: true,
    orderHasShipping: true,
  };
  const data = {
    pickUpAlternateExpress: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      emailAddress: '',
      hasAlternatePickup: true,
    },
    pickUpAlternate: {
      hasAlternatePickup: true,
    },
    smsSignUp: {
      sendOrderUpdate: '',
    },
  };
  it('calling reviewFormSubmit method', () => {
    const tree = shallow(<ReviewPageVanilla {...props1} />);
    const componentInstance = tree.instance();
    jest.spyOn(componentInstance, 'reviewFormSubmit');
    componentInstance.reviewFormSubmit(data);
    expect(componentInstance.reviewFormSubmit).toHaveBeenCalled();
  });

  it('should render correctly without express checkout', () => {
    props1.isExpressCheckout = false;
    props1.pickUpContactPerson = {};
    const props = {
      reviewDidMount: () => {},
      className: '',
      labels: {},
      submitReview: jest.fn(),
      handleSubmit: jest.fn(),
      isExpressCheckout: true,
      pickUpContactPerson: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: '',
      },
      pickUpContactAlternate: {},
    };
    const tree = shallow(<ReviewPageVanilla {...props} />);
    const componentInstance = tree.instance();
    jest.spyOn(componentInstance, 'reviewFormSubmit');
    componentInstance.reviewFormSubmit(data);
    expect(componentInstance.reviewFormSubmit).toHaveBeenCalled();
  });
});
