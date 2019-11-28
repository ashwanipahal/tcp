import React from 'react';
import { shallow } from 'enzyme';
import PlaceCashBannerContainer from '../PlaceCashBanner.container';

describe('PlaceCashBannerContainer View Component', () => {
  let component;
  const Props = {
    isOrderConfirmation: false,
  };

  it('PlaceCashBannerContainer should render correctly', () => {
    component = shallow(<PlaceCashBannerContainer {...Props} />);
    expect(component).toMatchSnapshot();
  });
});
