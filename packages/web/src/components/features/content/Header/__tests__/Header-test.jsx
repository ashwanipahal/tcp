import React from 'react';
import { shallow } from 'enzyme';
import Header from '../views';

describe('Header component', () => {
  it('renders correctly', () => {
    const component = shallow(
      <Header
        headerTopNav={{ composites: {} }}
        headerPromoArea={{ composites: { promoTextBanner: {} } }}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
