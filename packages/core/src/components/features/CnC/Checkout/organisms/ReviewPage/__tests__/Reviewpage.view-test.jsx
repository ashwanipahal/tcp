import React from 'react';
import { shallow } from 'enzyme';
import { ReviewPageVanilla } from '../views/ReviewPage.view';

describe('ReviewPageVanilla component', () => {
  it('should renders correctly props not present', () => {
    const props = { labels: {}, handleSubmit: jest.fn(), ServerErrors: {} };
    const component = shallow(<ReviewPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('calling reviewFormSubmit method', () => {
    const props = {
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
    const tree = shallow(<ReviewPageVanilla {...props} />);
    const componentInstance = tree.instance();
    jest.spyOn(componentInstance, 'reviewFormSubmit');
    componentInstance.reviewFormSubmit(data);
    expect(componentInstance.reviewFormSubmit).toHaveBeenCalled();
  });
});
