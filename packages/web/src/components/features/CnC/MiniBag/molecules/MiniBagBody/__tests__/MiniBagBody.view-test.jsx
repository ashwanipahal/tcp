import React from 'react';
import { shallow } from 'enzyme';
import MiniBagBody from '../views/MiniBagBody';

describe('BossBannerView component', () => {
  it('renders correctly', () => {
    const component = shallow(<MiniBagBody />);
    expect(component).toMatchSnapshot();
  });
});
