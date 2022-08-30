import React from 'react';
import { shallow } from 'enzyme';
import InternationalCheckoutPage from '../views/InternationalCheckoutPage.view';

describe('InternationalCheckoutPage', () => {
  const props = {
    iframeUrl: '',
    apiUrl: '',
    communicationUrl: '',
  };

  it('should render InternationalCheckoutPage section', () => {
    const component = shallow(<InternationalCheckoutPage {...props} />);
    expect(component).toMatchSnapshot();
  });
});
