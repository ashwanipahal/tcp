import React from 'react';
import { shallow } from 'enzyme';
import BossBannerView from '../BossBanner.views';

describe('BossBannerView component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'abcd',
      labels: {
        pickUpText: 'abc',
        simplyChooseText: 'def',
        noRushText: 'xyz',
      },
    };
    const component = shallow(<BossBannerView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
