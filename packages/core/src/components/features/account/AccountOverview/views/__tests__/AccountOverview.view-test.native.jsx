import React from 'react';
import { shallow } from 'enzyme';
import AccountOverview from '../AccountOverview.view.native';

describe('AccountOverview component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<AccountOverview {...props} />);
    expect(component).toMatchSnapshot();
  });
});
