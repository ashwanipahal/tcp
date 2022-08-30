import React from 'react';
import { shallow } from 'enzyme';
import { ExtraPointsTeaserVanilla } from '../ExtraPointsTeaser';

describe('ExtraPointsTeaser', () => {
  it('should render correctly', () => {
    const labels = {
      ACC_DRAWER_EARN_EXTRA: 'Want to Earn Extra Points?',
      ACC_DRAWER_GET_CLOSER: 'Get even closer to your next reward!',
      ACC_DRAWER_LEARN_MORE: 'Learn More',
    };
    const tree = shallow(<ExtraPointsTeaserVanilla labels={labels} />);
    expect(tree).toMatchSnapshot();
  });
});
