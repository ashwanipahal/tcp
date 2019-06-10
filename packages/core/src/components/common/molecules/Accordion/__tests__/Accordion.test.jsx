import React from 'react';
import { shallow } from 'enzyme';
import Accordion from '../Accordion';

describe('Accordion component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'class',
      children: 'AAAA',
      title: 'test',
    };
    const component = shallow(<Accordion {...props} />);
    expect(component).toMatchSnapshot();
  });
});
