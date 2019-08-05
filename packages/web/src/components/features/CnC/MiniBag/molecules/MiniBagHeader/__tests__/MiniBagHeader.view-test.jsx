import React from 'react';
import { shallow } from 'enzyme';
import MiniBagHeader from '../views/MiniBagHeader';

describe('BossBannerView component', () => {
  it('renders correctly', () => {
    const component = shallow(<MiniBagHeader />);
    expect(component).toMatchSnapshot();
  });
});
