import React from 'react';
import { shallow } from 'enzyme';
import ThankYouTitleDisplayVanilla from '../views/ThankYouTitleDisplay.view.native';

describe('ThankYouTitleDisplayVanilla', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      emailAddress: 'abcd@test.com',
      isOrderPending: false,
      isShowShippingMessage: true,
      isShowBopisMessage: false,
      isShowMixedMessage: true,
    };
    const tree = shallow(<ThankYouTitleDisplayVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with showbopis msg', () => {
    const props = {
      labels: {},
      emailAddress: 'abcd@test.com',
      isOrderPending: true,
      isShowShippingMessage: false,
      isShowBopisMessage: false,
      isShowMixedMessage: false,
    };
    const tree = shallow(<ThankYouTitleDisplayVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isShowShippingMessage msg', () => {
    const props = {
      labels: {},
      emailAddress: 'abc@test.com',
      isOrderPending: true,
      isShowShippingMessage: true,
      isShowBopisMessage: false,
      isShowMixedMessage: false,
    };
    const tree = shallow(<ThankYouTitleDisplayVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isShowBopisMessage msg', () => {
    const props = {
      labels: {},
      emailAddress: 'abc@test.com',
      isOrderPending: true,
      isShowShippingMessage: false,
      isShowBopisMessage: true,
      isShowMixedMessage: false,
    };
    const tree = shallow(<ThankYouTitleDisplayVanilla {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
