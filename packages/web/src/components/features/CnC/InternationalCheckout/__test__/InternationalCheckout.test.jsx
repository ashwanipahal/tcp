import React from 'react';
import { shallow } from 'enzyme';
import { InternationalCheckoutVanilla } from '../organisms/InternationalCheckout';

describe('InternationalCheckoutVanilla', () => {
  const props = {
    iframeUrl: '',
    apiUrl: 'https://stagecheckout.fiftyone.com/htmlcheckout/resources/js/merchant.js',
    communicationUrl: 'https://stagecheckout.fiftyone.com/utils/empty.jsp',
  };

  it('should render InternationalCheckoutVanilla section', () => {
    const component = shallow(<InternationalCheckoutVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
