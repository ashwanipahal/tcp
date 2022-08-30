import React from 'react';
import { shallow } from 'enzyme';
import { AirmilesBanner } from '../AirmilesBanner.view.native';

describe('CouponForm Component', () => {
  let component;
  const props = {
    labels: {
      headerText: 'headerText',
      collectorNumber: '13131313222',
      collectorFlyout: 'collectorFlyout',
      offerCode: '124e12e',
      offerFlyout: 'offerFlyout',
      footerText: 'footerText',
    },
    handleSubmit: jest.fn(),
    airmilesBannerData: {
      collectorNumber: '13131313222',
      offerCode: '124e12e',
    },
  };

  beforeEach(() => {
    component = shallow(<AirmilesBanner {...props} />);
  });

  it('AirmilesBanner should be defined', () => {
    expect(component).toBeDefined();
  });

  it('AirmilesBanner should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
