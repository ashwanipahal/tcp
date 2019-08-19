import React from 'react';
import { shallow } from 'enzyme';
import CompleteProfile from '../CompleteProfile.view';

describe('CompleteProfile component', () => {
  it('should render correctly', () => {
    const labels = {
      lbl_profile_Enhance_Experience: 'Enhance Experience',
    };
    const component = shallow(<CompleteProfile labels={labels} />);
    expect(component).toMatchSnapshot();
  });
});
