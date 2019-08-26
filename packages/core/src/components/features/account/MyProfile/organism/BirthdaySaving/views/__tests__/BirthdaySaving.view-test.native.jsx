import React from 'react';
import { shallow } from 'enzyme';
import { BirthdaySaving } from '../BirthdaySaving.view.native';

describe('BirthdaySaving', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      handleComponentChange: () => {},
    };
    const tree = shallow(<BirthdaySaving {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
