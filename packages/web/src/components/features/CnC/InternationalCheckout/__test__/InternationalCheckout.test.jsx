import React from 'react';
import { shallow } from 'enzyme';
import { InternationalCheckoutVanilla } from '../organisms/InternationalCheckout';

describe('InternationalCheckoutVanilla', () => {
  const props = {
    iframeUrl: '',
    apiUrl: '',
    communicationUrl: '',
  };

  it('should render InternationalCheckoutVanilla section', () => {
    const component = shallow(<InternationalCheckoutVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
