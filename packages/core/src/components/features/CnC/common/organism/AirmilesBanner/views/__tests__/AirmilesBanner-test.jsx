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
    onAddAirmilesBanner: jest.fn(),
    airmilesBannerData: {
      collectorNumber: '13131313222',
      offerCode: '124e12e',
    },
  };

  it('should render component correctly', () => {
    const component = shallow(<AirmilesBanner {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('simulate submit ', () => {
    const component = shallow(<AirmilesBanner {...props} />);
    component.setState({ touched: true });
    component.instance().handleSubmit({
      promoId: '12323421111',
      orderId: '123414',
    });
    expect(props.handleSubmit).toHaveBeenCalledTimes(0);
  });
  it('should render correctly with promofield', () => {
    props.promoField = '1234';
    const component = shallow(<AirmilesBanner {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should render correctly with expanded case', () => {
    props.promoField = '1234';
    const component = shallow(<AirmilesBanner {...props} />);
    component.setState({ expanded: true });
    expect(component).toMatchSnapshot();
  });
  it('should call componentWillRecieveProps', () => {
    props.promoField = '123445678987656786';
    props.airmilesBannerData = {};
    const component = shallow(<AirmilesBanner {...props} />);
    component.setState({ expanded: true });
    component.setProps({ promoField: '123445678987656786', syncErrorObj: {} });
    expect(component).toMatchSnapshot();
  });
});
