import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../NavBar';

describe('NavBar component', () => {
  const props = {
    links: [
      {
        id: '1',
        name: 'test 1',
      },
      {
        id: '2',
        name: 'test 2',
      },
    ],
  };
  it('NavBar component renders correctly', () => {
    const component = shallow(<NavBar {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('NavBar component renders ul correctly', () => {
    const component = shallow(<NavBar {...props} />);
    expect(component.find('.navigation-bar')).toHaveLength(1);
  });

  it('NavBar component renders links correctly', () => {
    const component = shallow(<NavBar {...props} />);
    expect(component.find('.navigation-level-one')).toHaveLength(4);
  });
});
