import React from 'react';
import { shallow } from 'enzyme';
import { InternationalCheckoutPageContainer } from '../container/InternationalCheckoutPage.container';

describe('InternationalCheckoutPageContainer', () => {
  const props = {
    iframeUrl: '',
    apiUrl: '',
    communicationUrl: '',
    initIntlCheckout: jest.fn(),
  };
  it('should render InternationalCheckoutPageContainer', () => {
    const component = shallow(<InternationalCheckoutPageContainer {...props} />);
    expect(component).toMatchSnapshot();
  });
});
