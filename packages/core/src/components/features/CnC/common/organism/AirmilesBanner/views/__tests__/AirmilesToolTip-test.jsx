import React from 'react';
import { shallow } from 'enzyme';
import AirmilesToolTip from '../AirmilesToolTip.view';

describe('AirmilesBanner form component', () => {
  const props = {
    toolTipText: 'lables flyout',
  };

  it('should render component correctly', () => {
    const component = shallow(<AirmilesToolTip {...props} />);
    expect(component).toMatchSnapshot();
  });
});
