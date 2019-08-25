import React from 'react';
import { shallow } from 'enzyme';
import { PersonalInformation } from '../PersonalInformation.view.native';

describe('PersonalInformation', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleComponentChange: () => {},
    };
    const tree = shallow(<PersonalInformation {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
