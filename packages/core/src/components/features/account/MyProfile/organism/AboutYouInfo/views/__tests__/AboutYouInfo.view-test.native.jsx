import React from 'react';
import { shallow } from 'enzyme';
import { AboutYouInfo } from '../AboutYouInfo.view.native';

describe('AboutYouInfo', () => {
  it('should render correctly', () => {
    const props = {
      labels: {
        lbl_profile_about_you_title: 'More About You',
        lbl_profile_about_you_describe: 'I describe myself as',
        lbl_profile_about_you_shopping: 'Shopping for',
        lbl_profile_update_info: 'UPDATE INFO',
      },
      userSurvey: null,
    };
    const tree = shallow(<AboutYouInfo {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
