import React from 'react';
import { shallow } from 'enzyme';
import ApplicationInProgress from '../ApplicationInProgress.native';

describe('ApplicationInProgress component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
      bagItems: true,
    };
    const component = shallow(<ApplicationInProgress {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should renders correctly while having no bag items', () => {
    const props = {
      labels: {},
      bagItems: false,
    };
    const component = shallow(<ApplicationInProgress {...props} />);
    expect(component).toMatchSnapshot();
  });
});
