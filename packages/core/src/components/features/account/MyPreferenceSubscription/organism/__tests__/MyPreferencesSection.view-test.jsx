import React from 'react';
import { shallow } from 'enzyme';
import { MyPrefrenceSectionVanilla } from '../MyPreferencesSection.view';

describe('ProfileInformation component', () => {
  it('should render correctly', () => {
    const labels = {};
    const component = shallow(<MyPrefrenceSectionVanilla labels={labels} />);
    expect(component).toMatchSnapshot();
  });
});
