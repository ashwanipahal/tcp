import React from 'react';
import { shallow } from 'enzyme';
import { BossBannerVanilla } from '../BossBanner.views.native';

describe('BossBanner Component', () => {
  it('should render correctly', () => {
    const props = {
      className: 'abcd',
      labels: {
        pickUpText: 'abc',
        simplyChooseText: 'def',
        noRushText: 'xyz',
      },
    };
    const component = shallow(<BossBannerVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
