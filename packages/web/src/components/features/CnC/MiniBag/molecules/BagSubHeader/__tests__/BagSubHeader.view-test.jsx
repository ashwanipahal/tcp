import React from 'react';
import { shallow } from 'enzyme';
import BagSubHeader from '../views/BagSubHeader';

describe('BossBannerView component', () => {
  it('renders correctly', () => {
    const component = shallow(<BagSubHeader />);
    expect(component).toMatchSnapshot();
  });
});
