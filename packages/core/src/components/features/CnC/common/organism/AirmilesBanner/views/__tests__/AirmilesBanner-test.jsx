import React from 'react';
import { shallow } from 'enzyme';
import { AirmilesBanner } from '../AirmilesBanner.view';

describe('AirmilesBanner form component', () => {
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

  it('should render component correctly', () => {
    const component = shallow(<AirmilesBanner {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('simulate add gift card button ', () => {
    const component = shallow(<AirmilesBanner {...props} />);
    component.instance().handleSubmit({
      promoId: '12323421111',
      orderId: '123414',
    });
    expect(props.handleSubmit).toHaveBeenCalled();
  });
});
