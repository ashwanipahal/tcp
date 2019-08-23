import React from 'react';
import { shallow } from 'enzyme';
import { PersonalInformationDisplay } from '../PersonalInformationDisplay.view';

describe('ProfileInfoActionTile', () => {
  it('should render correctly', () => {
    const props = {
      profileCompletion: 20,
    };
    const tree = shallow(<PersonalInformationDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
