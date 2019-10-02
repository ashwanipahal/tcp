import React from 'react';
import { shallow } from 'enzyme';
import EarnExtraPointsOverview from '../EarnExtraPointsOverview.view';

describe('EarnExtraPointsOverview component', () => {
  it('should render correctly EarnExtraPointsOverview', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<EarnExtraPointsOverview {...props} />);
    expect(component).toMatchSnapshot();
  });
});
