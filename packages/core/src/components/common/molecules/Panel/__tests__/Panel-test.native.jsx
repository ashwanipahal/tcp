import React from 'react';
import { shallow } from 'enzyme';
import Panel from '../views/Panel.native';

describe('Panel component', () => {
  let component;
  let props = {
    children: {},
    title: 'Address Book',
  };
  component = shallow(<Panel {...props} />);
  beforeEach(() => {
    component = shallow(<Panel {...props} />);
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should render correctly', () => {
    props = {
      children: {},
      title: 'Orders',
    };
    component = shallow(<Panel {...props} />);
    expect(component).toMatchSnapshot();
  });
});
