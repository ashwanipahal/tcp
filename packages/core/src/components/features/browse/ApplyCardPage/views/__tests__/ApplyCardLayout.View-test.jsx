import React from 'react';
import { shallow } from 'enzyme';
import { ApplyCardLayoutView } from '../ApplyCardLayout.View';

describe('ApplyCardLayoutView component', () => {
  const props = {
    applicationStatus: 'PENDING',
    disclaimersData: {},
    labels: {},
    preScreenCodeLink: 'pre_link',
  };
  it('should renders correctly', () => {
    const component = shallow(<ApplyCardLayoutView {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly considering selective arguments are passed', () => {
    props.applicationStatus = '';
    const component = shallow(<ApplyCardLayoutView {...props} />);
    expect(component).toMatchSnapshot();
  });
});
