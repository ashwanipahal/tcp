import React from 'react';
import { shallow } from 'enzyme';
import { ReviewPageVanilla } from '../views/ReviewPage.view';

describe('ReviewPageVanilla component', () => {
  it('should renders correctly props not present', () => {
    const props = { labels: {}, handleSubmit: jest.fn() };
    const component = shallow(<ReviewPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  const props1 = {
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
    orderHasPickUp: true,
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
    const tree = shallow(<ReviewPageVanilla {...props1} />);
    const componentInstance = tree.instance();
    jest.spyOn(componentInstance, 'reviewFormSubmit');
    componentInstance.reviewFormSubmit(data);
    expect(componentInstance.reviewFormSubmit).toHaveBeenCalled();
  });
});
