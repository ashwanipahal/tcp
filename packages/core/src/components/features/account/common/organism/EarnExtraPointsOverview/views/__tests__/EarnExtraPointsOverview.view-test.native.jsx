import React from 'react';
import { shallow } from 'enzyme';
import EarnExtraPointsOverview from '../EarnExtraPointsOverview.view';

describe('EarnExtraPointsOverview component', () => {
  it('should render EarnExtraPointsOverview ', () => {
    const handleComponentChange = jest.fn();

    const props = {
      labels: {
        lbl_common_earnExtraPoints: ' Earn Extra',
        lbl_earnExtraPoints_getReward: 'Extra Points',
        lbl_common_viewAll: 'View All',
      },
      handleComponentChange,
    };
    const component = shallow(<EarnExtraPointsOverview {...props} />);
    expect(component).toMatchSnapshot();
  });
});
